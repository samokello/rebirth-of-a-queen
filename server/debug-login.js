require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const debugLogin = async () => {
  try {
    console.log('🔍 Debugging Login Process...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const email = 'admin@rebirthofaqueen.org';
    const password = 'admin123';
    
    console.log(`\n📧 Looking for user with email: ${email}`);
    
    // Find user
    const user = await User.findOne({ email: email });
    
    if (!user) {
      console.log('❌ User not found');
      return;
    }
    
    console.log('✅ User found:');
    console.log(`   ID: ${user._id}`);
    console.log(`   Name: ${user.firstName} ${user.lastName}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Active: ${user.isActive}`);
    console.log(`   Email Verified: ${user.isEmailVerified}`);
    console.log(`   Password Hash: ${user.password.substring(0, 20)}...`);
    
    // Test password comparison
    console.log(`\n🔐 Testing password comparison...`);
    console.log(`   Input password: ${password}`);
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(`   Password valid: ${isPasswordValid}`);
    
    if (!isPasswordValid) {
      console.log('❌ Password comparison failed');
      
      // Try to hash the password again and compare
      console.log('\n🔄 Trying to rehash and compare...');
      const salt = await bcrypt.genSalt(10);
      const newHash = await bcrypt.hash(password, salt);
      console.log(`   New hash: ${newHash.substring(0, 20)}...`);
      
      const isNewHashValid = await bcrypt.compare(password, newHash);
      console.log(`   New hash valid: ${isNewHashValid}`);
      
      // Update the user's password
      user.password = newHash;
      await user.save();
      console.log('✅ Updated user password with new hash');
      
      // Test again
      const isUpdatedPasswordValid = await bcrypt.compare(password, user.password);
      console.log(`   Updated password valid: ${isUpdatedPasswordValid}`);
    }
    
  } catch (error) {
    console.error('❌ Debug error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n📡 Disconnected from MongoDB');
  }
};

debugLogin();
