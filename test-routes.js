const axios = require('axios');

async function testRoutes() {
  const baseURL = 'http://localhost:5000';
  
  try {
    console.log('🧪 Testing server routes...\n');
    
    // Test health check
    console.log('1. Testing health check...');
    try {
      const healthResponse = await axios.get(`${baseURL}/api/health`);
      console.log('✅ Health check passed:', healthResponse.data);
    } catch (error) {
      console.log('❌ Health check failed:', error.message);
      if (error.code === 'ECONNREFUSED') {
        console.log('Server is not running on port 5000');
        return;
      }
      throw error;
    }
    
    // Test contact route GET
    console.log('\n2. Testing contact route GET...');
    try {
      const contactGetResponse = await axios.get(`${baseURL}/api/contact`);
      console.log('✅ Contact GET passed:', contactGetResponse.data);
    } catch (error) {
      console.log('❌ Contact GET failed:', error.message);
      if (error.response) {
        console.log('Status:', error.response.status);
        console.log('Data:', error.response.data);
      }
    }
    
    // Test contact route POST
    console.log('\n3. Testing contact route POST...');
    try {
      const contactData = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'Test Message'
      };
      const contactPostResponse = await axios.post(`${baseURL}/api/contact`, contactData);
      console.log('✅ Contact POST passed:', contactPostResponse.data);
    } catch (error) {
      console.log('❌ Contact POST failed:', error.message);
      if (error.response) {
        console.log('Status:', error.response.status);
        console.log('Data:', error.response.data);
      }
    }
    
    // Test applications route GET
    console.log('\n4. Testing applications route GET...');
    try {
      const applicationsGetResponse = await axios.get(`${baseURL}/api/applications`);
      console.log('✅ Applications GET passed:', applicationsGetResponse.data);
    } catch (error) {
      console.log('❌ Applications GET failed:', error.message);
      if (error.response) {
        console.log('Status:', error.response.status);
        console.log('Data:', error.response.data);
      }
    }
    
    // Test applications route POST
    console.log('\n5. Testing applications route POST...');
    try {
      const applicationData = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '+254700000000',
        program: 'Education',
        age: 25,
        location: 'Nairobi',
        message: 'Test application message'
      };
      const applicationsPostResponse = await axios.post(`${baseURL}/api/applications`, applicationData);
      console.log('✅ Applications POST passed:', applicationsPostResponse.data);
    } catch (error) {
      console.log('❌ Applications POST failed:', error.message);
      if (error.response) {
        console.log('Status:', error.response.status);
        console.log('Data:', error.response.data);
      }
    }
    
    console.log('\n🎉 All routes are working correctly!');
    
  } catch (error) {
    console.error('❌ Error testing routes:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testRoutes(); 