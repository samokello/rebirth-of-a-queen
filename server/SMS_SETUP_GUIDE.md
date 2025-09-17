# SMS Setup Guide for Rebirth of a Queen

## Overview
This guide will help you set up real SMS functionality for the Rebirth of a Queen website. You can test SMS sending with your phone number.

## Option 1: Africa's Talking (Recommended for Kenya)

### Step 1: Create Account
1. Go to [Africa's Talking](https://africastalking.com/)
2. Sign up for a free account
3. Verify your account

### Step 2: Get API Credentials
1. Log into your Africa's Talking dashboard
2. Go to "API Key" section
3. Copy your API Key and Username

### Step 3: Configure Environment
1. Open `server/.env` file
2. Update the following values:
```
SMS_PROVIDER=africas_talking
AFRICAS_TALKING_API_KEY=your_actual_api_key_here
AFRICAS_TALKING_USERNAME=your_actual_username_here
AFRICAS_TALKING_FROM=REBIRTH
```

## Option 2: Twilio (International)

### Step 1: Create Account
1. Go to [Twilio](https://www.twilio.com/)
2. Sign up for a free account
3. Verify your phone number

### Step 2: Get API Credentials
1. Log into your Twilio Console
2. Copy your Account SID and Auth Token
3. Get a Twilio phone number

### Step 3: Configure Environment
1. Open `server/.env` file
2. Update the following values:
```
SMS_PROVIDER=twilio
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_FROM_NUMBER=your_twilio_phone_number_here
```

## Option 3: Mock SMS (Development Only)

For development and testing without real SMS costs:
```
SMS_PROVIDER=mock
```

## Testing Your Setup

### Method 1: Admin Dashboard
1. Start the server: `cd server && npm start`
2. Start the client: `cd client && npm start`
3. Navigate to Admin Dashboard
4. Click the floating SMS button or go to Bulk SMS
5. Use the "Test SMS" section to send a test message

### Method 2: Direct API Testing
1. Start the server
2. Use curl or Postman to test:
```bash
curl -X POST http://localhost:5000/api/sms/test \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "0712345678",
    "message": "Hello from Rebirth of a Queen! This is a test SMS."
  }'
```

### Method 3: Health Check
```bash
curl http://localhost:5000/api/sms/health
```

## Phone Number Formats

The system accepts these formats:
- `0712345678` (Kenyan format)
- `+254712345678` (International format)
- `254712345678` (Without +)

## Cost Information

### Africa's Talking
- Free tier: 100 SMS per month
- Paid: ~KES 1 per SMS

### Twilio
- Free tier: Limited SMS
- Paid: ~$0.0075 per SMS

## Troubleshooting

### Common Issues

1. **"Invalid phone number format"**
   - Ensure phone number is in correct format
   - For Kenya: 0712345678 or +254712345678

2. **"API credentials not configured"**
   - Check your `.env` file
   - Ensure all required variables are set

3. **"SMS service not healthy"**
   - Check your internet connection
   - Verify API credentials
   - Check SMS provider account status

4. **"Message exceeds 160 character limit"**
   - Shorten your message
   - Split into multiple messages if needed

### Debug Mode

To see detailed logs, add to your `.env`:
```
DEBUG=true
NODE_ENV=development
```

## Security Notes

1. Never commit your `.env` file to version control
2. Keep your API keys secure
3. Monitor your SMS usage to avoid unexpected costs
4. Use environment variables for all sensitive data

## Next Steps

1. Test with your phone number
2. Configure webhook endpoints for delivery reports
3. Set up message templates
4. Implement rate limiting
5. Add SMS analytics and reporting

## Support

For issues with:
- **Africa's Talking**: Contact their support team
- **Twilio**: Check their documentation and support
- **Application**: Check the server logs and API responses 