# 🚀 Development Guide - Rebirth of a Queen Foundation

## 📁 Project Structure
```
rebirth-of-a-queen/
├── server/          # Backend (Node.js/Express)
│   ├── index.js     # Main server file
│   ├── routes/      # API routes
│   ├── models/      # Database models
│   └── .env         # Environment variables
├── client/          # Frontend (React)
│   ├── src/
│   │   ├── pages/   # React pages
│   │   └── components/
│   └── package.json
└── README.md
```

## 🏃‍♂️ How to Run Your Project

### 1. Start the Backend Server
```bash
cd server
node index.js
```
**Server runs on:** `http://localhost:5000`

### 2. Start the Frontend (React App)
```bash
cd client
npm start
```
**Frontend runs on:** `http://localhost:3000`

## 🌐 Your Website URLs

- **Main Website:** `http://localhost:3000`
- **Donation Page:** `http://localhost:3000/donate`
- **Admin Dashboard:** `http://localhost:3000/admin`
- **API Endpoints:** `http://localhost:5000/api/`

## 💳 Payment System Status

### ✅ What's Working:
- **Server runs without errors**
- **Database connected** (MongoDB Atlas)
- **Donation page** with real-time stats
- **Admin dashboard** for managing data
- **M-Pesa integration** (backend ready)
- **Payment integrations** (M-Pesa, PayPal ready)

## 🛠️ Development Tips

### Adding New Features:
1. **Backend:** Add routes in `server/routes/`
2. **Frontend:** Add pages in `client/src/pages/`
3. **Database:** Add models in `server/models/`

### Testing Payments:
- **Stripe Test Card:** `4242 4242 4242 4242`
- **Any future date and CVC**
- **Any ZIP code**

### Environment Variables:
- **Database:** Already configured ✅
- **M-Pesa:** Already configured ✅
- **Stripe:** Needs your API keys ⏳
- **Email/SMS:** Optional for now

## 🎯 Current Features

### ✅ Working:
- User registration/login
- Product shop with cart
- Donation page with progress tracking
- Admin dashboard
- Contact forms
- Newsletter signup
- File uploads (Cloudinary)

### 🔄 In Development:
- Stripe payments (needs API keys)
- Email notifications
- SMS notifications

## 🚨 Common Issues & Solutions

### Server won't start:
```bash
cd server
npm install
node index.js
```

### Client won't start:
```bash
cd client
npm install
npm start
```

### Database connection issues:
- Check your MongoDB Atlas connection string in `server/.env`
- Ensure your IP is whitelisted in MongoDB Atlas

### Payment issues:
- Add your Stripe API keys to `server/.env`
- Test with Stripe test cards first

## 📞 Need Help?

1. **Check the console** for error messages
2. **Verify environment variables** in `server/.env`
3. **Test with Stripe test cards** before going live
4. **Check MongoDB Atlas** for database issues

## 🎉 You're Ready to Develop!

Your project is set up and running. Focus on:
1. **Getting Stripe API keys** for payments
2. **Testing the donation flow**
3. **Adding your content** to the website
4. **Customizing the design** as needed

Happy coding! 🚀
