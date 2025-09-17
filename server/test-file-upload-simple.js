const axios = require('axios');
require('dotenv').config();

async function testSimple() {
  console.log('🧪 Simple File Upload Test...\n');

  try {
    // Test 1: Check environment variables
    console.log('1️⃣ Checking Cloudinary Configuration...');
    console.log('   Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
    console.log('   API Key:', process.env.CLOUDINARY_API_KEY ? '✅ Found' : '❌ Missing');
    console.log('   API Secret:', process.env.CLOUDINARY_API_SECRET ? '✅ Found' : '❌ Missing');

    // Test 2: Check server health
    console.log('\n2️⃣ Checking Server Health...');
    const healthResponse = await axios.get('http://localhost:5000/api/health');
    console.log('   Server Status:', healthResponse.data.message);

    // Test 3: Test admin login
    console.log('\n3️⃣ Testing Admin Login...');
    const loginResponse = await axios.post('http://localhost:5000/api/auth/admin/login', {
      email: 'admin@rebirthofaqueen.org',
      password: 'admin123'
    });

    if (loginResponse.data.token) {
      console.log('   ✅ Admin Login Successful');
      console.log('   Token Preview:', loginResponse.data.token.substring(0, 20) + '...');
    } else {
      console.log('   ❌ Admin Login Failed');
    }

    console.log('\n🎉 Simple Test Completed!');

  } catch (error) {
    console.error('❌ Test Failed:', error.message);
    
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
  }
}

testSimple();
