const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const simpleTest = async () => {
  try {
    console.log('🚀 Simple Admin Test...');
    
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rebirth-of-a-queen';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');
    
    // Check if admin user exists
    const adminEmail = 'admin@rebirthofaqueen.org';
    const adminUser = await User.findOne({ email: adminEmail });
    
    if (!adminUser) {
      console.log('❌ Admin user not found - creating one...');
      
      // Create admin user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      const newAdmin = new User({
        firstName: 'Rebirth',
        lastName: 'Queen',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        isActive: true,
        isEmailVerified: true,
        phone: '+254700000000'
      });
      
      await newAdmin.save();
      console.log('✅ Admin user created');
    } else {
      console.log('✅ Admin user found:', adminUser.email, adminUser.role);
    }
    
    // Test password
    const testUser = await User.findOne({ email: adminEmail });
    const isPasswordValid = await bcrypt.compare('admin123', testUser.password);
    console.log('✅ Password test:', isPasswordValid);
    
    // Generate JWT token
    const JWT_SECRET = process.env.JWT_SECRET || 'rebirth-of-a-queen-super-secret-jwt-key-2024';
    const token = jwt.sign(
      { 
        userId: testUser._id,
        email: testUser.email,
        role: testUser.role
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    console.log('\n🎉 Admin setup complete!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔑 Admin Login Credentials:');
    console.log('   Email: admin@rebirthofaqueen.org');
    console.log('   Password: admin123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🔑 Test Token (for API testing):');
    console.log(token);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n📡 Disconnected from MongoDB');
  }
};

// Run test
simpleTest();
