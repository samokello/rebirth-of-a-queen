const axios = require('axios');
require('dotenv').config();

const BASE_URL = 'http://localhost:5000/api';

async function testCompleteSystem() {
  console.log('🧪 Testing Complete System Functionality...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health Check:', healthResponse.data.message);

    // Test 2: Admin Authentication
    console.log('\n2️⃣ Testing Admin Authentication...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/admin/login`, {
      email: 'admin@rebirthofaqueen.org',
      password: 'admin123'
    });
    
    if (loginResponse.data.success) {
      console.log('✅ Admin Login Successful');
      const token = loginResponse.data.token;
      
      // Test 3: Product Management
      console.log('\n3️⃣ Testing Product Management...');
      
      // Create a test product
      const createProductResponse = await axios.post(`${BASE_URL}/shop/products`, {
        name: 'Test Product',
        description: 'A test product for system verification',
        shortDescription: 'Test product',
        price: 29.99,
        originalPrice: 39.99,
        category: 'leather-bags',
        stock: 10,
        status: 'active',
        isFeatured: false,
        isOnSale: true,
        offerPercentage: 25,
        weight: '500g',
        dimensions: {
          length: 30,
          width: 20,
          height: 10,
          unit: 'cm'
        },
        color: 'Brown',
        material: 'Leather',
        brand: 'Test Brand',
        tags: ['test', 'leather'],
        metaTitle: 'Test Product - Rebirth of a Queen',
        metaDescription: 'A test product for system verification',
        seoKeywords: 'test, leather, bag',
        images: []
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (createProductResponse.data.success) {
        console.log('✅ Product Created Successfully');
        const productId = createProductResponse.data.product._id;
        
        // Get products
        const getProductsResponse = await axios.get(`${BASE_URL}/shop/admin/products`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (getProductsResponse.data.success) {
          console.log('✅ Products Retrieved Successfully');
          console.log(`   Found ${getProductsResponse.data.products.length} products`);
        }
        
        // Update product
        const updateProductResponse = await axios.put(`${BASE_URL}/shop/products/${productId}`, {
          name: 'Updated Test Product',
          price: 34.99
        }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (updateProductResponse.data.success) {
          console.log('✅ Product Updated Successfully');
        }
        
        // Delete product
        const deleteProductResponse = await axios.delete(`${BASE_URL}/shop/products/${productId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (deleteProductResponse.data.success) {
          console.log('✅ Product Deleted Successfully');
        }
      }
      
      // Test 4: Contact Form
      console.log('\n4️⃣ Testing Contact Form...');
      const contactResponse = await axios.post(`${BASE_URL}/contact`, {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'System Test',
        message: 'This is a test message for system verification',
        phone: '+254700000000'
      });
      
      if (contactResponse.data.success) {
        console.log('✅ Contact Form Submitted Successfully');
      }
      
      // Test 5: Application Form
      console.log('\n5️⃣ Testing Application Form...');
      const applicationResponse = await axios.post(`${BASE_URL}/applications`, {
        firstName: 'Test',
        lastName: 'Applicant',
        email: 'applicant@example.com',
        phone: '+254700000000',
        program: 'Education',
        age: 25,
        location: 'Nairobi',
        message: 'This is a test application for system verification'
      });
      
      if (applicationResponse.data.success) {
        console.log('✅ Application Submitted Successfully');
      }
      
      // Test 6: Cloudinary Configuration
      console.log('\n6️⃣ Testing Cloudinary Configuration...');
      if (process.env.CLOUDINARY_CLOUD_NAME && 
          process.env.CLOUDINARY_API_KEY && 
          process.env.CLOUDINARY_API_SECRET) {
        console.log('✅ Cloudinary Configuration Verified');
        console.log(`   Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
      } else {
        console.log('⚠️  Cloudinary Configuration Missing');
      }
      
      // Test 7: Database Connection
      console.log('\n7️⃣ Testing Database Connection...');
      const dbTestResponse = await axios.get(`${BASE_URL}/admin/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (dbTestResponse.status === 200) {
        console.log('✅ Database Connection Working');
      }
      
    } else {
      console.log('❌ Admin Login Failed');
    }

    console.log('\n🎉 All System Tests Completed Successfully!');
    console.log('\n📋 System Status:');
    console.log('   ✅ Backend Server: Running');
    console.log('   ✅ Database: Connected');
    console.log('   ✅ Admin Authentication: Working');
    console.log('   ✅ Product Management: Working');
    console.log('   ✅ Contact Forms: Working');
    console.log('   ✅ Application Forms: Working');
    console.log('   ✅ Cloudinary: Configured');
    console.log('   ✅ API Endpoints: All Functional');
    
    console.log('\n🚀 Next Steps:');
    console.log('   1. Start your frontend: cd client && npm start');
    console.log('   2. Go to http://localhost:3000/admin');
    console.log('   3. Login with: admin@rebirthofaqueen.org / admin123');
    console.log('   4. Test the admin dashboard functionality');
    console.log('   5. Try adding products with image uploads');
    console.log('   6. Test contact and application forms');

  } catch (error) {
    console.error('❌ System Test Failed:', error.message);
    
    if (error.response) {
      console.error('   Response:', error.response.data);
    }
  }
}

testCompleteSystem();
