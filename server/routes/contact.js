const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const emailService = require('../services/emailService');
const smsService = require('../services/smsService');

// @route   POST /api/contact
// @desc    Submit a contact form
// @access  Public
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message,
      phone,
      source = 'contact'
    } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Create contact record
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      phone,
      source,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await contact.save();

    // Send confirmation email to the contact
    try {
      await emailService.sendContactConfirmationEmail(contact);
    } catch (emailError) {
      console.error('Error sending contact confirmation email:', emailError);
    }

    // Send notification email to admin
    try {
      await emailService.sendContactNotificationEmail(contact);
    } catch (emailError) {
      console.error('Error sending contact notification email:', emailError);
    }

    // Send SMS notification to admin if phone is provided
    if (phone) {
      try {
        await smsService.sendContactNotificationSMS(contact);
      } catch (smsError) {
        console.error('Error sending contact notification SMS:', smsError);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully. We will get back to you soon!',
      data: {
        contactId: contact._id,
        submittedAt: contact.createdAt
      }
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contact submissions (admin only)
// @access  Private
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Contact.countDocuments();

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
});

// @route   PUT /api/contact/:id/status
// @desc    Update contact status (admin only)
// @access  Private
router.put('/:id/status', async (req, res) => {
  try {
    const { status, reviewNotes } = req.body;
    const contactId = req.params.id;

    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    contact.status = status;
    if (reviewNotes) {
      contact.reviewNotes = reviewNotes;
    }

    await contact.save();

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact status'
    });
  }
});

module.exports = router; 