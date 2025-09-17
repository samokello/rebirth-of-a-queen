const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import User model
const User = require('./server/models/User');

const setupAdmin = async () => {
  try {
    console.log('🚀 Starting Admin Setup...');
    
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rebirth-of-a-queen';
    console.log('📡 Connecting to MongoDB...');
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');
    
    // Check if admin user exists
    const adminEmail = 'admin@rebirthofaqueen.org';
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('👤 Admin user already exists');
      console.log(`   Name: ${existingAdmin.firstName} ${existingAdmin.lastName}`);
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Role: ${existingAdmin.role}`);
      console.log(`   Active: ${existingAdmin.isActive}`);
      console.log(`   Email Verified: ${existingAdmin.isEmailVerified}`);
      
      // Update role to admin if not already
      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log('✅ Updated user role to admin');
      }
      
      // Update password to ensure it's correct
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      existingAdmin.password = hashedPassword;
      existingAdmin.isActive = true;
      existingAdmin.isEmailVerified = true;
      await existingAdmin.save();
      console.log('✅ Updated admin password and status');
      
    } else {
      console.log('👤 Creating new admin user...');
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      // Create admin user
      const adminUser = new User({
        firstName: 'Rebirth',
        lastName: 'Queen',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        isActive: true,
        isEmailVerified: true,
        phone: '+254700000000',
        address: {
          street: 'Admin Address',
          city: 'Nairobi',
          state: 'Nairobi',
          postalCode: '00100',
          country: 'Kenya'
        }
      });
      
      await adminUser.save();
      console.log('✅ Admin user created successfully');
    }
    
    // Test admin login
    console.log('\n🔐 Testing admin authentication...');
    const testAdmin = await User.findOne({ email: adminEmail });
    const isPasswordValid = await bcrypt.compare('admin123', testAdmin.password);
    
    if (isPasswordValid) {
      console.log('✅ Admin authentication test passed');
    } else {
      console.log('❌ Admin authentication test failed');
    }
    
    // Display admin credentials
    console.log('\n🎉 Admin Setup Complete!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔑 Admin Login Credentials:');
    console.log('   Email: admin@rebirthofaqueen.org');
    console.log('   Password: admin123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n📱 Access URLs:');
    console.log('   Frontend: http://localhost:3000');
    console.log('   Admin Panel: http://localhost:3000/admin');
    console.log('   API: http://localhost:5000/api');
    console.log('\n🚀 Next Steps:');
    console.log('1. Start the server: cd server && npm start');
    console.log('2. Start the client: cd client && npm start');
    console.log('3. Login to admin panel with the credentials above');
    console.log('4. Test product creation functionality');
    
  } catch (error) {
    console.error('❌ Error setting up admin:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure MongoDB is running');
    console.log('2. Check your MONGODB_URI in .env file');
    console.log('3. Ensure all required packages are installed');
  } finally {
    await mongoose.disconnect();
    console.log('\n📡 Disconnected from MongoDB');
  }
};

// Run setup
setupAdmin();
