import { createSlice } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi/AxiosApi';


const initialState = {
    favBooksList: []
};

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

export const { addToFav, removeFromFav } = favBooksListSlice.actions;

export default favBooksListSlice.reducer;