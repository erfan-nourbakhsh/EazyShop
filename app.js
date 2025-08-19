// Import Express framework
const express = require("express");

// Create an Express application instance
const app = express();

// Import middleware to parse cookies
const cookieParser = require("cookie-parser");

// Import middleware to parse request body
const bodyParser = require("body-parser");

// Import CORS middleware to handle cross-origin requests
const cors = require("cors");

// Import custom error handling middleware
const errorMiddleware = require("./middlewares/errors");

// Load environment variables from config file if not in production
if (process.env.NODE_ENV !== "PRODUCTION")
  require("dotenv").config({ path: "config/config.env" });

// Parse incoming JSON requests with a body size limit of 50mb
app.use(express.json({ limit: "50mb" }));

// Parse incoming JSON requests with body-parser (redundant with express.json)
app.use(bodyParser.json({ limit: "50mb" }));

// Parse URL-encoded data with body-parser
app.use(
  bodyParser.urlencoded({
    limit: "50mb",        // Maximum payload size
    extended: true,        // Use extended parsing for rich objects
    parameterLimit: 50000, // Maximum number of parameters
  })
);

// Enable cookie parsing
app.use(cookieParser());

// Enable CORS for all origins and specified HTTP methods
app.use(
  cors({
    origin: '*',                // Allow requests from any origin
    credentials: false,         // Do not send cookies with requests
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  })
);

// Import product and order routes
const products = require("./routes/product");
const order = require("./routes/order");

// Use the imported routes with prefix /api/v1
app.use(`/api/v1`, products);
app.use(`/api/v1`, order);

// Define a simple root route for testing
app.get("/", (_, res) =>
  res.send(`<h1>Hi :)</h1>`)
);

// Use custom error handling middleware at the end
app.use(errorMiddleware);

// Export the Express app instance
module.exports = app;
