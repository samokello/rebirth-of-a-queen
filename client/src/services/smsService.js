const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class SMSService {
  // Send single SMS
  static async sendSMS(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/sms/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to send SMS');
      }

      return result;
    } catch (error) {
      console.error('SMS send error:', error);
      throw error;
    }
  }

  // Send bulk SMS
  static async sendBulkSMS(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/sms/bulk-send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to send bulk SMS');
      }

      return result;
    } catch (error) {
      console.error('Bulk SMS send error:', error);
      throw error;
    }
  }

  // Get SMS history
  static async getSMSHistory(params = {}) {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/sms/history?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch SMS history');
      }

      return result;
    } catch (error) {
      console.error('SMS history error:', error);
      throw error;
    }
  }

  // Get SMS statistics
  static async getSMSStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/sms/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch SMS statistics');
      }

      return result;
    } catch (error) {
      console.error('SMS stats error:', error);
      throw error;
    }
  }

  // Get SMS templates
  static async getSMSTemplates() {
    try {
      const response = await fetch(`${API_BASE_URL}/sms/templates`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch SMS templates');
      }

      return result;
    } catch (error) {
      console.error('SMS templates error:', error);
      throw error;
    }
  }

  // Check SMS service health
  static async checkSMSHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/sms/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'SMS service is not healthy');
      }

      return result;
    } catch (error) {
      console.error('SMS health check error:', error);
      throw error;
    }
  }

  // Validate phone number
  static validatePhoneNumber(phone) {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Check if it's a valid Kenyan number
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
  }

  // Format phone number for display
  static formatPhoneNumber(phone) {
    const validated = this.validatePhoneNumber(phone);
    if (!validated) return phone;
    
    // Format as +254 7XX XXX XXX
    const cleaned = validated.replace('+254', '');
    return `+254 ${cleaned.substring(0, 3)} ${cleaned.substring(3, 6)} ${cleaned.substring(6)}`;
  }

  // Calculate message cost (approximate)
  static calculateMessageCost(message, recipientCount) {
    const messageLength = message.length;
    const messagesNeeded = Math.ceil(messageLength / 160);
    const costPerMessage = 1; // KES per SMS (approximate)
    
    return {
      messagesNeeded,
      totalCost: messagesNeeded * recipientCount * costPerMessage,
      costPerRecipient: messagesNeeded * costPerMessage
    };
  }

  // Process message template
  static processMessageTemplate(template, variables) {
    if (!template || !variables) return template;
    
    return template.replace(/\{(\w+)\}/g, (match, key) => {
      return variables[key] || match;
    });
  }
}

export default SMSService; 