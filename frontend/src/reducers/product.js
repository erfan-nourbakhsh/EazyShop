import productsConstant from "../constants/product";

// Reducer for fetching all products (for users and admin)
export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    // Request starts (user or admin fetching products)
    case productsConstant.ALL_PRODUCTS_REQUEST:
    case productsConstant.ADMIN_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };

    // User successfully fetched all products
    case productsConstant.ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.data.products,
        productsCount: action.payload.data.productsCount,
        resPerPage: action.payload.data.resPerPage,
        filteredProductsCount: action.payload.data.filteredProductsCount,
      };

    // Admin successfully fetched all products
    case productsConstant.ADMIN_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.data.products,
        productsCount: action.payload.data.productsCount,
        resPerPage: action.payload.data.resPerPage,
        filteredProductsCount: action.payload.data.filteredProductsCount,
      };

    // Fetching products failed
    case productsConstant.ALL_PRODUCTS_FAIL:
    case productsConstant.ADMIN_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    // Clear errors from state
    case productsConstant.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Reducer for fetching details of a single product
export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case productsConstant.PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case productsConstant.PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };

    case productsConstant.PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case productsConstant.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Reducer for creating a new product (Admin)
export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case productsConstant.NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case productsConstant.NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success, // Boolean flag
      };

    case productsConstant.NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
        loading: false,
      };

    case productsConstant.NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case productsConstant.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Reducer for updating or deleting a product (Admin)
export const productManipulationReducer = (state = {}, action) => {
  switch (action.type) {
    case productsConstant.DELETE_PRODUCT_REQUEST:
    case productsConstant.UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case productsConstant.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case productsConstant.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case productsConstant.DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
        loading: false,
      };

    case productsConstant.UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
        loading: false,
      };

    case productsConstant.DELETE_PRODUCT_FAIL:
    case productsConstant.UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case productsConstant.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Reducer for creating a new review
export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case productsConstant.NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case productsConstant.NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload, // Boolean flag
      };

    case productsConstant.NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };

    case productsConstant.NEW_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case productsConstant.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Reducer for fetching all reviews of a product
export const productReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case productsConstant.GET_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case productsConstant.GET_REVIEWS_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };

    case productsConstant.GET_REVIEWS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case productsConstant.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Reducer for deleting a review
export const reviewManipulationReducer = (state = {}, action) => {
  switch (action.type) {
    case productsConstant.DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case productsConstant.DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case productsConstant.DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case productsConstant.DELETE_REVIEW_RESET:
      return {
        ...state,
        loading: false,
        isDeleted: false,
      };

    case productsConstant.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
