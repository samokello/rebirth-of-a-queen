const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [500, 'Short description cannot exceed 500 characters']
  },
  
  // Pricing
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  currency: {
    type: String,
    default: 'KES',
    enum: ['KES', 'USD', 'EUR', 'GBP']
  },
  
  // Inventory
  stock: {
    type: Number,
    default: 0,
    min: [0, 'Stock cannot be negative']
  },
  sku: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  
  // Categories and Tags
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: [
      'leather-bags',
      'leather-wallets', 
      'leather-accessories',
      'vitenge-clothes',
      'branded-clothes',
      'branded-bottles',
      'aprons',
      'other'
    ]
  },
  tags: [{
    type: String,
    trim: true
  }],
  
  // Images
  images: [{
    url: {
      type: String,
      required: true
    },
    cloudinaryId: {
      type: String
    },
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    },
    width: Number,
    height: Number,
    format: String,
    bytes: Number
  }],
  
  // Product Details
  specifications: [{
    name: String,
    value: String
  }],
  
  // Dimensions and Weight
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: {
      type: String,
      enum: ['cm', 'inch'],
      default: 'cm'
    }
  },
  weight: {
    value: Number,
    unit: {
      type: String,
      enum: ['kg', 'g', 'lb', 'oz'],
      default: 'kg'
    }
  },
  
  // Status and Visibility
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft', 'archived'],
    default: 'draft'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isOnSale: {
    type: Boolean,
    default: false
  },
  onOffer: {
    type: Boolean,
    default: false
  },
  isHotThisMonth: {
    type: Boolean,
    default: false
  },
  
  // Ratings and Reviews
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  
  // SEO
  metaTitle: String,
  metaDescription: String,
  slug: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  
  // Customization Options
  customizationOptions: [{
    name: String,
    type: {
      type: String,
      enum: ['text', 'color', 'size', 'image']
    },
    required: Boolean,
    options: [String],
    price: Number
  }],
  
  // Shipping
  shipping: {
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    freeShipping: {
      type: Boolean,
      default: false
    },
    shippingCost: {
      type: Number,
      default: 0
    }
  },
  
  // Metadata
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
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
productSchema.index({ category: 1, status: 1 });
productSchema.index({ price: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ isOnSale: 1 });
productSchema.index({ onOffer: 1 });
productSchema.index({ isHotThisMonth: 1 });
productSchema.index({ tags: 1 });

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Virtual for primary image
productSchema.virtual('primaryImage').get(function() {
  const primary = this.images.find(img => img.isPrimary);
  return primary ? primary.url : (this.images[0] ? this.images[0].url : null);
});

// Virtual for in stock status
productSchema.virtual('inStock').get(function() {
  return this.stock > 0;
});

// Method to update rating
productSchema.methods.updateRating = async function(newRating) {
  const totalRating = (this.rating.average * this.rating.count) + newRating;
  this.rating.count += 1;
  this.rating.average = totalRating / this.rating.count;
  await this.save();
};

// Method to decrease stock
productSchema.methods.decreaseStock = async function(quantity = 1) {
  if (this.stock >= quantity) {
    this.stock -= quantity;
    await this.save();
    return true;
  }
  return false;
};

// Method to increase stock
productSchema.methods.increaseStock = async function(quantity = 1) {
  this.stock += quantity;
  await this.save();
};

// Static method to get featured products
productSchema.statics.getFeaturedProducts = function(limit = 10) {
  return this.find({ 
    status: 'active', 
    isFeatured: true 
  })
  .sort({ createdAt: -1 })
  .limit(limit);
};

// Static method to get products on sale
productSchema.statics.getSaleProducts = function(limit = 10) {
  return this.find({ 
    status: 'active', 
    isOnSale: true 
  })
  .sort({ createdAt: -1 })
  .limit(limit);
};

// Static method to search products
productSchema.statics.searchProducts = function(query, options = {}) {
  const { category, minPrice, maxPrice, inStock, sortBy = 'createdAt', sortOrder = 'desc', page = 1, limit = 20 } = options;
  
  let searchQuery = {
    status: 'active',
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
      { tags: { $in: [new RegExp(query, 'i')] } }
    ]
  };
  
  if (category) searchQuery.category = category;
  if (minPrice || maxPrice) {
    searchQuery.price = {};
    if (minPrice) searchQuery.price.$gte = minPrice;
    if (maxPrice) searchQuery.price.$lte = maxPrice;
  }
  if (inStock) searchQuery.stock = { $gt: 0 };
  
  const skip = (page - 1) * limit;
  const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };
  
  return this.find(searchQuery)
    .sort(sort)
    .skip(skip)
    .limit(limit);
};

// Helper to slugify a string
function slugifyName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Pre-save middleware to generate unique slug from name when creating or when name changes
productSchema.pre('save', async function(next) {
  try {
    if ((this.isNew || this.isModified('name')) && this.name) {
      const baseSlug = slugifyName(this.name);
      let uniqueSlug = baseSlug;

      // If slug is taken, append incrementing suffix -2, -3, ...
      let counter = 2;
      // Exclude current document when checking existing slugs
      // Use regex to find existing slugs starting with baseSlug or baseSlug-<num>
      const ProductModel = this.constructor;
      // Loop until a unique slug is found
      // Avoid unbounded loops by capping attempts reasonably
      while (await ProductModel.findOne({ slug: uniqueSlug, _id: { $ne: this._id } })) {
        uniqueSlug = `${baseSlug}-${counter}`;
        counter += 1;
        if (counter > 1000) break; // safety cap
      }

      this.slug = uniqueSlug;
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Product', productSchema); 