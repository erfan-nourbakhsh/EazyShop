// Import Express framework
const express = require("express");

// Create a new router object to define route handlers
const router = express.Router();

// Import controller functions for handling orders
const {
  newOrder,
  getMyOrders,
  getSingleOrder,
} = require("../controllers/orderController");

// Import middleware to check if the user is authenticated
const { isAuthenticatedUser } = require("../middlewares/auth");

// Route to create a new order
// POST request to /order/new
// First runs authentication middleware, then calls newOrder controller
router.route("/order/new").post(isAuthenticatedUser, newOrder);

// Route to get a single order by ID
// GET request to /order/:id
// First runs authentication middleware, then calls getSingleOrder controller
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

// Route to get all orders of the logged-in user
// GET request to /orders/myOrders
// First runs authentication middleware, then calls getMyOrders controller
router.route("/orders/myOrders").get(isAuthenticatedUser, getMyOrders);

// Export the router so it can be used in the main app
module.exports = router;
