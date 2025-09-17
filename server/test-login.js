require('dotenv').config();
const axios = require('axios');

const testLogin = async () => {
  try {
    console.log('🔐 Testing Admin Login API...');
    
    const loginData = {
      email: 'admin@rebirthofaqueen.org',
      password: 'admin123'
    };
    
    console.log('📤 Sending login request...');
    console.log(`   Email: ${loginData.email}`);
    console.log(`   Password: ${loginData.password}`);
    
    const response = await axios.post('http://localhost:5000/api/auth/login', loginData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Login successful!');
    console.log(`   Status: ${response.status}`);
    console.log(`   Success: ${response.data.success}`);
    console.log(`   Message: ${response.data.message}`);
    
    if (response.data.data && response.data.data.user) {
      console.log(`   User: ${response.data.data.user.firstName} ${response.data.data.user.lastName}`);
      console.log(`   Role: ${response.data.data.user.role}`);
      console.log(`   Token: ${response.data.data.token ? 'Present' : 'Missing'}`);
    }
    
  } catch (error) {
    console.error('❌ Login failed:');
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Message: ${error.response.data?.message || 'Unknown error'}`);
      console.error(`   Data:`, error.response.data);
    } else {
      console.error(`   Error: ${error.message}`);
    }
  }
};

testLogin();
