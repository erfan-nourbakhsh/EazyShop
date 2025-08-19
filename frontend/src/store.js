// Import Redux Toolkit functions for store configuration and combining reducers
import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";

// Import redux-thunk middleware for async actions
import thunk from "redux-thunk";

// Import Redux DevTools extension for debugging
import { composeWithDevTools } from "redux-devtools-extension";

// Import product-related reducers
import {
  productsReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  productManipulationReducer,
  productReviewsReducer,
  reviewManipulationReducer,
} from "./reducers/product";

// Import user-related reducers
import {
  userAuthReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./reducers/user";

// Import cart reducer
import { cartReducer } from "./reducers/cart";

// Import order-related reducers
import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  allOrdersReducer,
  orderManipulationReducer,
} from "./reducers/order";

// Define initial state for the store
let initialState = {
  cart: {
    // Load cart items from localStorage if available, otherwise empty array
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    // Load shipping info from localStorage if available, otherwise default empty object
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {
          country: "",
          fullName: "",
          phoneNo: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          postalCode: "",
        },
  },
};

// Combine all reducers into a single root reducer
const reducers = combineReducers({
  products: productsReducer, // state for product listings
  productDetails: productDetailsReducer, // state for single product details
  newProduct: newProductReducer, // state for creating new product
  manipulateProduct: productManipulationReducer, // state for updating/deleting product
  auth: userAuthReducer, // state for user login/auth
  user: userReducer, // state for user profile
  forgotPassword: forgotPasswordReducer, // state for forgot/reset password
  cart: cartReducer, // state for shopping cart
  order: newOrderReducer, // state for creating new order
  myOrders: myOrdersReducer, // state for current user orders
  orderDetails: orderDetailsReducer, // state for single order details
  allOrders: allOrdersReducer, // state for all orders (admin)
  manipulateOrder: orderManipulationReducer, // state for updating/deleting order (admin)
  newReview: newReviewReducer, // state for creating new review
  allUsers: allUsersReducer, // state for all users (admin)
  userDetails: userDetailsReducer, // state for single user details (admin)
  productReviews: productReviewsReducer, // state for all reviews of a product
  reviewReducer: reviewManipulationReducer, // state for deleting reviews (admin)
});

// Create an array of middlewares (currently only thunk for async actions)
const middleware = [thunk];

// Configure the Redux store
const store = configureStore(
  {
    reducer: reducers, // root reducer
    middleware: [thunk], // apply middleware
    preloadedState: initialState, // set initial state
  },
  // Integrate Redux DevTools for debugging
  composeWithDevTools(applyMiddleware(...middleware))
);

// Export the configured store for use in Provider
export default store;

// Export the server base URL for API requests
export const server = "http://localhost:8000/api/v1";
