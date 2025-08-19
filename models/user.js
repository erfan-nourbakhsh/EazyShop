const mongoose = require("mongoose"); 
// Import Mongoose to define schemas and interact with MongoDB

const validator = require("validator"); 
// Import Validator library for email validation

const bcrypt = require("bcryptjs"); 
// Import bcryptjs for hashing passwords

const jwt = require("jsonwebtoken"); 
// Import JSON Web Token library to generate auth tokens

const crypto = require("crypto"); 
// Import crypto for generating secure random tokens

const userSchema = new mongoose.Schema({ 
  // Define a new Mongoose schema for users

  name: { 
    // User's name
    type: String,
    required: [true, "Please provide your name"], 
    // Name is required
    maxlength: [30, "Name mustn't exceed 30 characters"], 
    // Maximum length of 30 characters
  },

  email: { 
    // User's email
    type: String,
    required: [true, "Please provide your email"], 
    unique: true, 
    // Must be unique
    validate: [validator.isEmail, "Please provide valid email address"], 
    // Validate email format
  },

  password: { 
    // User's password
    type: String,
    required: [true, "Please provide your password"], 
    minLength: [6, "Your password must be at least 6 characters"], 
    select: false, 
    // Do not return password by default in queries
  },

  role: { 
    // User role
    type: String,
    default: "user", 
    // Default role is "user"
  },

  createdAt: { 
    // Timestamp when the user was created
    type: Date,
    default: Date.now, 
  },

  resetPasswordToken: String, 
  // Token used for resetting password

  resetPasswordExpires: Date, 
  // Expiration time of reset token
});

// Encrypting password before saving user
userSchema.pre("save", async function (next) { 
  // Pre-save middleware to hash password before saving
  if (!this.isModified("password")) { 
    // Only hash if password is new or modified
    next(); 
    return;
  }
  this.password = await bcrypt.hash(this.password, 10); 
  // Hash password with salt rounds = 10
});

// Return JWT Token
userSchema.methods.getJwtToken = function () { 
  // Instance method to generate JWT token for authentication
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { 
    // Sign token with user ID and secret
    expiresIn: process.env.JWT_EXPIRES_TIME, 
    // Token expiration time from environment variable
  });
};

// Compare user's password
userSchema.methods.comparePassword = async function (enteredPassword) { 
  // Instance method to compare entered password with hashed password
  return await bcrypt.compare(enteredPassword, this.password); 
  // Returns true if matched, false otherwise
};

// Generate password reset token
userSchema.methods.generateResetPasswordToken = function () { 
  // Instance method to generate a password reset token

  const resetToken = crypto.randomBytes(20).toString("hex"); 
  // Generate a random 20-byte token and convert to hex string

  this.resetPasswordToken = crypto
    .createHash("sha256") 
    // Hash the token using SHA-256
    .update(resetToken) 
    // Update hash with the token
    .digest("hex"); 
    // Save hashed token to resetPasswordToken

  this.resetPasswordExpires = Date.now() + 30 * 60 * 1000; 
  // Set expiration time to 30 minutes from now

  return resetToken; 
  // Return the unhashed token for sending to the user
};

module.exports = mongoose.model("User", userSchema); 
// Export the schema as a Mongoose model named "User"
