const axios = require('axios');
require('dotenv').config();

class PayPalLiveTest {
  constructor() {
    this.clientId = process.env.PAYPAL_CLIENT_ID;
    this.clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    this.mode = process.env.PAYPAL_MODE || 'live';
    this.baseURL = this.mode === 'live' 
      ? 'https://api-m.paypal.com' 
      : 'https://api-m.sandbox.paypal.com';
  }

  async getAccessToken() {
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

      return response.data.access_token;
    } catch (error) {
      throw new Error(`Failed to get PayPal access token: ${error.response?.data?.error_description || error.message}`);
    }
  }

  async testPayPalLiveConnection() {
    console.log('🧪 Testing PayPal LIVE configuration...');
    console.log(`📡 Mode: ${this.mode}`);
    console.log(`🔗 Base URL: ${this.baseURL}`);
    console.log('⚠️  This will use REAL PayPal credentials!');
    
    try {
      // Test getting access token
      const accessToken = await this.getAccessToken();
      console.log('✅ PayPal LIVE access token obtained successfully!');
      
      // Test creating a simple order (small amount for testing)
      const orderResponse = await axios.post(
        `${this.baseURL}/v2/checkout/orders`,
        {
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: '1.00' // Small test amount
              },
              description: 'Test donation to Rebirth of a Queen (LIVE)'
            }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          }
        }
      );

      console.log('✅ PayPal LIVE order creation test successful!');
      console.log(`📋 Order ID: ${orderResponse.data.id}`);
      console.log(`💰 Amount: $${orderResponse.data.purchase_units[0].amount.value}`);
      console.log(`📊 Status: ${orderResponse.data.status}`);
      
      console.log('\n🎉 PayPal LIVE configuration is working correctly!');
      console.log('💡 Your PayPal account will receive REAL payments');
      console.log('⚠️  Remember to cancel this test order in your PayPal dashboard');
      
    } catch (error) {
      console.error('❌ PayPal LIVE test failed:', error.message);
      console.log('\n🔧 Troubleshooting tips:');
      console.log('1. Check your PayPal LIVE credentials in .env file');
      console.log('2. Verify your PayPal app is set to LIVE mode');
      console.log('3. Make sure your PayPal business account is verified');
      console.log('4. Check if your PayPal account has API access enabled');
    }
  }
}

// Run the test
const paypalLiveTest = new PayPalLiveTest();
paypalLiveTest.testPayPalLiveConnection(); 