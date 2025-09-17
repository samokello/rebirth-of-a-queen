const express = require('express');
const router = express.Router();
const axios = require('axios');

// SMS Configuration
const SMS_CONFIG = {
  // For development, we'll use a mock SMS service
  // In production, you would use Twilio, Africa's Talking, or similar
  provider: process.env.SMS_PROVIDER || 'mock',
  apiKey: process.env.SMS_API_KEY,
  apiSecret: process.env.SMS_API_SECRET,
  fromNumber: process.env.SMS_FROM_NUMBER || '+254700000000'
};

// Mock SMS service for development
const mockSMSService = {
  sendSMS: async (to, message) => {
    console.log(`[MOCK SMS] Sending to ${to}: ${message}`);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate success/failure (90% success rate)
    const success = Math.random() > 0.1;
    
    return {
      success,
      messageId: success ? `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` : null,
      error: success ? null : 'Mock delivery failure'
    };
  }
};

// Twilio SMS service (for production)
const twilioSMSService = {
  sendSMS: async (to, message) => {
    try {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const fromNumber = process.env.TWILIO_FROM_NUMBER;
      
      if (!accountSid || !authToken || !fromNumber) {
        throw new Error('Twilio credentials not configured');
      }
      
      const response = await axios.post(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        {
          To: to,
          From: fromNumber,
          Body: message
        },
        {
          auth: {
            username: accountSid,
            password: authToken
          }
        }
      );
      
      return {
        success: true,
        messageId: response.data.sid,
        error: null
      };
    } catch (error) {
      console.error('Twilio SMS error:', error.response?.data || error.message);
      return {
        success: false,
        messageId: null,
        error: error.response?.data?.message || error.message
      };
    }
  }
};

