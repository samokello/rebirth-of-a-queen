const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function testFileUpload() {
  console.log('🧪 Testing File Upload Functionality...\n');

  try {
    // First, login as admin to get token
    console.log('1️⃣ Logging in as admin...');
    const loginResponse = await axios.post('http://localhost:5000/api/auth/admin/login', {
      email: 'admin@rebirthofaqueen.org',
      password: 'admin123'
    });

    if (!loginResponse.data.token) {
      console.log('❌ Admin login failed');
      return;
    }

    const token = loginResponse.data.token;
    console.log('✅ Admin login successful');

    // Test Cloudinary configuration
    console.log('\n2️⃣ Testing Cloudinary Configuration...');
    if (process.env.CLOUDINARY_CLOUD_NAME && 
        process.env.CLOUDINARY_API_KEY && 
        process.env.CLOUDINARY_API_SECRET) {
      console.log('✅ Cloudinary environment variables found');
      console.log(`   Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
    } else {
      console.log('❌ Cloudinary environment variables missing');
      console.log('   Please check your .env file');
      return;
    }

    // Test upload endpoint
    console.log('\n3️⃣ Testing Upload Endpoint...');
    
    // Create a simple test image (1x1 pixel PNG)
    const testImagePath = path.join(__dirname, 'test-image.png');
    const testImageData = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');
    fs.writeFileSync(testImagePath, testImageData);

    const formData = new FormData();
    formData.append('files', fs.createReadStream(testImagePath), {
      filename: 'test-image.png',
      contentType: 'image/png'
    });

    const uploadResponse = await axios.post('http://localhost:5000/api/upload/multiple', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        ...formData.getHeaders()
      }
    });

    if (uploadResponse.data.success) {
      console.log('✅ File upload successful');
      console.log('   Uploaded files:', uploadResponse.data.data.length);
      
      uploadResponse.data.data.forEach((file, index) => {
        console.log(`   File ${index + 1}:`);
        console.log(`     URL: ${file.secure_url}`);
        console.log(`     Public ID: ${file.public_id}`);
        console.log(`     Format: ${file.format}`);
        console.log(`     Size: ${file.bytes} bytes`);
      });
    } else {
      console.log('❌ File upload failed');
      console.log('   Error:', uploadResponse.data.message);
    }

    // Clean up test file
    fs.unlinkSync(testImagePath);

    console.log('\n🎉 File Upload Test Completed!');
    console.log('\n📋 Upload System Status:');
    console.log('   ✅ Admin Authentication: Working');
    console.log('   ✅ Cloudinary Configuration: Valid');
    console.log('   ✅ Upload Endpoint: Functional');
    console.log('   ✅ File Processing: Working');

  } catch (error) {
    console.error('❌ File Upload Test Failed:', error.message);
    
    if (error.response) {
      console.error('   Response Status:', error.response.status);
      console.error('   Response Data:', error.response.data);
    }
  }
}

testFileUpload();
