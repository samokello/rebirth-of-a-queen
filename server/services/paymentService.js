const axios = require('axios');
const crypto = require('crypto');

class PaymentService {
  constructor() {
    this.mpesaConfig = {
      consumerKey: process.env.MPESA_CONSUMER_KEY,
      consumerSecret: process.env.MPESA_CONSUMER_SECRET,
      passkey: process.env.MPESA_PASSKEY,
      businessShortCode: process.env.MPESA_BUSINESS_SHORT_CODE,
      environment: process.env.MPESA_ENVIRONMENT || 'sandbox',
      baseUrl: process.env.MPESA_ENVIRONMENT === 'live' 
        ? 'https://api.safaricom.co.ke' 
        : 'https://sandbox.safaricom.co.ke'
    };

    this.stripeConfig = {
      secretKey: process.env.STRIPE_SECRET_KEY,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    };

    this.paypalConfig = {
      clientId: process.env.PAYPAL_CLIENT_ID,
      clientSecret: process.env.PAYPAL_CLIENT_SECRET,
      mode: process.env.PAYPAL_MODE || 'sandbox',
      baseUrl: process.env.PAYPAL_MODE === 'live' 
        ? 'https://api.paypal.com' 
        : 'https://api.sandbox.paypal.com'
    };
  }

  // M-Pesa Payment Methods
  async getMpesaAccessToken() {
    try {
      const auth = Buffer.from(`${this.mpesaConfig.consumerKey}:${this.mpesaConfig.consumerSecret}`).toString('base64');
      
      const response = await axios.get(`${this.mpesaConfig.baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
        headers: {
          'Authorization': `Basic ${auth}`
        }
      });

      return response.data.access_token;
    } catch (error) {
      console.error('M-Pesa access token error:', error.response?.data || error.message);
      throw new Error('Failed to get M-Pesa access token');
    }
  }

  async initiateMpesaPayment(phoneNumber, amount, orderId, callbackUrl) {
    try {
      const accessToken = await this.getMpesaAccessToken();
      
      const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
      const password = Buffer.from(`${this.mpesaConfig.businessShortCode}${this.mpesaConfig.passkey}${timestamp}`).toString('base64');
      
      const payload = {
        BusinessShortCode: this.mpesaConfig.businessShortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.round(amount),
        PartyA: phoneNumber.replace(/\D/g, ''), // Remove non-digits
        PartyB: this.mpesaConfig.businessShortCode,
        PhoneNumber: phoneNumber.replace(/\D/g, ''),
        CallBackURL: callbackUrl,
        AccountReference: `ORDER-${orderId}`,
        TransactionDesc: `Payment for Order ${orderId}`
      };

      const response = await axios.post(
        `${this.mpesaConfig.baseUrl}/mpesa/stkpush/v1/processrequest`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        checkoutRequestId: response.data.CheckoutRequestID,
        merchantRequestId: response.data.MerchantRequestID,
        responseCode: response.data.ResponseCode,
        responseDescription: response.data.ResponseDescription,
        customerMessage: response.data.CustomerMessage
      };
    } catch (error) {
      console.error('M-Pesa payment initiation error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.errorMessage || 'Failed to initiate M-Pesa payment'
      };
    }
  }

  async verifyMpesaPayment(checkoutRequestId) {
    try {
      const accessToken = await this.getMpesaAccessToken();
      
      const payload = {
        BusinessShortCode: this.mpesaConfig.businessShortCode,
        Password: Buffer.from(`${this.mpesaConfig.businessShortCode}${this.mpesaConfig.passkey}${new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3)}`).toString('base64'),
        Timestamp: new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3),
        CheckoutRequestID: checkoutRequestId
      };

      const response = await axios.post(
        `${this.mpesaConfig.baseUrl}/mpesa/stkpushquery/v1/query`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        resultCode: response.data.ResultCode,
        resultDesc: response.data.ResultDesc,
        merchantRequestId: response.data.MerchantRequestID,
        checkoutRequestId: response.data.CheckoutRequestID
      };
    } catch (error) {
      console.error('M-Pesa payment verification error:', error.response?.data || error.message);
      return {
        success: false,
        error: 'Failed to verify M-Pesa payment'
      };
    }
  }

  // Stripe Payment Methods
  async createStripePaymentIntent(amount, currency = 'kes', metadata = {}) {
    try {
      const stripe = require('stripe')(this.stripeConfig.secretKey);
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: currency,
        metadata: metadata,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      };
    } catch (error) {
      console.error('Stripe payment intent creation error:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async confirmStripePayment(paymentIntentId) {
    try {
      const stripe = require('stripe')(this.stripeConfig.secretKey);
      
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      return {
        success: true,
        status: paymentIntent.status,
        amount: paymentIntent.amount / 100, // Convert back from cents
        currency: paymentIntent.currency,
        paymentMethod: paymentIntent.payment_method
      };
    } catch (error) {
      console.error('Stripe payment confirmation error:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // PayPal Payment Methods
  async getPayPalAccessToken() {
    try {
      const auth = Buffer.from(`${this.paypalConfig.clientId}:${this.paypalConfig.clientSecret}`).toString('base64');
      
      const response = await axios.post(
        `${this.paypalConfig.baseUrl}/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      return response.data.access_token;
    } catch (error) {
      console.error('PayPal access token error:', error.response?.data || error.message);
      throw new Error('Failed to get PayPal access token');
    }
  }

