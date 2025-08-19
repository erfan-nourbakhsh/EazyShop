const mongoose = require("mongoose"); 
// Import Mongoose to define schemas and interact with MongoDB

const productSchema = new mongoose.Schema({ 
  // Define a new Mongoose schema for products

  name: { 
    // Product name field
    type: String,
    required: [true, "Please provide the product name"], 
    // Name is required with custom error message
    trim: true, 
    // Remove whitespace from start and end
    maxLength: [500, "Product name mustn't exceed 100 characters"], 
    // Maximum length validation (note: message says 100 but maxLength is 500)
  },

  price: { 
    // Product price field
    type: Number,
    maxLength: [5, "Product price mustn't exceed 5 digit"], 
    // Maximum 5 digits
    default: 0.0, 
    // Default price if not provided
  },

  description: { 
    // Product description field
    type: String,
    required: [true, "Please provide some product description"], 
    // Description is required
  },

  ratings: { 
    // Average rating of the product
    type: Number,
    default: 0, 
    // Default rating
  },

  images: [ 
    // Array of product images
    {
      public_id: { 
        // Cloudinary public ID
        type: String,
        required: true, 
      },
      url: { 
        // Image URL
        type: String,
        required: true, 
      },
    },
  ],

  category: { 
    // Product category
    type: String,
    required: [true, "Please provide any category"], 
    enum: { 
      // Restrict values to predefined categories
      values: [
        "Clothing",
        "Gadgets",
        "Kitchen",
        "Smartphones",
        "Laptops",
        "Watches",
        "Accessories",
        "Gifts, Sports and Toys",
        "Home and Furniture",
      ],
      message: "Please provide a valid category", 
      // Error if value not in enum
    },
  },

  seller: { 
    // Name of the seller
    type: String,
    required: [true, "Please provide the seller name"], 
  },

  stock: { 
    // Quantity of the product in stock
    type: Number,
    required: [true, "Please provide the stock for the product"], 
    maxLength: [5, "Product stock mustn't exceed 5 characters"], 
  },

  numOfReviews: { 
    // Total number of reviews
    type: Number,
    default: 0, 
  },

  reviews: [ 
    // Array of reviews
    {
      user: { 
        // ID of the user who wrote the review
        type: mongoose.Schema.ObjectId,
        ref: "User", 
        required: true, 
      },
      name: { 
        // Name of the reviewer
        type: String,
        required: true, 
      },
      rating: { 
        // Rating given by the reviewer
        type: Number,
        required: true, 
      },
      comment: { 
        // Comment from the reviewer
        type: String,
        required: true, 
      },
    },
  ],

  user: { 
    // ID of the user who created the product (admin or seller)
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true, 
  },

  createdAt: { 
    // Timestamp when the product was created
    type: Date,
    default: Date.now, 
  },
});

module.exports = mongoose.model("Product", productSchema); 
// Export the schema as a Mongoose model named "Product"
