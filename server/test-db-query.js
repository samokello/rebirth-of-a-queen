require('dotenv').config();
const mongoose = require('mongoose');

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

const testDatabase = async () => {
  console.log('🔍 Testing Database Queries...\n');
  
  const connected = await connectDB();
  if (!connected) {
    console.log('❌ Cannot proceed without database connection');
    return;
  }

  try {
    // Test Products collection
    const Product = require('./models/Product');
    const productCount = await Product.countDocuments();
    console.log(`📦 Products in database: ${productCount}`);
    
    if (productCount > 0) {
      const sampleProducts = await Product.find().limit(3).select('name price category');
      console.log('📋 Sample products:');
      sampleProducts.forEach((product, index) => {
        console.log(`  ${index + 1}. ${product.name} - KSH ${product.price} (${product.category})`);
      });
    }

    // Test Users collection
    const User = require('./models/User');
    const userCount = await User.countDocuments();
    console.log(`\n👥 Users in database: ${userCount}`);
    
    if (userCount > 0) {
      const sampleUsers = await User.find().limit(3).select('firstName lastName email role');
      console.log('📋 Sample users:');
      sampleUsers.forEach((user, index) => {
        console.log(`  ${index + 1}. ${user.firstName} ${user.lastName} (${user.email}) - Role: ${user.role}`);
      });
    }

    // Test database name
    console.log(`\n🗄️ Database name: ${mongoose.connection.db.databaseName}`);
    console.log(`🔗 Connection state: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);

  } catch (error) {
    console.error('❌ Database query error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n✅ Database connection closed');
  }
};

testDatabase();
