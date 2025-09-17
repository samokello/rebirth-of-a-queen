require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const fixAdminFinal = async () => {
  try {
    console.log('🔧 Final Admin Password Fix...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const email = 'admin@rebirthofaqueen.org';
    const password = 'admin123';
    
    // Find admin user
    const adminUser = await User.findOne({ email: email });
    
    if (!adminUser) {
      console.log('❌ Admin user not found');
      return;
    }
    
    console.log(`👤 Found admin: ${adminUser.firstName} ${adminUser.lastName}`);
    
    // Create password hash manually (bypassing pre-save middleware)
    console.log('🔐 Creating password hash manually...');
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Update directly in database to bypass middleware
    console.log('💾 Updating password in database...');
    await User.updateOne(
      { email: email },
      { 
        $set: { 
          password: hashedPassword,
          isActive: true,
          isEmailVerified: true,
          role: 'admin'
        }
      }
    );
    
    // Verify the password works
    console.log('🔍 Verifying password...');
    const updatedUser = await User.findOne({ email: email });
    const isPasswordValid = await bcrypt.compare(password, updatedUser.password);
    
    console.log(`   Password verification: ${isPasswordValid ? '✅ SUCCESS' : '❌ FAILED'}`);
    
    if (isPasswordValid) {
      console.log('\n🎉 Admin Password Fixed Successfully!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🔑 Admin Login Credentials:');
      console.log(`   Email: ${email}`);
      console.log(`   Password: ${password}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      // Test the login API
      console.log('\n🌐 Testing login API...');
      const axios = require('axios');
      
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: email,
          password: password
        });
        
        console.log('✅ API Login successful!');
        console.log(`   Status: ${response.status}`);
        console.log(`   User: ${response.data.data.user.firstName} ${response.data.data.user.lastName}`);
        console.log(`   Role: ${response.data.data.user.role}`);
        
      } catch (apiError) {
        console.log('❌ API Login failed:', apiError.response?.data?.message || apiError.message);
      }
      
    } else {
      console.log('❌ Password verification still failing');
    }
    
  } catch (error) {
    console.error('❌ Error fixing admin:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n📡 Disconnected from MongoDB');
  }
};

fixAdminFinal();
