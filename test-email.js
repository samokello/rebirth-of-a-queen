const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmail() {
  console.log('🧪 Testing email configuration...');
  
  // Create transporter
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  try {
    // Test connection
    await transporter.verify();
    console.log('✅ Email connection successful!');
    
    // Send test email
    const info = await transporter.sendMail({
      from: `"Rebirth of a Queen" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Send to yourself for testing
      subject: '🧪 Email Test - Rebirth of a Queen',
      html: `
        <h1>Email Test Successful!</h1>
        <p>Your email configuration is working correctly.</p>
        <p>This means donors will receive thank you emails automatically.</p>
        <hr>
        <p><strong>Configuration Details:</strong></p>
        <ul>
          <li>SMTP Host: ${process.env.SMTP_HOST}</li>
          <li>SMTP Port: ${process.env.SMTP_PORT}</li>
          <li>SMTP User: ${process.env.SMTP_USER}</li>
        </ul>
      `
    });

    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📬 Check your inbox for the test email');
    
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check your SMTP settings in .env file');
    console.log('2. Verify your Gmail app password is correct');
    console.log('3. Make sure 2-factor authentication is enabled');
    console.log('4. Check if your email provider allows SMTP access');
  }
}

// Run the test
testEmail(); 