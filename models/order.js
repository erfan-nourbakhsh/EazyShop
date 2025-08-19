const mongoose = require("mongoose"); 
// Import Mongoose to define schemas and interact with MongoDB

const orderSchema = mongoose.Schema({ 
  // Define a new Mongoose schema for orders

  shippingInfo: { 
    // Embedded object to store shipping information
    address: {
      type: String,
      required: true, // Address is mandatory
    },
    city: {
      type: String,
      required: true, // City is mandatory
    },
    phoneNo: {
      type: String,
      required: true, // Phone number is mandatory
    },
    postalCode: {
      type: String,
      required: true, // Postal code is mandatory
    },
    country: {
      type: String,
      required: true, // Country is mandatory
    },
  },

  user: {
    type: mongoose.Schema.Types.ObjectId, 
    // Store the ID of the user who placed the order
    required: true, 
    ref: "User", 
    // Reference to the User model for population
  },

  orderItems: [ 
    // Array of ordered items
    {
      name: {
        type: String,
        required: true, // Product name is mandatory
      },
      quantity: {
        type: Number,
        required: true, // Quantity is mandatory
      },
      image: {
        type: String,
        required: true, // Product image URL is mandatory
      },
      price: {
        type: Number,
        required: true, // Price of the product is mandatory
      },
      product: {
        type: mongoose.Schema.Types.ObjectId, 
        // Reference to the product document
        required: true,
        ref: "Product", // Reference to Product model
      },
    },
  ],

  paymentInfo: { 
    // Payment details
    id: {
      type: String, // Payment transaction ID
    },
    status: {
      type: String, // Payment status (e.g., "Paid", "Pending")
    },
  },

  paidAt: {
    type: Date, // Timestamp when the order was paid
  },

  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0, // Total price of items before tax and shipping
  },

  taxPrice: {
    type: Number,
    required: true,
    default: 0.0, // Tax amount
  },

  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0, // Shipping cost
  },

  totalPrice: {
    type: Number,
    required: true,
    default: 0.0, // Total order price (items + tax + shipping)
  },

  orderStatus: {
    type: String,
    required: true,
    default: "Processing", // Current status of the order
  },

  deliveredAt: {
    type: Date, // Timestamp when the order was delivered
  },

  createdAt: {
    type: Date,
    default: Date.now, // Timestamp when the order was created
  },
});

module.exports = mongoose.model("Order", orderSchema); 
// Export the schema as a Mongoose model named "Order"
