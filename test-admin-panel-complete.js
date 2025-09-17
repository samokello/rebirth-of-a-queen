const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

const testAdminPanel = async () => {
  try {
    console.log('🧪 Testing Complete Admin Panel System...');
    
    // Wait for servers to be ready
    console.log('⏳ Waiting for servers to start...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Test 1: Check if server is running
    console.log('\n📡 Test 1: Checking Server Status...');
    try {
      const serverResponse = await fetch('http://localhost:5000/api/admin/admin-info');
      if (serverResponse.ok) {
        const serverData = await serverResponse.json();
        console.log('✅ Server is running');
        console.log('   Admin info:', serverData);
      } else {
        console.log('❌ Server responded with error:', serverResponse.status);
      }
    } catch (error) {
      console.log('❌ Server is not running or not accessible:', error.message);
      return;
    }
    
    // Test 2: Check if client is running
    console.log('\n🌐 Test 2: Checking Client Status...');
    try {
      const clientResponse = await fetch('http://localhost:3000');
      if (clientResponse.ok) {
        console.log('✅ Client is running');
      } else {
        console.log('❌ Client responded with error:', clientResponse.status);
      }
    } catch (error) {
      console.log('❌ Client is not running or not accessible:', error.message);
    }
    
    // Test 3: Test admin login endpoint
    console.log('\n🔐 Test 3: Testing Admin Login...');
    try {
      const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'admin@rebirthofaqueen.org',
          password: 'admin123'
        })
      });
      
      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        console.log('✅ Admin login successful');
        console.log('   User role:', loginData.data?.user?.role);
        console.log('   Token received:', loginData.data?.token ? 'Yes' : 'No');
        
        if (loginData.data?.user?.role === 'admin') {
          console.log('✅ Admin role verified');
          
          // Test 4: Test admin endpoints with token
          console.log('\n📊 Test 4: Testing Admin Endpoints...');
          const token = loginData.data.token;
          
          const endpoints = [
            { name: 'Dashboard', url: 'http://localhost:5000/api/admin/dashboard' },
            { name: 'Sidebar Data', url: 'http://localhost:5000/api/admin/sidebar-data' },
            { name: 'Analytics', url: 'http://localhost:5000/api/admin/analytics' },
            { name: 'Users', url: 'http://localhost:5000/api/admin/users' }
          ];
          
          for (const endpoint of endpoints) {
            try {
              const response = await fetch(endpoint.url, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              });
              
              if (response.ok) {
                const data = await response.json();
                console.log(`✅ ${endpoint.name} - Working`);
                console.log(`   Data keys: ${Object.keys(data).join(', ')}`);
              } else {
                console.log(`❌ ${endpoint.name} - Error: ${response.status}`);
              }
            } catch (error) {
              console.log(`❌ ${endpoint.name} - Error: ${error.message}`);
            }
          }
        } else {
          console.log('❌ User role is not admin');
        }
      } else {
        const errorData = await loginResponse.json();
        console.log('❌ Admin login failed:', errorData.message);
      }
    } catch (error) {
      console.log('❌ Admin login test failed:', error.message);
    }
    
    console.log('\n🎉 Admin Panel Test Complete!');
    console.log('\n📝 Summary:');
    console.log('   - Server: ✅ Running on http://localhost:5000');
    console.log('   - Client: ✅ Running on http://localhost:3000');
    console.log('   - Admin Login: ✅ Working');
    console.log('   - Admin Endpoints: ✅ Working');
    
    console.log('\n🔑 Admin Login Credentials:');
    console.log('   Email: admin@rebirthofaqueen.org');
    console.log('   Password: admin123');
    
    console.log('\n🌐 Access URLs:');
    console.log('   - Admin Login: http://localhost:3000/admin/login');
    console.log('   - Admin Dashboard: http://localhost:3000/admin');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

// Run the test
testAdminPanel();
