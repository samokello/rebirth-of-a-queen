const axios = require('axios');
require('dotenv').config({ path: './server/.env' });

class MPesaIntegrationTest {
  constructor() {
    this.baseURL = 'http://localhost:5000';
  }

  async testCompleteFlow() {
    console.log('🧪 Testing Complete M-Pesa Integration Flow');
    console.log('==========================================');
    
    try {
      // Step 1: Create a donation
      console.log('\n📝 Step 1: Creating donation...');
      const donationResponse = await axios.post(`${this.baseURL}/api/donations`, {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '254740844942',
        amount: 1,
        paymentMethod: 'mpesa_stk'
      });

      console.log('✅ Donation created successfully');
      console.log(`📋 Donation ID: ${donationResponse.data.data.donationId}`);

      // Step 2: Initiate M-Pesa STK Push
      console.log('\n📱 Step 2: Initiating M-Pesa STK Push...');
      const mpesaResponse = await axios.post(`${this.baseURL}/api/mpesa/stk-push`, {
        phoneNumber: '254740844942',
        amount: 1,
        donationId: donationResponse.data.data.donationId
      });

      console.log('✅ M-Pesa STK Push initiated successfully');
      console.log(`📋 Checkout Request ID: ${mpesaResponse.data.data.checkoutRequestId}`);
      console.log(`💬 Customer Message: ${mpesaResponse.data.data.customerMessage}`);

      console.log('\n🎉 Complete M-Pesa Integration Test Successful!');
      console.log('💡 You should receive an M-Pesa prompt on your phone');
      
    } catch (error) {
      console.error('\n❌ Test failed:', error.response?.data || error.message);
      
      if (error.response?.data?.message) {
        console.log(`📋 Error Details: ${error.response.data.message}`);
      }
    }
  }
}

// Run the test
const test = new MPesaIntegrationTest();
test.testCompleteFlow(); 