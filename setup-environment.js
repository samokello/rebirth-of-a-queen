const fs = require('fs');
const path = require('path');

// Environment variables template
const envTemplate = `# Database Configuration
MONGODB_URI=mongodb://localhost:27017/rebirth-of-a-queen
# For MongoDB Atlas, use: mongodb+srv://username:password@cluster.mongodb.net/rebirth-of-a-queen

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-${Date.now()}
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Email Configuration (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# SMS Configuration (optional)
SMS_API_KEY=your-sms-api-key
SMS_SENDER_ID=your-sender-id

# M-Pesa Configuration (optional)
MPESA_CONSUMER_KEY=your-mpesa-consumer-key
MPESA_CONSUMER_SECRET=your-mpesa-consumer-secret
MPESA_BUSINESS_SHORTCODE=your-business-shortcode
MPESA_PASSKEY=your-mpesa-passkey
MPESA_ENVIRONMENT=sandbox

# PayPal Configuration (optional)
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
PAYPAL_MODE=sandbox`;

// Create .env file in root directory
const rootEnvPath = path.join(__dirname, '.env');
if (!fs.existsSync(rootEnvPath)) {
  fs.writeFileSync(rootEnvPath, envTemplate);
  console.log('✅ Created .env file in root directory');
} else {
  console.log('⚠️  .env file already exists in root directory');
}

// Create .env file in server directory
const serverEnvPath = path.join(__dirname, 'server', '.env');
if (!fs.existsSync(serverEnvPath)) {
  fs.writeFileSync(serverEnvPath, envTemplate);
  console.log('✅ Created .env file in server directory');
} else {
  console.log('⚠️  .env file already exists in server directory');
}

console.log('\n🔧 Environment Setup Complete!');
console.log('\n📝 Next Steps:');
console.log('1. Update the .env file with your actual configuration values');
console.log('2. For Cloudinary (image uploads), get your credentials from: https://cloudinary.com/');
console.log('3. For MongoDB Atlas, update the MONGODB_URI with your connection string');
console.log('4. Run: npm install (in both root and server directories)');
console.log('5. Run: node setup-admin.js (to create admin user)');
console.log('6. Start the server: cd server && npm start');
console.log('7. Start the client: cd client && npm start');
console.log('\n🔑 Admin Credentials:');
console.log('Email: admin@rebirthofaqueen.org');
console.log('Password: admin123');
