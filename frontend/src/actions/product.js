// Import axios for making HTTP requests
import axios from "axios";

// Import product-related constants for Redux actions
import productsConstant from "../constants/product";

// Import server URL from store configuration
import { server } from "../store";

// Action to get all products with optional filters
export const getProducts =
  (
    keyword = "", // Search keyword
    currentPage = 1, // Current page number for pagination
    price = [1, 5000], // Price range filter
    category, // Category filter
    rating = 0, // Minimum rating filter
    sorting = "A-Z" // Sorting option
  ) =>
  async (dispatch) => {
    try {
      // Dispatch ALL_PRODUCTS_REQUEST to indicate fetch started
      dispatch({
        type: productsConstant.ALL_PRODUCTS_REQUEST,
      });

      // Construct the API path with filters
      let path = `${server}/products?sort=${sorting}&keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;

      // If category is specified, include it in the path
      if (category) {
        path = `${server}/products?sort=${sorting}&keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`;
      }

      // Axios configuration for request
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: false,
      };

      // Send GET request to fetch products
      const data = await axios.get(path, config);

      // Dispatch ALL_PRODUCTS_SUCCESS with fetched data
      dispatch({
        type: productsConstant.ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // Dispatch ALL_PRODUCTS_FAIL if there is an error
      dispatch({
        type: productsConstant.ALL_PRODUCTS_FAIL,
        payload: error.response.data.error,
      });
    }
  };

// Action to get all products for Admin
export const getAdminProducts =
  (currentPage = 1) =>
  async (dispatch) => {
    try {
      // Dispatch ADMIN_PRODUCTS_REQUEST to indicate fetch started
      dispatch({
        type: productsConstant.ADMIN_PRODUCTS_REQUEST,
      });

      // Axios configuration
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      };

      // Send GET request to fetch admin products
      const data = await axios.get(
        `${server}/admin/products?page=${currentPage}`,
        config
      );

      // Dispatch ADMIN_PRODUCTS_SUCCESS with fetched data
      dispatch({
        type: productsConstant.ADMIN_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // Dispatch ADMIN_PRODUCTS_FAIL if there is an error
      dispatch({
        type: productsConstant.ADMIN_PRODUCTS_FAIL,
        payload: error.response.data.error,
      });
    }
  };

// Action to get details of a single product by ID
export const getProductDetails = (id) => async (dispatch) => {
  try {
    // Dispatch PRODUCT_DETAILS_REQUEST to indicate fetch started
    dispatch({
      type: productsConstant.PRODUCT_DETAILS_REQUEST,
    });

    // Axios configuration
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: false,
    };

    // Send GET request to fetch product details
    const { data } = await axios.get(`${server}/product/${id}`, config);

    // Dispatch PRODUCT_DETAILS_SUCCESS with fetched product
    dispatch({
      type: productsConstant.PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    // Dispatch PRODUCT_DETAILS_FAIL if there is an error
    dispatch({
      type: productsConstant.PRODUCT_DETAILS_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Action to create a new product (Admin only)
export const newProduct = (productData) => async (dispatch) => {
  try {
    // Dispatch NEW_PRODUCT_REQUEST to indicate creation started
    dispatch({
      type: productsConstant.NEW_PRODUCT_REQUEST,
    });

    // Axios configuration
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
    };

    // Send POST request to create new product
    const { data } = await axios.post(
      `${server}/admin/product/new`,
      productData,
      config
    );

    // Dispatch NEW_PRODUCT_SUCCESS with created product data
    dispatch({
      type: productsConstant.NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // Dispatch NEW_PRODUCT_FAIL if there is an error
    dispatch({
      type: productsConstant.NEW_PRODUCT_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Action to update a product (Admin only)
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    // Dispatch UPDATE_PRODUCT_REQUEST to indicate update started
    dispatch({
      type: productsConstant.UPDATE_PRODUCT_REQUEST,
    });

    // Axios configuration
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
    };

    // Send PUT request to update product
    const { data } = await axios.put(
      `${server}/admin/product/${id}`,
      productData,
      config
    );

    // Dispatch UPDATE_PRODUCT_SUCCESS with update status
    dispatch({
      type: productsConstant.UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    // Dispatch UPDATE_PRODUCT_FAIL if there is an error
    dispatch({
      type: productsConstant.UPDATE_PRODUCT_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Action to delete a product (Admin only)
export const deleteProduct = (id) => async (dispatch) => {
  try {
    // Dispatch DELETE_PRODUCT_REQUEST to indicate deletion started
    dispatch({
      type: productsConstant.DELETE_PRODUCT_REQUEST,
    });

    // Axios configuration
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: false,
    };

    // Send DELETE request to remove product
    const { data } = await axios.delete(
      `${server}/admin/product/${id}`,
      config
    );

    // Dispatch DELETE_PRODUCT_SUCCESS with deletion status
    dispatch({
      type: productsConstant.DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    // Dispatch DELETE_PRODUCT_FAIL if there is an error
    dispatch({
      type: productsConstant.DELETE_PRODUCT_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Action to create a new product review
export const newReview = (reviewData) => async (dispatch) => {
  try {
    // Dispatch NEW_REVIEW_REQUEST to indicate review creation started
    dispatch({
      type: productsConstant.NEW_REVIEW_REQUEST,
    });

    // Axios configuration
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
    };

    // Send PUT request to add review
    const { data } = await axios.put(`${server}/review`, reviewData, config);

    // Dispatch NEW_REVIEW_SUCCESS with success status
    dispatch({
      type: productsConstant.NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    // Dispatch NEW_REVIEW_FAIL if there is an error
    dispatch({
      type: productsConstant.NEW_REVIEW_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Action to get all reviews of a product
export const getProductReviews = (id) => async (dispatch) => {
  try {
    // Dispatch GET_REVIEWS_REQUEST to indicate fetch started
    dispatch({
      type: productsConstant.GET_REVIEWS_REQUEST,
    });

    // Axios configuration
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: false,
    };

    // Send GET request to fetch reviews by product ID
    const { data } = await axios.get(`${server}/reviews?id=${id}`, config);

    // Dispatch GET_REVIEWS_SUCCESS with fetched reviews
    dispatch({
      type: productsConstant.GET_REVIEWS_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    // Dispatch GET_REVIEWS_FAIL if there is an error
    dispatch({
      type: productsConstant.GET_REVIEWS_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Action to delete a review (Admin only)
export const deleteReview = (id, productId) => async (dispatch) => {
  try {
    // Dispatch DELETE_REVIEW_REQUEST to indicate deletion started
    dispatch({
      type: productsConstant.DELETE_REVIEW_REQUEST,
    });

    // Axios configuration
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: false,
    };

    // Send DELETE request to remove review
    const { data } = await axios.delete(
      `${server}/reviews?id=${id}&productId=${productId}`,
      config
    );

    // Dispatch DELETE_REVIEW_SUCCESS with deletion status
    dispatch({
      type: productsConstant.DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    // Dispatch DELETE_REVIEW_FAIL if there is an error
    dispatch({
      type: productsConstant.DELETE_REVIEW_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Action to clear errors
export const clearErrors = () => async (dispatch) => {
  // Dispatch CLEAR_ERRORS to reset error state
  dispatch({
    type: productsConstant.CLEAR_ERRORS,
  });
};
