// Import Express framework
const express = require("express");

// Create a new router object to define route handlers
const router = express.Router();

// Import controller functions for handling product requests
const {
  getProducts,
  getProduct,
} = require("../controllers/productController");

// Route to get all products
// GET request to /products, calls getProducts controller
router.route("/products").get(getProducts);

// Route to get a single product by ID
// GET request to /product/:id, calls getProduct controller
router.route("/product/:id").get(getProduct);

// Export the router so it can be used in the main app
module.exports = router;
