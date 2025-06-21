import { configureStore } from '@reduxjs/toolkit'
import  cartSlice  from './slices/cartSlice' //eikhane object akare second bracket dibo na!!

export const store = configureStore({
  reducer: {
    cartDetails: cartSlice
  },
})