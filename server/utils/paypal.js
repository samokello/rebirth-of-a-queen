const axios = require('axios');

class PayPalService {
  constructor() {
    this.clientId = process.env.PAYPAL_CLIENT_ID;
    this.clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    this.mode = process.env.PAYPAL_MODE || 'live'; // Changed to live by default
    
    this.baseURL = this.mode === 'live' 
      ? 'https://api-m.paypal.com' 
      : 'https://api-m.sandbox.paypal.com';
    
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  // Get access token
  async getAccessToken() {
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
      
      const response = await axios.post(
        `${this.baseURL}/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000) - 60000; // 1 minute buffer
      
      return this.accessToken;
    } catch (error) {
      console.error('PayPal access token error:', error.response?.data || error.message);
      throw new Error('Failed to get PayPal access token');
    }
  }

  // Create PayPal order
  async createOrder(amount, currency = 'USD', description = 'Donation to Rebirth of a Queen') {
    try {
      const accessToken = await this.getAccessToken();

      const payload = {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount.toString()
            },
            description: description,
            custom_id: `donation_${Date.now()}`
          }
        ],
        application_context: {
          return_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/donate/success`,
          cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/donate/cancel`
        }
      };

      const response = await axios.post(
        `${this.baseURL}/v2/checkout/orders`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          }
        }
      );

      return {
        success: true,
        orderId: response.data.id,
        status: response.data.status,
        links: response.data.links
      };

    } catch (error) {
      console.error('PayPal create order error:', error.response?.data || error.message);
      throw new Error('Failed to create PayPal order');
    }
  }

  // Capture PayPal payment
  async capturePayment(orderId) {
    try {
      const accessToken = await this.getAccessToken();

      const response = await axios.post(
        `${this.baseURL}/v2/checkout/orders/${orderId}/capture`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          }
        }
      );

      const capture = response.data.purchase_units[0].payments.captures[0];

      return {
        success: true,
        captureId: capture.id,
        status: capture.status,
        amount: capture.amount.value,
        currency: capture.amount.currency_code,
        transactionId: capture.id,
        createTime: capture.create_time
      };

    } catch (error) {
      console.error('PayPal capture payment error:', error.response?.data || error.message);
      throw new Error('Failed to capture PayPal payment');
    }
  }

  // Get order details
  async getOrder(orderId) {
    try {
      const accessToken = await this.getAccessToken();

      const response = await axios.get(
        `${this.baseURL}/v2/checkout/orders/${orderId}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        order: response.data
      };

    } catch (error) {
      console.error('PayPal get order error:', error.response?.data || error.message);
      throw new Error('Failed to get PayPal order details');
    }
  }

  // Verify webhook signature
  verifyWebhookSignature(body, headers) {
    // This is a simplified verification
    // In production, you should implement proper webhook signature verification
    // using PayPal's webhook verification SDK
    return true;
  }
}

module.exports = new PayPalService(); 