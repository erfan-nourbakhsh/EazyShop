import { cartConstants } from "../constants/cart";

// Reducer for managing the cart state
export const cartReducer = (
  state = {
    cartItems: [], // Array to store items in the cart
    shippingInfo: { // Object to store shipping details
      country: "",
      fullName: "",
      phoneNo: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      postalCode: "",
    },
  },
  action
) => {
  switch (action.type) {
    // Add or update an item in the cart
    case cartConstants.ADD_TO_CART:
      const item = action.payload; // The new or updated item

      // Check if the item already exists in the cart
      const isItemExist = state.cartItems.find(
        (items) => items.product === item.product
      );

      if (isItemExist) {
        // If item exists, update its quantity or details
        return {
          ...state,
          cartItems: state.cartItems.map((items) =>
            items.product === isItemExist.product ? item : items
          ),
        };
      } else {
        // If item does not exist, add it to the cart
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    // Remove an item from the cart
    case cartConstants.REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };

    // Save shipping information
    case cartConstants.SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    // Return current state if action type is not handled
    default:
      return state;
  }
};
