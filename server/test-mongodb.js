const mongoose = require('mongoose');
require('dotenv').config();

async function testMongoDB() {
  console.log('🔍 Testing MongoDB Connection...\n');
  
  console.log('📋 Connection Details:');
  console.log(`Primary URI: ${process.env.MONGODB_URI ? '✅ Set' : '❌ Missing'}`);
  console.log(`Fallback URI: ${process.env.MONGODB_URI_FALLBACK ? '✅ Set' : '❌ Missing'}`);
  
  if (!process.env.MONGODB_URI && !process.env.MONGODB_URI_FALLBACK) {
    console.log('❌ No MongoDB URIs found in your .env file!');
    return;
  }

  // Try fallback first since SRV has DNS issues
  const testURI = process.env.MONGODB_URI_FALLBACK || process.env.MONGODB_URI;
  console.log(`🔗 Testing with: ${testURI.startsWith('mongodb+srv://') ? 'SRV' : 'Standard'} connection`);

  try {
    console.log('🔗 Attempting to connect to MongoDB...');
    
    // Set connection options
    const options = {
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000, // 45 seconds
    };

    await mongoose.connect(testURI, options);
    
    console.log('✅ MongoDB connection successful!');
    console.log('📊 Database Info:');
    console.log(`Database Name: ${mongoose.connection.name}`);
    console.log(`Host: ${mongoose.connection.host}`);
    console.log(`Port: ${mongoose.connection.port}`);
    
    // Test a simple operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`Collections: ${collections.length} found`);
    
    await mongoose.disconnect();
    console.log('✅ Connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    
    if (error.message.includes('bad auth')) {
      console.log('\n💡 Authentication failed. Please check:');
      console.log('1. Username and password in your connection string');
      console.log('2. Database user permissions in MongoDB Atlas');
      console.log('3. IP whitelist in MongoDB Atlas Network Access');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Connection refused. Please check:');
      console.log('1. MongoDB service is running (if local)');
      console.log('2. Network connectivity');
      console.log('3. Firewall settings');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('ETIMEOUT')) {
      console.log('\n💡 DNS resolution failed. Please check:');
      console.log('1. Internet connection');
      console.log('2. DNS settings');
      console.log('3. Try using Standard connection string instead of SRV');
    }
  }
}

testMongoDB();
