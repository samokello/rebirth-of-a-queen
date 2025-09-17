const express = require('express');
const router = express.Router();
const paymentService = require('../services/paymentService');
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
    const methods = ['mpesa', 'stripe', 'paypal', 'bank'];
    const availableMethods = methods.map(method => ({
      id: method,
      ...paymentService.getPaymentMethodConfig(method)
    })).filter(method => method.supported);

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

// @route   POST /api/payments/webhook/stripe
// @desc    Stripe webhook handler
// @access  Public
router.post('/webhook/stripe', express.raw({type: 'application/json'}), async (req, res) => {
  try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        const orderId = paymentIntent.metadata.orderId;
        
        if (orderId) {
          await paymentService.updateOrderPaymentStatus(
            orderId,
            'stripe',
            paymentIntent.id,
            'paid'
          );
          console.log(`Stripe payment successful for order ${orderId}: ${paymentIntent.id}`);
        }
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        const failedOrderId = failedPayment.metadata.orderId;
        
        if (failedOrderId) {
          await paymentService.updateOrderPaymentStatus(
            failedOrderId,
            'stripe',
            failedPayment.id,
            'failed'
          );
          console.log(`Stripe payment failed for order ${failedOrderId}: ${failedPayment.id}`);
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({received: true});
  } catch (error) {
    console.error('Stripe webhook error:', error);
    res.status(500).json({
      success: false,
      message: 'Webhook processing failed'
    });
  }
});

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
