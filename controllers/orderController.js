const Order = require("../models/order"); 
// Import the Order model to interact with the "orders" collection in MongoDB

const Product = require("../models/product"); 
// Import the Product model to interact with the "products" collection

const ErrorHandler = require("../utils/errorHandler"); 
// Import a custom error handler class to create and handle errors consistently

const catchAsyncErrors = require("../middlewares/catchAsyncErrors"); 
// Import a middleware to catch errors in async functions and pass them to error handler

const APIFeatures = require("../utils/apiFeatures"); 
// Import a utility class that handles filtering, searching, sorting, and pagination

// Create a new Order => /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => { 
  // Export an async function to create a new order, wrapped with catchAsyncErrors
  const { 
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body; 
  // Destructure order details from the request body

  const order = await Order.create({ 
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(), // Record current time as the payment time
    user: req.user._id, // Associate the order with the currently logged-in user
  });

  res.status(200).json({ 
    success: true, 
    order, // Respond with success and the created order
  });
});

// Get Single Order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => { 
  // Export an async function to get a single order by ID
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  ); 
  // Find the order by ID and populate the 'user' field with name and email

  if (!order) { 
    // If the order is not found
    return next(new ErrorHandler(`No Order found!`, 404)); 
    // Pass an error to the error handler with 404 status
  }

  res.status(200).json({ 
    success: true,
    order, // Return the order data
  });
});

// Get Logged in User Orders => /api/v1/orders/myOrders?page=1
exports.getMyOrders = catchAsyncErrors(async (req, res, next) => { 
  // Export an async function to get orders for the currently logged-in user
  const ordersPerPage = 3; 
  // Define the number of orders to show per page

  const orders = await Order.find({ user: req.user.id }); 
  // Fetch all orders for the logged-in user

  const ordersCount = await Order.countDocuments(); 
  // Count total number of orders in the collection

  const apiFeatures = new APIFeatures(
    Order.find({ user: req.user.id }).sort({ createdAt: -1 }),
    req.query
  ).filter(); 
  // Initialize APIFeatures for filtering, sorting, and searching on user's orders

  let filteredOrder = await apiFeatures.query; 
  // Execute the query to get filtered orders
  let filteredOrderCount = filteredOrder.length; 
  // Count the filtered orders

  apiFeatures.pagination(ordersPerPage); 
  // Apply pagination using the defined number of orders per page

  filteredOrder = await apiFeatures.query.clone(); 
  // Execute the paginated query

  res.status(200).json({ 
    success: true,
    orders,
    ordersPerPage,
    ordersCount,
    filteredOrder,
    filteredOrderCount,
  }); 
  // Respond with orders, pagination info, and filtered results
});

// ---------------------------Admin Routes-----------------------------

// Get All Orders => /api/v1/admin/orders
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => { 
  // Export an async function to get all orders (admin only)
  const resPerPage = 5; 
  // Define number of orders per page for admin view

  const ordersCount = await Order.countDocuments(); 
  // Count total orders in the collection

  const apiFeatures = new APIFeatures(
    Order.find().sort({ createdAt: -1 }),
    req.query
  ); 
  // Initialize APIFeatures for filtering, sorting, and searching all orders

  let orders = await apiFeatures.query; 
  // Execute query to get all orders
  let filteredOrdersCount = orders.length; 
  // Count orders after applying filters

  let totalAmount = 0; 
  // Initialize total amount variable

  orders.forEach((order) => { 
    totalAmount += order.totalPrice; 
    // Sum the total price of all orders
  });

  apiFeatures.pagination(resPerPage); 
  // Apply pagination
  orders = await apiFeatures.query.clone(); 
  // Execute the paginated query

  res.status(200).json({ 
    success: true,
    resPerPage,
    ordersCount,
    filteredOrdersCount,
    totalAmount,
    orders, // Send paginated orders with counts and total amount
  });
});

// Update/Process Orders => /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => { 
  // Export an async function to update an order (admin only)
  const order = await Order.findById(req.params.id); 
  // Find the order by ID

  if (order.orderStatus === "Delivered") { 
    // If the order is already delivered
    return next(new ErrorHandler(`This Order has already been delivered`, 400)); 
    // Return an error since delivered orders cannot be updated
  }

  order.orderItems.forEach(async (item) => { 
    await updateStock(item.product, item.quantity); 
    // Update the stock for each product in the order
  });

  (order.orderStatus = req.body.status), (order.deliveredAt = Date.now()); 
  // Update the order status and set deliveredAt timestamp
  await order.save(); 
  // Save the updated order

  res.status(200).json({ 
    success: true,
    order, // Respond with the updated order
  });
});

// Update the stock of the product if it gets delivered
async function updateStock(productId, productQuantity) { 
  // Async helper function to reduce stock of a product
  const product = await Product.findById(productId); 
  // Find the product by ID
  product.stock = product.stock - productQuantity; 
  // Reduce the stock by the quantity ordered
  await product.save({ validateBeforeSave: false }); 
  // Save the updated product without running validation
}

// Delete Order => /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => { 
  // Export an async function to delete an order (admin only)
  const order = await Order.findById(req.params.id); 
  // Find the order by ID

  if (!order) { 
    // If the order does not exist
    return next(new ErrorHandler(`No Order found!`, 404)); 
    // Return a 404 error
  }

  await order.remove(); 
  // Remove the order from the database

  res.status(200).json({ 
    success: true,
    message: "The Order has been deleted successfully", 
    // Return success message
  });
});
