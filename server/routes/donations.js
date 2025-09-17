const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

// @route   POST /api/donations
// @desc    Create a new donation
// @access  Public
router.post('/', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      address1,
      address2,
      city,
      state,
      postal,
      country,
      amount,
      currency,
      paymentMethod,
      tributeType,
      tributeName,
      customTributeName,
      newsletter,
      recurring,
      donorPays
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !amount || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Create donation record
    const donation = new Donation({
      firstName,
      lastName,
      email,
      phone,
      address1,
      address2,
      city,
      state,
      postal,
      country,
      amount: parseFloat(amount),
      currency: currency || 'USD',
      paymentMethod,
      tributeType,
      tributeName,
      customTributeName,
      newsletter: newsletter || false,
      recurring: recurring || false,
      donorPays: donorPays || false,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await donation.save();

    res.status(201).json({
      success: true,
      message: 'Donation created successfully',
      data: {
        donationId: donation._id,
        amount: donation.getFormattedAmount(),
        paymentMethod,
        status: donation.paymentStatus
      }
    });

  } catch (error) {
    console.error('Create donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create donation',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   GET /api/donations
// @desc    Get all donations (with pagination)
// @access  Private (should be protected in production)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const donations = await Donation.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const total = await Donation.countDocuments();
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: donations,
      pagination: {
        currentPage: page,
        totalPages,
        totalDonations: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });

  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch donations'
    });
  }
});

// @route   GET /api/donations/:id
// @desc    Get donation by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).select('-__v');

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    res.json({
      success: true,
      data: donation
    });

  } catch (error) {
    console.error('Get donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch donation'
    });
  }
});

// @route   PUT /api/donations/:id
// @desc    Update donation status
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { paymentStatus, transactionId, paypalOrderId, mpesaCheckoutRequestId } = req.body;

    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    // Update fields
    if (paymentStatus) donation.paymentStatus = paymentStatus;
    if (transactionId) donation.transactionId = transactionId;
    if (paypalOrderId) donation.paypalOrderId = paypalOrderId;
    if (mpesaCheckoutRequestId) donation.mpesaCheckoutRequestId = mpesaCheckoutRequestId;

    await donation.save();

    res.json({
      success: true,
      message: 'Donation updated successfully',
      data: donation
    });

  } catch (error) {
    console.error('Update donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update donation'
    });
  }
});

// @route   GET /api/donations/stats/summary
// @desc    Get donation statistics
// @access  Private
router.get('/stats/summary', async (req, res) => {
  try {
    const totalDonations = await Donation.countDocuments();
    const totalAmount = await Donation.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const monthlyStats = await Donation.aggregate([
      { $match: { paymentStatus: 'completed' } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 },
          amount: { $sum: '$amount' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);

    const paymentMethodStats = await Donation.aggregate([
      { $match: { paymentStatus: 'completed' } },
      {
        $group: {
          _id: '$paymentMethod',
          count: { $sum: 1 },
          amount: { $sum: '$amount' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        totalDonations,
        totalAmount: totalAmount[0]?.total || 0,
        monthlyStats,
        paymentMethodStats
      }
    });

  } catch (error) {
    console.error('Get donation stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch donation statistics'
    });
  }
});

module.exports = router; 