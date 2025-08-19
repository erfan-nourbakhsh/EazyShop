// Define a class to handle API features like search, filter, and pagination
class APIFeatures {

  // Constructor to initialize the query and query string
  constructor(query, queryStr) {
    // Store the Mongoose query object
    this.query = query;
    // Store the query parameters from request
    this.queryStr = queryStr;
  }

  // Method to handle keyword search
  search() {
    // Check if a keyword is provided in the query string
    const keyword = this.queryStr.keyword
      ? {
          name: { 
            // Search for the 'name' field using regex
            $regex: this.queryStr.keyword, 
            $options: "i", 
            // Case-insensitive search
          },
        }
      : {}; 
      // If no keyword, use empty object

    // Apply the search filter to the query
    this.query = this.query.find({ ...keyword });

    // Return 'this' to allow method chaining
    return this;
  }

  // Method to handle filtering by fields like price or ratings
  filter() {
    // Copy the query string to avoid modifying original
    const queryCopy = { ...this.queryStr };

    // Fields to exclude from filtering
    const removeFields = ["keyword", "limit", "page"];
    // Remove unwanted fields from query
    removeFields.forEach((field) => {
      delete queryCopy[field];
    });

    // Convert query object to JSON string
    let queryStr = JSON.stringify(queryCopy);
    // Replace operators like gt, gte, lt, lte with MongoDB syntax ($gt, $gte, etc.)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    // Apply the filter to the query
    this.query = this.query.find(JSON.parse(queryStr));

    // Return 'this' to allow method chaining
    return this;
  }

  // Method to handle pagination
  pagination(resPerPage) {
    // Determine current page from query string or default to 1
    const currentPage = Number(this.queryStr.page) || 1;
    // Calculate the number of documents to skip
    const skip = resPerPage * (currentPage - 1);
    // Apply limit and skip to the query
    this.query = this.query.limit(resPerPage).skip(skip);

    // Return 'this' to allow method chaining
    return this;
  }
}

// Export the APIFeatures class for use in other files
module.exports = APIFeatures;
