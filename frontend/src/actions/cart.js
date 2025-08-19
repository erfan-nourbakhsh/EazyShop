// Import axios for making HTTP requests
import axios from "axios";

// Import cart-related constants for Redux actions
import { cartConstants } from "../constants/cart";

// Import server URL from store configuration
import { server } from "../store";

// Add items to cart action
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  // Configuration for axios request
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*", // Allow cross-origin requests
    },
    withCredentials: false, // Do not send cookies with the request
  };

  // Fetch product data from server using product ID
  const { data } = await axios.get(`${server}/product/${id}`, config);

  // Dispatch ADD_TO_CART action with product details and quantity
  dispatch({
    type: cartConstants.ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });

  // Save updated cart items to localStorage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Remove items from cart action
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  // Dispatch REMOVE_CART_ITEM action with product ID
  dispatch({
    type: cartConstants.REMOVE_CART_ITEM,
    payload: id,
  });

  // Update localStorage with current cart items after removal
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Save shipping information action
export const saveShippingInfo = (data) => async (dispatch) => {
  // Dispatch SAVE_SHIPPING_INFO action with shipping data
  dispatch({
    type: cartConstants.SAVE_SHIPPING_INFO,
    payload: data,
  });

  // Save shipping info to localStorage
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
