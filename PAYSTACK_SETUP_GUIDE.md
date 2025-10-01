# Paystack Setup Guide for Rebirth of a Queen Foundation

## 🎯 Quick Setup

### 1. Get Your Paystack Keys

1. Go to [Paystack Dashboard](https://dashboard.paystack.com/)
2. Sign up or log in to your Paystack account
3. Go to **Settings > API Keys & Webhooks**
4. Copy your **Test** keys (for development):
   - **Public Key** (starts with `pk_test_`)
   - **Secret Key** (starts with `sk_test_`)

### 2. Update Your Environment File

Edit `server/.env` and add the Paystack configuration:

```env
# Paystack Configuration
PAYSTACK_PUBLIC_KEY=pk_test_your_actual_public_key_here
PAYSTACK_SECRET_KEY=sk_test_your_actual_secret_key_here
```

### 3. Test Your Integration

1. **Start your server**: `cd server && npm install && node index.js`
2. **Start your client**: `cd client && npm start`
3. **Visit**: `http://localhost:3000/donate`
4. **Test with Paystack test card**: `4084084084084081`

## 🚀 What's Included

Your donation system now supports:

- ✅ **Credit/Debit Cards** (Visa, Mastercard, Verve)
- ✅ **Bank Transfer** (Direct bank transfers)
- ✅ **USSD** (Mobile banking codes)
- ✅ **QR Code** (Scan to pay)
- ✅ **Mobile Money** (Ghana, Kenya, South Africa)
- ✅ **International Cards** (from anywhere)

## 🌍 Supported Currencies

- **NGN** (Nigerian Naira) - Default
- **GHS** (Ghanaian Cedi)
- **ZAR** (South African Rand)
- **KES** (Kenyan Shilling)
- **USD** (US Dollar)

## 🔧 Current Status

- ✅ Server runs without errors
- ✅ Paystack integration is ready
- ⏳ **Next**: Add your actual Paystack keys to test payments

## 📞 Support

If you need help:
1. Check the [Paystack Documentation](https://paystack.com/docs)
2. Test with Paystack's test cards first
3. Contact Paystack support for account verification

## 🎉 Benefits

- **No callback URL issues** (Paystack handles redirects)
- **Multiple payment methods** in one integration
- **Real-time payment verification**
- **Automatic webhook handling**
- **Support for multiple African currencies**
- **Mobile-optimized payment flow**

## 🔄 Migration from Stripe

All Stripe-related code has been removed and replaced with Paystack:

- ❌ Removed: Stripe routes, components, and dependencies
- ✅ Added: Paystack routes, payment methods, and webhooks
- ✅ Updated: Payment method enums and documentation
- ✅ Ready: For Paystack API keys configuration

## 🚀 Next Steps

1. **Get Paystack API keys** from the dashboard
2. **Add keys to environment variables**
3. **Test payment flow** with test cards
4. **Configure webhooks** for production
5. **Go live** with your Paystack account
