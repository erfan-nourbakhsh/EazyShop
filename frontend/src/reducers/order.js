import { orderConstants } from "../constants/order";

// Reducer for creating a new order
export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    // When creating an order starts
    case orderConstants.CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    // When order is successfully created
    case orderConstants.CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload, // Store the created order data
      };

    // When order creation fails
    case orderConstants.CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    // Clear any errors in state
    case orderConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Reducer for fetching the current user's orders
export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderConstants.MY_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case orderConstants.MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload.data.orders, // List of orders
        ordersCount: action.payload.data.ordersCount,
        filteredOrder: action.payload.data.filteredOrder,
        filteredOrderCount: action.payload.data.filteredOrderCount,
        ordersPerPage: action.payload.data.ordersPerPage,
      };

    case orderConstants.MY_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case orderConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Reducer for fetching the details of a single order
export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case orderConstants.ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case orderConstants.ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload, // Detailed info of the order
      };

    case orderConstants.ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case orderConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Reducer for admin fetching all orders
export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderConstants.ALL_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case orderConstants.ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload.data.orders,
        ordersCount: action.payload.data.ordersCount,
        resPerPage: action.payload.data.resPerPage,
        filteredOrdersCount: action.payload.data.filteredOrdersCount,
        totalAmount: action.payload.data.totalAmount,
      };

    case orderConstants.ALL_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case orderConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Reducer for updating or deleting orders (Admin actions)
export const orderManipulationReducer = (state = {}, action) => {
  switch (action.type) {
    // Start of update or delete action
    case orderConstants.UPDATE_ORDER_REQUEST:
    case orderConstants.DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    // Update order success
    case orderConstants.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload, // Boolean flag for update
      };

    // Delete order success
    case orderConstants.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload, // Boolean flag for delete
      };

    // Reset update flag
    case orderConstants.UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
        loading: false,
      };

    // Reset delete flag
    case orderConstants.DELETE_ORDER_RESET:
      return {
        ...state,
        isDeleted: false,
        loading: false,
      };

    // Handle update or delete failure
    case orderConstants.UPDATE_ORDER_FAIL:
    case orderConstants.DELETE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Clear errors
    case orderConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
