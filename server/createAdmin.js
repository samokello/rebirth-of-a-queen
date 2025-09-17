require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI);

const createAdminUser = async () => {
  try {
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'admin@rebirthofaqueen.org' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      console.log('Current admin name:', existingAdmin.firstName, existingAdmin.lastName);
      process.exit(0);
    }

    // Create admin user with a proper name
    const adminUser = new User({
      firstName: 'Rebirth',
      lastName: 'Queen',
      email: 'admin@rebirthofaqueen.org',
      password: 'admin123',
      role: 'admin',
      isActive: true,
      isEmailVerified: true,
      phone: '+254700000000'
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    console.log('Name: Rebirth Queen');
    console.log('Email: admin@rebirthofaqueen.org');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.connection.close();
  }
};

createAdminUser(); 