const axios = require('axios');
const crypto = require('crypto');

class MPesaService {
  constructor() {
    this.consumerKey = process.env.MPESA_CONSUMER_KEY;
    this.consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    this.passkey = process.env.MPESA_PASSKEY;
    this.businessShortCode = process.env.MPESA_BUSINESS_SHORT_CODE;
    // Default to sandbox for safer testing; set MPESA_ENVIRONMENT=live for production
    this.environment = process.env.MPESA_ENVIRONMENT || 'sandbox';
    
    this.baseURL = this.environment === 'live' 
      ? 'https://api.safaricom.co.ke' 
      : 'https://sandbox.safaricom.co.ke';
    
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  // Get access token
  async getAccessToken() {
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
      
      const response = await axios.get(`${this.baseURL}/oauth/v1/generate?grant_type=client_credentials`, {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        }
      });

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000) - 60000; // 1 minute buffer
      
      return this.accessToken;
    } catch (error) {
      console.error('M-Pesa access token error:', error.response?.data || error.message);
      throw new Error('Failed to get M-Pesa access token');
    }
  }

  // Generate timestamp (YYYYMMDDHHMMSS) and password for STK Push
  generatePassword() {
    const d = new Date();
    const yyyy = d.getFullYear().toString();
    const MM = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    const timestamp = `${yyyy}${MM}${dd}${hh}${mm}${ss}`;
    const password = Buffer.from(`${this.businessShortCode}${this.passkey}${timestamp}`).toString('base64');
    return { password, timestamp };
  }

  // Initiate STK Push
  async initiateSTKPush(phoneNumber, amount, reference) {
    try {
      const accessToken = await this.getAccessToken();
      const { password, timestamp } = this.generatePassword();
      
      // Format phone number (remove + and add 254 if needed)
      let formattedPhone = phoneNumber.replace(/\+/g, '');
      if (formattedPhone.startsWith('0')) {
        formattedPhone = '254' + formattedPhone.substring(1);
      } else if (formattedPhone.startsWith('254')) {
        formattedPhone = formattedPhone;
      } else {
        formattedPhone = '254' + formattedPhone;
      }

      const payload = {
        BusinessShortCode: this.businessShortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.round(amount),
        PartyA: formattedPhone,
        PartyB: this.businessShortCode,
        PhoneNumber: formattedPhone,
        CallBackURL: process.env.MPESA_CALLBACK_URL || 'https://c2095e83a84d.ngrok-free.app/api/mpesa/callback',
        AccountReference: reference,
        TransactionDesc: 'Donation to Rebirth of a Queen'
      };

      const response = await axios.post(
        `${this.baseURL}/mpesa/stkpush/v1/processrequest`,
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
      console.error('M-Pesa STK Push error:', error.response?.data || error.message);
      
      // Provide more specific error messages
      let errorMessage = 'Failed to initiate M-Pesa payment';
      
      if (error.response?.data?.errorMessage) {
        errorMessage = error.response.data.errorMessage;
      } else if (error.response?.data?.errorCode) {
        errorMessage = `M-Pesa Error ${error.response.data.errorCode}: ${error.response.data.errorMessage || 'Unknown error'}`;
      } else if (error.response?.status === 401) {
        errorMessage = 'Authentication failed. Please check your M-Pesa credentials.';
      } else if (error.response?.status === 403) {
        errorMessage = 'Access denied. Please check your M-Pesa permissions.';
      } else if (error.response?.status === 404) {
        errorMessage = 'M-Pesa service not found. Please check your configuration.';
      } else if (error.response?.status >= 500) {
        errorMessage = 'M-Pesa service temporarily unavailable. Please try again later.';
      }
      
      throw new Error(errorMessage);
    }
  }

  // Check STK Push status
  async checkSTKPushStatus(checkoutRequestId) {
    try {
      const accessToken = await this.getAccessToken();
      const { password, timestamp } = this.generatePassword();

      const payload = {
        BusinessShortCode: this.businessShortCode,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestId
      };

      const response = await axios.post(
        `${this.baseURL}/mpesa/stkpushquery/v1/query`,
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
        checkoutRequestId: response.data.CheckoutRequestID,
        merchantRequestId: response.data.MerchantRequestID
      };

    } catch (error) {
      console.error('M-Pesa STK Push status check error:', error.response?.data || error.message);
      throw new Error('Failed to check M-Pesa payment status');
    }
  }

  // Verify callback signature
  verifyCallback(data, signature) {
    const expectedSignature = crypto
      .createHmac('sha256', this.passkey)
      .update(JSON.stringify(data))
      .digest('hex');
    
    return signature === expectedSignature;
  }
}

module.exports = new MPesaService(); 