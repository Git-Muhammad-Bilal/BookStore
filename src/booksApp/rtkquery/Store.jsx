import { configureStore } from "@reduxjs/toolkit";
import { BooksListSlice } from "./BooksListSlice";
import { FetchFavoriteBooksSliceSlice } from "./FetchFavoriteBooksListSlice";
import faveBooksListSlice from "./AddToFavorite"
import PagesNumberSlice from "./PagesNumberSlice";
import AddToCartToSlice from "./AddToCartToSlice";
import BooksSubjectSlice from "./BooksSubjectSlice";
const store = configureStore({
    reducer:{
        favBooks:faveBooksListSlice,
        pagesData:PagesNumberSlice,
        cartItems:AddToCartToSlice,
        subject: BooksSubjectSlice,
        [BooksListSlice.reducerPath]:BooksListSlice.reducer,
        [FetchFavoriteBooksSliceSlice.reducerPath]:FetchFavoriteBooksSliceSlice.reducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat( 
        BooksListSlice.middleware,
        FetchFavoriteBooksSliceSlice.middleware,
        ),
})


export default  store;