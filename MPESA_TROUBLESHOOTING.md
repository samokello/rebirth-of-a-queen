# 🔧 M-Pesa Troubleshooting Guide

## 🚨 **"Failed to initiate M-Pesa payment" Error**

This error occurs when there's an issue with your M-Pesa configuration or credentials. Let's fix it step by step.

## 🔍 **Step 1: Run the Debugger**

First, run the debugger to identify the exact issue:

```bash
node debug-mpesa.js
```

This will show you:
- ✅ Which environment variables are missing
- ✅ Whether your credentials are valid
- ✅ Specific error messages from M-Pesa API

## 📋 **Step 2: Check Your .env File**

Make sure your `.env` file has all required M-Pesa variables:

```bash
# M-Pesa Configuration (LIVE - Real Money)
MPESA_CONSUMER_KEY=your_live_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_live_mpesa_consumer_secret
MPESA_BUSINESS_SHORT_CODE=your_real_business_short_code
MPESA_PASSKEY=your_live_mpesa_passkey
MPESA_ENVIRONMENT=live
```

## 🔑 **Step 3: Common Issues & Solutions**

### **Issue 1: Missing Environment Variables**
**Symptoms**: Debugger shows "❌ MISSING" for any variable
**Solution**: 
1. Check your `.env` file exists in the `server` folder
2. Make sure all M-Pesa variables are set
3. Restart your server after updating `.env`

### **Issue 2: Authentication Failed (401 Error)**
**Symptoms**: "Authentication failed" error
**Solutions**:
1. **Check Consumer Key/Secret**: Verify they're correct in your Safaricom Developer account
2. **Environment Mismatch**: Make sure you're using live credentials for live environment
3. **Account Status**: Ensure your Safaricom Developer account is active

### **Issue 3: Access Denied (403 Error)**
**Symptoms**: "Access denied" error
**Solutions**:
1. **App Permissions**: Check if your app has STK Push permissions
2. **API Approval**: Ensure your app is approved for the APIs you're using
3. **Business Account**: Verify your M-Pesa business account is active

### **Issue 4: Business Short Code Issues**
**Symptoms**: "BusinessShortCode" related errors
**Solutions**:
1. **Verify Short Code**: Make sure your business short code is correct
2. **Active Status**: Ensure your short code is active and approved
3. **STK Push Support**: Check if your short code supports STK Push

### **Issue 5: Passkey Issues**
**Symptoms**: "Passkey" related errors
**Solutions**:
1. **Correct Passkey**: Verify your passkey matches your business short code
2. **Format**: Make sure the passkey is in the correct format
3. **Generation**: Regenerate passkey if needed in your Safaricom account

## 🧪 **Step 4: Test with Sandbox First**

If you're having issues with live mode, test with sandbox first:

```bash
# Temporarily change to sandbox in your .env file
MPESA_ENVIRONMENT=sandbox

# Test with sandbox credentials
node test-mpesa-live.js
```

## 📞 **Step 5: Safaricom Developer Account Issues**

### **Check Your Developer Account**
1. Go to https://developer.safaricom.co.ke/
2. Log in to your account
3. Check your app status and permissions
4. Verify your business account is active

### **Common Developer Account Issues**
- **App Not Approved**: Wait for approval or contact Safaricom
- **Missing Permissions**: Request STK Push permissions
- **Inactive Account**: Reactivate your account
- **Wrong Environment**: Use sandbox for testing, live for production

## 🔧 **Step 6: Quick Fixes**

### **Fix 1: Restart Server**
```bash
# Stop your server and restart
npm run server:dev
```

### **Fix 2: Check Network**
```bash
# Test if you can reach M-Pesa API
curl -I https://api.safaricom.co.ke/oauth/v1/generate
```

### **Fix 3: Verify Credentials**
```bash
# Test your credentials
node test-mpesa-live.js
```

## 📱 **Step 7: Manual M-Pesa Option**

If STK Push continues to fail, provide a manual M-Pesa option:

### **Manual Payment Instructions**
```
Pay to: [Your Business Short Code]
Amount: [Donation Amount]
Account: [Account Reference]
```

### **Add Manual Payment Route**
```javascript
// In your frontend, add a manual payment option
const manualPayment = {
  shortCode: process.env.MPESA_BUSINESS_SHORT_CODE,
  account: 'Rebirth Queen Donation',
  instructions: 'Use Pay Bill option in M-Pesa'
};
```

## 🚨 **Emergency Solutions**

### **If Nothing Works**
1. **Contact Safaricom Support**: Call their developer support
2. **Use PayPal Only**: Temporarily disable M-Pesa
3. **Manual Payments**: Provide bank transfer details
4. **Test Mode**: Switch to sandbox for testing

### **Alternative Payment Methods**
```javascript
// Add alternative payment methods
const paymentMethods = [
  { name: 'PayPal', enabled: true },
  { name: 'M-Pesa', enabled: false }, // Disable if having issues
  { name: 'Bank Transfer', enabled: true },
  { name: 'Cash', enabled: true }
];
```

## 📊 **Step 8: Monitor & Log**

### **Add Better Logging**
```javascript
// In your M-Pesa service, add detailed logging
console.log('M-Pesa Request:', {
  businessShortCode: this.businessShortCode,
  amount: amount,
  phoneNumber: phoneNumber,
  environment: this.environment
});
```

### **Error Tracking**
```javascript
// Track errors for debugging
const errorLog = {
  timestamp: new Date(),
  error: error.message,
  response: error.response?.data,
  request: payload
};
```

## ✅ **Success Checklist**

- [ ] All environment variables set correctly
- [ ] Safaricom Developer account active
- [ ] App has STK Push permissions
- [ ] Business short code is active
- [ ] Passkey is correct
- [ ] Environment matches credentials
- [ ] Server restarted after changes
- [ ] Debugger shows no errors

## 🆘 **Need Help?**

If you're still having issues:

1. **Run the debugger**: `node debug-mpesa.js`
2. **Check the logs**: Look at server console output
3. **Contact Safaricom**: Call their developer support
4. **Use PayPal**: Temporarily use PayPal only
5. **Manual payments**: Provide bank transfer details

---

## 🎯 **Quick Test**

Run this to test your M-Pesa configuration:

```bash
node debug-mpesa.js
```

This will tell you exactly what's wrong and how to fix it! 