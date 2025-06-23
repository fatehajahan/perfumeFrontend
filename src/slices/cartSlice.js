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
            if (action.payload.type === "increament") {
                state.cartItems[action.payload.index].quantity++
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            }
        },
        quantityDecreament: (state, action) => {
            console.log(state.cartItems);
            console.log(action.payload)
            if (action.payload.type === "decreament") {
                state.cartItems[action.payload.index].quantity--
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            }
        },
        removeItem: (state, action) => {
            const index = action.payload
            state.cartItems.splice(index, 1); // remove 1 item at the given index
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        }
    },
})

export const { cartTotal, quantityUpdate, quantityDecreament, removeItem } = cartSlice.actions

export default cartSlice.reducer