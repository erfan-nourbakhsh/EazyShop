const jwt = require("jsonwebtoken"); 
// Import the JSON Web Token library for verifying and decoding tokens

const user = require("../models/user"); 
// Import the User model to query user data from MongoDB

const ErrorHandler = require("../utils/errorHandler"); 
// Import custom error handler to generate consistent error responses

const catchAsyncErrors = require("./catchAsyncErrors"); 
// Import middleware to catch errors in async functions and pass them to error handler

// Checks if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => { 
  // Export a middleware function to check authentication, wrapped in catchAsyncErrors
  const { token } = req.cookies; 
  // Extract the token from request cookies

  if (!token) { 
    // If token does not exist
    return next(
      new ErrorHandler("Login required for accessing the resources.", 401) 
      // Return a 401 Unauthorized error
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET); 
  // Verify and decode the token using the secret key from environment variables

  req.user = await user.findById(decoded.id); 
  // Fetch the user from the database using the ID from the decoded token and attach it to req.user

  next(); 
  // Call next middleware if authenticated
});

// Checks if user is admin or not
exports.authorizeRoles = (...roles) => { 
  // Export a middleware generator function that checks if user role is authorized
  return (req, res, next) => { 
    // Return actual middleware function
    if (!roles.includes(req.user.role)) { 
      // If the logged-in user's role is not in the allowed roles
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`, 
          403
        ) 
        // Return a 403 Forbidden error
      );
    }
    next(); 
    // Call next middleware if role is authorized
  };
};
