import { createSlice } from '@reduxjs/toolkit';

// Initial state for the counter slice
const initialState = {
    cartItems: []
};

// Create a counter slice
const addToCartSlice = createSlice({
    name: 'addToCartSlice',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.cartItems.push(action.payload)
        },
        removeCartItem(state, action) {
            let result = state.cartItems.filter((p) => {
                if (p.bookId !== action.payload) {
                    return p
                }
            })
            state.cartItems = result || []
        },
           emtpyCart(state) {
            state.cartItems = []
        },
        handleInc(state, action) {
            let result = state.cartItems.map((p) => {
                if (p.bookId === action.payload.bookId) {
                    p.quanity += 1
                    return p;
                }
                return p
            })
            state.cartItems = result || []
        },
        handleDec(state, action) {
            let result = state.cartItems.map((p) => {
                if (p.bookId === action.payload.bookId) {
                    p.quanity = p.quanity === 0 ? 0 : p.quanity - 1
                    return p
                }
                return p;
            })
            state.cartItems = result || []
        },


    },
});

// Export actions generated from the slice
export const { addToCart, removeCartItem,emtpyCart, handleInc, handleDec } = addToCartSlice.actions;

// Export the reducer function
export default addToCartSlice.reducer;