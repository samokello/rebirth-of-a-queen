// Simple script to setup admin user via API
const setupAdmin = async () => {
  try {
    console.log('🔧 Setting up admin user...');
    
    const response = await fetch('http://localhost:5000/api/setup-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅', result.message);
      console.log('📧 Email:', result.credentials.email);
      console.log('🔑 Password:', result.credentials.password);
      console.log('\n🎉 You can now login to the admin dashboard!');
    } else {
      console.log('❌ Error:', result.message);
    }
    
  } catch (error) {
    console.error('❌ Network error:', error.message);
    console.log('💡 Make sure your server is running on http://localhost:5000');
  }
};

setupAdmin(); 