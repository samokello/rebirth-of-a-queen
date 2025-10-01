const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Order Information
  orderNumber: {
    type: String,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  
  // Customer Information
  customer: {
    firstName: {
      type: String,
      required: [true, 'First name is required']
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required']
    }
  },
  
  // Shipping Address
  shippingAddress: {
    street: {
      type: String,
      required: [true, 'Street address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      default: 'Nairobi'
    },
    postalCode: {
      type: String,
      required: [true, 'Postal code is required'],
      default: '00100'
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      default: 'Kenya'
    }
  },
  
  // Billing Address (same as shipping if not specified)
  billingAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  
  // Order Items
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    customization: {
      type: Map,
      of: String
    },
    total: {
      type: Number,
      required: true
    }
  }],
  
  // Pricing
  subtotal: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    default: 0
  },
  shippingCost: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
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
    enum: ['paypal', 'mpesa', 'bank', 'bank_transfer', 'cash_on_delivery', 'paystack']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionId: String,
  paymentDate: Date,
  
  // Shipping Information
  shippingMethod: {
    type: String,
    enum: ['standard', 'express', 'pickup'],
    default: 'standard'
  },
  trackingNumber: String,
  shippingDate: Date,
  estimatedDelivery: Date,
  
  // Notes and Comments
  customerNotes: String,
  adminNotes: String,
  
  // Timestamps
  orderDate: {
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
orderSchema.index({ 'customer.email': 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ orderDate: -1 });
orderSchema.index({ paymentStatus: 1 });

// Virtual for order summary
orderSchema.virtual('orderSummary').get(function() {
  return {
    totalItems: this.items.reduce((sum, item) => sum + item.quantity, 0),
    totalProducts: this.items.length,
    orderValue: this.total
  };
});

// Virtual for is paid
orderSchema.virtual('isPaid').get(function() {
  return this.paymentStatus === 'paid';
});

// Virtual for can ship
orderSchema.virtual('canShip').get(function() {
  return this.paymentStatus === 'paid' && this.status === 'confirmed';
});

// Method to calculate totals
orderSchema.methods.calculateTotals = function() {
  this.subtotal = this.items.reduce((sum, item) => sum + item.total, 0);
  this.total = this.subtotal + this.tax + this.shippingCost - this.discount;
  return this.total;
};

// Method to update order status
orderSchema.methods.updateStatus = async function(newStatus, notes = '') {
  this.status = newStatus;
  if (notes) {
    this.adminNotes = this.adminNotes ? `${this.adminNotes}\n${notes}` : notes;
  }
  this.updatedAt = new Date();
  await this.save();
};

// Method to mark as paid
orderSchema.methods.markAsPaid = async function(transactionId) {
  this.paymentStatus = 'paid';
  this.paymentDate = new Date();
  this.transactionId = transactionId;
  this.status = 'confirmed';
  await this.save();
};

// Method to add tracking
orderSchema.methods.addTracking = async function(trackingNumber, shippingMethod = 'standard') {
  this.trackingNumber = trackingNumber;
  this.shippingMethod = shippingMethod;
  this.shippingDate = new Date();
  this.status = 'shipped';
  await this.save();
};

// Static method to generate order number
orderSchema.statics.generateOrderNumber = function() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `RQ${year}${month}${day}${random}`;
};

// Static method to get orders by status
orderSchema.statics.getOrdersByStatus = function(status, page = 1, limit = 20) {
  const skip = (page - 1) * limit;
  return this.find({ status })
    .sort({ orderDate: -1 })
    .skip(skip)
    .limit(limit)
    .populate('items.product');
};

// Static method to get customer orders
orderSchema.statics.getCustomerOrders = function(email, page = 1, limit = 20) {
  const skip = (page - 1) * limit;
  return this.find({ 'customer.email': email })
    .sort({ orderDate: -1 })
    .skip(skip)
    .limit(limit)
    .populate('items.product');
};

// Static method to get order statistics
orderSchema.statics.getOrderStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: '$total' },
        averageOrderValue: { $avg: '$total' },
        pendingOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
        },
        confirmedOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] }
        },
        shippedOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'shipped'] }, 1, 0] }
        },
        deliveredOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0] }
        }
      }
    }
  ]);
  
  return stats[0] || {
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0
  };
};

// Pre-save middleware to generate order number
orderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    this.orderNumber = this.constructor.generateOrderNumber();
  }
  
  // Set billing address to shipping address if not provided
  if (!this.billingAddress.street) {
    this.billingAddress = this.shippingAddress;
  }
  
  next();
});

module.exports = mongoose.model('Order', orderSchema); 