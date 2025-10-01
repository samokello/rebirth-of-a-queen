const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY);

// @route   POST /api/paystack/initialize
// @desc    Initialize Paystack payment for donation
// @access  Public
router.post('/initialize', async (req, res) => {
  try {
    console.log('Initializing Paystack payment with data:', req.body);
    
    // Check if Paystack is configured
    if (!process.env.PAYSTACK_SECRET_KEY || process.env.PAYSTACK_SECRET_KEY === 'sk_test_your_secret_key_here') {
      console.log('Paystack is not configured');
      return res.status(503).json({
        success: false,
        message: 'Paystack is not configured. Please add your Paystack API keys to the environment variables. See PAYSTACK_SETUP_GUIDE.md for instructions.',
        setupRequired: true
      });
    }

    const { amount, email, firstName, lastName, phone, currency = 'NGN' } = req.body;

    // Validate required fields
    if (!amount || amount < 1) {
      console.log('Invalid amount:', amount);
      return res.status(400).json({
        success: false,
        message: 'Valid amount is required'
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required for Paystack payments'
      });
    }

    // Create donation record first
    const donation = new Donation({
      amount: parseFloat(amount),
      currency: currency,
      donorName: `${firstName || 'Anonymous'} ${lastName || 'Donor'}`,
      donorEmail: email,
      donorPhone: phone || '',
      paymentMethod: 'paystack',
      paymentStatus: 'pending',
      type: 'donation',
      metadata: {
        firstName: firstName || 'Anonymous',
        lastName: lastName || 'Donor',
        phone: phone || '',
        source: 'website'
      }
    });

    await donation.save();
    console.log('Donation record created:', donation._id);

    // Initialize Paystack payment
    const paymentData = {
      amount: Math.round(amount * 100), // Convert to kobo (smallest currency unit)
      email: email,
      currency: currency,
      reference: `donation_${donation._id}_${Date.now()}`,
      metadata: {
        donationId: donation._id.toString(),
        firstName: firstName || 'Anonymous',
        lastName: lastName || 'Donor',
        phone: phone || '',
        type: 'donation'
      },
      callback_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/donate?payment=success`,
      channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer']
    };

    const response = await paystack.transaction.initialize(paymentData);
    
    if (response.status) {
      // Update donation with Paystack reference
      donation.paymentReference = response.data.reference;
      await donation.save();

      res.json({
        success: true,
        message: 'Payment initialized successfully',
        data: {
          authorizationUrl: response.data.authorization_url,
          accessCode: response.data.access_code,
          reference: response.data.reference,
          donationId: donation._id
        }
      });
    } else {
      throw new Error(response.message || 'Failed to initialize payment');
    }

  } catch (error) {
    console.error('Paystack initialization error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initialize payment',
      error: error.message
    });
  }
});

// @route   POST /api/paystack/verify
// @desc    Verify Paystack payment
// @access  Public
router.post('/verify', async (req, res) => {
  try {
    const { reference } = req.body;

    if (!reference) {
      return res.status(400).json({
        success: false,
        message: 'Payment reference is required'
      });
    }

    // Verify payment with Paystack
    const response = await paystack.transaction.verify(reference);
    
    if (response.status && response.data.status === 'success') {
      // Find and update donation record
      const donation = await Donation.findOne({ paymentReference: reference });
      
      if (donation) {
        donation.paymentStatus = 'completed';
        donation.paymentDetails = {
          paystackReference: reference,
          amountPaid: response.data.amount / 100, // Convert from kobo
          currency: response.data.currency,
          paidAt: new Date(response.data.paid_at),
          channel: response.data.channel,
          gatewayResponse: response.data.gateway_response
        };
        
        await donation.save();
        console.log('Donation payment verified and updated:', donation._id);

        res.json({
          success: true,
          message: 'Payment verified successfully',
          data: {
            donationId: donation._id,
            amount: donation.amount,
            currency: donation.currency,
            status: 'completed'
          }
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Donation record not found'
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed',
        data: response.data
      });
    }

  } catch (error) {
    console.error('Paystack verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify payment',
      error: error.message
    });
  }
});

// @route   GET /api/paystack/config
// @desc    Get Paystack configuration for frontend
// @access  Public
router.get('/config', (req, res) => {
  // Check if Paystack is configured
  if (!process.env.PAYSTACK_PUBLIC_KEY || process.env.PAYSTACK_PUBLIC_KEY === 'pk_test_your_public_key_here') {
    return res.status(503).json({
      success: false,
      message: 'Paystack is not configured. Please add your Paystack public key to the environment variables.',
      setupRequired: true
    });
  }

  res.json({
    success: true,
    data: {
      publicKey: process.env.PAYSTACK_PUBLIC_KEY,
      currency: 'NGN',
      supportedCurrencies: ['NGN', 'GHS', 'ZAR', 'KES', 'USD'],
      supportedChannels: [
        'card',
        'bank',
        'ussd',
        'qr',
        'mobile_money',
        'bank_transfer'
      ]
    }
  });
});

// @route   POST /api/paystack/webhook
// @desc    Paystack webhook handler
// @access  Public
router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  try {
    const hash = req.headers['x-paystack-signature'];
    const secret = process.env.PAYSTACK_SECRET_KEY;
    
    // Verify webhook signature
    const crypto = require('crypto');
    const hashCheck = crypto.createHmac('sha512', secret).update(req.body).digest('hex');
    
    if (hash !== hashCheck) {
      console.error('Invalid webhook signature');
      return res.status(400).send('Invalid signature');
    }

    const event = JSON.parse(req.body);
    console.log('Paystack webhook received:', event.event);

    // Handle the event
    switch (event.event) {
      case 'charge.success':
        const paymentData = event.data;
        const reference = paymentData.reference;
        
        // Find and update donation record
        const donation = await Donation.findOne({ paymentReference: reference });
        
        if (donation) {
          donation.paymentStatus = 'completed';
          donation.paymentDetails = {
            paystackReference: reference,
            amountPaid: paymentData.amount / 100,
            currency: paymentData.currency,
            paidAt: new Date(paymentData.paid_at),
            channel: paymentData.channel,
            gatewayResponse: paymentData.gateway_response
          };
          
          await donation.save();
          console.log(`Paystack payment successful for donation ${donation._id}: ${reference}`);
        }
        break;

      case 'charge.failed':
        const failedPayment = event.data;
        const failedReference = failedPayment.reference;
        
        // Find and update donation record
        const failedDonation = await Donation.findOne({ paymentReference: failedReference });
        
        if (failedDonation) {
          failedDonation.paymentStatus = 'failed';
          await failedDonation.save();
          console.log(`Paystack payment failed for donation ${failedDonation._id}: ${failedReference}`);
        }
        break;

      default:
        console.log(`Unhandled Paystack event type: ${event.event}`);
    }

    res.json({received: true});
  } catch (error) {
    console.error('Paystack webhook error:', error);
    res.status(500).json({
      success: false,
      message: 'Webhook processing failed'
    });
  }
});

module.exports = router;
