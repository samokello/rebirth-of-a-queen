const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: './server/.env' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function testCloudinary() {
  console.log('🔍 Testing Cloudinary Configuration...\n');

  // Check environment variables
  console.log('📋 Environment Variables:');
  console.log(`Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Missing'}`);
  console.log(`API Key: ${process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing'}`);
  console.log(`API Secret: ${process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing'}\n`);

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.log('❌ Missing required Cloudinary environment variables!');
    console.log('Please add them to your server/.env file:');
    console.log('CLOUDINARY_CLOUD_NAME=your-cloud-name');
    console.log('CLOUDINARY_API_KEY=your-api-key');
    console.log('CLOUDINARY_API_SECRET=your-api-secret');
    return;
  }

  try {
    // Test API connection
    console.log('🔗 Testing API Connection...');
    const result = await cloudinary.api.ping();
    console.log('✅ Cloudinary API connection successful!\n');

    // Get account info
    console.log('📊 Account Information:');
    const accountInfo = await cloudinary.api.usage();
    console.log(`Plan: ${accountInfo.plan}`);
    console.log(`Storage: ${accountInfo.used / 1024 / 1024 / 1024} GB used`);
    console.log(`Bandwidth: ${accountInfo.bandwidth / 1024 / 1024 / 1024} GB used`);
    console.log(`Transformations: ${accountInfo.transformations.used} used\n`);

    // Test upload (optional - creates a test image)
    console.log('📤 Testing Upload Functionality...');
    console.log('This will create a test image in your Cloudinary account.');
    
    const uploadResult = await cloudinary.uploader.upload(
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwN2JmZiIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlRlc3Q8L3RleHQ+PC9zdmc+',
      {
        folder: 'rebirth-of-a-queen/test',
        public_id: 'test-image',
        overwrite: true
      }
    );

    console.log('✅ Test upload successful!');
    console.log(`Image URL: ${uploadResult.secure_url}`);
    console.log(`Public ID: ${uploadResult.public_id}\n`);

    // Test optimization
    console.log('⚡ Testing Image Optimization...');
    const optimizedUrl = cloudinary.url(uploadResult.public_id, {
      width: 200,
      height: 200,
      crop: 'fill',
      quality: 'auto',
      format: 'webp'
    });
    console.log(`Optimized URL: ${optimizedUrl}\n`);

    // Clean up test image
    console.log('🧹 Cleaning up test image...');
    await cloudinary.uploader.destroy(uploadResult.public_id);
    console.log('✅ Test image deleted successfully!\n');

    console.log('🎉 All Cloudinary tests passed! Your setup is working correctly.');
    console.log('\n📝 Next Steps:');
    console.log('1. Start your server: npm run dev');
    console.log('2. Go to Admin Dashboard → Products');
    console.log('3. Try uploading images to a product');
    console.log('4. Check your Cloudinary dashboard for uploaded files');

  } catch (error) {
    console.error('❌ Cloudinary test failed:', error.message);
    
    if (error.message.includes('Invalid signature')) {
      console.log('\n💡 This usually means your API credentials are incorrect.');
      console.log('Please check your Cloudinary credentials in server/.env');
    } else if (error.message.includes('Not found')) {
      console.log('\n💡 This usually means your cloud name is incorrect.');
      console.log('Please check your Cloudinary cloud name in server/.env');
    }
  }
}

// Run the test
testCloudinary();
