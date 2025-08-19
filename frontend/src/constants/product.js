// Constants for Redux actions related to Products
export const productsConstant = {
  // Actions for fetching all products (frontend)
  ALL_PRODUCTS_REQUEST: "ALL_PRODUCTS_REQUEST", // Request initiated
  ALL_PRODUCTS_SUCCESS: "ALL_PRODUCTS_SUCCESS", // Request succeeded
  ALL_PRODUCTS_FAIL: "ALL_PRODUCTS_FAIL",       // Request failed

  // Actions for fetching all products (admin)
  ADMIN_PRODUCTS_REQUEST: "ADMIN_PRODUCTS_REQUEST", // Request initiated
  ADMIN_PRODUCTS_SUCCESS: "ADMIN_PRODUCTS_SUCCESS", // Request succeeded
  ADMIN_PRODUCTS_FAIL: "ADMIN_PRODUCTS_FAIL",       // Request failed

  // Actions for creating a new product (admin)
  NEW_PRODUCT_REQUEST: "NEW_PRODUCT_REQUEST", // Request initiated
  NEW_PRODUCT_SUCCESS: "NEW_PRODUCT_SUCCESS", // Request succeeded
  NEW_PRODUCT_RESET: "NEW_PRODUCT_RESET",     // Reset create product state
  NEW_PRODUCT_FAIL: "NEW_PRODUCT_FAIL",       // Request failed

  // Actions for updating a product (admin)
  UPDATE_PRODUCT_REQUEST: "UPDATE_PRODUCT_REQUEST", // Request initiated
  UPDATE_PRODUCT_SUCCESS: "UPDATE_PRODUCT_SUCCESS", // Request succeeded
  UPDATE_PRODUCT_RESET: "UPDATE_PRODUCT_RESET",     // Reset update state
  UPDATE_PRODUCT_FAIL: "UPDATE_PRODUCT_FAIL",       // Request failed

  // Actions for deleting a product (admin)
  DELETE_PRODUCT_REQUEST: "DELETE_PRODUCT_REQUEST", // Request initiated
  DELETE_PRODUCT_SUCCESS: "DELETE_PRODUCT_SUCCESS", // Request succeeded
  DELETE_PRODUCT_RESET: "DELETE_PRODUCT_RESET",     // Reset delete state
  DELETE_PRODUCT_FAIL: "DELETE_PRODUCT_FAIL",       // Request failed

  // Actions for fetching product details
  PRODUCT_DETAILS_REQUEST: "PRODUCT_DETAILS_REQUEST", // Request initiated
  PRODUCT_DETAILS_SUCCESS: "PRODUCT_DETAILS_SUCCESS", // Request succeeded
  PRODUCT_DETAILS_FAIL: "PRODUCT_DETAILS_FAIL",       // Request failed

  // Actions for creating a new review for a product
  NEW_REVIEW_REQUEST: "NEW_REVIEW_REQUEST", // Request initiated
  NEW_REVIEW_SUCCESS: "NEW_REVIEW_SUCCESS", // Request succeeded
  NEW_REVIEW_RESET: "NEW_REVIEW_RESET",     // Reset review state
  NEW_REVIEW_FAIL: "NEW_REVIEW_FAIL",       // Request failed

  // Actions for fetching reviews of a product
  GET_REVIEWS_REQUEST: "GET_REVIEWS_REQUEST", // Request initiated
  GET_REVIEWS_SUCCESS: "GET_REVIEWS_SUCCESS", // Request succeeded
  GET_REVIEWS_FAIL: "GET_REVIEWS_FAIL",       // Request failed

  // Actions for deleting a review (admin)
  DELETE_REVIEW_REQUEST: "DELETE_REVIEW_REQUEST", // Request initiated
  DELETE_REVIEW_SUCCESS: "DELETE_REVIEW_SUCCESS", // Request succeeded
  DELETE_REVIEW_RESET: "DELETE_REVIEW_RESET",     // Reset delete review state
  DELETE_REVIEW_FAIL: "DELETE_REVIEW_FAIL",       // Request failed

  // Action to clear errors
  CLEAR_ERRORS: "CLEAR_ERRORS",
};

export default productsConstant;
