import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: []
};

const cartItemsSlice = createSlice({
    name: 'cartItemsSlice',
    initialState,
    reducers: {
        addCurBookListPageNum(state, action) {
            state.curBookListPageNumb = action.payload
        },
     
        removeCurBookListPageNum(state) {
            state.favBooksList = null;
        },
    },
});

export const { addCurBookListPageNum,removeCurBookListPageNum } = cartItemsSlice.actions;

export default cartItemsSlice.reducer;