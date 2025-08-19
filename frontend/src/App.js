// React hooks for component lifecycle and state
import { useEffect, useState } from "react";

// AnimatePresence allows animation transitions between routes/components
import { AnimatePresence } from "framer-motion";

// React Router for handling routes
import { Routes, Route } from "react-router-dom";

// Axios for HTTP requests
import axios from "axios";

// Importing all components used in the app
import {
  Header,
  Home,
  Product,
  Footer,
  AllProducts,
  Login,
  Register,
  Profile,
  ProtectedRoute,       // Component that guards routes for authenticated users/admins
  UpdateProfile,
  UpdatePassword,
  ForgotPassword,
  ResetPassword,
  Cart,
  Shipping,
  Order,
  Payment,
  Success,
  OrdersList,
  OrderDetails,
  Dashboard,
  ProductsList,
  CreateProduct,
  UpdateProduct,
  AllOrders,
  UpdateOrder,
  UsersList,
  UpdateUser,
  Reviews,
  Terms,
  Privacy,
  Faq,
  Contact,
  TopScroll,             // Scroll-to-top component
  Page404,
  OutOfStock,
} from "./components";

// Redux action to load the currently logged-in user
import { loadUser } from "./actions/user";

// Redux store and server URL
import store, { server } from "./store";

// Stripe Elements wrapper for React payments
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Import main app CSS
import "./App.css";

function App() {
  // State to store Stripe API key fetched from backend
  const [stripeApiKey, setStripeApiKey] = useState("");

  // useEffect runs once after component mounts
  useEffect(() => {
    // Dispatch Redux action to load logged-in user data
    store.dispatch(loadUser());

    // Async function to fetch Stripe API key from server
    async function getStripeApiKey() {
      const { data } = await axios.get(`${server}/stripe`, {
        headers: {
          "Access-Control-Allow-Origin": "*", // CORS header
        },
        withCredentials: false, // No cookies sent
      });
      setStripeApiKey(data.stripeApiKey); // Save key to state
    }

    getStripeApiKey(); // Call the async function
  }, []);

  return (
    // AnimatePresence enables exit animations when routes/components change
    <AnimatePresence mode="wait">
      <div className="flex min-h-screen flex-col">
        {/* Header component shown on all pages */}
        <Header />

        {/* Define all routes for the app */}
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Protected Routes (only accessible by admin users) */}
          <Route
            path="/admin/dashboard"
            isAdmin={true}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/all"
            isAdmin={true}
            element={
              <ProtectedRoute>
                <ProductsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/outofstock"
            isAdmin={true}
            element={
              <ProtectedRoute>
                <OutOfStock />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/create"
            isAdmin={true}
            element={
              <ProtectedRoute>
                <CreateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/product/:id"
            isAdmin={true}
            element={
              <ProtectedRoute>
                <UpdateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            isAdmin={true}
            element={
              <ProtectedRoute>
                <AllOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/order/:id"
            isAdmin={true}
            element={
              <ProtectedRoute>
                <UpdateOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            isAdmin={true}
            element={
              <ProtectedRoute>
                <UsersList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user/:id"
            isAdmin={true}
            element={
              <ProtectedRoute>
                <UpdateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reviews"
            isAdmin={true}
            element={
              <ProtectedRoute>
                <Reviews />
              </ProtectedRoute>
            }
          />

          {/* User Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/update"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/password/update"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shipping"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/myOrders"
            element={
              <ProtectedRoute>
                <OrdersList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/confirm"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <Success />
              </ProtectedRoute>
            }
          />

          {/* Payment route only if Stripe API key is loaded */}
          {stripeApiKey && (
            <Route
              path="/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                </Elements>
              }
            />
          )}

          {/* Password management routes */}
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />

          {/* Product and Cart routes */}
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<AllProducts />} />
          <Route path="/search/:keyword" element={<AllProducts />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />

          {/* Informational pages */}
          <Route path="/faq" element={<Faq />} />
          <Route path="/terms-and-condition" element={<Terms />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/contact-us" element={<Contact />} />

          {/* Catch-all route for 404 page */}
          <Route path="*" element={<Page404 />} />
        </Routes>

        {/* Scroll-to-top button */}
        <TopScroll />

        {/* Footer component */}
        <Footer />
      </div>
    </AnimatePresence>
  );
}

// Export App component as default
export default App;
