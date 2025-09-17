const express = require('express');
const router = express.Router();
const paypalService = require('../utils/paypal');
const Donation = require('../models/Donation');

// @route   POST /api/paypal/create-order
// @desc    Create PayPal order
// @access  Public
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency, donationId, description } = req.body;

    // Validate required fields
    if (!amount || !donationId) {
      return res.status(400).json({
        success: false,
        message: 'Amount and donation ID are required'
      });
    }

    // Find the donation
    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    // Check if donation is already processed
    if (donation.paymentStatus === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Donation has already been processed'
      });
    }

    // Create PayPal order
    const orderResponse = await paypalService.createOrder(
      amount,
      currency || 'USD',
      description || 'Donation to Rebirth of a Queen'
    );

    // Update donation with PayPal order ID
    donation.paypalOrderId = orderResponse.orderId;
    donation.paymentStatus = 'pending';
    await donation.save();

    res.json({
      success: true,
      message: 'PayPal order created successfully',
      data: {
        orderId: orderResponse.orderId,
        status: orderResponse.status,
        links: orderResponse.links
      }
    });

  } catch (error) {
    console.error('PayPal create order error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create PayPal order'
    });
  }
});

// @route   POST /api/paypal/capture-payment
// @desc    Capture PayPal payment
// @access  Public
router.post('/capture-payment', async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required'
      });
    }

    // Find donation by PayPal order ID
    const donation = await Donation.findOne({ paypalOrderId: orderId });

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    // Capture payment with PayPal
    const captureResponse = await paypalService.capturePayment(orderId);

    // Update donation
    donation.paymentStatus = 'completed';
    donation.transactionId = captureResponse.captureId;
    donation.updatedAt = new Date();
    await donation.save();

    console.log(`PayPal payment completed for donation ${donation._id}: ${captureResponse.captureId}`);

    // Send thank you communications
    try {
      const emailService = require('../services/emailService');
      const smsService = require('../services/smsService');

      // Send thank you email
      await emailService.sendDonationThankYouEmail(donation);
      
      // Send donation receipt
      await emailService.sendDonationReceipt(donation);
      
      // Send admin notification
      await emailService.sendAdminNotification(donation);
      
      // Send thank you SMS if phone number is provided
      if (donation.phone) {
        await smsService.sendDonationThankYouSMS(donation);
        await smsService.sendDonationReceiptSMS(donation);
      }
      
      // Send admin notification SMS
      await smsService.sendAdminNotificationSMS(donation);
      
      console.log('All thank you communications sent successfully');
    } catch (error) {
      console.error('Error sending thank you communications:', error);
      // Don't fail the payment if communications fail
    }

    res.json({
      success: true,
      message: 'Payment captured successfully',
      data: {
        captureId: captureResponse.captureId,
        status: captureResponse.status,
        amount: captureResponse.amount,
        currency: captureResponse.currency,
        transactionId: captureResponse.transactionId
      }
    });

  } catch (error) {
    console.error('PayPal capture payment error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to capture payment'
    });
  }
});

// @route   POST /api/paypal/webhook
// @desc    Handle PayPal webhooks
// @access  Public
router.post('/webhook', async (req, res) => {
  try {
    const webhookData = req.body;

    console.log('PayPal Webhook received:', JSON.stringify(webhookData, null, 2));

    // Verify webhook signature (implement proper verification)
    // const signature = req.headers['paypal-transmission-sig'];
    // if (!paypalService.verifyWebhookSignature(webhookData, req.headers)) {
    //   return res.status(400).json({ success: false, message: 'Invalid signature' });
    // }

    const eventType = webhookData.event_type;
    const resource = webhookData.resource;

    if (eventType === 'PAYMENT.CAPTURE.COMPLETED') {
      // Payment completed
      const captureId = resource.id;
      const orderId = resource.supplementary_data?.related_ids?.order_id;

      if (orderId) {
        const donation = await Donation.findOne({ paypalOrderId: orderId });

        if (donation && donation.paymentStatus !== 'completed') {
          donation.paymentStatus = 'completed';
          donation.transactionId = captureId;
          donation.updatedAt = new Date();
          await donation.save();

          console.log(`PayPal webhook: Payment completed for donation ${donation._id}: ${captureId}`);

          // TODO: Send confirmation email
          // await sendDonationConfirmationEmail(donation);
        }
      }
    } else if (eventType === 'PAYMENT.CAPTURE.DENIED') {
      // Payment denied
      const orderId = resource.supplementary_data?.related_ids?.order_id;

      if (orderId) {
        const donation = await Donation.findOne({ paypalOrderId: orderId });

        if (donation) {
          donation.paymentStatus = 'failed';
          await donation.save();

          console.log(`PayPal webhook: Payment denied for donation ${donation._id}`);
        }
      }
    }

    res.json({ success: true });

  } catch (error) {
    console.error('PayPal webhook error:', error);
    res.status(500).json({ success: false, message: 'Webhook processing failed' });
  }
});

// @route   GET /api/paypal/order/:orderId
// @desc    Get PayPal order details
// @access  Public
router.get('/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    const orderDetails = await paypalService.getOrder(orderId);

    res.json({
      success: true,
      data: orderDetails.order
    });

  } catch (error) {
    console.error('Get PayPal order error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get order details'
    });
  }
});

// @route   GET /api/paypal/config
// @desc    Get PayPal configuration for frontend
// @access  Public
router.get('/config', (req, res) => {
  res.json({
    success: true,
          data: {
        clientId: process.env.PAYPAL_CLIENT_ID,
        mode: process.env.PAYPAL_MODE || 'live',
        currency: 'USD'
      }
  });
});

module.exports = router; 