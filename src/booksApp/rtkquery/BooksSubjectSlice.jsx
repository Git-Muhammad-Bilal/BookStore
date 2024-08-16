import { RestaurantMenuTwoTone } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    subject: 'fiction',
    subjectsList: ['fiction']
};

const BooksSubjectSlice = createSlice({
    name: 'favBooksListSlice',
    initialState,
    reducers: {
        slectSubject(state, action) {
            let subj = action.payload
            let i = state.subjectsList.indexOf('favorite')

            state.subject = subj == 'learnMore' || subj
         
            if (state.subjectsList.includes(subj)) return
            state.subjectsList.push(subj)
            if (subj !== 'favorite' && i !== -1) {
                state.subjectsList.splice(i, 1, subj)
                state.subjectsList[i + 1] = 'favorite'
                return state
            }


        },
        slectedCurSub(state, action) {
             state.subject = action.payload
        },
        addBookToSubj: (state, action) => {
            let { sub, to } = action.payload
            let i = state.subjectsList.indexOf(sub)
            state.subjectsList.splice(i + 1, 0, to)
        },

        removeSubName(state, action) {
            let result = state.subjectsList.filter((s) => {
                if (s !== action.payload) {
                    return s
                }
            })
            state.favBooksList = result || []
        },
    },
});

export const { slectSubject, slectedCurSub, removeSubName, addBookToSubj } = BooksSubjectSlice.actions;

export default BooksSubjectSlice.reducer;