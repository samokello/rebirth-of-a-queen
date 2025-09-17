const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

// Get MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in environment variables');
  console.log('💡 Make sure your .env file contains: MONGODB_URI=your_connection_string');
  process.exit(1);
}

const fixAdminUser = async () => {
  try {
    console.log('🔍 Connecting to MongoDB Atlas...');
    console.log('📡 Using connection string from .env file');
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB Atlas successfully');
    console.log('🔍 Checking for admin user...');
    
    // Find admin user by email
    const adminUser = await User.findOne({ email: 'admin@rebirthofaqueen.org' });
    
    if (adminUser) {
      console.log('✅ Found admin user:', adminUser.firstName, adminUser.lastName);
      console.log('📧 Email:', adminUser.email);
      console.log('🔑 Current role:', adminUser.role);
      
      // Check if role is already admin
      if (adminUser.role === 'admin') {
        console.log('✅ Admin role is already set correctly');
        console.log('🔑 Password: admin123');
        console.log('📧 Email: admin@rebirthofaqueen.org');
      } else {
        // Update role to admin
        adminUser.role = 'admin';
        await adminUser.save();
        console.log('✅ Updated role to admin');
        console.log('🔑 Password: admin123');
        console.log('📧 Email: admin@rebirthofaqueen.org');
      }
    } else {
      console.log('❌ Admin user not found. Creating new admin user...');
      
      // Create new admin user
      const newAdminUser = new User({
        firstName: 'Rebirth',
        lastName: 'Queen',
        email: 'admin@rebirthofaqueen.org',
        password: 'admin123',
        role: 'admin',
        isActive: true,
        isEmailVerified: true,
        phone: '+254700000000'
      });

      await newAdminUser.save();
      console.log('✅ New admin user created successfully');
      console.log('👤 Name: Rebirth Queen');
      console.log('📧 Email: admin@rebirthofaqueen.org');
      console.log('🔑 Password: admin123');
    }
    
    console.log('\n🎉 Admin credentials ready!');
    console.log('📧 Email: admin@rebirthofaqueen.org');
    console.log('🔑 Password: admin123');
    console.log('\n🚀 You can now login to your admin dashboard!');
    
  } catch (error) {
    console.error('❌ Error fixing admin user:', error);
    console.log('\n💡 Check your MongoDB Atlas connection string in .env file');
  } finally {
    if (mongoose.connection.readyState === 1) {
      mongoose.connection.close();
      console.log('🔌 Database connection closed');
    }
  }
};

fixAdminUser(); 