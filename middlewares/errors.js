const ErrorHandler = require("../utils/errorHandler"); 
// Import the custom ErrorHandler class to create standardized error objects

module.exports = (err, req, res, next) => { 
  // Export an Express error-handling middleware function
  // It receives 4 parameters: error, request, response, and next middleware

  err.statusCode = err.statusCode || 500; 
  // If the error does not have a status code, default to 500 (Internal Server Error)

  if (process.env.NODE_ENV === "DEVELOPMENT") { 
    // If the application is running in development mode
    res.status(err.statusCode).json({ 
      success: false,
      error: err, // Include full error object for debugging
      errorMessage: err.message, // Include error message
      errorStack: err.stack, // Include stack trace
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") { 
    // If the application is running in production mode
    let error = { ...err }; 
    // Make a shallow copy of the error object
    error.message = err.message; 
    // Preserve the original error message

    // Wrong Mongoose Object ID Error
    if (err.name === "CastError") { 
      // Handle invalid MongoDB object IDs
      const message = `Resource not found! Invalid: ${err.path}`;
      error = new ErrorHandler(message, 400); 
      // Create a 400 Bad Request error with custom message
    }

    // Handle Mongoose Validation Error
    if (err.name === "ValidationError") { 
      // Handle Mongoose schema validation errors
      const message = Object.values(err.errors).map((value) => value.message); 
      // Extract all validation error messages
      error = new ErrorHandler(message, 400); 
      // Create a 400 Bad Request error
    }

    // Handle Mongoose Duplicate Key Error
    if (err.code === 11000) { 
      // Handle MongoDB duplicate key errors
      const message = `Duplicate ${Object.keys(err.keyValue)} Entered!!`; 
      // Build a message showing which field is duplicated
      error = new ErrorHandler(message, 400); 
      // Create a 400 Bad Request error
    }

    // Handle Wrong JWT Error
    if (err.name === "JsonWebTokenError") { 
      // Handle invalid JSON Web Token errors
      const message = `JSON Web Token is Invalid!! Please try again`;
      error = new ErrorHandler(message, 400); 
      // Create a 400 Bad Request error
    }

    // Handle Expired JWT Error
    if (err.name === "TokenExpiredError") { 
      // Handle expired JSON Web Tokens
      const message = `JSON Web Token is Expired!! Please try again`;
      error = new ErrorHandler(message, 400); 
      // Create a 400 Bad Request error
    }

    res.status(error.statusCode).json({ 
      success: false,
      error: error.message || "Internal Server Error", 
      // Send a clean error message in production
    });
  }
};
