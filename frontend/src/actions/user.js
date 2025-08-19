// Import axios for HTTP requests
import axios from "axios";

// Import user-related constants for Redux actions
import userConstants from "../constants/user";

// Import server URL from store configuration
import { server } from "../store";

// Login action
export const login = (email, password) => async (dispatch) => {
  try {
    // Dispatch LOGIN_REQUEST to indicate login started
    dispatch({
      type: userConstants.LOGIN_REQUEST,
    });

    // Axios configuration
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: false,
    };

    // Send POST request to login endpoint
    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      config
    );

    // Dispatch LOGIN_SUCCESS with logged-in user data
    dispatch({
      type: userConstants.LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    // Dispatch LOGIN_FAIL if an error occurs
    dispatch({
      type: userConstants.LOGIN_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Register User action
export const register = (userData) => async (dispatch) => {
  try {
    // Dispatch REGISTER_USER_REQUEST to indicate registration started
    dispatch({
      type: userConstants.REGISTER_USER_REQUEST,
    });

    // Axios configuration for multipart/form-data
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: false,
    };

    // Send POST request to register endpoint
    const { data } = await axios.post(`${server}/register`, userData, config);

    // Dispatch REGISTER_USER_SUCCESS with new user data
    dispatch({
      type: userConstants.REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    // Dispatch REGISTER_USER_FAIL if an error occurs
    dispatch({
      type: userConstants.REGISTER_USER_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Load logged-in user
export const loadUser = () => async (dispatch) => {
  try {
    // Dispatch LOAD_USER_REQUEST to indicate fetch started
    dispatch({
      type: userConstants.LOAD_USER_REQUEST,
    });

    // Axios configuration
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: false,
    };

    // Send GET request to profile endpoint
    const { data } = await axios.get(`${server}/profile`, config);

    // Dispatch LOAD_USER_SUCCESS with user data
    dispatch({
      type: userConstants.LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    // Dispatch LOAD_USER_FAIL if an error occurs
    dispatch({
      type: userConstants.LOAD_USER_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Logout user
export const logout = () => async (dispatch) => {
  try {
    // Axios configuration
    const config = {
      withCredentials: false,
    };

    // Send GET request to logout endpoint
    await axios.get(`${server}/logout`, config);

    // Dispatch LOGOUT_SUCCESS
    dispatch({ type: userConstants.LOGOUT_SUCCESS });
  } catch (error) {
    // Dispatch LOGOUT_FAIL if an error occurs
    dispatch({
      type: userConstants.LOGOUT_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Update profile action
export const updateProfile = (userData) => async (dispatch) => {
  try {
    // Dispatch UPDATE_PROFILE_REQUEST to indicate update started
    dispatch({
      type: userConstants.UPDATE_PROFILE_REQUEST,
    });

    // Axios configuration for multipart/form-data
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: false,
    };

    // Send PUT request to update profile endpoint
    const { data } = await axios.put(
      `${server}/profile/update`,
      userData,
      config
    );

    // Dispatch UPDATE_PROFILE_SUCCESS with success status
    dispatch({
      type: userConstants.UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    // Dispatch UPDATE_PROFILE_FAIL if an error occurs
    dispatch({
      type: userConstants.UPDATE_PROFILE_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Update password action
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    // Dispatch UPDATE_PASSWORD_REQUEST to indicate update started
    dispatch({
      type: userConstants.UPDATE_PASSWORD_REQUEST,
    });

    // Axios configuration for JSON
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: false,
    };

    // Send PUT request to update password endpoint
    const { data } = await axios.put(
      `${server}/password/update`,
      passwords,
      config
    );

    // Dispatch UPDATE_PASSWORD_SUCCESS with success status
    dispatch({
      type: userConstants.UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    // Dispatch UPDATE_PASSWORD_FAIL if an error occurs
    dispatch({
      type: userConstants.UPDATE_PASSWORD_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Forgot password action
export const forgotPassword = (email) => async (dispatch) => {
  try {
    // Dispatch FORGOT_PASSWORD_REQUEST to indicate request started
    dispatch({
      type: userConstants.FORGOT_PASSWORD_REQUEST,
    });

    // Axios configuration for JSON
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: false,
    };

    // Send POST request to forgot password endpoint
    const { data } = await axios.post(
      `${server}/password/forgot`,
      email,
      config
    );

    // Dispatch FORGOT_PASSWORD_SUCCESS with message
    dispatch({
      type: userConstants.FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    // Dispatch FORGOT_PASSWORD_FAIL if an error occurs
    dispatch({
      type: userConstants.FORGOT_PASSWORD_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Reset password action
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    // Dispatch NEW_PASSWORD_REQUEST to indicate reset started
    dispatch({
      type: userConstants.NEW_PASSWORD_REQUEST,
    });

    // Axios configuration for JSON
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: false,
    };

    // Send PUT request to reset password endpoint with token
    const { data } = await axios.put(
      `${server}/password/reset/${token}`,
      passwords,
      config
    );

    // Dispatch NEW_PASSWORD_SUCCESS with success status
    dispatch({
      type: userConstants.NEW_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    // Dispatch NEW_PASSWORD_FAIL if an error occurs
    dispatch({
      type: userConstants.NEW_PASSWORD_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Get all users - Admin action
export const allUsers =
  (usersCurrentPage = 1) =>
  async (dispatch) => {
    try {
      // Dispatch ALL_USERS_REQUEST to indicate fetch started
      dispatch({
        type: userConstants.ALL_USERS_REQUEST,
      });

      // Axios configuration
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: false,
      };

      // Send GET request to fetch all users for admin
      const data = await axios.get(
        `${server}/admin/users?page=${usersCurrentPage}`,
        config
      );

      // Dispatch ALL_USERS_SUCCESS with fetched data
      dispatch({
        type: userConstants.ALL_USERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // Dispatch ALL_USERS_FAIL if an error occurs
      dispatch({
        type: userConstants.ALL_USERS_FAIL,
        payload: error.response.data.error,
      });
    }
  };

// Delete user - Admin action
export const deleteUser = (id) => async (dispatch) => {
  try {
    // Dispatch DELETE_USER_REQUEST to indicate deletion started
    dispatch({
      type: userConstants.DELETE_USER_REQUEST,
    });

    // Axios configuration
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: false,
    };

    // Send DELETE request to delete user endpoint
    const { data } = await axios.delete(`${server}/admin/user/${id}`, config);

    // Dispatch DELETE_USER_SUCCESS with deletion status
    dispatch({
      type: userConstants.DELETE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    // Dispatch DELETE_USER_FAIL if an error occurs
    dispatch({
      type: userConstants.DELETE_USER_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Update user - Admin action
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    // Dispatch UPDATE_USER_REQUEST to indicate update started
    dispatch({
      type: userConstants.UPDATE_USER_REQUEST,
    });

    // Axios configuration for JSON
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: false,
    };

    // Send PUT request to update user endpoint
    const { data } = await axios.put(
      `${server}/admin/user/${id}`,
      userData,
      config
    );

    // Dispatch UPDATE_USER_SUCCESS with success status
    dispatch({
      type: userConstants.UPDATE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    // Dispatch UPDATE_USER_FAIL if an error occurs
    dispatch({
      type: userConstants.UPDATE_USER_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Get user details - Admin action
export const getUserDetails = (id) => async (dispatch) => {
  try {
    // Dispatch USER_DETAILS_REQUEST to indicate fetch started
    dispatch({
      type: userConstants.USER_DETAILS_REQUEST,
    });

    // Axios configuration
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: false,
    };

    // Send GET request to fetch user details
    const { data } = await axios.get(`${server}/admin/user/${id}`, config);

    // Dispatch USER_DETAILS_SUCCESS with fetched user
    dispatch({
      type: userConstants.USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    // Dispatch USER_DETAILS_FAIL if an error occurs
    dispatch({
      type: userConstants.USER_DETAILS_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Clear errors action
export const clearErrors = () => async (dispatch) => {
  // Dispatch CLEAR_ERRORS to reset error state
  dispatch({
    type: userConstants.CLEAR_ERRORS,
  });
};
