const axios = require('axios');
require('dotenv').config({ path: './server/.env' });

class MPesaDebugger {
  constructor() {
    this.consumerKey = process.env.MPESA_CONSUMER_KEY;
    this.consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    this.businessShortCode = process.env.MPESA_BUSINESS_SHORT_CODE;
    this.passkey = process.env.MPESA_PASSKEY;
    this.environment = process.env.MPESA_ENVIRONMENT || 'sandbox';
    
    this.baseURL = this.environment === 'live' 
      ? 'https://api.safaricom.co.ke' 
      : 'https://sandbox.safaricom.co.ke';
  }

  async debugMPesaConfiguration() {
    console.log('🔍 M-Pesa Configuration Debugger');
    console.log('================================');
    
    // Check environment variables
    console.log('\n📋 Environment Variables Check:');
    console.log(`✅ Consumer Key: ${this.consumerKey ? 'Set' : '❌ MISSING'}`);
    console.log(`✅ Consumer Secret: ${this.consumerSecret ? 'Set' : '❌ MISSING'}`);
    console.log(`✅ Business Short Code: ${this.businessShortCode ? 'Set' : '❌ MISSING'}`);
    console.log(`✅ Passkey: ${this.passkey ? 'Set' : '❌ MISSING'}`);
    console.log(`✅ Environment: ${this.environment}`);
    console.log(`✅ Base URL: ${this.baseURL}`);

    // Check if all required variables are set
    if (!this.consumerKey || !this.consumerSecret || !this.businessShortCode || !this.passkey) {
      console.log('\n❌ Missing required environment variables!');
      console.log('Please check your .env file and ensure all M-Pesa credentials are set.');
      return;
    }

    try {
      // Test access token
      console.log('\n🔑 Testing Access Token...');
      const accessToken = await this.getAccessToken();
      console.log('✅ Access token obtained successfully!');
      
      // Test STK Push with detailed error handling
      console.log('\n📱 Testing STK Push...');
      await this.testSTKPush(accessToken);
      
    } catch (error) {
      console.log('\n❌ Error Details:');
      console.log(`Error Type: ${error.name}`);
      console.log(`Error Message: ${error.message}`);
      
      if (error.response) {
        console.log(`Status Code: ${error.response.status}`);
        console.log(`Response Data:`, JSON.stringify(error.response.data, null, 2));
      }
      
      this.provideTroubleshootingTips(error);
    }
  }

  async getAccessToken() {
    try {
      const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
      
      const response = await axios.get(
        `${this.baseURL}/oauth/v1/generate?grant_type=client_credentials`,
        {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.access_token;
    } catch (error) {
      throw new Error(`Failed to get M-Pesa access token: ${error.response?.data?.errorMessage || error.message}`);
    }
  }

  async testSTKPush(accessToken) {
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${this.businessShortCode}${this.passkey}${timestamp}`).toString('base64');
    
    console.log(`📅 Timestamp: ${timestamp}`);
    console.log(`🔐 Password (base64): ${password.substring(0, 20)}...`);
    
    const payload = {
      BusinessShortCode: this.businessShortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: 1,
      PartyA: '254700000000',
      PartyB: this.businessShortCode,
      PhoneNumber: '254700000000',
      CallBackURL: 'https://rebirthofaqueen.org/api/mpesa/callback',
      AccountReference: 'Rebirth Queen Debug',
      TransactionDesc: 'Debug test donation'
    };

    console.log('\n📤 Request Payload:');
    console.log(JSON.stringify(payload, null, 2));

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

    console.log('\n✅ STK Push successful!');
    console.log(`📋 Checkout Request ID: ${response.data.CheckoutRequestID}`);
    console.log(`📊 Response Code: ${response.data.ResponseCode}`);
    console.log(`💬 Customer Message: ${response.data.CustomerMessage}`);
  }

  provideTroubleshootingTips(error) {
    console.log('\n🔧 Troubleshooting Tips:');
    
    if (error.message.includes('access token')) {
      console.log('1. Check your Consumer Key and Consumer Secret');
      console.log('2. Verify your Safaricom Developer account is active');
      console.log('3. Make sure your app is approved for the API you\'re using');
    }
    
    if (error.message.includes('BusinessShortCode') || error.message.includes('shortcode')) {
      console.log('1. Verify your Business Short Code is correct');
      console.log('2. Make sure your short code is active and approved');
      console.log('3. Check if your short code supports STK Push');
    }
    
    if (error.message.includes('passkey')) {
      console.log('1. Verify your passkey is correct');
      console.log('2. Make sure your passkey matches your business short code');
    }
    
    if (error.message.includes('environment')) {
      console.log('1. Check if you\'re using the right environment (live/sandbox)');
      console.log('2. Verify your credentials match the environment');
    }
    
    console.log('\n📞 Common Solutions:');
    console.log('1. Double-check all credentials in your .env file');
    console.log('2. Verify your Safaricom Developer account status');
    console.log('3. Make sure your business account is active');
    console.log('4. Check if your app has the necessary permissions');
    console.log('5. Try testing with sandbox first before going live');
  }
}

// Run the debugger
const mpesaDebugger = new MPesaDebugger();
mpesaDebugger.debugMPesaConfiguration(); 