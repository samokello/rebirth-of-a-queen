const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  phoneVerified: {
    type: Boolean,
    default: false
  },
  
  // Address information
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: {
      type: String,
      default: 'Kenya'
    }
  },
  
  // User preferences
  preferences: {
    currency: {
      type: String,
      default: 'KES',
      enum: ['KES', 'USD', 'EUR', 'GBP']
    },
    language: {
      type: String,
      default: 'en',
      enum: ['en', 'sw']
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      sms: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      }
    }
  },
  
  // Cart and favorites (stored in user account)
  cart: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  favorites: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Order history
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  
  // Account activity
  lastLogin: Date,
  loginCount: {
    type: Number,
    default: 0
  },
  
  // Password reset
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  
  // Email verification
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  
  // Phone verification
  phoneVerificationCode: String,
  phoneVerificationExpires: Date
}, {
  timestamps: true
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ 'cart.product': 1 });
userSchema.index({ 'favorites.product': 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for cart item count
userSchema.virtual('cartItemCount').get(function() {
  return this.cart.reduce((total, item) => total + item.quantity, 0);
});

// Virtual for cart total
userSchema.virtual('cartTotal').get(function() {
  return this.cart.reduce((total, item) => {
    if (item.product && item.product.price) {
      return total + (item.product.price * item.quantity);
    }
    return total;
  }, 0);
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Add to cart method
userSchema.methods.addToCart = function(productId, quantity = 1) {
  const existingItem = this.cart.find(item => item.product.toString() === productId.toString());
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    this.cart.push({
      product: productId,
      quantity: quantity,
      addedAt: new Date()
    });
  }
  
  return this.save();
};

// Remove from cart method
userSchema.methods.removeFromCart = function(productId) {
  this.cart = this.cart.filter(item => item.product.toString() !== productId.toString());
  return this.save();
};

// Update cart quantity method
userSchema.methods.updateCartQuantity = function(productId, quantity) {
  const item = this.cart.find(item => item.product.toString() === productId.toString());
  if (item) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
    } else {
      item.quantity = quantity;
    }
  }
  return this.save();
};

// Clear cart method
userSchema.methods.clearCart = function() {
  this.cart = [];
  return this.save();
};

// Add to favorites method
userSchema.methods.addToFavorites = function(productId) {
  const exists = this.favorites.some(fav => fav.product.toString() === productId.toString());
  if (!exists) {
    this.favorites.push({
      product: productId,
      addedAt: new Date()
    });
  }
  return this.save();
};

// Remove from favorites method
userSchema.methods.removeFromFavorites = function(productId) {
  this.favorites = this.favorites.filter(fav => fav.product.toString() !== productId.toString());
  return this.save();
};

// Check if product is favorite
userSchema.methods.isFavorite = function(productId) {
  return this.favorites.some(fav => fav.product.toString() === productId.toString());
};

// Update last login
userSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
  this.loginCount += 1;
  return this.save();
};

// Transform JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.resetPasswordToken;
  delete userObject.resetPasswordExpires;
  delete userObject.emailVerificationToken;
  delete userObject.emailVerificationExpires;
  delete userObject.phoneVerificationCode;
  delete userObject.phoneVerificationExpires;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);