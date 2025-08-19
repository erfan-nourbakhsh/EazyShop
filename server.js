// Import the Express app instance
const app = require("./app");

// Import dotenv to load environment variables
const dotenv = require("dotenv");

// Import database connection function
const connectDatabase = require("./config/database");

// Import Cloudinary for image storage
const cloudinary = require("cloudinary");

// Handle uncaught exceptions (synchronous errors not caught in try/catch)
process.on("uncaughtException", (err) => {
  console.error(`\u001b[1;31m ERROR: ${err.message}`); // Log error message in red
  console.error(`\u001b[1;31m Stack: ${err.stack}`);    // Log stack trace
  console.error(
    `\u001b[1;31m Shutting down the server due to uncaught exception`
  );
  process.exit(1); // Exit process with failure
});

// Load environment variables from config file if not in production
if (process.env.NODE_ENV !== "PRODUCTION")
  require("dotenv").config({ path: "backend/config/config.env" });

// Connect to the MongoDB database
connectDatabase();

// Configure Cloudinary with credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloud name
  api_key: process.env.CLOUDINARY_API_KEY,       // API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // API secret
});

// Start the server on port 8000
const server = app.listen(8000, () => {
  console.log(
    `Server started on PORT: 8000 in ${process.env.NODE_ENV} mode`
  );
});

// Handle unhandled promise rejections (async errors not caught)
process.on("unhandledRejection", (err) => {
  console.error(`\u001b[1;31m ERROR: ${err.message}`); // Log error message in red
  console.error(
    `\u001b[1;31m Shutting down the server due to unhandled promise rejection`
  );
  // Close server and exit process
  server.close(() => {
    process.exit(1);
  });
});
