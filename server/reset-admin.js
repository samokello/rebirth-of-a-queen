require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const resetAdmin = async () => {
  try {
    console.log('🔄 Resetting Admin Password...');
    
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
    
    // Create a fresh password hash
    console.log('🔐 Creating new password hash...');
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Update admin user
    adminUser.password = hashedPassword;
    adminUser.isActive = true;
    adminUser.isEmailVerified = true;
    adminUser.role = 'admin';
    
    await adminUser.save();
    console.log('✅ Admin password updated');
    
    // Verify the password works
    console.log('🔍 Verifying password...');
    const testUser = await User.findOne({ email: email });
    const isPasswordValid = await bcrypt.compare(password, testUser.password);
    
    console.log(`   Password verification: ${isPasswordValid ? '✅ SUCCESS' : '❌ FAILED'}`);
    
    if (isPasswordValid) {
      console.log('\n🎉 Admin Password Reset Complete!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🔑 Admin Login Credentials:');
      console.log(`   Email: ${email}`);
      console.log(`   Password: ${password}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    } else {
      console.log('❌ Password verification still failing');
    }
    
  } catch (error) {
    console.error('❌ Error resetting admin:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n📡 Disconnected from MongoDB');
  }
};

resetAdmin();
