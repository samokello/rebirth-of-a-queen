# Bulk SMS Management System

This document describes the bulk SMS functionality implemented for the Rebirth of A Queen admin panel.

## Features

### 🚀 Core Features
- **Bulk SMS Sending**: Send messages to multiple recipients simultaneously
- **Message Templates**: Pre-defined templates for common messages (donations, events, applications, etc.)
- **Scheduling**: Schedule messages for future delivery
- **Recipient Management**: Select recipients from a list or import via CSV
- **Message History**: Track all sent messages with delivery status
- **Statistics Dashboard**: View SMS metrics and delivery rates
- **Phone Number Validation**: Automatic validation and formatting of Kenyan phone numbers

### 📱 SMS Service Integration
- **Mock Service**: For development and testing
- **Twilio Integration**: For production use (international)
- **Africa's Talking Integration**: Popular SMS provider in Kenya

## Setup Instructions

### 1. Backend Setup

1. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the server directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000

   # SMS Configuration
   SMS_PROVIDER=mock
   
   # For Twilio (production)
   # TWILIO_ACCOUNT_SID=your_twilio_account_sid
   # TWILIO_AUTH_TOKEN=your_twilio_auth_token
   # TWILIO_FROM_NUMBER=+254700000000

   # For Africa's Talking (popular in Kenya)
   # AFRICAS_TALKING_API_KEY=your_africas_talking_api_key
   # AFRICAS_TALKING_USERNAME=your_africas_talking_username
   # AFRICAS_TALKING_FROM=REBIRTH
   ```

3. **Start the Server**
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. **Install Dependencies** (if not already installed)
   ```bash
   cd client
   npm install
   ```

2. **Start the Frontend**
   ```bash
   npm start
   ```

3. **Access the SMS Dashboard**
   - Navigate to `/admin/bulk-sms` in your browser
   - Or click the "Bulk SMS" button in the admin dashboard

## API Endpoints

### SMS Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/sms/send` | Send single SMS |
| POST | `/api/sms/bulk-send` | Send bulk SMS |
| GET | `/api/sms/history` | Get SMS history |
| GET | `/api/sms/stats` | Get SMS statistics |
| GET | `/api/sms/templates` | Get message templates |
| GET | `/api/sms/health` | Check SMS service health |

### Example API Usage

#### Send Bulk SMS
```javascript
const response = await fetch('/api/sms/bulk-send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    recipients: [
      { name: 'John Doe', phone: '+254712345678' },
      { name: 'Jane Smith', phone: '+254723456789' }
    ],
    message: 'Thank you for your donation!',
    template: 'donation',
    scheduleDate: '2024-01-20',
    scheduleTime: '09:00'
  })
});
```

## Message Templates

The system includes pre-defined templates for common use cases:

1. **Donation Thank You**
   - Template: `Thank you for your generous donation of {amount}. Your support helps us empower more women and girls. We appreciate you!`

2. **Event Invitation**
   - Template: `You're invited to our {event_name} on {date} at {location}. RSVP by calling {phone}. We look forward to seeing you!`

3. **Application Update**
   - Template: `Your {program_name} application has been {status}. We will contact you within 3-5 business days with further details.`

4. **Payment Reminder**
   - Template: `Friendly reminder: Your payment of {amount} is due on {due_date}. Please contact us if you need assistance.`

5. **Workshop Reminder**
   - Template: `Reminder: Your {workshop_name} workshop is tomorrow at {time}. Please bring {materials}. See you there!`

## Phone Number Validation

The system automatically validates and formats Kenyan phone numbers:

- **Input Formats Supported**:
  - `0712345678` (local format)
  - `+254712345678` (international format)
  - `254712345678` (without +)

- **Output Format**: `+254712345678` (standardized international format)

## SMS Service Providers

### 1. Mock Service (Development)
- **Provider**: `mock`
- **Use Case**: Development and testing
- **Features**: Simulates SMS sending with 90% success rate
- **Cost**: Free

### 2. Twilio (Production - International)
- **Provider**: `twilio`
- **Use Case**: International SMS delivery
- **Setup**: Requires Twilio account and credentials
- **Cost**: Pay-per-message

### 3. Africa's Talking (Production - Kenya)
- **Provider**: `africas_talking`
- **Use Case**: SMS delivery in Kenya and East Africa
- **Setup**: Requires Africa's Talking account
- **Cost**: Competitive rates for African markets

## Usage Guide

### 1. Composing a Message
1. Select a message template or write a custom message
2. Use placeholders like `{name}`, `{amount}`, `{date}` for personalization
3. Preview your message before sending
4. Check character count (160 character limit per SMS)

### 2. Selecting Recipients
1. Choose from the existing recipient list
2. Use "Select All" to include all recipients
3. Import recipients via CSV file
4. Add individual recipients manually

### 3. Scheduling Messages
1. Set a future date and time for delivery
2. Messages are queued and sent automatically
3. View scheduled messages in the history

### 4. Monitoring Delivery
1. Check the message history for delivery status
2. View statistics for successful vs failed deliveries
3. Export delivery reports

## Security Considerations

1. **API Rate Limiting**: Implemented to prevent abuse
2. **Phone Number Validation**: Prevents invalid numbers
3. **Message Length Limits**: Prevents excessive costs
4. **Admin Authentication**: Required for all SMS operations

## Cost Management

- **Message Cost**: Approximately 1 KES per SMS in Kenya
- **Character Limits**: 160 characters per SMS
- **Bulk Discounts**: Available with some providers
- **Failed Delivery**: No charge for failed deliveries

## Troubleshooting

### Common Issues

1. **SMS Not Sending**
   - Check SMS service provider configuration
   - Verify phone number format
   - Check API credentials

2. **High Failure Rate**
   - Validate phone numbers
   - Check message content
   - Verify provider account balance

3. **Scheduled Messages Not Delivering**
   - Check server timezone settings
   - Verify scheduled time is in the future
   - Check server logs for errors

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
```

This will log all SMS operations to the console.

## Future Enhancements

1. **Database Integration**: Store SMS history and recipient data
2. **Advanced Analytics**: Detailed delivery reports and insights
3. **Two-Way SMS**: Handle incoming messages and responses
4. **Message Personalization**: Dynamic content based on recipient data
5. **A/B Testing**: Test different message variations
6. **Integration APIs**: Connect with CRM and other systems

## Support

For technical support or questions about the SMS system:
- Check the server logs for error messages
- Verify your SMS provider configuration
- Ensure all environment variables are set correctly
- Test with the mock service first before switching to production providers 