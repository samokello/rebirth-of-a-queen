const express = require('express');
const router = express.Router();
const { initiateStkPush } = require('../services/mpesa');
const Order = require('../models/Order');

// @route   POST /api/payments/initiate
// @desc    Initiate payment for an order
// @access  Public
router.post('/initiate', async (req, res) => {
  try {
    const { orderId, paymentMethod, phoneNumber } = req.body;

    if (!orderId || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Order ID and payment method are required'
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.paymentStatus === 'paid') {
      return res.status(400).json({
        success: false,
        message: 'Order is already paid'
      });
    }

    let paymentResult;

    switch (paymentMethod) {
      case 'mpesa':
        if (!phoneNumber) {
          return res.status(400).json({
            success: false,
            message: 'Phone number is required for M-Pesa payment'
          });
        }
        paymentResult = await initiateStkPush({
          amount: order.total,
          phoneNumber,
          accountReference: `ORDER_${orderId}`,
          description: 'Order Payment'
        });
        break;

      case 'stripe':
        paymentResult = await paymentService.createStripePaymentIntent(
          order.total,
          order.currency.toLowerCase(),
          { orderId: orderId.toString() }
        );
        break;

      case 'paypal':
        paymentResult = await paymentService.createPayPalOrder(
          order.total,
          order.currency === 'KES' ? 'USD' : order.currency, // PayPal doesn't support KES directly
          orderId
        );
        break;

      case 'bank':
        paymentResult = await paymentService.generateBankTransferDetails(orderId, order.total);
        break;

      default:
        return res.status(400).json({
          success: false,
          message: 'Unsupported payment method'
        });
    }

    if (!paymentResult.success) {
      return res.status(400).json({
        success: false,
        message: paymentResult.error || 'Payment initiation failed'
      });
    }

    // Store payment details in order
    order.paymentMethod = paymentMethod;
    order.transactionId = paymentResult.checkoutRequestId || paymentResult.paymentIntentId || paymentResult.orderId;
    await order.save();

    res.json({
      success: true,
      message: 'Payment initiated successfully',
      data: paymentResult
    });

  } catch (error) {
    console.error('Payment initiation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initiate payment'
    });
  }
});

// @route   POST /api/payments/verify
// @desc    Verify payment status
// @access  Public
router.post('/verify', async (req, res) => {
  try {
    const { orderId, paymentMethod, transactionId } = req.body;

    if (!orderId || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Order ID and payment method are required'
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    let verificationResult;

    switch (paymentMethod) {
      case 'mpesa':
        verificationResult = await paymentService.verifyMpesaPayment(transactionId);
        break;

      case 'stripe':
        verificationResult = await paymentService.confirmStripePayment(transactionId);
        break;

      case 'paypal':
        verificationResult = await paymentService.capturePayPalOrder(transactionId);
        break;

      case 'bank':
        // Bank transfers require manual verification
        return res.json({
          success: true,
          message: 'Bank transfer requires manual verification',
          status: 'pending',
          requiresManualVerification: true
        });

      default:
        return res.status(400).json({
          success: false,
          message: 'Unsupported payment method'
        });
    }

    if (!verificationResult.success) {
      return res.status(400).json({
        success: false,
        message: verificationResult.error || 'Payment verification failed'
      });
    }

    // Update order payment status
    const paymentStatus = verificationResult.status === 'succeeded' || 
                         verificationResult.resultCode === 0 ? 'paid' : 'pending';
    
    const updateResult = await paymentService.updateOrderPaymentStatus(
      orderId,
      paymentMethod,
      transactionId,
      paymentStatus
    );

    res.json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        paymentStatus: paymentStatus,
        order: updateResult.order
      }
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify payment'
    });
  }
});

// @route   POST /api/payments/mpesa/callback
// @desc    M-Pesa payment callback
// @access  Public
router.post('/mpesa/callback', async (req, res) => {
  try {
    const { Body } = req.body;
    const { stkCallback } = Body;

    if (!stkCallback) {
      return res.status(400).json({
        success: false,
        message: 'Invalid callback data'
      });
    }

    const { CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = stkCallback;

    // Find order by checkout request ID
    const order = await Order.findOne({ transactionId: CheckoutRequestID });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (ResultCode === 0) {
      // Payment successful
      const amount = CallbackMetadata?.Item?.find(item => item.Name === 'Amount')?.Value;
      const mpesaReceiptNumber = CallbackMetadata?.Item?.find(item => item.Name === 'MpesaReceiptNumber')?.Value;
      const transactionDate = CallbackMetadata?.Item?.find(item => item.Name === 'TransactionDate')?.Value;
      const phoneNumber = CallbackMetadata?.Item?.find(item => item.Name === 'PhoneNumber')?.Value;

      await paymentService.updateOrderPaymentStatus(
        order._id,
        'mpesa',
        mpesaReceiptNumber,
        'paid'
      );

      console.log(`M-Pesa payment successful for order ${order._id}: ${mpesaReceiptNumber}`);
    } else {
      // Payment failed
      await paymentService.updateOrderPaymentStatus(
        order._id,
        'mpesa',
        CheckoutRequestID,
        'failed'
      );

      console.log(`M-Pesa payment failed for order ${order._id}: ${ResultDesc}`);
    }

    res.json({
      success: true,
      message: 'Callback processed successfully'
    });

  } catch (error) {
    console.error('M-Pesa callback error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process callback'
    });
  }
});

