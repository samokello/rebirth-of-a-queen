const axios = require('axios');

async function testFrontendBackendConnection() {
  console.log('🧪 Testing Frontend-Backend Connection');
  console.log('=====================================');
  
  try {
    // Test backend health
    console.log('\n📡 Testing Backend Health...');
    const healthResponse = await axios.get('http://localhost:5000/api/health');
    console.log('✅ Backend is running:', healthResponse.data.message);
    
    // Test donation creation
    console.log('\n📝 Testing Donation Creation...');
    const donationResponse = await axios.post('http://localhost:5000/api/donations', {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '254740844942',
      amount: 1,
      paymentMethod: 'mpesa_stk'
    });
    console.log('✅ Donation created:', donationResponse.data.data.donationId);
    
    // Test M-Pesa STK Push
    console.log('\n📱 Testing M-Pesa STK Push...');
    const mpesaResponse = await axios.post('http://localhost:5000/api/mpesa/stk-push', {
      phoneNumber: '254740844942',
      amount: 1,
      donationId: donationResponse.data.data.donationId
    });
    console.log('✅ M-Pesa STK Push successful:', mpesaResponse.data.data.checkoutRequestId);
    
    console.log('\n🎉 Frontend-Backend Connection Test Successful!');
    console.log('💡 Your donation system is ready for testing!');
    
  } catch (error) {
    console.error('\n❌ Connection test failed:', error.response?.data || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n🔧 Solution: Make sure both servers are running:');
      console.log('   Terminal 1: cd server && npm run dev');
      console.log('   Terminal 2: cd client && npm start');
    }
  }
}

testFrontendBackendConnection(); 