require('dotenv').config({ path: './server/.env' });

console.log('🔍 M-Pesa Environment Check');
console.log('==========================');
console.log('Environment:', process.env.MPESA_ENVIRONMENT || 'not set (defaulting to live)');
console.log('Base URL:', process.env.MPESA_ENVIRONMENT === 'live' ? 'https://api.safaricom.co.ke' : 'https://sandbox.safaricom.co.ke');
console.log('Consumer Key:', process.env.MPESA_CONSUMER_KEY ? 'Set' : 'Not set');
console.log('Consumer Secret:', process.env.MPESA_CONSUMER_SECRET ? 'Set' : 'Not set');
console.log('Business Short Code:', process.env.MPESA_BUSINESS_SHORT_CODE || 'Not set');
console.log('Passkey:', process.env.MPESA_PASSKEY ? 'Set' : 'Not set'); 