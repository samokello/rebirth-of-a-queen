# 🚀 Live Payment Gateway Setup Guide

## ✅ **Updated Configuration for Real Accounts**

Your payment gateways have been updated to use **LIVE** accounts by default instead of sandbox. This means all payments will go directly to your real PayPal and M-Pesa accounts.

## 🔧 **Updated Environment Variables**

### **PayPal Live Configuration**
```bash
# PayPal Configuration (LIVE - Real Money)
PAYPAL_CLIENT_ID=your_live_paypal_client_id
PAYPAL_CLIENT_SECRET=your_live_paypal_client_secret
PAYPAL_MODE=live
```

### **M-Pesa Live Configuration**
```bash
# M-Pesa Configuration (LIVE - Real Money)
MPESA_CONSUMER_KEY=your_live_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_live_mpesa_consumer_secret
MPESA_BUSINESS_SHORT_CODE=your_real_business_short_code
MPESA_PASSKEY=your_live_mpesa_passkey
MPESA_ENVIRONMENT=live
```

## 📋 **Complete .env File for Live Mode**

```bash
# Server Configuration
PORT=5000
NODE_ENV=production

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/rebirth_queen

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d

# CORS Configuration
CORS_ORIGIN=https://rebirthofaqueen.org

# Email Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your.email@gmail.com
SMTP_PASS=your_gmail_app_password

# SMS Configuration (Africa's Talking)
SMS_API_KEY=your_africas_talking_api_key
SMS_SENDER_ID=REBIRTH
AT_USERNAME=your_africas_talking_username

# Admin Contact Information
ADMIN_EMAIL=admin@rebirthofaqueen.org
ADMIN_PHONE=+254700000000

# Frontend URL
FRONTEND_URL=https://rebirthofaqueen.org

# PayPal Configuration (LIVE - Real Money)
PAYPAL_CLIENT_ID=your_live_paypal_client_id
PAYPAL_CLIENT_SECRET=your_live_paypal_client_secret
PAYPAL_MODE=live

# M-Pesa Configuration (LIVE - Real Money)
MPESA_CONSUMER_KEY=your_live_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_live_mpesa_consumer_secret
MPESA_BUSINESS_SHORT_CODE=your_real_business_short_code
MPESA_PASSKEY=your_live_mpesa_passkey
MPESA_ENVIRONMENT=live
```

## 🧪 **Testing Live Configuration**

### **Test PayPal Live**
```bash
node test-paypal-live.js
```

### **Test M-Pesa Live**
```bash
node test-mpesa-live.js
```

### **Test Email Configuration**
```bash
node test-email.js
```

## ⚠️ **Important Warnings**

### **PayPal Live Mode**
- ✅ **Real money will be transferred** to your PayPal account
- ✅ **No test mode** - all transactions are real
- ✅ **Business account required** with verified status
- ✅ **API access must be enabled** in your PayPal account

### **M-Pesa Live Mode**
- ✅ **Real money will be transferred** to your M-Pesa business account
- ✅ **No sandbox mode** - all transactions are real
- ✅ **Business account required** with Safaricom
- ✅ **Business short code must be active**

## 🔐 **Security Checklist**

### **Before Going Live**
- [ ] PayPal business account verified
- [ ] M-Pesa business account active
- [ ] SSL certificate installed on website
- [ ] Environment variables secured
- [ ] Webhook URLs configured
- [ ] Callback URLs set correctly

### **Production Requirements**
- [ ] Domain name configured (not localhost)
- [ ] HTTPS enabled
- [ ] Database backups configured
- [ ] Error monitoring set up
- [ ] Payment logs enabled

## 📞 **Support Information**

### **PayPal Support**
- **Developer Portal**: https://developer.paypal.com/
- **Business Support**: https://www.paypal.com/business
- **API Documentation**: https://developer.paypal.com/docs/

### **M-Pesa Support**
- **Developer Portal**: https://developer.safaricom.co.ke/
- **Business Support**: Contact Safaricom Business
- **API Documentation**: https://developer.safaricom.co.ke/docs

## 🎯 **Next Steps**

1. **Update your `.env` file** with live credentials
2. **Test PayPal live connection**: `node test-paypal-live.js`
3. **Test M-Pesa live connection**: `node test-mpesa-live.js`
4. **Test email configuration**: `node test-email.js`
5. **Deploy to production** with live settings
6. **Monitor first real transactions**

## 💡 **Key Benefits of Live Mode**

### **For Donations**
- ✅ **Real money** goes directly to your organization
- ✅ **Immediate notifications** when payments are received
- ✅ **Professional receipts** sent to donors
- ✅ **Admin alerts** for all transactions

### **For Shop**
- ✅ **Real payments** processed instantly
- ✅ **Automatic stock updates** on successful orders
- ✅ **Order tracking** with real transaction IDs
- ✅ **Customer notifications** for order status

## 🚨 **Emergency Contacts**

If you encounter issues with live payments:

### **PayPal Issues**
- Check PayPal Developer Dashboard for API status
- Verify your business account status
- Contact PayPal Business Support

### **M-Pesa Issues**
- Check Safaricom Developer Portal for API status
- Verify your business short code is active
- Contact Safaricom Business Support

---

## 🎉 **Success!**

Your Rebirth of a Queen platform is now configured for **LIVE** payments. All donations and shop purchases will transfer real money to your organization's accounts with automatic thank you communications sent to donors.

**Remember**: Always test with small amounts first before accepting large donations! 