require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const fixAdminPassword = async () => {
  try {
    console.log('🔧 Fixing Admin Password...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Find admin user
    const adminEmail = 'admin@rebirthofaqueen.org';
    const adminUser = await User.findOne({ email: adminEmail });
    
    if (!adminUser) {
      console.log('❌ Admin user not found');
      return;
    }
    
    console.log(`👤 Found admin user: ${adminUser.firstName} ${adminUser.lastName}`);
    
    // Reset password to a simple one
    const newPassword = 'admin123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update admin user
    adminUser.password = hashedPassword;
    adminUser.isActive = true;
    adminUser.isEmailVerified = true;
    adminUser.role = 'admin';
    
    await adminUser.save();
    console.log('✅ Admin password updated');
    
    // Test the password
    const testUser = await User.findOne({ email: adminEmail });
    const isPasswordValid = await bcrypt.compare(newPassword, testUser.password);
    
    if (isPasswordValid) {
      console.log('✅ Password verification successful');
    } else {
      console.log('❌ Password verification failed');
    }
    
    // Display credentials
    console.log('\n🎉 Admin Password Fixed!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔑 Admin Login Credentials:');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${newPassword}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
  } catch (error) {
    console.error('❌ Error fixing admin password:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n📡 Disconnected from MongoDB');
  }
};

fixAdminPassword();
