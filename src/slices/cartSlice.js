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
        quantityUpdate: (state, action) => {
            console.log(state.cartItems);
            console.log(action.payload)
            if (action.payload.type === "increament"){
                state.cartItems[action.payload.index].quantity ++
            }
        }
    },
})

export const { cartTotal, quantityUpdate } = cartSlice.actions

export default cartSlice.reducer