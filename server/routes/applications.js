const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const emailService = require('../services/emailService');
const smsService = require('../services/smsService');

// @route   POST /api/applications
// @desc    Submit a program application
// @access  Public
router.post('/', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      program,
      age,
      location,
      message,
      source = 'ourprograms'
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !program || !age || !location || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Create application record
    const application = new Application({
      firstName,
      lastName,
      email,
      phone,
      program,
      age,
      location,
      message,
      source,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await application.save();

    // Send confirmation email to the applicant
    try {
      await emailService.sendApplicationConfirmationEmail(application);
    } catch (emailError) {
      console.error('Error sending application confirmation email:', emailError);
    }

    // Send notification email to admin
    try {
      await emailService.sendApplicationNotificationEmail(application);
    } catch (emailError) {
      console.error('Error sending application notification email:', emailError);
    }

    // Send SMS confirmation to applicant
    try {
      await smsService.sendApplicationConfirmationSMS(application);
    } catch (smsError) {
      console.error('Error sending application confirmation SMS:', smsError);
    }

    // Send SMS notification to admin
    try {
      await smsService.sendApplicationNotificationSMS(application);
    } catch (smsError) {
      console.error('Error sending application notification SMS:', smsError);
    }

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully! We will review your application and contact you within 48 hours.',
      data: {
        applicationId: application._id,
        submittedAt: application.createdAt
      }
    });

  } catch (error) {
    console.error('Application submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   GET /api/applications
// @desc    Get all applications (admin only)
// @access  Private
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { status, program } = req.query;

    let query = {};
    if (status) query.status = status;
    if (program) query.program = program;

    const applications = await Application.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Application.countDocuments(query);

    res.json({
      success: true,
      data: {
        applications,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications'
    });
  }
});

// @route   PUT /api/applications/:id/status
// @desc    Update application status and send review letter (admin only)
// @access  Private
router.put('/:id/status', async (req, res) => {
  try {
    const { status, reviewNotes } = req.body;
    const applicationId = req.params.id;

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    application.status = status;
    if (reviewNotes) {
      application.reviewNotes = reviewNotes;
    }
    application.reviewedAt = Date.now();

    await application.save();

    // Send review letter based on status
    try {
      if (status === 'accepted') {
        await emailService.sendApplicationAcceptedEmail(application);
        await smsService.sendApplicationAcceptedSMS(application);
      } else if (status === 'rejected') {
        await emailService.sendApplicationRejectedEmail(application);
        await smsService.sendApplicationRejectedSMS(application);
      } else if (status === 'waitlisted') {
        await emailService.sendApplicationWaitlistedEmail(application);
        await smsService.sendApplicationWaitlistedSMS(application);
      }
    } catch (notificationError) {
      console.error('Error sending review notifications:', notificationError);
    }

    res.json({
      success: true,
      message: 'Application status updated successfully',
      data: application
    });

  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update application status'
    });
  }
});

// @route   GET /api/applications/:id
// @desc    Get single application (admin only)
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      data: application
    });

  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch application'
    });
  }
});

module.exports = router; 