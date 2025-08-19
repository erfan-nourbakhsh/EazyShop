// Constants for Redux actions related to Orders
export const orderConstants = {
  // Actions for creating a new order
  CREATE_ORDER_REQUEST: "CREATE_ORDER_REQUEST", // Request initiated
  CREATE_ORDER_SUCCESS: "CREATE_ORDER_SUCCESS", // Request succeeded
  CREATE_ORDER_FAIL: "CREATE_ORDER_FAIL",       // Request failed

  // Actions for fetching orders of the logged-in user
  MY_ORDERS_REQUEST: "MY_ORDERS_REQUEST", // Request initiated
  MY_ORDERS_SUCCESS: "MY_ORDERS_SUCCESS", // Request succeeded
  MY_ORDERS_FAIL: "MY_ORDERS_FAIL",       // Request failed

  // Actions for fetching all orders (admin)
  ALL_ORDERS_REQUEST: "ALL_ORDERS_REQUEST", // Request initiated
  ALL_ORDERS_SUCCESS: "ALL_ORDERS_SUCCESS", // Request succeeded
  ALL_ORDERS_FAIL: "ALL_ORDERS_FAIL",       // Request failed

  // Actions for updating an order (admin)
  UPDATE_ORDER_REQUEST: "UPDATE_ORDER_REQUEST", // Request initiated
  UPDATE_ORDER_SUCCESS: "UPDATE_ORDER_SUCCESS", // Request succeeded
  UPDATE_ORDER_RESET: "UPDATE_ORDER_RESET",     // Reset update state
  UPDATE_ORDER_FAIL: "UPDATE_ORDER_FAIL",       // Request failed

  // Actions for deleting an order (admin)
  DELETE_ORDER_REQUEST: "DELETE_ORDER_REQUEST", // Request initiated
  DELETE_ORDER_SUCCESS: "DELETE_ORDER_SUCCESS", // Request succeeded
  DELETE_ORDER_RESET: "DELETE_ORDER_RESET",     // Reset delete state
  DELETE_ORDER_FAIL: "DELETE_ORDER_FAIL",       // Request failed

  // Actions for fetching details of a single order
  ORDER_DETAILS_REQUEST: "ORDER_DETAILS_REQUEST", // Request initiated
  ORDER_DETAILS_SUCCESS: "ORDER_DETAILS_SUCCESS", // Request succeeded
  ORDER_DETAILS_FAIL: "ORDER_DETAILS_FAIL",       // Request failed

  // Action to clear errors
  CLEAR_ERRORS: "CLEAR_ERRORS",
};
