// Constants for Redux actions related to Users
export const userConstants = {
  // Actions for logging in
  LOGIN_REQUEST: "LOGIN_REQUEST",   // Login request initiated
  LOGIN_SUCCESS: "LOGIN_SUCCESS",   // Login succeeded
  LOGIN_FAIL: "LOGIN_FAIL",         // Login failed

  // Actions for user registration
  REGISTER_USER_REQUEST: "REGISTER_USER_REQUEST", // Registration request initiated
  REGISTER_USER_SUCCESS: "REGISTER_USER_SUCCESS", // Registration succeeded
  REGISTER_USER_FAIL: "REGISTER_USER_FAIL",       // Registration failed

  // Actions for loading the current logged-in user
  LOAD_USER_REQUEST: "LOAD_USER_REQUEST", // Request initiated
  LOAD_USER_SUCCESS: "LOAD_USER_SUCCESS", // Request succeeded
  LOAD_USER_FAIL: "LOAD_USER_FAIL",       // Request failed

  // Actions for updating password
  UPDATE_PASSWORD_REQUEST: "UPDATE_PASSWORD_REQUEST", // Request initiated
  UPDATE_PASSWORD_SUCCESS: "UPDATE_PASSWORD_SUCCESS", // Request succeeded
  UPDATE_PASSWORD_RESET: "UPDATE_PASSWORD_RESET",     // Reset password update state
  UPDATE_PASSWORD_FAIL: "UPDATE_PASSWORD_FAIL",       // Request failed

  // Actions for updating user profile
  UPDATE_PROFILE_REQUEST: "UPDATE_PROFILE_REQUEST", // Request initiated
  UPDATE_PROFILE_SUCCESS: "UPDATE_PROFILE_SUCCESS", // Request succeeded
  UPDATE_PROFILE_RESET: "UPDATE_PROFILE_RESET",     // Reset profile update state
  UPDATE_PROFILE_FAIL: "UPDATE_PROFILE_FAIL",       // Request failed

  // Actions for forgot password
  FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST", // Request initiated
  FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS", // Request succeeded
  FORGOT_PASSWORD_FAIL: "FORGOT_PASSWORD_FAIL",       // Request failed

  // Actions for resetting password with a token
  NEW_PASSWORD_REQUEST: "NEW_PASSWORD_REQUEST", // Request initiated
  NEW_PASSWORD_SUCCESS: "NEW_PASSWORD_SUCCESS", // Request succeeded
  NEW_PASSWORD_FAIL: "NEW_PASSWORD_FAIL",       // Request failed

  // Actions for fetching all users (admin)
  ALL_USERS_REQUEST: "ALL_USERS_REQUEST",   // Request initiated
  ALL_USERS_SUCCESS: "ALL_USERS_SUCCESS",   // Request succeeded
  ALL_USERS_FAIL: "ALL_USERS_FAIL",         // Request failed

  // Actions for fetching a single user’s details (admin)
  USER_DETAILS_REQUEST: "USER_DETAILS_REQUEST", // Request initiated
  USER_DETAILS_SUCCESS: "USER_DETAILS_SUCCESS", // Request succeeded
  USER_DETAILS_FAIL: "USER_DETAILS_FAIL",       // Request failed

  // Actions for updating a user (admin)
  UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST", // Request initiated
  UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS", // Request succeeded
  UPDATE_USER_RESET: "UPDATE_USER_RESET",     // Reset update user state
  UPDATE_USER_FAIL: "UPDATE_USER_FAIL",       // Request failed

  // Actions for deleting a user (admin)
  DELETE_USER_REQUEST: "DELETE_USER_REQUEST", // Request initiated
  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS", // Request succeeded
  DELETE_USER_RESET: "DELETE_USER_RESET",     // Reset delete user state
  DELETE_USER_FAIL: "DELETE_USER_FAIL",       // Request failed

  // Actions for logout
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS", // Logout succeeded
  LOGOUT_FAIL: "LOGOUT_FAIL",       // Logout failed

  // Action to clear errors
  CLEAR_ERRORS: "CLEAR_ERRORS",
};

export default userConstants;
