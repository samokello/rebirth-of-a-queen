require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    return false;
  }
};

const testAuthentication = async () => {
  console.log('🔍 Testing Authentication...\n');
  
  const connected = await connectDB();
  if (!connected) {
    console.log('❌ Cannot proceed without database connection');
    return;
  }

  try {
    const User = require('./models/User');
    
    // Check all users
    const allUsers = await User.find().select('firstName lastName email role isActive');
    console.log(`👥 Total users in database: ${allUsers.length}`);
    
    allUsers.forEach((user, index) => {
      console.log(`  ${index + 1}. ${user.firstName} ${user.lastName}`);
      console.log(`     Email: ${user.email}`);
      console.log(`     Role: ${user.role}`);
      console.log(`     Active: ${user.isActive}`);
      console.log('');
    });

    // Check for admin users
    const adminUsers = await User.find({ role: 'admin' });
    console.log(`👑 Admin users: ${adminUsers.length}`);
    
    if (adminUsers.length === 0) {
      console.log('⚠️ No admin users found! You need to create an admin user.');
      console.log('💡 Run: node setup-admin.js to create an admin user');
    } else {
      adminUsers.forEach((admin, index) => {
        console.log(`  ${index + 1}. ${admin.firstName} ${admin.lastName} (${admin.email})`);
      });
    }

    // Test JWT token generation
    if (allUsers.length > 0) {
      const testUser = allUsers[0];
      console.log(`\n🔑 Testing JWT token generation for: ${testUser.email}`);
      
      try {
        const token = jwt.sign(
          { userId: testUser._id, email: testUser.email, role: testUser.role },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        );
        console.log('✅ JWT token generated successfully');
        console.log(`Token length: ${token.length} characters`);
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('✅ JWT token verified successfully');
        console.log(`Decoded user ID: ${decoded.userId}`);
        console.log(`Decoded email: ${decoded.email}`);
        console.log(`Decoded role: ${decoded.role}`);
      } catch (jwtError) {
        console.error('❌ JWT error:', jwtError.message);
      }
    }

  } catch (error) {
    console.error('❌ Authentication test error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n✅ Database connection closed');
  }
};

testAuthentication();
