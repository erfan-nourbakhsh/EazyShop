// Import axios for making HTTP requests
import axios from "axios";

// Import order-related constants for Redux actions
import { orderConstants } from "../constants/order";

// Import server URL from store configuration
import { server } from "../store";

// Action to create a new order
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    // Dispatch CREATE_ORDER_REQUEST to indicate order creation has started
    dispatch({
      type: orderConstants.CREATE_ORDER_REQUEST,
    });

    // Configuration for axios request
    const config = {
      headers: {
        "Content-Type": "application/json", // Sending JSON data
        "Access-Control-Allow-Origin": "*", // Allow cross-origin requests
      },
      withCredentials: false, // Do not send cookies
    };

    // Send POST request to create a new order
    const { data } = await axios.post(`${server}/order/new`, order, config);

    // Dispatch CREATE_ORDER_SUCCESS with response data
    dispatch({
      type: orderConstants.CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // Dispatch CREATE_ORDER_FAIL if there is an error
    dispatch({
      type: orderConstants.CREATE_ORDER_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Action to get orders of the currently logged-in user
export const myOrders =
  (ordersCurrentPage = 1) =>
  async (dispatch) => {
    try {
      // Dispatch MY_ORDERS_REQUEST to indicate fetching has started
      dispatch({
        type: orderConstants.MY_ORDERS_REQUEST,
      });

      // Axios configuration
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: false,
      };

      // Send GET request to fetch user orders
      const data = await axios.get(
        `${server}/orders/myOrders?page=${ordersCurrentPage}`,
        config
      );

      // Dispatch MY_ORDERS_SUCCESS with fetched data
      dispatch({
        type: orderConstants.MY_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // Dispatch MY_ORDERS_FAIL if there is an error
      dispatch({
        type: orderConstants.MY_ORDERS_FAIL,
        payload: error.response.data.error,
      });
    }
  };

// Action to get details of a single order by ID
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    // Dispatch ORDER_DETAILS_REQUEST to indicate fetching has started
    dispatch({
      type: orderConstants.ORDER_DETAILS_REQUEST,
    });

    // Axios configuration
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: false,
    };

    // Send GET request to fetch order details by ID
    const { data } = await axios.get(`${server}/order/${id}`, config);

    // Dispatch ORDER_DETAILS_SUCCESS with fetched order details
    dispatch({
      type: orderConstants.ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    // Dispatch ORDER_DETAILS_FAIL if there is an error
    dispatch({
      type: orderConstants.ORDER_DETAILS_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Action to get all orders (Admin only)
export const allOrders =
  (ordersCurrentPage = 1) =>
  async (dispatch) => {
    try {
      // Dispatch ALL_ORDERS_REQUEST to indicate fetching has started
      dispatch({
        type: orderConstants.ALL_ORDERS_REQUEST,
      });

      // Axios configuration
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: false,
      };

      // Send GET request to fetch all orders (Admin)
      const data = await axios.get(
        `${server}/admin/orders?page=${ordersCurrentPage}`,
        config
      );

      // Dispatch ALL_ORDERS_SUCCESS with fetched data
      dispatch({
        type: orderConstants.ALL_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // Dispatch ALL_ORDERS_FAIL if there is an error
      dispatch({
        type: orderConstants.ALL_ORDERS_FAIL,
        payload: error.response.data.error,
      });
    }
  };

// Action to update an order (Admin only)
export const updateOrder = (id, orderData) => async (dispatch) => {
  try {
    // Dispatch UPDATE_ORDER_REQUEST to indicate update has started
    dispatch({
      type: orderConstants.UPDATE_ORDER_REQUEST,
    });

    // Axios configuration
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
    };

    // Send PUT request to update the order
    const { data } = await axios.put(
      `${server}/admin/order/${id}`,
      orderData,
      config
    );

    // Dispatch UPDATE_ORDER_SUCCESS with update status
    dispatch({
      type: orderConstants.UPDATE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    // Dispatch UPDATE_ORDER_FAIL if there is an error
    dispatch({
      type: orderConstants.UPDATE_ORDER_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Action to delete an order (Admin only)
export const deleteOrder = (id) => async (dispatch) => {
  try {
    // Dispatch DELETE_ORDER_REQUEST to indicate deletion has started
    dispatch({
      type: orderConstants.DELETE_ORDER_REQUEST,
    });

    // Axios configuration
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: false,
    };

    // Send DELETE request to remove the order
    const { data } = await axios.delete(`${server}/admin/order/${id}`, config);

    // Dispatch DELETE_ORDER_SUCCESS with deletion status
    dispatch({
      type: orderConstants.DELETE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    // Dispatch DELETE_ORDER_FAIL if there is an error
    dispatch({
      type: orderConstants.DELETE_ORDER_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Action to clear errors
export const clearErrors = () => async (dispatch) => {
  // Dispatch CLEAR_ERRORS to reset error state
  dispatch({
    type: orderConstants.CLEAR_ERRORS,
  });
};
