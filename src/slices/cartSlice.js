import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        cartTotal: (state, action) => {
            const findIndex = state.cartItems.findIndex((item) => item._id === action.payload._id)
            console.log(findIndex)

            if (findIndex >= 0) {
                state.cartItems[findIndex].quantity += 1
            } else {
                state.cartItems.push({
                    ...action.payload,
                    quantity: 1,
                })
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
    },
})

export const { cartTotal } = cartSlice.actions

export default cartSlice.reducer