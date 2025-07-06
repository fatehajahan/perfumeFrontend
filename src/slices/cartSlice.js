// src/redux/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Helper to get cart by email
const getCartFromLocalStorage = (email) => {
  if (!email) return [];
  const storedCart = localStorage.getItem(`cart_${email}`);
  return storedCart ? JSON.parse(storedCart) : [];
};

// Get user email
const user = JSON.parse(localStorage.getItem('user'));
const email = user?.email || null;

const initialState = {
  cartItems: getCartFromLocalStorage(email),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartTotal: (state, action) => {
      const findIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (findIndex >= 0) {
        state.cartItems[findIndex].quantity += action.payload.quantity || 1;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }

      const user = JSON.parse(localStorage.getItem('user'));
      const email = user?.email;
      if (email) {
        localStorage.setItem(`cart_${email}`, JSON.stringify(state.cartItems));
      }
    },

    quantityUpdate: (state, action) => {
      const { index, type } = action.payload;
      if (type === 'increament') {
        state.cartItems[index].quantity += 1;

        const user = JSON.parse(localStorage.getItem('user'));
        const email = user?.email;
        if (email) {
          localStorage.setItem(`cart_${email}`, JSON.stringify(state.cartItems));
        }
      }
    },

    quantityDecreament: (state, action) => {
      const { index, type } = action.payload;
      if (type === 'decreament' && state.cartItems[index].quantity > 1) {
        state.cartItems[index].quantity -= 1;

        const user = JSON.parse(localStorage.getItem('user'));
        const email = user?.email;
        if (email) {
          localStorage.setItem(`cart_${email}`, JSON.stringify(state.cartItems));
        }
      }
    },

    removeItem: (state, action) => {
      const index = action.payload;
      state.cartItems.splice(index, 1);

      const user = JSON.parse(localStorage.getItem('user'));
      const email = user?.email;
      if (email) {
        localStorage.setItem(`cart_${email}`, JSON.stringify(state.cartItems));
      }
    },

    clearCart: (state) => {
      const user = JSON.parse(localStorage.getItem('user'));
      const email = user?.email;
      state.cartItems = [];
      if (email) {
        localStorage.removeItem(`cart_${email}`);
      }
    },

    loadUserCart: (state, action) => {
      const email = action.payload;
      const storedCart = localStorage.getItem(`cart_${email}`);
      state.cartItems = storedCart ? JSON.parse(storedCart) : [];
    },
  },
});

export const {
  cartTotal,
  quantityUpdate,
  quantityDecreament,
  removeItem,
  clearCart,
  loadUserCart
} = cartSlice.actions;

export default cartSlice.reducer;
