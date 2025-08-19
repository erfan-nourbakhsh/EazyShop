const Product = require("../models/product"); 
// Import the Product model to interact with the products collection in MongoDB

const ErrorHandler = require("../utils/errorHandler"); 
// Import a custom error handler class to create and manage consistent error responses

const catchAsyncErrors = require("../middlewares/catchAsyncErrors"); 
// Import a middleware to catch errors in async functions and forward them to the error handler

const APIFeatures = require("../utils/apiFeatures"); 
// Import a utility class for search, filter, sort, and pagination functionality

const cloudinary = require("cloudinary"); 
// Import the Cloudinary library for handling image uploads and deletions

// Create a new Product => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => { 
  // Export an async function to create a new product (admin only)
  let images = [];
  if (typeof req.body.images === "string") { 
    // If only one image is provided as a string
    images.push(req.body.images); 
    // Convert it to an array with one element
  } else { 
    images = req.body.images; 
    // Otherwise, assign the array of images
  }

  let imagesLinks = []; 
  // Array to store Cloudinary upload results

  for (let i = 0; i < images.length; i++) { 
    // Loop through each image
    const result = await cloudinary.v2.uploader.upload(images[i], { 
      folder: `products`, 
      // Upload image to the 'products' folder in Cloudinary
    });
    imagesLinks.push({
      public_id: result.public_id, 
      // Save the public_id from Cloudinary
      url: result.secure_url, 
      // Save the secure URL of the uploaded image
    });
  }

  req.body.images = imagesLinks; 
  // Replace images in request body with Cloudinary links
  req.body.user = req.user.id; 
  // Assign the logged-in user as the product creator
  const product = await Product.create(req.body); 
  // Create the product in the database
  res.status(201).json({ 
    success: true,
    product, // Return the created product
  });
});

// Get all Products => /api/v1/products?keyword=Shirt
exports.getProducts = catchAsyncErrors(async (req, res, next) => { 
  const resPerPage = 9; 
  // Number of products per page
  let sortParam = req.query.sort; 
  // Read sort parameter from query string
  let sortQuery; 
  // Variable to store Mongoose sort query

  if (sortParam === "A-Z") { 
    sortQuery = { name: 1 }; 
    // Sort products alphabetically ascending
  } else if (sortParam === "Z-A") { 
    sortQuery = { name: -1 }; 
    // Sort products alphabetically descending
  } else if (sortParam === "price[Asc]") { 
    sortQuery = { price: 1 }; 
    // Sort products by price ascending
  } else if (sortParam === "price[Dsc]") { 
    sortQuery = { price: -1 }; 
    // Sort products by price descending
  }

  const productsCount = await Product.countDocuments(); 
  // Count total number of products

  const apiFeatures = new APIFeatures(Product.find().sort(sortQuery), req.query)
    .search()
    .filter(); 
  // Initialize APIFeatures with search and filter capabilities

  let products = await apiFeatures.query; 
  // Execute query to get filtered products
  let filteredProductsCount = products.length; 
  // Count filtered products

  apiFeatures.pagination(resPerPage); 
  // Apply pagination
  products = await apiFeatures.query.clone(); 
  // Execute paginated query

  res.status(200).json({ 
    success: true,
    filteredProductsCount,
    productsCount,
    resPerPage,
    products, 
  });
});

// Get all Products (Admin) => /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => { 
  const resPerPage = 9; 
  // Products per page for admin
  const productsCount = await Product.countDocuments(); 
  // Total number of products
  const apiFeatures = new APIFeatures(Product.find(), req.query); 
  // Initialize APIFeatures for filtering, sorting, and search

  let products = await apiFeatures.query; 
  let filteredProductsCount = products.length; 
  // Count filtered products

  apiFeatures.pagination(resPerPage); 
  products = await apiFeatures.query.clone(); 
  // Apply pagination

  res.status(200).json({ 
    success: true,
    filteredProductsCount,
    productsCount,
    resPerPage,
    products, 
  });
});

// Get a Product => /api/v1/product/:id
exports.getProduct = catchAsyncErrors(async (req, res, next) => { 
  const product = await Product.findById(req.params.id); 
  // Find product by ID

  if (!product) { 
    return next(new ErrorHandler("Product not found", 404)); 
    // Return 404 if product does not exist
  }

  res.status(200).json({ 
    success: true,
    product, 
  });
});

// Update a Product => /api/v1/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => { 
  let product = await Product.findById(req.params.id); 
  // Find the product by ID

  if (!product) { 
    return next(new ErrorHandler("Product not found", 404)); 
  }

  let images = [];
  if (typeof req.body.images === "string") { 
    images.push(req.body.images); 
  } else { 
    images = req.body.images; 
  }

  if (images !== undefined) { 
    // If new images are provided
    for (let i = 0; i < product.images.length; i++) { 
      // Delete old images from Cloudinary
      const result = await cloudinary.v2.uploader.destroy(
        product.images[i].public_id
      );
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) { 
      // Upload new images to Cloudinary
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: `products`,
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks; 
    // Replace images in request body with uploaded links
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true, 
    // Return the updated document
    runValidators: true, 
    // Run validators for updated fields
  });

  res.status(200).json({ 
    success: true,
    message: "Product updated successfully",
    product, 
  });
});

// Delete a Product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => { 
  const product = await Product.findById(req.params.id); 
  // Find product by ID

  if (!product) { 
    return next(new ErrorHandler("Product not found", 404)); 
  }

  for (let i = 0; i < product.images.length; i++) { 
    // Delete images from Cloudinary
    const result = await cloudinary.v2.uploader.destroy(
      product.images[i].public_id
    );
  }

  await product.deleteOne(); 
  // Delete product from database

  res.status(200).json({ 
    success: true,
    message: "Product deleted successfully", 
  });
});

// Create New Review => /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => { 
  const { rating, comment, productId } = req.body; 
  // Destructure review info from request body
  const review = {
    user: req.user._id, 
    // Review creator ID
    name: req.user.name, 
    rating: Number(rating), 
    comment, 
  };

  const product = await Product.findById(productId); 
  // Find the product being reviewed
  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  ); 
  // Check if user has already reviewed

  if (isReviewed) { 
    // Update existing review
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else { 
    product.reviews.push(review); 
    product.numOfReviews = product.reviews.length; 
    // Add new review and update review count
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length; 
  // Recalculate average rating

  await product.save({ validateBeforeSave: false }); 
  // Save product without validation

  res.status(200).json({ 
    success: true,
    message: "Reviews updated successfully",
  });
});

// Get Product Reviews => /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => { 
  const product = await Product.findById(req.query.id); 
  // Find product by ID from query parameter

  if (!product) { 
    return next(new ErrorHandler("Product not found", 404)); 
  }

  res.status(200).json({ 
    success: true,
    reviews: product.reviews, 
  });
});

// Delete Product Review => /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => { 
  const product = await Product.findById(req.query.productId); 
  // Find product by productId from query

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  ); 
  // Remove review with specified ID

  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length; 
  // Recalculate average rating after deletion

  const numOfReviews = reviews.length; 
  // Update number of reviews

  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, ratings, numOfReviews },
    {
      new: true, 
      runValidators: true, 
      useFindAndModify: false, 
    }
  ); 
  // Update product document in database

  res.status(200).json({ 
    success: true,
    message: "Review deleted successfully", 
  });
});
