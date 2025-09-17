# 🔧 Cloudinary Setup Guide

## ✅ **Your Cloudinary Configuration**

### **Your Cloud Name: `samokello`**

## 🔧 **How to Fix Your .env File**

Update your `server/.env` file with the correct Cloudinary credentials:

```env
# Cloudinary Configuration (FIX THIS)
CLOUDINARY_CLOUD_NAME=samokello
CLOUDINARY_API_KEY=your-api-key-here
CLOUDINARY_API_SECRET=your-api-secret-here
```

## 📋 **Complete .env Example**

```env
# Database
MONGODB_URI=mongodb+srv://Samokello024:Samokello001@cluster0.9fiw8iu.mongodb.net/rebirthofaqueen?retryWrites=true&w=majority

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Admin
ADMIN_EMAIL=admin@rebirthofaqueen.org
ADMIN_PASSWORD=admin123

# Cloudinary (UPDATE THESE)
CLOUDINARY_CLOUD_NAME=samokello
CLOUDINARY_API_KEY=your-api-key-here
CLOUDINARY_API_SECRET=your-api-secret-here

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# SMS (Africa's Talking)
AT_API_KEY=your-at-api-key
AT_USERNAME=your-at-username
AT_SENDER_ID=REBIRTH

# M-Pesa
MPESA_CONSUMER_KEY=your-mpesa-consumer-key
MPESA_CONSUMER_SECRET=your-mpesa-consumer-secret
MPESA_PASSKEY=your-mpesa-passkey
MPESA_BUSINESS_SHORT_CODE=your-business-short-code
MPESA_ENVIRONMENT=sandbox

# PayPal
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
PAYPAL_MODE=sandbox
```

## 🎯 **Next Steps:**

1. **Get your API Key and Secret** from [cloudinary.com/console](https://cloudinary.com/console)
2. **Update your .env file** with the correct values
3. **Test the configuration:**
   ```bash
   cd server
   node test-file-upload.js
   ```

## 🔍 **What You Need:**

From your Cloudinary dashboard, you need:
- **Cloud name:** `samokello` ✅ (you have this)
- **API Key:** (get this from dashboard)
- **API Secret:** (get this from dashboard)

## 🚀 **After Updating .env:**

1. **Restart your server** (if running)
2. **Test file upload** in admin panel
3. **Should work perfectly!**

**Your cloud name is correct - just need the API key and secret!** 🎉
