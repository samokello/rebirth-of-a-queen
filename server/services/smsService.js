const axios = require('axios');

class SMSService {
  constructor() {
    this.apiKey = process.env.SMS_API_KEY;
    this.senderId = process.env.SMS_SENDER_ID || 'REBIRTH';
    this.baseUrl = 'https://api.africastalking.com/version1/messaging';
  }

  // Send thank you SMS to donor
  async sendDonationThankYouSMS(donation) {
    try {
      const { firstName, lastName, phone, amount, currency, transactionId } = donation;
      
      if (!phone) {
        console.log('No phone number provided for SMS');
        return { success: false, error: 'No phone number provided' };
      }

      // Format phone number (remove + if present and ensure it starts with country code)
      let formattedPhone = phone.replace(/^\+/, '');
      if (!formattedPhone.startsWith('254')) {
        formattedPhone = '254' + formattedPhone.replace(/^0/, '');
      }

      const message = `Dear ${firstName}, thank you for your generous donation of ${currency} ${amount} to Rebirth of a Queen! Your support helps us empower women and girls in our community. Transaction ID: ${transactionId}. Visit rebirthofaqueen.org to see our impact.`;

      const payload = {
        username: process.env.AT_USERNAME,
        to: formattedPhone,
        message: message,
        from: this.senderId
      };

      const response = await axios.post(this.baseUrl, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'apiKey': this.apiKey
        }
      });

