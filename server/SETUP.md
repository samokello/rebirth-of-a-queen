# Server Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
Create a `.env` file in the server directory with:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/rebirth_queen

# CORS
CORS_ORIGIN=http://localhost:3000

# PayPal Configuration (Get from developer.paypal.com)
PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_SECRET=your_paypal_client_secret_here
PAYPAL_MODE=sandbox

# M-Pesa Configuration (Get from developer.safaricom.co.ke)
MPESA_CONSUMER_KEY=your_mpesa_consumer_key_here
MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret_here
MPESA_PASSKEY=your_mpesa_passkey_here
MPESA_BUSINESS_SHORT_CODE=your_business_short_code_here
MPESA_ENVIRONMENT=sandbox
```

### 3. Start the Server
```bash
npm start
```

### 4. Test Endpoints

#### Health Check
```bash
curl http://localhost:5000/api/health
```

#### Test Endpoint
```bash
curl http://localhost:5000/api/test
```

#### Create Donation (Mock)
```bash
curl -X POST http://localhost:5000/api/donations \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "amount": 50,
    "paymentMethod": "paypal"
  }'
```

#### M-Pesa STK Push (Mock)
```bash
curl -X POST http://localhost:5000/api/mpesa/stk-push \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "254700000000",
    "amount": 100,
    "donationId": "test_donation_id"
  }'
```

#### PayPal Create Order (Mock)
```bash
curl -X POST http://localhost:5000/api/paypal/create-order \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50,
    "currency": "USD",
    "donationId": "test_donation_id"
  }'
```

## 🔧 Configuration

### PayPal Setup
1. Go to [developer.paypal.com](https://developer.paypal.com)
2. Create a developer account
3. Create a new app
4. Get Client ID and Secret
5. Update `.env` file

### M-Pesa Setup (Kenya Only)
1. Go to [developer.safaricom.co.ke](https://developer.safaricom.co.ke)
2. Register for M-Pesa API
3. Get Consumer Key, Secret, and Passkey
4. Update `.env` file

### Database Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Update `MONGODB_URI` in `.env`

## 🧪 Testing

### Frontend Integration
1. Start the frontend: `cd ../client && npm start`
2. Go to http://localhost:3000/donate
3. Test donation form with different payment methods

### API Testing
Use tools like:
- Postman
- Insomnia
- curl commands above

## 🐛 Troubleshooting

### Server Won't Start
- Check if port 5000 is available
- Verify all dependencies are installed
- Check `.env` file exists

### Database Connection Error
- Verify MongoDB is running
- Check `MONGODB_URI` in `.env`
- Try using MongoDB Atlas for cloud database

### Payment Integration Issues
- Verify API credentials in `.env`
- Check network connectivity
- Review payment provider documentation

## 📞 Support

For issues:
1. Check the console logs
2. Verify environment variables
3. Test individual endpoints
4. Check payment provider status 