// @route   GET /api/payments/methods
// @desc    Get available payment methods
// @access  Public
router.get('/methods', (req, res) => {
  try {
    const methods = [
      {
        id: 'paystack',
        name: 'Paystack',
        description: 'Cards, Bank Transfer, USSD, Mobile Money',
        icon: '💳',
        color: '#00A86B',
        available: !!(process.env.PAYSTACK_PUBLIC_KEY && process.env.PAYSTACK_SECRET_KEY),
        supported: true,
        configured: !!(process.env.PAYSTACK_PUBLIC_KEY && process.env.PAYSTACK_SECRET_KEY),
        currency: 'NGN',
        requiresEmail: true,
        requiresPhone: false
      },
      {
        id: 'mpesa',
        name: 'M-Pesa',
        description: 'Mobile Money',
        icon: '📱',
        color: '#00A86B',
        available: !!(process.env.MPESA_CONSUMER_KEY && process.env.MPESA_CONSUMER_SECRET),
        supported: true,
        configured: !!(process.env.MPESA_CONSUMER_KEY && process.env.MPESA_CONSUMER_SECRET),
        currency: 'KES',
        requiresEmail: false,
        requiresPhone: true
      },
      {
        id: 'paypal',
        name: 'PayPal',
        description: 'PayPal Account',
        icon: '🅿️',
        color: '#0070BA',
        available: !!(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET),
        supported: true,
        configured: !!(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET),
        currency: 'USD',
        requiresEmail: true,
        requiresPhone: false
      },
      {
        id: 'bank',
        name: 'Bank Transfer',
        description: 'Direct Bank Transfer',
        icon: '🏦',
        color: '#1f2937',
        available: true,
        supported: true,
        configured: true,
        currency: 'NGN',
        requiresEmail: false,
        requiresPhone: false
      }
    ];

    // Always show at least Paystack and Bank Transfer as available
    const availableMethods = methods.filter(method => 
      method.available || method.id === 'paystack' || method.id === 'bank'
    );

    res.json({
      success: true,
      data: availableMethods
    });
  } catch (error) {
    console.error('Get payment methods error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get payment methods'
    });
  }
});

// @route   POST /api/payments/initialize
// @desc    Initialize payment for donation (unified endpoint)
// @access  Public
router.post('/initialize', async (req, res) => {
  try {
    const { 
      amount, 
      paymentMethod, 
      email, 
      firstName, 
      lastName, 
      phone, 
      currency 
    } = req.body;

    console.log('Initializing payment:', { amount, paymentMethod, email, firstName, lastName, phone });

    // Validate required fields
    if (!amount || amount < 1) {
      return res.status(400).json({
        success: false,
        message: 'Valid amount is required'
      });
    }

    if (!paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Payment method is required'
      });
    }

    // Create donation record first
    const Donation = require('../models/Donation');
    const donation = new Donation({
      amount: parseFloat(amount),
      currency: currency || 'NGN',
      donorName: `${firstName || 'Anonymous'} ${lastName || 'Donor'}`,
      donorEmail: email || 'anonymous@donor.com',
      donorPhone: phone || '',
      paymentMethod: paymentMethod,
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

    // Route to appropriate payment processor
    switch (paymentMethod) {
      case 'paystack':
        return await initializePaystackPayment(req, res, donation);
      case 'mpesa':
        return await initializeMpesaPayment(req, res, donation);
      case 'paypal':
        return await initializePaypalPayment(req, res, donation);
      case 'bank':
        return await initializeBankTransfer(req, res, donation);
      default:
        return res.status(400).json({
          success: false,
          message: 'Unsupported payment method'
        });
    }

  } catch (error) {
    console.error('Payment initialization error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initialize payment',
      error: error.message
    });
  }
});

// Paystack Payment Initialization
async function initializePaystackPayment(req, res, donation) {
  try {
    if (!process.env.PAYSTACK_SECRET_KEY || process.env.PAYSTACK_SECRET_KEY === 'sk_test_your_secret_key_here') {
      return res.status(503).json({
        success: false,
        message: 'Paystack is not configured. Please add your Paystack API keys.',
        setupRequired: true
      });
    }

    const paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY);
    const { email, firstName, lastName, phone, amount, currency = 'NGN' } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required for Paystack payments'
      });
    }

    const paymentData = {
      amount: Math.round(amount * 100), // Convert to kobo
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
      donation.paymentReference = response.data.reference;
      await donation.save();

      res.json({
        success: true,
        message: 'Payment initialized successfully',
        data: {
          paymentMethod: 'paystack',
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
      message: 'Failed to initialize Paystack payment',
      error: error.message
    });
  }
}

