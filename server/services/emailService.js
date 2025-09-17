const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  // Send thank you email to donor
  async sendDonationThankYouEmail(donation) {
    try {
      const { firstName, lastName, email, amount, currency, paymentMethod, transactionId } = donation;
      
      const mailOptions = {
        from: `"Rebirth of a Queen" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Thank You for Your Generous Donation! 🎉',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You for Your Donation</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .amount { font-size: 2em; color: #e74c3c; font-weight: bold; }
              .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #666; }
              .button { display: inline-block; background: #e74c3c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Thank You for Your Generous Donation!</h1>
                <p>Dear ${firstName} ${lastName},</p>
              </div>
              
              <div class="content">
                <p>We are incredibly grateful for your generous donation to <strong>Rebirth of a Queen</strong>. Your support means the world to us and will help us continue our mission of empowering women and girls in our community.</p>
                
                <div class="details">
                  <h3>Donation Details:</h3>
                  <p><strong>Amount:</strong> <span class="amount">${currency} ${amount}</span></p>
                  <p><strong>Payment Method:</strong> ${paymentMethod}</p>
                  <p><strong>Transaction ID:</strong> ${transactionId}</p>
                  <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                </div>
                
                <p>Your donation will be used to:</p>
                <ul>
                  <li>Support women's education and skills training programs</li>
                  <li>Provide resources for community development initiatives</li>
                  <li>Fund youth leadership and empowerment programs</li>
                  <li>Support our various community outreach programs</li>
                </ul>
                
                <p>We will keep you updated on how your donation is making a difference in our community. You can also visit our website to see our latest programs and initiatives.</p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" class="button">Visit Our Website</a>
                </div>
                
                <p>Once again, thank you for your generosity and support. Together, we are making a real difference in the lives of women and girls in our community.</p>
                
                <p>With gratitude,<br>
                <strong>The Rebirth of a Queen Team</strong></p>
              </div>
              
              <div class="footer">
                <p>This is an automated email. Please do not reply to this message.</p>
                <p>If you have any questions, please contact us at support@rebirthofaqueen.org</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Thank you email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
      
    } catch (error) {
      console.error('Error sending thank you email:', error);
      return { success: false, error: error.message };
    }
  }

  // Send donation receipt
  async sendDonationReceipt(donation) {
    try {
      const { firstName, lastName, email, amount, currency, paymentMethod, transactionId, createdAt } = donation;
      
      const mailOptions = {
        from: `"Rebirth of a Queen" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Donation Receipt - Rebirth of a Queen',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Donation Receipt</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #2c3e50; color: white; padding: 20px; text-align: center; }
              .receipt { background: white; border: 2px solid #e74c3c; padding: 30px; margin: 20px 0; }
              .amount { font-size: 2.5em; color: #e74c3c; font-weight: bold; text-align: center; }
              .details { margin: 20px 0; }
              .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 10px 0; border-bottom: 1px solid #eee; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 0.9em; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Donation Receipt</h1>
                <p>Rebirth of a Queen</p>
              </div>
              
              <div class="receipt">
                <div class="amount">${currency} ${amount}</div>
                
                <div class="details">
                  <div class="detail-row">
                    <strong>Donor Name:</strong>
                    <span>${firstName} ${lastName}</span>
                  </div>
                  <div class="detail-row">
                    <strong>Email:</strong>
                    <span>${email}</span>
                  </div>
                  <div class="detail-row">
                    <strong>Transaction ID:</strong>
                    <span>${transactionId}</span>
                  </div>
                  <div class="detail-row">
                    <strong>Payment Method:</strong>
                    <span>${paymentMethod}</span>
                  </div>
                  <div class="detail-row">
                    <strong>Date:</strong>
                    <span>${new Date(createdAt).toLocaleDateString()}</span>
                  </div>
                  <div class="detail-row">
                    <strong>Status:</strong>
                    <span style="color: #27ae60; font-weight: bold;">Completed</span>
                  </div>
                </div>
                
                <p style="text-align: center; margin-top: 30px; color: #666;">
                  Thank you for your generous donation to Rebirth of a Queen.<br>
                  Your support helps us empower women and girls in our community.
                </p>
              </div>
              
              <div class="footer">
                <p>This receipt serves as proof of your donation for tax purposes.</p>
                <p>Rebirth of a Queen is a registered non-profit organization.</p>
                <p>For questions, contact: support@rebirthofaqueen.org</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Donation receipt sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
      
    } catch (error) {
      console.error('Error sending donation receipt:', error);
      return { success: false, error: error.message };
    }
  }

  // Send admin notification
  async sendAdminNotification(donation) {
    try {
      const { firstName, lastName, email, amount, currency, paymentMethod } = donation;
      
      const mailOptions = {
        from: `"Rebirth of a Queen" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL || 'admin@rebirthofaqueen.org',
        subject: 'New Donation Received - Rebirth of a Queen',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Donation</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #27ae60; color: white; padding: 20px; text-align: center; }
              .content { background: #f9f9f9; padding: 30px; }
              .amount { font-size: 2em; color: #e74c3c; font-weight: bold; }
              .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 New Donation Received!</h1>
              </div>
              
              <div class="content">
                <p>A new donation has been received through the website.</p>
                
                <div class="details">
                  <h3>Donation Details:</h3>
                  <p><strong>Donor:</strong> ${firstName} ${lastName}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Amount:</strong> <span class="amount">${currency} ${amount}</span></p>
                  <p><strong>Payment Method:</strong> ${paymentMethod}</p>
                  <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                </div>
                
                <p>Please review the donation in the admin panel and ensure all communications have been sent to the donor.</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Admin notification sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
      
    } catch (error) {
      console.error('Error sending admin notification:', error);
      return { success: false, error: error.message };
    }
  }

  // Send contact confirmation email
  async sendContactConfirmationEmail(contact) {
    try {
      const { name, email, subject, message } = contact;
      
      const mailOptions = {
        from: `"Rebirth of a Queen" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Thank You for Contacting Us! 📧',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact Confirmation</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📧 Thank You for Contacting Us!</h1>
                <p>Dear ${name},</p>
              </div>
              
              <div class="content">
                <p>Thank you for reaching out to <strong>Rebirth of a Queen</strong>. We have received your message and will get back to you as soon as possible.</p>
                
                <div class="details">
                  <h3>Your Message Details:</h3>
                  <p><strong>Subject:</strong> ${subject}</p>
                  <p><strong>Message:</strong></p>
                  <p style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">${message}</p>
                  <p><strong>Submitted:</strong> ${new Date().toLocaleDateString()}</p>
                </div>
                
                <p>Our team typically responds within 24-48 hours. If your inquiry is urgent, please feel free to call us at <strong>+254 700 000 000</strong>.</p>
                
                <p>In the meantime, you can:</p>
                <ul>
                  <li>Visit our website to learn more about our programs</li>
                  <li>Follow us on social media for updates</li>
                  <li>Check out our latest news and events</li>
                </ul>
                
                <p>Thank you for your interest in our mission to empower women and girls in our community.</p>
                
                <p>Best regards,<br>
                <strong>The Rebirth of a Queen Team</strong></p>
              </div>
              
              <div class="footer">
                <p>This is an automated email. Please do not reply to this message.</p>
                <p>If you have any questions, please contact us at support@rebirthofaqueen.org</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Contact confirmation email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
      
    } catch (error) {
      console.error('Error sending contact confirmation email:', error);
      return { success: false, error: error.message };
    }
  }

  // Send contact notification email to admin
  async sendContactNotificationEmail(contact) {
    try {
      const { name, email, subject, message, phone } = contact;
      
      const mailOptions = {
        from: `"Rebirth of a Queen" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL || 'admin@rebirthofaqueen.org',
        subject: 'New Contact Form Submission! 📧',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📧 New Contact Form Submission!</h1>
                <p>From: ${name}</p>
              </div>
              
              <div class="content">
                <p>A new contact form has been submitted through your website.</p>
                
                <div class="details">
                  <h3>Contact Details:</h3>
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                  <p><strong>Subject:</strong> ${subject}</p>
                  <p><strong>Message:</strong></p>
                  <p style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">${message}</p>
                  <p><strong>Submitted:</strong> ${new Date().toLocaleDateString()}</p>
                </div>
                
                <p>Please respond to this inquiry as soon as possible to maintain good customer service.</p>
                
                <p>You can reply directly to: <strong>${email}</strong></p>
              </div>
              
              <div class="footer">
                <p>This is an automated notification from Rebirth of a Queen.</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Contact notification email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
      
    } catch (error) {
      console.error('Error sending contact notification email:', error);
      return { success: false, error: error.message };
    }
  }

  // Send application confirmation email
  async sendApplicationConfirmationEmail(application) {
    try {
      const { firstName, lastName, email, program } = application;
      
      const mailOptions = {
        from: `"Rebirth of a Queen" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Application Received - We Will Review Soon! 📋',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Application Confirmation</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📋 Application Received!</h1>
                <p>Dear ${firstName} ${lastName},</p>
              </div>
              
              <div class="content">
                <p>Thank you for applying to our <strong>${program}</strong> program at <strong>Rebirth of a Queen</strong>. We have received your application and are excited to review it!</p>
                
                <div class="details">
                  <h3>Application Details:</h3>
                  <p><strong>Program:</strong> ${program}</p>
                  <p><strong>Application ID:</strong> ${application._id}</p>
                  <p><strong>Submitted:</strong> ${new Date().toLocaleDateString()}</p>
                </div>
                
                <p><strong>What happens next?</strong></p>
                <ul>
                  <li>Our team will review your application within 48 hours</li>
                  <li>We will contact you via email or phone with our decision</li>
                  <li>If accepted, we will provide you with next steps and program details</li>
                </ul>
                
                <p>In the meantime, you can:</p>
                <ul>
                  <li>Learn more about our programs on our website</li>
                  <li>Follow us on social media for updates</li>
                  <li>Prepare any additional documents that might be needed</li>
                </ul>
                
                <p>We appreciate your interest in our programs and look forward to potentially welcoming you to our community!</p>
                
                <p>Best regards,<br>
                <strong>The Rebirth of a Queen Team</strong></p>
              </div>
              
              <div class="footer">
                <p>This is an automated email. Please do not reply to this message.</p>
                <p>If you have any questions, please contact us at support@rebirthofaqueen.org</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Application confirmation email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
      
    } catch (error) {
      console.error('Error sending application confirmation email:', error);
      return { success: false, error: error.message };
    }
  }

  // Send application notification email to admin
  async sendApplicationNotificationEmail(application) {
    try {
      const { firstName, lastName, email, phone, program, age, location, message } = application;
      
      const mailOptions = {
        from: `"Rebirth of a Queen" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL || 'admin@rebirthofaqueen.org',
        subject: 'New Program Application! 📋',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Application</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📋 New Program Application!</h1>
                <p>Applicant: ${firstName} ${lastName}</p>
              </div>
              
              <div class="content">
                <p>A new application has been submitted for the <strong>${program}</strong> program.</p>
                
                <div class="details">
                  <h3>Applicant Details:</h3>
                  <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Phone:</strong> ${phone}</p>
                  <p><strong>Program:</strong> ${program}</p>
                  <p><strong>Age:</strong> ${age}</p>
                  <p><strong>Location:</strong> ${location}</p>
                  <p><strong>Message:</strong></p>
                  <p style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">${message}</p>
                  <p><strong>Application ID:</strong> ${application._id}</p>
                  <p><strong>Submitted:</strong> ${new Date().toLocaleDateString()}</p>
                </div>
                
                <p>Please review this application and update the status in your admin dashboard.</p>
                
                <p>You can contact the applicant at: <strong>${email}</strong> or <strong>${phone}</strong></p>
              </div>
              
              <div class="footer">
                <p>This is an automated notification from Rebirth of a Queen.</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Application notification email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
      
    } catch (error) {
      console.error('Error sending application notification email:', error);
      return { success: false, error: error.message };
    }
  }

  // Send application accepted email
  async sendApplicationAcceptedEmail(application) {
    try {
      const { firstName, lastName, email, program } = application;
      
      const mailOptions = {
        from: `"Rebirth of a Queen" <${process.env.SMTP_USER}>`,
        to: email,
        subject: '🎉 Congratulations! Your Application Has Been Accepted!',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Application Accepted</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Congratulations!</h1>
                <p>Dear ${firstName} ${lastName},</p>
              </div>
              
              <div class="content">
                <p>We are thrilled to inform you that your application for the <strong>${program}</strong> program has been <strong>ACCEPTED</strong>!</p>
                
                <div class="details">
                  <h3>Next Steps:</h3>
                  <ol>
                    <li>Our team will contact you within 24 hours to discuss program details</li>
                    <li>You will receive information about orientation and start dates</li>
                    <li>Please prepare any required documents mentioned in your acceptance</li>
                    <li>Join our orientation session to meet your fellow participants</li>
                  </ol>
                </div>
                
                <p><strong>Important Information:</strong></p>
                <ul>
                  <li>Program: ${program}</li>
                  <li>Application ID: ${application._id}</li>
                  <li>Status: ACCEPTED</li>
                  <li>Review Date: ${new Date().toLocaleDateString()}</li>
                </ul>
                
                <p>We are excited to welcome you to our community and support you on your journey to empowerment and success!</p>
                
                <p>If you have any questions, please don't hesitate to contact us at <strong>+254 700 000 000</strong> or <strong>support@rebirthofaqueen.org</strong>.</p>
                
                <p>Welcome to the Rebirth of a Queen family!<br>
                <strong>The Rebirth of a Queen Team</strong></p>
              </div>
              
              <div class="footer">
                <p>This is an automated email. Please do not reply to this message.</p>
                <p>If you have any questions, please contact us at support@rebirthofaqueen.org</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Application accepted email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
      
    } catch (error) {
      console.error('Error sending application accepted email:', error);
      return { success: false, error: error.message };
    }
  }

  // Send application rejected email
  async sendApplicationRejectedEmail(application) {
    try {
      const { firstName, lastName, email, program, reviewNotes } = application;
      
      const mailOptions = {
        from: `"Rebirth of a Queen" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Application Status Update - Rebirth of a Queen',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Application Status</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Application Status Update</h1>
                <p>Dear ${firstName} ${lastName},</p>
              </div>
              
              <div class="content">
                <p>Thank you for your interest in our <strong>${program}</strong> program at Rebirth of a Queen.</p>
                
                <p>After careful review of your application, we regret to inform you that we are unable to offer you a place in our program at this time.</p>
                
                <div class="details">
                  <h3>Application Details:</h3>
                  <p><strong>Program:</strong> ${program}</p>
                  <p><strong>Application ID:</strong> ${application._id}</p>
                  <p><strong>Status:</strong> Not Accepted</p>
                  <p><strong>Review Date:</strong> ${new Date().toLocaleDateString()}</p>
                  ${reviewNotes ? `<p><strong>Review Notes:</strong> ${reviewNotes}</p>` : ''}
                </div>
                
                <p>Please note that this decision does not reflect your potential or capabilities. We receive many applications and have limited capacity in our programs.</p>
                
                <p>We encourage you to:</p>
                <ul>
                  <li>Consider applying for other programs that might be a better fit</li>
                  <li>Stay connected with us for future opportunities</li>
                  <li>Follow our social media for updates on new programs</li>
                </ul>
                
                <p>We wish you all the best in your future endeavors and hope to see you apply again in the future.</p>
                
                <p>Best regards,<br>
                <strong>The Rebirth of a Queen Team</strong></p>
              </div>
              
              <div class="footer">
                <p>This is an automated email. Please do not reply to this message.</p>
                <p>If you have any questions, please contact us at support@rebirthofaqueen.org</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Application rejected email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
      
    } catch (error) {
      console.error('Error sending application rejected email:', error);
      return { success: false, error: error.message };
    }
  }

  // Send application waitlisted email
  async sendApplicationWaitlistedEmail(application) {
    try {
      const { firstName, lastName, email, program } = application;
      
      const mailOptions = {
        from: `"Rebirth of a Queen" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Application Status - Waitlisted',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Application Waitlisted</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Application Status Update</h1>
                <p>Dear ${firstName} ${lastName},</p>
              </div>
              
              <div class="content">
                <p>Thank you for your interest in our <strong>${program}</strong> program at Rebirth of a Queen.</p>
                
                <p>After reviewing your application, we would like to inform you that you have been placed on our <strong>waitlist</strong> for this program.</p>
                
                <div class="details">
                  <h3>What this means:</h3>
                  <ul>
                    <li>Your application is strong and we would like to offer you a place</li>
                    <li>However, our current program is at full capacity</li>
                    <li>We will contact you if a spot becomes available</li>
                    <li>You may be offered a place in our next program cycle</li>
                  </ul>
                  
                  <h3>Application Details:</h3>
                  <p><strong>Program:</strong> ${program}</p>
                  <p><strong>Application ID:</strong> ${application._id}</p>
                  <p><strong>Status:</strong> Waitlisted</p>
                  <p><strong>Review Date:</strong> ${new Date().toLocaleDateString()}</p>
                </div>
                
                <p>We will keep your application on file and contact you immediately if a spot becomes available or when we start our next program cycle.</p>
                
                <p>In the meantime, you can:</p>
                <ul>
                  <li>Apply for other programs that might be available</li>
                  <li>Stay connected with us for updates</li>
                  <li>Follow our social media for program announcements</li>
                </ul>
                
                <p>Thank you for your patience and understanding.</p>
                
                <p>Best regards,<br>
                <strong>The Rebirth of a Queen Team</strong></p>
              </div>
              
              <div class="footer">
                <p>This is an automated email. Please do not reply to this message.</p>
                <p>If you have any questions, please contact us at support@rebirthofaqueen.org</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Application waitlisted email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
      
    } catch (error) {
      console.error('Error sending application waitlisted email:', error);
      return { success: false, error: error.message };
    }
  }

  // Send admin response email to applicant
  async sendAdminResponseEmail(application, responseData) {
    try {
      const { subject, message } = responseData;
      const { firstName, lastName, email } = application;

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Response from Rebirth of a Queen</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #e91e63, #c2185b); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .message-box { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #e91e63; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .signature { margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Response from Rebirth of a Queen</h1>
              <p>Thank you for your application!</p>
            </div>
            
            <div class="content">
              <p>Dear ${firstName} ${lastName},</p>
              
              <div class="message-box">
                ${message.replace(/\n/g, '<br>')}
              </div>
              
              <div class="signature">
                <p><strong>Best regards,</strong><br>
                Rebirth of a Queen Team</p>
                <p>📧 info@rebirthofaqueen.com<br>
                📱 +254 700 000 000<br>
                🌐 www.rebirthofaqueen.com</p>
              </div>
            </div>
            
            <div class="footer">
              <p>This email was sent in response to your application submitted on ${application.createdAt.toLocaleDateString()}.</p>
              <p>© ${new Date().getFullYear()} Rebirth of a Queen. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      const mailOptions = {
        from: `"Rebirth of a Queen" <${this.fromEmail}>`,
        to: email,
        subject: subject,
        html: htmlContent
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Admin response email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };

    } catch (error) {
      console.error('Error sending admin response email:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new EmailService(); 