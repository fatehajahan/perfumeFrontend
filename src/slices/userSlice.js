import { createSlice } from '@reduxjs/toolkit';

let userFromStorage = null;
try {
  const storedUser = localStorage.getItem('user');
  if (storedUser && storedUser !== "undefined") {
    userFromStorage = JSON.parse(storedUser);
  }
} catch (error) {
  console.error("Failed to parse user from localStorage:", error);
  localStorage.removeItem('user');
}

const initialState = {
  currentUser: userFromStorage,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    removeUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem('user');
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