      console.log('Thank you SMS sent successfully:', response.data);
      return { success: true, messageId: response.data.SMSMessageData?.Recipients?.[0]?.messageId };

    } catch (error) {
      console.error('Error sending thank you SMS:', error.response?.data || error.message);
      return { success: false, error: error.message };
    }
  }

  // Send donation receipt SMS
  async sendDonationReceiptSMS(donation) {
    try {
      const { firstName, phone, amount, currency, transactionId } = donation;
      
      if (!phone) {
        console.log('No phone number provided for SMS receipt');
        return { success: false, error: 'No phone number provided' };
      }

      let formattedPhone = phone.replace(/^\+/, '');
      if (!formattedPhone.startsWith('254')) {
        formattedPhone = '254' + formattedPhone.replace(/^0/, '');
      }

      const message = `Receipt: ${firstName}, your donation of ${currency} ${amount} has been received. Transaction ID: ${transactionId}. A detailed receipt has been sent to your email. Thank you for supporting Rebirth of a Queen!`;

      const payload = {
        username: process.env.AT_USERNAME,
        to: formattedPhone,
        message: message,
        from: this.senderId
      };

      const response = await axios.post(this.baseUrl, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'apiKey': this.apiKey
        }
      });

      console.log('Donation receipt SMS sent successfully:', response.data);
      return { success: true, messageId: response.data.SMSMessageData?.Recipients?.[0]?.messageId };

    } catch (error) {
      console.error('Error sending donation receipt SMS:', error.response?.data || error.message);
      return { success: false, error: error.message };
    }
  }

  // Send admin notification SMS
  async sendAdminNotificationSMS(donation) {
    try {
      const { firstName, lastName, amount, currency, paymentMethod } = donation;
      const adminPhone = process.env.ADMIN_PHONE;
      
      if (!adminPhone) {
        console.log('No admin phone number configured for SMS notification');
        return { success: false, error: 'No admin phone number configured' };
      }

      let formattedPhone = adminPhone.replace(/^\+/, '');
      if (!formattedPhone.startsWith('254')) {
        formattedPhone = '254' + formattedPhone.replace(/^0/, '');
      }

      const message = `New donation received: ${firstName} ${lastName} donated ${currency} ${amount} via ${paymentMethod}. Check admin panel for details.`;

      const payload = {
        username: process.env.AT_USERNAME,
        to: formattedPhone,
        message: message,
        from: this.senderId
      };

      const response = await axios.post(this.baseUrl, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'apiKey': this.apiKey
        }
      });

      console.log('Admin notification SMS sent successfully:', response.data);
      return { success: true, messageId: response.data.SMSMessageData?.Recipients?.[0]?.messageId };

    } catch (error) {
      console.error('Error sending admin notification SMS:', error.response?.data || error.message);
      return { success: false, error: error.message };
    }
  }

  // Send contact notification SMS to admin
  async sendContactNotificationSMS(contact) {
    try {
      const { name, email, subject } = contact;
      const adminPhone = process.env.ADMIN_PHONE;
      
      if (!adminPhone) {
        console.log('No admin phone number configured for SMS notification');
        return { success: false, error: 'No admin phone number configured' };
      }

      let formattedPhone = adminPhone.replace(/^\+/, '');
      if (!formattedPhone.startsWith('254')) {
        formattedPhone = '254' + formattedPhone.replace(/^0/, '');
      }

      const message = `New contact form from ${name} (${email}). Subject: ${subject}. Please check your email for details.`;

      const payload = {
        username: process.env.AT_USERNAME,
        to: formattedPhone,
        message: message,
        from: this.senderId
      };

      const response = await axios.post(this.baseUrl, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'apiKey': this.apiKey
        }
      });

      console.log('Contact notification SMS sent successfully:', response.data);
      return { success: true, messageId: response.data.SMSMessageData?.Recipients?.[0]?.messageId };

    } catch (error) {
      console.error('Error sending contact notification SMS:', error.response?.data || error.message);
      return { success: false, error: error.message };
    }
  }

  // Send application confirmation SMS to applicant
  async sendApplicationConfirmationSMS(application) {
    try {
      const { firstName, lastName, phone, program } = application;
      
      if (!phone) {
        console.log('No phone number provided for application SMS');
        return { success: false, error: 'No phone number provided' };
      }

      let formattedPhone = phone.replace(/^\+/, '');
      if (!formattedPhone.startsWith('254')) {
        formattedPhone = '254' + formattedPhone.replace(/^0/, '');
      }

      const message = `Dear ${firstName}, thank you for applying to our ${program} program! We have received your application and will review it within 48 hours. You will receive an email with our decision. Application ID: ${application._id}.`;

      const payload = {
        username: process.env.AT_USERNAME,
        to: formattedPhone,
        message: message,
        from: this.senderId
      };

      const response = await axios.post(this.baseUrl, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'apiKey': this.apiKey
        }
      });

      console.log('Application confirmation SMS sent successfully:', response.data);
      return { success: true, messageId: response.data.SMSMessageData?.Recipients?.[0]?.messageId };

    } catch (error) {
      console.error('Error sending application confirmation SMS:', error.response?.data || error.message);
      return { success: false, error: error.message };
    }
  }

  // Send application notification SMS to admin
  async sendApplicationNotificationSMS(application) {
    try {
      const { firstName, lastName, phone, program } = application;
      const adminPhone = process.env.ADMIN_PHONE;
      
      if (!adminPhone) {
        console.log('No admin phone number configured for SMS notification');
        return { success: false, error: 'No admin phone number configured' };
      }

      let formattedPhone = adminPhone.replace(/^\+/, '');
      if (!formattedPhone.startsWith('254')) {
        formattedPhone = '254' + formattedPhone.replace(/^0/, '');
      }

      const message = `New application from ${firstName} ${lastName} for ${program} program. Phone: ${phone}. Please check your email for full details.`;

      const payload = {
        username: process.env.AT_USERNAME,
        to: formattedPhone,
        message: message,
        from: this.senderId
      };

      const response = await axios.post(this.baseUrl, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'apiKey': this.apiKey
        }
      });

      console.log('Application notification SMS sent successfully:', response.data);
      return { success: true, messageId: response.data.SMSMessageData?.Recipients?.[0]?.messageId };

    } catch (error) {
      console.error('Error sending application notification SMS:', error.response?.data || error.message);
      return { success: false, error: error.message };
    }
  }

  // Send application accepted SMS
  async sendApplicationAcceptedSMS(application) {
    try {
      const { firstName, lastName, phone, program } = application;
      
      if (!phone) {
        console.log('No phone number provided for acceptance SMS');
        return { success: false, error: 'No phone number provided' };
      }

      let formattedPhone = phone.replace(/^\+/, '');
      if (!formattedPhone.startsWith('254')) {
        formattedPhone = '254' + formattedPhone.replace(/^0/, '');
      }

      const message = `🎉 Congratulations ${firstName}! Your application for ${program} program has been ACCEPTED! Our team will contact you within 24 hours with next steps. Welcome to Rebirth of a Queen!`;

      const payload = {
        username: process.env.AT_USERNAME,
        to: formattedPhone,
        message: message,
        from: this.senderId
      };

      const response = await axios.post(this.baseUrl, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'apiKey': this.apiKey
        }
      });

      console.log('Application accepted SMS sent successfully:', response.data);
      return { success: true, messageId: response.data.SMSMessageData?.Recipients?.[0]?.messageId };

    } catch (error) {
      console.error('Error sending application accepted SMS:', error.response?.data || error.message);
      return { success: false, error: error.message };
    }
  }

  // Send application rejected SMS
  async sendApplicationRejectedSMS(application) {
    try {
      const { firstName, lastName, phone, program } = application;
      
      if (!phone) {
        console.log('No phone number provided for rejection SMS');
        return { success: false, error: 'No phone number provided' };
      }

      let formattedPhone = phone.replace(/^\+/, '');
      if (!formattedPhone.startsWith('254')) {
        formattedPhone = '254' + formattedPhone.replace(/^0/, '');
      }

      const message = `Dear ${firstName}, thank you for your interest in our ${program} program. After careful review, we regret to inform you that we are unable to offer you a place at this time. We encourage you to apply for other programs or future opportunities.`;

      const payload = {
        username: process.env.AT_USERNAME,
        to: formattedPhone,
        message: message,
        from: this.senderId
      };

      const response = await axios.post(this.baseUrl, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'apiKey': this.apiKey
        }
      });

      console.log('Application rejected SMS sent successfully:', response.data);
      return { success: true, messageId: response.data.SMSMessageData?.Recipients?.[0]?.messageId };

    } catch (error) {
      console.error('Error sending application rejected SMS:', error.response?.data || error.message);
      return { success: false, error: error.message };
    }
  }

  // Send application waitlisted SMS
  async sendApplicationWaitlistedSMS(application) {
    try {
      const { firstName, lastName, phone, program } = application;
      
      if (!phone) {
        console.log('No phone number provided for waitlist SMS');
        return { success: false, error: 'No phone number provided' };
      }

      let formattedPhone = phone.replace(/^\+/, '');
      if (!formattedPhone.startsWith('254')) {
        formattedPhone = '254' + formattedPhone.replace(/^0/, '');
      }

      const message = `Dear ${firstName}, your application for ${program} program has been placed on our waitlist. Your application is strong, but our current program is at full capacity. We will contact you if a spot becomes available.`;

      const payload = {
        username: process.env.AT_USERNAME,
        to: formattedPhone,
        message: message,
        from: this.senderId
      };

      const response = await axios.post(this.baseUrl, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'apiKey': this.apiKey
        }
      });

      console.log('Application waitlisted SMS sent successfully:', response.data);
      return { success: true, messageId: response.data.SMSMessageData?.Recipients?.[0]?.messageId };

    } catch (error) {
      console.error('Error sending application waitlisted SMS:', error.response?.data || error.message);
      return { success: false, error: error.message };
    }
  }

  // Send bulk SMS to donors
  async sendBulkSMS(recipients, message) {
    try {
      const formattedRecipients = recipients.map(phone => {
        let formatted = phone.replace(/^\+/, '');
        if (!formatted.startsWith('254')) {
          formatted = '254' + formatted.replace(/^0/, '');
        }
        return formatted;
      });

      const payload = {
        username: process.env.AT_USERNAME,
        to: formattedRecipients.join(','),
        message: message,
        from: this.senderId
      };

      const response = await axios.post(this.baseUrl, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'apiKey': this.apiKey
        }
      });

      console.log('Bulk SMS sent successfully:', response.data);
      return { success: true, data: response.data };

    } catch (error) {
      console.error('Error sending bulk SMS:', error.response?.data || error.message);
      return { success: false, error: error.message };
    }
  }

  // Check SMS balance
  async checkBalance() {
    try {
      const response = await axios.get(`${this.baseUrl}/user`, {
        headers: {
          'apiKey': this.apiKey
        },
        params: {
          username: process.env.AT_USERNAME
        }
      });

      return { success: true, balance: response.data.User.balance };

    } catch (error) {
      console.error('Error checking SMS balance:', error.response?.data || error.message);
      return { success: false, error: error.message };
    }
  }

  // Send admin response SMS to applicant
  async sendAdminResponseSMS(application, responseData) {
    try {
      const { message } = responseData;
      const { firstName, phone } = application;

      // Format phone number
      let formattedPhone = phone.replace(/^\+/, '');
      if (!formattedPhone.startsWith('254')) {
        formattedPhone = '254' + formattedPhone.replace(/^0/, '');
      }

      const smsMessage = `Dear ${firstName},\n\n${message}\n\nBest regards,\nRebirth of a Queen Team`;

      const payload = {
        username: process.env.AT_USERNAME,
        to: formattedPhone,
        message: smsMessage,
        from: this.senderId
      };

      const response = await axios.post(this.baseUrl, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'apiKey': this.apiKey
        }
      });

      console.log('Admin response SMS sent successfully:', response.data);
      return { success: true, messageId: response.data.SMSMessageData?.Recipients?.[0]?.messageId };

    } catch (error) {
      console.error('Error sending admin response SMS:', error.response?.data || error.message);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new SMSService(); 