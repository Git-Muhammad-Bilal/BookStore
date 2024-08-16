import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    booksListPage: 1,
    favoriteBooksWithPage: {},
    pageWithSubh: {subject:'fiction', pageNum:1},
};

const PagesNumberSlice = createSlice({
    name: 'curBookListPageNumSlice',
    initialState,
    reducers: {
        setBookListPage(state, action) {
            state.booksListPage = action.payload
        },
        setPrevSubWithPage(state, action) {
            
            state.pageWithSubh = action.payload
        },
        addFavoriteBooksWithPage(state, action) {
            state.favoriteBooksWithPage = { ...state.favoriteBooksWithPage, ...action.payload }
        },

        
    },
});

export const { setBookListPage,setPrevSubWithPage, addFavoriteBooksWithPage, addCurBookListPageNum, removeCurBookListPageNum } = PagesNumberSlice.actions;

export default PagesNumberSlice.reducer;