const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  // Donor Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  
  // Address Information
  address1: {
    type: String,
    trim: true
  },
  address2: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  postal: {
    type: String,
    trim: true
  },
  country: {
    type: String,
    trim: true
  },
  
  // Donation Details
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [1, 'Amount must be at least 1']
  },
  currency: {
    type: String,
    default: 'KES',
    enum: ['USD', 'KES', 'EUR', 'GBP', 'NGN', 'GHS', 'ZAR']
  },
  
  // Payment Information
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required'],
    enum: ['paypal', 'mpesa_stk', 'mpesa_manual', 'mchanga', 'bank_transfer', 'paystack', 'mpesa', 'bank']
  },
  paymentStatus: {
    type: String,
    default: 'pending',
    enum: ['pending', 'completed', 'failed', 'cancelled']
  },
  transactionId: {
    type: String,
    unique: true,
    sparse: true
  },
  
  // Tribute Information
  tributeType: {
    type: String,
    enum: ['honor', 'memory', '']
  },
  tributeName: {
    type: String,
    trim: true
  },
  customTributeName: {
    type: String,
    trim: true
  },
  
  // Additional Options
  newsletter: {
    type: Boolean,
    default: false
  },
  recurring: {
    type: Boolean,
    default: false
  },
  donorPays: {
    type: Boolean,
    default: false
  },
  
  // Payment Provider Data
  paypalOrderId: String,
  mpesaCheckoutRequestId: String,
  mpesaMerchantRequestId: String,
  
  // Metadata
  ipAddress: String,
  userAgent: String,
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
donationSchema.index({ email: 1, createdAt: -1 });
donationSchema.index({ paymentStatus: 1 });
donationSchema.index({ createdAt: -1 });

// Virtual for full name
donationSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for tribute display name
donationSchema.virtual('tributeDisplayName').get(function() {
  if (this.tributeName === 'Custom Name' && this.customTributeName) {
    return this.customTributeName;
  }
  return this.tributeName;
});

// Method to get formatted amount
donationSchema.methods.getFormattedAmount = function() {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: this.currency
  }).format(this.amount);
};

module.exports = mongoose.model('Donation', donationSchema); 