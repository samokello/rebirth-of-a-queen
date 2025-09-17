const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email']
  },
  status: {
    type: String,
    enum: ['subscribed', 'unsubscribed'],
    default: 'subscribed'
  },
  source: {
    type: String,
    default: 'website'
  },
  meta: {
    type: Object,
    default: {}
  }
}, { timestamps: true });

module.exports = mongoose.model('Subscriber', subscriberSchema);


