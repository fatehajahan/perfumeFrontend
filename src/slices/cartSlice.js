import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add product to cart or increase quantity
    cartTotal: (state, action) => {
      const findIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (findIndex >= 0) {
        // If already exists, just update the quantity
        state.cartItems[findIndex].quantity += action.payload.quantity || 1;
      } else {
        // Else add new item
        state.cartItems.push({
          ...action.payload,
          quantity: action.payload.quantity || 1, // use passed quantity
        });
      }

      // ✅ Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    // Increase quantity by 1
    quantityUpdate: (state, action) => {
      const { index, type } = action.payload;
      if (type === 'increament') {
        state.cartItems[index].quantity += 1;

        // ✅ Update localStorage
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },

    // Decrease quantity by 1 (if more than 1)
    quantityDecreament: (state, action) => {
      const { index, type } = action.payload;
      if (type === 'decreament' && state.cartItems[index].quantity > 1) {
        state.cartItems[index].quantity -= 1;

        // ✅ Update localStorage
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },

    // Remove item by index
    removeItem: (state, action) => {
      const index = action.payload;

      // ✅ Remove item from cart
      state.cartItems.splice(index, 1);

      // ✅ Update localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },
});

export const {
  cartTotal,
  quantityUpdate,
  quantityDecreament,
  removeItem,
} = cartSlice.actions;

export default cartSlice.reducer;