  async createPayPalOrder(amount, currency = 'USD', orderId) {
    try {
      const accessToken = await this.getPayPalAccessToken();
      
      const payload = {
        intent: 'CAPTURE',
        purchase_units: [{
          reference_id: orderId,
          amount: {
            currency_code: currency,
            value: amount.toFixed(2)
          }
        }],
        application_context: {
          return_url: `${process.env.FRONTEND_URL}/payment/success`,
          cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`
        }
      };

      const response = await axios.post(
        `${this.paypalConfig.baseUrl}/v2/checkout/orders`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        orderId: response.data.id,
        approvalUrl: response.data.links.find(link => link.rel === 'approve')?.href
      };
    } catch (error) {
      console.error('PayPal order creation error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create PayPal order'
      };
    }
  }

  async capturePayPalOrder(paypalOrderId) {
    try {
      const accessToken = await this.getPayPalAccessToken();
      
      const response = await axios.post(
        `${this.paypalConfig.baseUrl}/v2/checkout/orders/${paypalOrderId}/capture`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        status: response.data.status,
        amount: response.data.purchase_units[0].payments.captures[0].amount.value,
        currency: response.data.purchase_units[0].payments.captures[0].amount.currency_code,
        transactionId: response.data.purchase_units[0].payments.captures[0].id
      };
    } catch (error) {
      console.error('PayPal order capture error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to capture PayPal order'
      };
    }
  }

  // Bank Transfer (Manual verification)
  async generateBankTransferDetails(orderId, amount) {
    const bankDetails = {
      bankName: 'Equity Bank Kenya',
      accountName: 'Rebirth of a Queen',
      accountNumber: '1234567890',
      branchCode: '001',
      swiftCode: 'EQBLKENA',
      reference: `ORDER-${orderId}`,
      amount: amount,
      currency: 'KES',
      instructions: [
        'Include the order reference in the transfer description',
        'Send proof of payment to payments@rebirthofaqueen.org',
        'Payment will be verified within 24 hours',
        'Order will be processed after payment confirmation'
      ]
    };

    return {
      success: true,
      bankDetails: bankDetails
    };
  }

  // Payment verification and status update
  async updateOrderPaymentStatus(orderId, paymentMethod, transactionId, status) {
    try {
      const Order = require('../models/Order');
      
      const updateData = {
        paymentStatus: status,
        transactionId: transactionId,
        paymentDate: new Date()
      };

      if (status === 'paid') {
        updateData.status = 'confirmed';
      }

      const order = await Order.findByIdAndUpdate(
        orderId,
        updateData,
        { new: true }
      );

      return {
        success: true,
        order: order
      };
    } catch (error) {
      console.error('Order payment status update error:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get payment method configuration
  getPaymentMethodConfig(method) {
    const configs = {
      mpesa: {
        name: 'M-Pesa',
        icon: 'mobile',
        color: '#00A86B',
        description: 'Pay with M-Pesa mobile money',
        supported: true,
        requiresPhone: true
      },
      stripe: {
        name: 'Credit/Debit Card',
        icon: 'credit-card',
        color: '#635BFF',
        description: 'Visa, Mastercard, American Express',
        supported: !!this.stripeConfig.secretKey,
        requiresCard: true
      },
      paypal: {
        name: 'PayPal',
        icon: 'paypal',
        color: '#0070BA',
        description: 'Pay with your PayPal account',
        supported: !!this.paypalConfig.clientId,
        requiresAccount: true
      },
      bank: {
        name: 'Bank Transfer',
        icon: 'university',
        color: '#1E3A8A',
        description: 'Direct bank transfer',
        supported: true,
        requiresManualVerification: true
      }
    };

    return configs[method] || null;
  }
}

module.exports = new PaymentService();
