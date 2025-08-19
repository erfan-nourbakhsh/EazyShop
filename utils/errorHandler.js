// Define a custom error handler class extending the built-in Error class
class ErrorHandler extends Error {

  // Constructor to initialize the error message and status code
  constructor(message, errorCode) {
    // Call the parent class (Error) constructor with the message
    super(message);

    // Store the HTTP status code for the error
    this.statusCode = errorCode;

    // Capture the stack trace for better debugging
    Error.captureStackTrace(this, this.constructor);
  }
}

// Export the ErrorHandler class to use in other files
module.exports = ErrorHandler;
