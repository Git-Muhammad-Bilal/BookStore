import { createSlice } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi/AxiosApi';

// Initial state for the counter slice
const initialState = {
    favBooksList: []
};

// Create a counter slice
const favBooksListSlice = createSlice({
    name: 'favBooksListSlice',
    initialState,
    reducers: {
        async addToFav(state, action) {
            state.favBooksList.push(action.payload)
        
        },
        
        async removeFromFav(state, action) {
            let { data } = await axiosApi.post('savefavoriteBook', {
                bookId: action.payload
            })
            
            if (data) {

                let result = state?.favBooksList?.filter((p) => {
                    if (p !== action.payload) {
                        return p
                    }
                })
                state.favBooksList = result || []
            }
        },
    },
});

// Export actions generated from the slice
export const { addToFav, removeFromFav } = favBooksListSlice.actions;

// Export the reducer function
export default favBooksListSlice.reducer;