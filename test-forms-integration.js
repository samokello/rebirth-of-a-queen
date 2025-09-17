const axios = require('axios');

class FormsIntegrationTest {
  constructor() {
    this.baseURL = 'http://localhost:5000';
  }

  async testContactForm() {
    console.log('📧 Testing Contact Form Integration');
    console.log('==================================');

    try {
      const contactData = {
        name: 'Test Contact User',
        email: 'test@example.com',
        subject: 'Test Contact Form',
        message: 'This is a test contact form submission to verify the integration is working properly.',
        phone: '254740844942'
      };

      const response = await axios.post(`${this.baseURL}/api/contact`, contactData);
      
      console.log('✅ Contact form submitted successfully');
      console.log(`📋 Contact ID: ${response.data.data.contactId}`);
      console.log(`📅 Submitted: ${response.data.data.submittedAt}`);
      console.log(`💬 Message: ${response.data.message}`);

    } catch (error) {
      console.error('❌ Contact form test failed:', error.response?.data || error.message);
    }
  }

  async testApplicationForm() {
    console.log('\n📋 Testing Application Form Integration');
    console.log('======================================');

    try {
      const applicationData = {
        firstName: 'Test',
        lastName: 'Applicant',
        email: 'applicant@example.com',
        phone: '254740844942',
        program: 'education',
        age: 25,
        location: 'Nairobi, Kenya',
        message: 'I am very interested in joining your education program. I believe this will help me achieve my goals and contribute to my community.',
        source: 'ourprograms'
      };

      const response = await axios.post(`${this.baseURL}/api/applications`, applicationData);
      
      console.log('✅ Application form submitted successfully');
      console.log(`📋 Application ID: ${response.data.data.applicationId}`);
      console.log(`📅 Submitted: ${response.data.data.submittedAt}`);
      console.log(`💬 Message: ${response.data.message}`);

    } catch (error) {
      console.error('❌ Application form test failed:', error.response?.data || error.message);
    }
  }

  async testProgramSpecificApplications() {
    console.log('\n🎯 Testing Program-Specific Application Forms');
    console.log('============================================');

    const programs = [
      { name: 'Fashion', program: 'fashion', source: 'fashion' },
      { name: 'Photography', program: 'photography', source: 'photography' },
      { name: 'Leather', program: 'leather', source: 'leather' },
      { name: 'Fitness', program: 'fitness', source: 'fitness' }
    ];

    for (const prog of programs) {
      try {
        const applicationData = {
          firstName: `Test${prog.name}`,
          lastName: 'User',
          email: `test${prog.program}@example.com`,
          phone: '254740844942',
          program: prog.program,
          age: 25,
          location: 'Nairobi, Kenya',
          message: `I am very interested in joining your ${prog.name} program. This aligns perfectly with my career goals.`,
          source: prog.source
        };

        const response = await axios.post(`${this.baseURL}/api/applications`, applicationData);
        
        console.log(`✅ ${prog.name} application submitted successfully`);
        console.log(`📋 Application ID: ${response.data.data.applicationId}`);

      } catch (error) {
        console.error(`❌ ${prog.name} application test failed:`, error.response?.data || error.message);
      }
    }
  }

  async testEmailAndSMSNotifications() {
    console.log('\n📧 Testing Email and SMS Notifications');
    console.log('=======================================');

    try {
      // Test contact form (should trigger email and SMS)
      console.log('📧 Testing Contact Form Notifications...');
      const contactData = {
        name: 'Notification Test User',
        email: 'notification@example.com',
        subject: 'Test Notifications',
        message: 'This is a test to verify email and SMS notifications are working.',
        phone: '254740844942'
      };

      await axios.post(`${this.baseURL}/api/contact`, contactData);
      console.log('✅ Contact notifications should be sent');

      // Test application form (should trigger email and SMS)
      console.log('📋 Testing Application Form Notifications...');
      const applicationData = {
        firstName: 'Notification',
        lastName: 'Test',
        email: 'notification@example.com',
        phone: '254740844942',
        program: 'education',
        age: 25,
        location: 'Nairobi, Kenya',
        message: 'This is a test to verify application notifications are working.',
        source: 'ourprograms'
      };

      await axios.post(`${this.baseURL}/api/applications`, applicationData);
      console.log('✅ Application notifications should be sent');

      console.log('\n📱 Check your email and SMS for notifications!');
      console.log('📧 Admin email: Check admin@rebirthofaqueen.org');
      console.log('📱 Admin SMS: Check the phone number in ADMIN_PHONE env variable');

    } catch (error) {
      console.error('❌ Notification test failed:', error.response?.data || error.message);
    }
  }

  async runAllTests() {
    console.log('🧪 Testing All Forms Integration');
    console.log('================================');
    console.log('This will test all forms and verify they connect to the backend properly.');
    console.log('Make sure your server is running on http://localhost:5000\n');

    await this.testContactForm();
    await this.testApplicationForm();
    await this.testProgramSpecificApplications();
    await this.testEmailAndSMSNotifications();

    console.log('\n🎉 All form integration tests completed!');
    console.log('💡 Check your email and SMS for notifications');
    console.log('📊 Check your database for the submitted records');
  }
}

// Run the tests
const test = new FormsIntegrationTest();
test.runAllTests(); 