# Forms and Communications Setup - Rebirth of a Queen

## 🎯 Overview

This document outlines the complete setup for all forms and communications throughout the Rebirth of a Queen website. All forms are now connected to the backend with automated email and SMS notifications.

## 📋 What's Been Implemented

### 1. **Contact Forms**
- ✅ **Contact Page Form** - Connected to backend
- ✅ **Email Notifications** - Confirmation to user + notification to admin
- ✅ **SMS Notifications** - Admin notification for urgent inquiries

### 2. **Application Forms**
- ✅ **Our Programs Application** - Main application form
- ✅ **Fashion Program Application** - Individual program form
- ✅ **Photography Program Application** - Individual program form
- ✅ **Leather Program Application** - Individual program form
- ✅ **Fitness Program Application** - Individual program form
- ✅ **Education Program Application** - Individual program form

### 3. **Automated Communications**
- ✅ **Email Confirmations** - Sent to applicants/contacts
- ✅ **Email Notifications** - Sent to admin
- ✅ **SMS Confirmations** - Sent to applicants
- ✅ **SMS Notifications** - Sent to admin
- ✅ **Review Letters** - Automated emails for application status updates

## 🗄️ Database Models

### Contact Model (`server/models/Contact.js`)
```javascript
{
  name: String (required),
  email: String (required),
  subject: String (required),
  message: String (required),
  phone: String (optional),
  source: String (contact/general/support),
  status: String (new/read/replied/closed),
  ipAddress: String,
  userAgent: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Application Model (`server/models/Application.js`)
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required),
  phone: String (required),
  program: String (education/fashion/photography/leather/fitness/other),
  age: Number (required, 13-100),
  location: String (required),
  message: String (required),
  status: String (pending/reviewed/accepted/rejected/waitlisted),
  reviewNotes: String,
  reviewedBy: ObjectId,
  reviewedAt: Date,
  source: String (ourprograms/fashion/photography/leather/fitness/education),
  ipAddress: String,
  userAgent: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

### Contact Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `PUT /api/contact/:id/status` - Update contact status (admin)

### Application Endpoints
- `POST /api/applications` - Submit application
- `GET /api/applications` - Get all applications (admin)
- `PUT /api/applications/:id/status` - Update application status (admin)
- `GET /api/applications/:id` - Get single application (admin)

## 📧 Email Templates

### Contact Emails
1. **Contact Confirmation** - Sent to user after form submission
2. **Contact Notification** - Sent to admin for new contact

### Application Emails
1. **Application Confirmation** - Sent to applicant after submission
2. **Application Notification** - Sent to admin for new application
3. **Application Accepted** - Sent when application is approved
4. **Application Rejected** - Sent when application is declined
5. **Application Waitlisted** - Sent when application is waitlisted

## 📱 SMS Templates

### Contact SMS
1. **Contact Notification** - Sent to admin for new contact

### Application SMS
1. **Application Confirmation** - Sent to applicant after submission
2. **Application Notification** - Sent to admin for new application
3. **Application Accepted** - Sent when application is approved
4. **Application Rejected** - Sent when application is declined
5. **Application Waitlisted** - Sent when application is waitlisted

## 🔧 Environment Variables Required

```bash
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# SMS Configuration (Africa's Talking)
SMS_API_KEY=your-africas-talking-api-key
SMS_SENDER_ID=REBIRTH
AT_USERNAME=your-africas-talking-username

# Admin Contact
ADMIN_EMAIL=admin@rebirthofaqueen.org
ADMIN_PHONE=254700000000

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

## 🚀 How to Test

### 1. Start the Servers
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm start
```

### 2. Test All Forms
```bash
# Run comprehensive test
node test-forms-integration.js
```

### 3. Manual Testing
1. **Contact Form**: Go to `/contact` and submit the form
2. **Application Forms**: Go to `/ourprograms` and submit application
3. **Program Forms**: Go to individual program pages and submit applications

## 📊 Admin Features

### Contact Management
- View all contact submissions
- Update contact status (new/read/replied/closed)
- Add review notes
- Filter by status

### Application Management
- View all applications
- Filter by program and status
- Update application status
- Send review letters automatically
- Add review notes

## 🎨 Frontend Integration

### Contact Form (`client/src/pages/Contact.js`)
- ✅ Connected to `/api/contact`
- ✅ Real-time validation
- ✅ Success/error handling
- ✅ Loading states

### Application Forms
- ✅ **Our Programs** (`client/src/pages/OurPrograms.js`)
- ✅ **Fashion** (`client/src/pages/Fashion.js`)
- ✅ **Photography** (`client/src/pages/Photography.js`)
- ✅ **Leather** (`client/src/pages/Leather.js`)
- ✅ **Fitness** (`client/src/pages/Fitness.js`)

## 🔄 Workflow

### Contact Form Workflow
1. User submits contact form
2. Data saved to database
3. Confirmation email sent to user
4. Notification email sent to admin
5. SMS notification sent to admin (if phone provided)

### Application Form Workflow
1. User submits application
2. Data saved to database
3. Confirmation email sent to applicant
4. Notification email sent to admin
5. SMS confirmation sent to applicant
6. SMS notification sent to admin
7. Admin reviews application
8. Status updated (accepted/rejected/waitlisted)
9. Review letter email sent to applicant
10. Review letter SMS sent to applicant

## 🛠️ Error Handling

### Frontend
- Form validation
- Network error handling
- User-friendly error messages
- Loading states

### Backend
- Input validation
- Database error handling
- Email/SMS error handling
- Graceful degradation

## 📈 Monitoring

### Logs to Watch
- Contact form submissions
- Application submissions
- Email delivery status
- SMS delivery status
- Database operations

### Key Metrics
- Form submission success rate
- Email delivery rate
- SMS delivery rate
- Response time
- Error rates

## 🔒 Security Features

- Input sanitization
- Email validation
- Phone number validation
- Rate limiting (recommended)
- CSRF protection (recommended)

## 🚀 Next Steps

1. **Admin Dashboard** - Build admin interface for managing contacts/applications
2. **Email Templates** - Customize email templates with your branding
3. **SMS Templates** - Customize SMS messages
4. **Analytics** - Add form submission analytics
5. **Rate Limiting** - Implement rate limiting for form submissions
6. **File Uploads** - Add file upload capability for applications
7. **Multi-language** - Add support for multiple languages

## 📞 Support

For any issues or questions:
- Check server logs for errors
- Verify environment variables are set correctly
- Test email/SMS configuration separately
- Ensure database is connected properly

---

**Status**: ✅ Complete and Ready for Production
**Last Updated**: August 5, 2024
**Version**: 1.0.0 