const axios = require('axios');
require('dotenv').config({ path: './server/.env' });

class MPesaLiveTest {
  constructor() {
    this.consumerKey = process.env.MPESA_CONSUMER_KEY;
    this.consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    this.businessShortCode = process.env.MPESA_BUSINESS_SHORT_CODE;
    this.passkey = process.env.MPESA_PASSKEY;
    this.environment = process.env.MPESA_ENVIRONMENT || 'live';
    
    this.baseURL = this.environment === 'live' 
      ? 'https://api.safaricom.co.ke' 
      : 'https://sandbox.safaricom.co.ke';
  }

  async getAccessToken() {
    try {
      const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
      
      const response = await axios.get(
        `${this.baseURL}/oauth/v1/generate?grant_type=client_credentials`,
        {
          headers: {
            'Authorization': `Basic ${auth}`
          }
        }
      );

      return response.data.access_token;
    } catch (error) {
      throw new Error(`Failed to get M-Pesa access token: ${error.response?.data?.errorMessage || error.message}`);
    }
  }

  async testMPesaLiveConnection() {
    console.log('🧪 Testing M-Pesa LIVE configuration...');
    console.log(`📡 Environment: ${this.environment}`);
    console.log(`🔗 Base URL: ${this.baseURL}`);
    console.log(`🏢 Business Short Code: ${this.businessShortCode}`);
    console.log('⚠️  This will use REAL M-Pesa credentials!');
    
    try {
      // Test getting access token
      const accessToken = await this.getAccessToken();
      console.log('✅ M-Pesa LIVE access token obtained successfully!');
      
      // Test STK Push (simulate payment request) - Small amount for testing
      const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
      const password = Buffer.from(`${this.businessShortCode}${this.passkey}${timestamp}`).toString('base64');
      
      const stkPushResponse = await axios.post(
        `${this.baseURL}/mpesa/stkpush/v1/processrequest`,
        {
          BusinessShortCode: this.businessShortCode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: 1, // Small test amount (1 KES)
          PartyA: '254740844942', // Your phone number from .env
          PartyB: this.businessShortCode,
          PhoneNumber: '254740844942',
          CallBackURL: 'https://rebirthofaqueen.org/api/mpesa/callback',
          AccountReference: 'Rebirth Queen Test',
          TransactionDesc: 'Test donation (LIVE)'
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('✅ M-Pesa LIVE STK Push test successful!');
      console.log(`📋 Checkout Request ID: ${stkPushResponse.data.CheckoutRequestID}`);
      console.log(`📊 Response Code: ${stkPushResponse.data.ResponseCode}`);
      console.log(`💬 Customer Message: ${stkPushResponse.data.CustomerMessage}`);
      
      console.log('\n🎉 M-Pesa LIVE configuration is working correctly!');
      console.log('💡 Your M-Pesa business account will receive REAL payments');
      console.log('⚠️  This test will send a real payment prompt to the test phone number');
      
    } catch (error) {
      console.error('❌ M-Pesa LIVE test failed:', error.message);
      console.log('\n🔧 Troubleshooting tips:');
      console.log('1. Check your M-Pesa LIVE credentials in .env file');
      console.log('2. Verify your Safaricom developer app is set to LIVE mode');
      console.log('3. Make sure your business short code is correct');
      console.log('4. Verify your passkey is correct');
      console.log('5. Check if your M-Pesa business account is active');
    }
  }
}

// Run the test
const mpesaLiveTest = new MPesaLiveTest();
mpesaLiveTest.testMPesaLiveConnection(); 