// Africa's Talking SMS service (popular in Kenya)
const africasTalkingSMSService = {
  sendSMS: async (to, message) => {
    try {
      const apiKey = process.env.AFRICAS_TALKING_API_KEY;
      const username = process.env.AFRICAS_TALKING_USERNAME;
      const from = process.env.AFRICAS_TALKING_FROM || 'REBIRTH';
      
      if (!apiKey || !username) {
        throw new Error('Africa\'s Talking credentials not configured');
      }
      
      // Prepare form data for Africa's Talking API
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('to', to);
      formData.append('message', message);
      formData.append('from', from);
      
      const response = await axios.post(
        'https://api.africastalking.com/version1/messaging',
        formData,
        {
          headers: {
            'apiKey': apiKey,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      
      return {
        success: true,
        messageId: response.data.SMSMessageData.Recipients[0].messageId,
        error: null
      };
    } catch (error) {
      console.error('Africa\'s Talking SMS error:', error.response?.data || error.message);
      return {
        success: false,
        messageId: null,
        error: error.response?.data?.SMSMessageData?.Message || error.message
      };
    }
  }
};

// Get SMS service based on configuration
const getSMSService = () => {
  switch (SMS_CONFIG.provider) {
    case 'twilio':
      return twilioSMSService;
    case 'africas_talking':
      return africasTalkingSMSService;
    case 'mock':
    default:
      return mockSMSService;
  }
};

// Validate phone number format
const validatePhoneNumber = (phone) => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's a valid Kenyan number
  if (cleaned.startsWith('254') && cleaned.length === 12) {
    return `+${cleaned}`;
  }
  
  // Check if it's a valid international number
  if (cleaned.startsWith('254') && cleaned.length === 12) {
    return `+${cleaned}`;
  }
  
  // If it starts with 0, convert to international format
  if (cleaned.startsWith('0') && cleaned.length === 10) {
    return `+254${cleaned.substring(1)}`;
  }
  
  // If it starts with 7, 1, or 0, assume it's a Kenyan number
  if ((cleaned.startsWith('7') || cleaned.startsWith('1') || cleaned.startsWith('0')) && cleaned.length === 9) {
    return `+254${cleaned.startsWith('0') ? cleaned.substring(1) : cleaned}`;
  }
  
  return null;
};

// Send single SMS
router.post('/send', async (req, res) => {
  try {
    const { to, message, template, variables } = req.body;
    
    if (!to || !message) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and message are required'
      });
    }
    
    // Validate phone number
    const validatedPhone = validatePhoneNumber(to);
    if (!validatedPhone) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number format'
      });
    }
    
    // Process message template if provided
    let processedMessage = message;
    if (template && variables) {
      processedMessage = message.replace(/\{(\w+)\}/g, (match, key) => {
        return variables[key] || match;
      });
    }
    
    // Check message length
    if (processedMessage.length > 160) {
      return res.status(400).json({
        success: false,
        message: 'Message exceeds 160 character limit'
      });
    }
    
    // Send SMS
    const smsService = getSMSService();
    const result = await smsService.sendSMS(validatedPhone, processedMessage);
    
    if (result.success) {
      res.json({
        success: true,
        message: 'SMS sent successfully',
        data: {
          messageId: result.messageId,
          to: validatedPhone,
          message: processedMessage,
          timestamp: new Date().toISOString()
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send SMS',
        error: result.error
      });
    }
  } catch (error) {
    console.error('SMS send error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Send bulk SMS
router.post('/bulk-send', async (req, res) => {
  try {
    const { recipients, message, template, variables, scheduleDate, scheduleTime } = req.body;
    
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Recipients array is required and must not be empty'
      });
    }
    
    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }
    
    // Check message length
    if (message.length > 160) {
      return res.status(400).json({
        success: false,
        message: 'Message exceeds 160 character limit'
      });
    }
    
    // Validate all phone numbers
    const validatedRecipients = [];
    const invalidRecipients = [];
    
    recipients.forEach(recipient => {
      const validatedPhone = validatePhoneNumber(recipient.phone);
      if (validatedPhone) {
        validatedRecipients.push({
          ...recipient,
          phone: validatedPhone
        });
      } else {
        invalidRecipients.push(recipient);
      }
    });
    
    if (validatedRecipients.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid phone numbers found',
        invalidRecipients
      });
    }
    
    // Process message template if provided
    let processedMessage = message;
    if (template && variables) {
      processedMessage = message.replace(/\{(\w+)\}/g, (match, key) => {
        return variables[key] || match;
      });
    }
    
    // If scheduled, store for later processing
    if (scheduleDate && scheduleTime) {
      const scheduledDateTime = new Date(`${scheduleDate}T${scheduleTime}`);
      const now = new Date();
      
      if (scheduledDateTime <= now) {
        return res.status(400).json({
          success: false,
          message: 'Scheduled time must be in the future'
        });
      }
      
      // Store scheduled message (in production, this would go to a database)
      const scheduledMessage = {
        id: `scheduled_${Date.now()}`,
        recipients: validatedRecipients,
        message: processedMessage,
        scheduledFor: scheduledDateTime,
        status: 'scheduled',
        createdAt: new Date().toISOString()
      };
      
      return res.json({
        success: true,
        message: 'SMS scheduled successfully',
        data: {
          scheduledId: scheduledMessage.id,
          scheduledFor: scheduledDateTime.toISOString(),
          recipientsCount: validatedRecipients.length,
          invalidRecipients
        }
      });
    }
    
    // Send SMS to all recipients
    const smsService = getSMSService();
    const results = [];
    const batchId = `batch_${Date.now()}`;
    
    // Send SMS in batches to avoid overwhelming the service
    const batchSize = 10;
    for (let i = 0; i < validatedRecipients.length; i += batchSize) {
      const batch = validatedRecipients.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (recipient) => {
        try {
          const result = await smsService.sendSMS(recipient.phone, processedMessage);
          return {
            recipient,
            success: result.success,
            messageId: result.messageId,
            error: result.error
          };
        } catch (error) {
          return {
            recipient,
            success: false,
            messageId: null,
            error: error.message
          };
        }
      });
      
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      
      // Add delay between batches to avoid rate limiting
      if (i + batchSize < validatedRecipients.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // Calculate statistics
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    
    const bulkResult = {
      batchId,
      totalRecipients: validatedRecipients.length,
      successful: successful.length,
      failed: failed.length,
      results,
      invalidRecipients,
      message: processedMessage,
      timestamp: new Date().toISOString()
    };
    
    res.json({
      success: true,
      message: `Bulk SMS completed. ${successful.length} sent, ${failed.length} failed`,
      data: bulkResult
    });
    
  } catch (error) {
    console.error('Bulk SMS error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Get SMS history
router.get('/history', async (req, res) => {
  try {
    const { page = 1, limit = 20, status, startDate, endDate } = req.query;
    
    // In production, this would fetch from database
    // For now, return mock data
    const mockHistory = [
      {
        id: 1,
        batchId: 'batch_1705123456789',
        message: 'Thank you for your donation! Your support makes a difference.',
        recipients: 45,
        successful: 42,
        failed: 3,
        status: 'completed',
        template: 'Donation Thank You',
        createdAt: '2024-01-15T14:30:00Z',
        completedAt: '2024-01-15T14:32:00Z'
      },
      {
        id: 2,
        batchId: 'batch_1705034567890',
        message: 'Join us for our upcoming empowerment workshop this Saturday!',
        recipients: 120,
        successful: 118,
        failed: 2,
        status: 'completed',
        template: 'Event Invitation',
        createdAt: '2024-01-14T09:15:00Z',
        completedAt: '2024-01-14T09:18:00Z'
      },
      {
        id: 3,
        batchId: 'batch_1705215678901',
        message: 'Your scholarship application has been received and is under review.',
        recipients: 25,
        successful: 0,
        failed: 0,
        status: 'scheduled',
        template: 'Application Update',
        createdAt: '2024-01-16T16:45:00Z',
        scheduledFor: '2024-01-17T09:00:00Z'
      }
    ];
    
    // Apply filters
    let filteredHistory = mockHistory;
    
    if (status) {
      filteredHistory = filteredHistory.filter(item => item.status === status);
    }
    
    if (startDate) {
      filteredHistory = filteredHistory.filter(item => 
        new Date(item.createdAt) >= new Date(startDate)
      );
    }
    
    if (endDate) {
      filteredHistory = filteredHistory.filter(item => 
        new Date(item.createdAt) <= new Date(endDate)
      );
    }
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedHistory = filteredHistory.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: {
        history: paginatedHistory,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: filteredHistory.length,
          totalPages: Math.ceil(filteredHistory.length / limit)
        }
      }
    });
    
  } catch (error) {
    console.error('SMS history error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Get SMS statistics
router.get('/stats', async (req, res) => {
  try {
    // In production, this would calculate from database
    const stats = {
      totalSent: 2847,
      totalRecipients: 1234,
      deliveryRate: 98.5,
      scheduledMessages: 12,
      thisMonth: {
        sent: 245,
        successful: 241,
        failed: 4
      },
      thisWeek: {
        sent: 67,
        successful: 66,
        failed: 1
      }
    };
    
    res.json({
      success: true,
      data: stats
    });
    
  } catch (error) {
    console.error('SMS stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Get message templates
router.get('/templates', async (req, res) => {
  try {
    const templates = [
      {
        id: 'donation',
        name: 'Donation Thank You',
        message: 'Thank you for your generous donation of {amount}. Your support helps us empower more women and girls. We appreciate you!',
        category: 'donations'
      },
      {
        id: 'event',
        name: 'Event Invitation',
        message: 'You\'re invited to our {event_name} on {date} at {location}. RSVP by calling {phone}. We look forward to seeing you!',
        category: 'events'
      },
      {
        id: 'application',
        name: 'Application Update',
        message: 'Your {program_name} application has been {status}. We will contact you within 3-5 business days with further details.',
        category: 'applications'
      },
      {
        id: 'reminder',
        name: 'Payment Reminder',
        message: 'Friendly reminder: Your payment of {amount} is due on {due_date}. Please contact us if you need assistance.',
        category: 'payments'
      },
      {
        id: 'workshop',
        name: 'Workshop Reminder',
        message: 'Reminder: Your {workshop_name} workshop is tomorrow at {time}. Please bring {materials}. See you there!',
        category: 'workshops'
      }
    ];
    
    res.json({
      success: true,
      data: templates
    });
    
  } catch (error) {
    console.error('SMS templates error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Test SMS endpoint - for testing with your phone number
router.post('/test', async (req, res) => {
  try {
    const { phoneNumber, message = 'Hello from Rebirth of a Queen! This is a test SMS from our new system.' } = req.body;
    
    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      });
    }
    
    // Validate phone number
    const validatedPhone = validatePhoneNumber(phoneNumber);
    if (!validatedPhone) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number format. Please use format: 0712345678 or +254712345678'
      });
    }
    
    // Send test SMS
    const smsService = getSMSService();
    const result = await smsService.sendSMS(validatedPhone, message);
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Test SMS sent successfully!',
        data: {
          messageId: result.messageId,
          to: validatedPhone,
          message: message,
          timestamp: new Date().toISOString(),
          provider: SMS_CONFIG.provider
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send test SMS',
        error: result.error,
        provider: SMS_CONFIG.provider
      });
    }
  } catch (error) {
    console.error('Test SMS error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Health check for SMS service
router.get('/health', async (req, res) => {
  try {
    const smsService = getSMSService();
    
    // Test SMS service
    const testResult = await smsService.sendSMS('+254700000000', 'Test message');
    
    res.json({
      success: true,
      message: 'SMS service is healthy',
      data: {
        provider: SMS_CONFIG.provider,
        testResult: testResult.success ? 'passed' : 'failed',
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('SMS health check error:', error);
    res.status(500).json({
      success: false,
      message: 'SMS service is not healthy',
      error: error.message
    });
  }
});

module.exports = router; 