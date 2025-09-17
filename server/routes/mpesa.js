const express = require('express');
const router = express.Router();
const mpesaService = require('../utils/mpesa');
const Donation = require('../models/Donation');

// @route   POST /api/mpesa/stk-push
// @desc    Initiate M-Pesa STK Push
// @access  Public
router.post('/stk-push', async (req, res) => {
  try {
    const { phoneNumber, amount, donationId } = req.body;

    // Validate required fields
    if (!phoneNumber || !amount || !donationId) {
      return res.status(400).json({
        success: false,
        message: 'Phone number, amount, and donation ID are required'
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

    // Initiate STK Push
    const stkResponse = await mpesaService.initiateSTKPush(
      phoneNumber,
      amount,
      donationId
    );

    // Update donation with M-Pesa request IDs
    donation.mpesaCheckoutRequestId = stkResponse.checkoutRequestId;
    donation.mpesaMerchantRequestId = stkResponse.merchantRequestId;
    donation.paymentStatus = 'pending';
    await donation.save();

    res.json({
      success: true,
      message: 'M-Pesa STK Push initiated successfully',
      data: {
        checkoutRequestId: stkResponse.checkoutRequestId,
        merchantRequestId: stkResponse.merchantRequestId,
        customerMessage: stkResponse.customerMessage,
        responseDescription: stkResponse.responseDescription
      }
    });

  } catch (error) {
    console.error('M-Pesa STK Push error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to initiate M-Pesa payment'
    });
  }
});

// @route   POST /api/mpesa/callback
// @desc    Handle M-Pesa callback
// @access  Public
router.post('/callback', async (req, res) => {
  try {
    const callbackData = req.body;

    console.log('M-Pesa Callback received:', JSON.stringify(callbackData, null, 2));

    // Verify callback signature (implement proper verification)
    // const signature = req.headers['x-mpesa-signature'];
    // if (!mpesaService.verifyCallback(callbackData, signature)) {
    //   return res.status(400).json({ success: false, message: 'Invalid signature' });
    // }

    // Extract relevant data
    const {
      Body: {
        stkCallback: {
          CheckoutRequestID: checkoutRequestId,
          ResultCode: resultCode,
          ResultDesc: resultDesc,
          CallbackMetadata
        }
      }
    } = callbackData;

    // Find donation by checkout request ID
    const donation = await Donation.findOne({ mpesaCheckoutRequestId: checkoutRequestId });

    if (!donation) {
      console.error('Donation not found for checkout request ID:', checkoutRequestId);
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }

    if (resultCode === 0) {
      // Payment successful
      const metadata = CallbackMetadata?.Item || [];
      
      let transactionId = '';
      let amount = 0;
      let mpesaReceiptNumber = '';

      // Extract transaction details from metadata
      metadata.forEach(item => {
        if (item.Name === 'TransactionID') {
          transactionId = item.Value;
        } else if (item.Name === 'Amount') {
          amount = item.Value;
        } else if (item.Name === 'MpesaReceiptNumber') {
          mpesaReceiptNumber = item.Value;
        }
      });

      // Update donation
      donation.paymentStatus = 'completed';
      donation.transactionId = transactionId;
      donation.updatedAt = new Date();
      await donation.save();

      console.log(`Payment completed for donation ${donation._id}: ${transactionId}`);

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

    } else {
      // Payment failed
      donation.paymentStatus = 'failed';
      await donation.save();

      console.log(`Payment failed for donation ${donation._id}: ${resultDesc}`);
    }

    // Respond to M-Pesa
    res.json({
      ResultCode: 0,
      ResultDesc: 'Success'
    });

  } catch (error) {
    console.error('M-Pesa callback error:', error);
    res.status(500).json({
      ResultCode: 1,
      ResultDesc: 'Failed to process callback'
    });
  }
});

// @route   POST /api/mpesa/check-status
// @desc    Check STK Push status
// @access  Public
router.post('/check-status', async (req, res) => {
  try {
    const { checkoutRequestId } = req.body;

    if (!checkoutRequestId) {
      return res.status(400).json({
        success: false,
        message: 'Checkout request ID is required'
      });
    }

    // Check status with M-Pesa
    const statusResponse = await mpesaService.checkSTKPushStatus(checkoutRequestId);

    // Find donation
    const donation = await Donation.findOne({ mpesaCheckoutRequestId: checkoutRequestId });

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    // Update donation status based on M-Pesa response
    if (statusResponse.resultCode === 0) {
      donation.paymentStatus = 'completed';
    } else if (statusResponse.resultCode === 1032) {
      donation.paymentStatus = 'cancelled';
    } else {
      donation.paymentStatus = 'failed';
    }

    await donation.save();

    res.json({
      success: true,
      data: {
        status: donation.paymentStatus,
        resultCode: statusResponse.resultCode,
        resultDesc: statusResponse.resultDesc
      }
    });

  } catch (error) {
    console.error('Check M-Pesa status error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to check payment status'
    });
  }
});

// @route   GET /api/mpesa/config
// @desc    Get M-Pesa configuration for frontend
// @access  Public
router.get('/config', (req, res) => {
  res.json({
    success: true,
    data: {
      businessShortCode: process.env.MPESA_BUSINESS_SHORT_CODE,
      environment: process.env.MPESA_ENVIRONMENT,
      tillNumber: '5914787', // Your till number
      businessName: 'REBIRTH OF A QUEEN'
    }
  });
});

module.exports = router; 