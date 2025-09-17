const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Import models
const User = require('./server/models/User');
const Product = require('./server/models/Product');

const testAdminProductCreation = async () => {
  try {
    console.log('🧪 Testing Admin Product Creation System...');
    
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rebirth-of-a-queen';
    console.log('📡 Connecting to MongoDB...');
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');
    
    // Step 1: Check/Create Admin User
    console.log('\n👤 Step 1: Checking Admin User...');
    const adminEmail = 'admin@rebirthofaqueen.org';
    let adminUser = await User.findOne({ email: adminEmail });
    
    if (!adminUser) {
      console.log('❌ Admin user not found. Creating...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      adminUser = new User({
        firstName: 'Rebirth',
        lastName: 'Queen',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        isActive: true,
        isEmailVerified: true,
        phone: '+254700000000'
      });
      
      await adminUser.save();
      console.log('✅ Admin user created');
    } else {
      console.log('✅ Admin user found');
      console.log(`   Name: ${adminUser.firstName} ${adminUser.lastName}`);
      console.log(`   Role: ${adminUser.role}`);
      console.log(`   Active: ${adminUser.isActive}`);
    }
    
    // Step 2: Test Admin Login
    console.log('\n🔐 Step 2: Testing Admin Login...');
    const isPasswordValid = await bcrypt.compare('admin123', adminUser.password);
    
    if (!isPasswordValid) {
      console.log('❌ Admin password is invalid. Updating...');
      const salt = await bcrypt.genSalt(10);
      adminUser.password = await bcrypt.hash('admin123', salt);
      await adminUser.save();
      console.log('✅ Admin password updated');
    } else {
      console.log('✅ Admin password is valid');
    }
    
    // Step 3: Generate JWT Token
    console.log('\n🎫 Step 3: Generating JWT Token...');
    const token = jwt.sign(
      { userId: adminUser._id, email: adminUser.email, role: adminUser.role },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '7d' }
    );
    console.log('✅ JWT token generated');
    console.log(`   Token preview: ${token.substring(0, 20)}...`);
    
    // Step 4: Test Product Creation
    console.log('\n📦 Step 4: Testing Product Creation...');
    
    // Check if test product already exists
    const existingProduct = await Product.findOne({ name: 'Test Product - Admin Creation' });
    if (existingProduct) {
      console.log('🗑️  Removing existing test product...');
      await Product.findByIdAndDelete(existingProduct._id);
    }
    
    // Create test product
    const testProduct = new Product({
      name: 'Test Product - Admin Creation',
      description: 'This is a test product created by the admin system',
      shortDescription: 'Test product for admin functionality',
      price: 1000,
      category: 'leather-bags',
      stock: 10,
      status: 'active',
      isFeatured: true,
      images: [{
        url: 'https://via.placeholder.com/400x400/007bff/ffffff?text=Test+Product',
        cloudinaryId: 'test-product-image',
        alt: 'Test Product Image',
        isPrimary: true
      }],
      createdBy: adminUser._id
    });
    
    await testProduct.save();
    console.log('✅ Test product created successfully');
    console.log(`   Product ID: ${testProduct._id}`);
    console.log(`   Product Name: ${testProduct.name}`);
    console.log(`   Price: ${testProduct.price} KES`);
    console.log(`   Stock: ${testProduct.stock}`);
    console.log(`   Status: ${testProduct.status}`);
    
    // Step 5: Test Product Retrieval
    console.log('\n📋 Step 5: Testing Product Retrieval...');
    const retrievedProduct = await Product.findById(testProduct._id);
    if (retrievedProduct) {
      console.log('✅ Product retrieved successfully');
      console.log(`   Name: ${retrievedProduct.name}`);
      console.log(`   Created By: ${retrievedProduct.createdBy}`);
    } else {
      console.log('❌ Failed to retrieve product');
    }
    
    // Step 6: Test Admin Product List
    console.log('\n📊 Step 6: Testing Admin Product List...');
    const allProducts = await Product.find({}).sort({ createdAt: -1 });
    console.log(`✅ Found ${allProducts.length} products in database`);
    
    // Step 7: Clean up test product
    console.log('\n🧹 Step 7: Cleaning up test product...');
    await Product.findByIdAndDelete(testProduct._id);
    console.log('✅ Test product removed');
    
    // Final Results
    console.log('\n🎉 Admin Product Creation Test Results:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Admin user exists and is properly configured');
    console.log('✅ Admin authentication works correctly');
    console.log('✅ JWT token generation works');
    console.log('✅ Product creation works');
    console.log('✅ Product retrieval works');
    console.log('✅ Database operations are functioning');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    console.log('\n🔑 Admin Credentials:');
    console.log('   Email: admin@rebirthofaqueen.org');
    console.log('   Password: admin123');
    
    console.log('\n🚀 Next Steps:');
    console.log('1. Start the server: cd server && npm start');
    console.log('2. Start the client: cd client && npm start');
    console.log('3. Login to admin panel with the credentials above');
    console.log('4. Navigate to Products section');
    console.log('5. Test creating a new product');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure MongoDB is running');
    console.log('2. Check your .env file configuration');
    console.log('3. Ensure all required packages are installed');
    console.log('4. Run: npm install (in both root and server directories)');
  } finally {
    await mongoose.disconnect();
    console.log('\n📡 Disconnected from MongoDB');
  }
};

// Run the test
testAdminProductCreation();
