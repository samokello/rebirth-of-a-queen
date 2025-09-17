const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

const testAdminEndpoints = async () => {
  try {
    console.log('🧪 Testing Admin Endpoints...');
    
    // Generate JWT token for admin user
    const token = jwt.sign(
      { 
        userId: 'admin-user-id',
        email: 'admin@rebirthofaqueen.org',
        role: 'admin'
      },
      'your-super-secret-jwt-key-change-this-in-production-20241201',
      { expiresIn: '7d' }
    );
    
    console.log('🔐 JWT Token generated');
    
    const baseUrl = 'http://localhost:5000/api/admin';
    
    // Test endpoints
    const endpoints = [
      { name: 'Dashboard', url: `${baseUrl}/dashboard` },
      { name: 'Sidebar Data', url: `${baseUrl}/sidebar-data` },
      { name: 'Analytics', url: `${baseUrl}/analytics` },
      { name: 'Reports', url: `${baseUrl}/reports` },
      { name: 'Users', url: `${baseUrl}/users` },
      { name: 'Donations', url: `${baseUrl}/donations` }
    ];
    
    for (const endpoint of endpoints) {
      try {
        console.log(`\n📡 Testing ${endpoint.name}...`);
        
        const response = await fetch(endpoint.url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log(`✅ ${endpoint.name} - Status: ${response.status}`);
          console.log(`   Data keys: ${Object.keys(data).join(', ')}`);
        } else {
          console.log(`❌ ${endpoint.name} - Status: ${response.status}`);
          const errorText = await response.text();
          console.log(`   Error: ${errorText}`);
        }
      } catch (error) {
        console.log(`❌ ${endpoint.name} - Error: ${error.message}`);
      }
    }
    
    console.log('\n🎉 Admin Endpoints Test Complete!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

// Wait a moment for server to start, then test
setTimeout(() => {
  testAdminEndpoints();
}, 3000);
