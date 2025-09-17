const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Content title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content body is required']
  },
  excerpt: {
    type: String,
    maxlength: [500, 'Excerpt cannot exceed 500 characters']
  },
  type: {
    type: String,
    required: [true, 'Content type is required'],
    enum: ['blog', 'news', 'announcement', 'page', 'program-info', 'testimonial', 'gallery', 'video']
  },
  category: {
    type: String,
    enum: ['general', 'programs', 'events', 'news', 'resources', 'about', 'contact']
  },
  tags: [{
    type: String,
    trim: true
  }],
  featuredImage: {
    url: String,
    cloudinaryId: String,
    alt: String
  },
  images: [{
    url: String,
    cloudinaryId: String,
    alt: String,
    caption: String
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  publishedAt: Date,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  viewCount: {
    type: Number,
    default: 0
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  customFields: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Indexes for better query performance
contentSchema.index({ type: 1, status: 1 });
contentSchema.index({ category: 1, status: 1 });
contentSchema.index({ isFeatured: 1, status: 1 });
contentSchema.index({ publishedAt: -1 });
contentSchema.index({ tags: 1 });

// Pre-save middleware to generate slug
contentSchema.pre('save', async function(next) {
  try {
    if ((this.isNew || this.isModified('title')) && this.title) {
      const baseSlug = this.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      let uniqueSlug = baseSlug;
      let counter = 2;
      
      while (await this.constructor.findOne({ slug: uniqueSlug, _id: { $ne: this._id } })) {
        uniqueSlug = `${baseSlug}-${counter}`;
        counter += 1;
        if (counter > 1000) break;
      }
      
      this.slug = uniqueSlug;
    }
    
    // Set publishedAt when status changes to published
    if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
      this.publishedAt = new Date();
    }
    
    next();
  } catch (err) {
    next(err);
  }
});

// Virtual for reading time estimation
contentSchema.virtual('readingTime').get(function() {
  const wordsPerMinute = 200;
  const wordCount = this.content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
});

// Method to increment view count
contentSchema.methods.incrementViewCount = async function() {
  this.viewCount += 1;
  await this.save();
};

// Static method to get published content
contentSchema.statics.getPublished = function(query = {}) {
  return this.find({ 
    status: 'published', 
    isPublic: true,
    ...query 
  }).sort({ publishedAt: -1 });
};

// Static method to get featured content
contentSchema.statics.getFeatured = function(limit = 5) {
  return this.find({ 
    status: 'published', 
    isPublic: true,
    isFeatured: true 
  }).sort({ publishedAt: -1 }).limit(limit);
};

module.exports = mongoose.model('Content', contentSchema);
