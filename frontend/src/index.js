// Import the core React library
import React from "react";

// Import ReactDOM for rendering the app into the DOM
import ReactDOM from "react-dom/client";

// Import global CSS file
import "./index.css";

// Import React Router's BrowserRouter for client-side routing
import { BrowserRouter as Router } from "react-router-dom";

// Import the main App component
import App from "./App";

// Import Redux Provider to pass the store to the entire app
import { Provider } from "react-redux";

// Import the configured Redux store
import store from "./store";

// Import ToastContainer for showing notifications
import { ToastContainer } from "react-toastify";

// Import default Toastify styles
import "react-toastify/dist/ReactToastify.css";

// Create the root element for React 18+ rendering
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the React app into the root element
root.render(
  // Wrap the entire app with Redux Provider to give access to the store
  <Provider store={store}>
    {/* Wrap the app with Router for navigation */}
    <Router>
      {/* Main App component */}
      <App />
      {/* ToastContainer displays notification popups */}
      <ToastContainer />
    </Router>
  </Provider>
);