// M-Pesa Payment Initialization
async function initializeMpesaPayment(req, res, donation) {
  try {
    if (!process.env.MPESA_CONSUMER_KEY || !process.env.MPESA_CONSUMER_SECRET) {
      return res.status(503).json({
        success: false,
        message: 'M-Pesa is not configured. Please add your M-Pesa API keys.',
        setupRequired: true
      });
    }

    const { phone, amount, firstName, lastName } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required for M-Pesa payments'
      });
    }

    if (!firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'First name and last name are required for M-Pesa payments'
      });
    }

    // Initialize M-Pesa STK Push
    const stkResponse = await initiateStkPush({
      phoneNumber: phone,
      amount: parseFloat(amount),
      accountReference: `donation_${donation._id}`,
      transactionDesc: `Donation to Rebirth of a Queen Foundation`
    });

    if (stkResponse.success) {
      donation.paymentReference = stkResponse.data.checkoutRequestId;
      await donation.save();

      res.json({
        success: true,
        message: 'M-Pesa payment initiated successfully',
        data: {
          paymentMethod: 'mpesa',
          checkoutRequestId: stkResponse.data.checkoutRequestId,
          merchantRequestId: stkResponse.data.merchantRequestId,
          customerMessage: stkResponse.data.customerMessage,
          donationId: donation._id
        }
      });
    } else {
      throw new Error(stkResponse.message || 'Failed to initialize M-Pesa payment');
    }
  } catch (error) {
    console.error('M-Pesa initialization error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initialize M-Pesa payment',
      error: error.message
    });
  }
}

// PayPal Payment Initialization
async function initializePaypalPayment(req, res, donation) {
  try {
    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
      return res.status(503).json({
        success: false,
        message: 'PayPal is not configured. Please add your PayPal API keys.',
        setupRequired: true
      });
    }

    const { amount, firstName, lastName, email, currency = 'USD' } = req.body;

    // For now, return a mock PayPal response since we don't have PayPal SDK installed
    // In production, you would implement the actual PayPal integration
    const mockOrderId = `PAYPAL_${donation._id}_${Date.now()}`;
    const mockApprovalUrl = `https://www.sandbox.paypal.com/checkoutnow?token=${mockOrderId}`;

    donation.paymentReference = mockOrderId;
    await donation.save();

    res.json({
      success: true,
      message: 'PayPal payment initialized successfully (Mock)',
      data: {
        paymentMethod: 'paypal',
        orderId: mockOrderId,
        approvalUrl: mockApprovalUrl,
        donationId: donation._id
      }
    });
  } catch (error) {
    console.error('PayPal initialization error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initialize PayPal payment',
      error: error.message
    });
  }
}

// Bank Transfer Initialization
async function initializeBankTransfer(req, res, donation) {
  try {
    // Generate bank transfer details
    const bankDetails = {
      bankName: 'Equity Bank',
      accountName: 'Rebirth of a Queen Foundation',
      accountNumber: '1234567890',
      branchCode: '001',
      swiftCode: 'EQBLKENA',
      reference: `DONATION-${donation._id.toString().slice(-8).toUpperCase()}`
    };

    donation.paymentReference = bankDetails.reference;
    donation.paymentDetails = {
      bankDetails: bankDetails,
      instructions: 'Please include the reference number in your transfer description'
    };
    await donation.save();

    res.json({
      success: true,
      message: 'Bank transfer details generated successfully',
      data: {
        paymentMethod: 'bank',
        bankDetails: bankDetails,
        instructions: [
          'Transfer the exact amount to the account details above',
          `Include reference: ${bankDetails.reference}`,
          'Send proof of payment to donations@rebirthofaqueen.org',
          'Payment will be confirmed within 24 hours'
        ],
        donationId: donation._id
      }
    });
  } catch (error) {
    console.error('Bank transfer initialization error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initialize bank transfer',
      error: error.message
    });
  }
}


// @route   POST /api/payments/webhook/paypal
// @desc    PayPal webhook handler
// @access  Public
router.post('/webhook/paypal', async (req, res) => {
  try {
    const { event_type, resource } = req.body;

    switch (event_type) {
      case 'CHECKOUT.ORDER.APPROVED':
        // Order approved, ready for capture
        console.log(`PayPal order approved: ${resource.id}`);
        break;

      case 'PAYMENT.CAPTURE.COMPLETED':
        // Payment captured successfully
        const orderId = resource.custom_id;
        if (orderId) {
          await paymentService.updateOrderPaymentStatus(
            orderId,
            'paypal',
            resource.id,
            'paid'
          );
          console.log(`PayPal payment successful for order ${orderId}: ${resource.id}`);
        }
        break;

      case 'PAYMENT.CAPTURE.DENIED':
        // Payment capture denied
        const deniedOrderId = resource.custom_id;
        if (deniedOrderId) {
          await paymentService.updateOrderPaymentStatus(
            deniedOrderId,
            'paypal',
            resource.id,
            'failed'
          );
          console.log(`PayPal payment failed for order ${deniedOrderId}: ${resource.id}`);
        }
        break;

      default:
        console.log(`Unhandled PayPal event type: ${event_type}`);
    }

    res.json({received: true});
  } catch (error) {
    console.error('PayPal webhook error:', error);
    res.status(500).json({
      success: false,
      message: 'Webhook processing failed'
    });
  }
});

module.exports = router;
