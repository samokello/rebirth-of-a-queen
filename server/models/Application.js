const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
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
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  program: {
    type: String,
    required: [true, 'Program selection is required'],
    enum: ['education', 'fashion', 'photography', 'leather', 'fitness', 'other']
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [13, 'Age must be at least 13'],
    max: [100, 'Age must be less than 100']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'accepted', 'rejected', 'waitlisted'],
    default: 'pending'
  },
  reviewNotes: {
    type: String,
    trim: true
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: Date,
  adminResponse: {
    emailResponse: {
      sent: { type: Boolean, default: false },
      sentAt: Date,
      subject: String,
      message: String,
      sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    smsResponse: {
      sent: { type: Boolean, default: false },
      sentAt: Date,
      message: String,
      sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
  },
  source: {
    type: String,
    enum: ['ourprograms', 'fashion', 'photography', 'leather', 'fitness', 'education'],
    default: 'ourprograms'
  },
  ipAddress: String,
  userAgent: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
applicationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for full name
applicationSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for formatted date
applicationSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Index for efficient queries
applicationSchema.index({ status: 1, createdAt: -1 });
applicationSchema.index({ program: 1, status: 1 });
applicationSchema.index({ email: 1 });

module.exports = mongoose.model('Application', applicationSchema); 