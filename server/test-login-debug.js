require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const testLoginDebug = async () => {
  try {
    console.log('🔍 Debugging Login Process...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const email = 'admin@rebirthofaqueen.org';
    const password = 'admin123';
    
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
    
    // Test the comparePassword method
    console.log(`\n🔐 Testing comparePassword method...`);
    const isPasswordValid = await user.comparePassword(password);
    console.log(`   comparePassword result: ${isPasswordValid}`);
    
    // Test direct bcrypt comparison
    const bcrypt = require('bcryptjs');
    const directComparison = await bcrypt.compare(password, user.password);
    console.log(`   Direct bcrypt comparison: ${directComparison}`);
    
    // Check if user is active
    if (!user.isActive) {
      console.log('❌ User account is not active');
    }
    
    // Check if email is verified (if required)
    if (user.isEmailVerified === false) {
      console.log('⚠️ User email is not verified');
    }
    
    console.log('\n📋 Login Route Logic Check:');
    console.log(`   1. User found: ✅`);
    console.log(`   2. Password valid: ${isPasswordValid ? '✅' : '❌'}`);
    console.log(`   3. User active: ${user.isActive ? '✅' : '❌'}`);
    console.log(`   4. Email verified: ${user.isEmailVerified ? '✅' : '⚠️'}`);
    
  } catch (error) {
    console.error('❌ Debug error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n📡 Disconnected from MongoDB');
  }
};

testLoginDebug();
