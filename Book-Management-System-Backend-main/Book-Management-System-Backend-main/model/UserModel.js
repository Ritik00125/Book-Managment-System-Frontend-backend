const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // Basic Info
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  // Profile
  profileImage: {
    type: String, // URL
    default: 'https://www.hindustantimes.com/ht-img/img/2025/06/02/550x309/Cricket-Virat-Kohli-0_1748840730416_1748840743207.jpg',
  },
  coverImage: {
    type: String,
  },
  bio: {
    type: String,
    maxlength: 300,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  dateOfBirth: {
    type: Date,
  },
  location: {
    city: String,
    state: String,
    country: String,
    address: String,
    pinCode: String,
  },

  // Social Links
  social: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String,
    github: String,
    website: String,
  },

  // Role & Permissions
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator', 'superadmin'],
    default: 'user',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },

  // Preferences
  preferences: {
    language: {
      type: String,
      default: 'en',
    },
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light',
    },
    notifications: {
      email: {
        type: Boolean,
        default: true,
      },
      sms: {
        type: Boolean,
        default: false,
      },
      push: {
        type: Boolean,
        default: true,
      },
    },
  },

  // Security Features
  loginAttempts: {
    type: Number,
    default: 0,
  },
  lockUntil: {
    type: Date,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  emailVerificationToken: String,

  // Devices & Tokens
  devices: [
    {
      deviceId: String,
      deviceType: String,
      lastLogin: Date,
    },
  ],
  tokens: [
    {
      token: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  // Meta
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
}, {
  timestamps: true,
});

// Pre-save middleware to update updatedAt field
userSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
