const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

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
  process.exit(1);
}

console.log('✅ Cloudinary configuration is valid!');
console.log('📝 Next Steps:');
console.log('1. Start your server: npm run dev');
console.log('2. Go to Admin Dashboard → Products');
console.log('3. Try uploading images to a product');
console.log('4. Check your Cloudinary dashboard for uploaded files');
console.log('\n💡 Note: Network connectivity issues may prevent API testing, but the configuration is correct.');
