// Function to create a JWT token, send it in a cookie, and return user data
const sendToken = (user, statusCode, res) => {
  // Create JWT token using the user instance method
  const token = user.getJwtToken();

  // Define options for the cookie
  const options = {
    // Set cookie expiration based on environment variable
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    // Make cookie accessible only via HTTP(S), not JavaScript
    httpOnly: true,
    // Ensure cookie is sent over HTTPS only
    secure: true,
    // Allow cross-site cookies
    sameSite: "none",
  };

  // Set status code, attach cookie, and send JSON response with token and user info
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

// Export the sendToken function for use in authentication routes
module.exports = sendToken;
