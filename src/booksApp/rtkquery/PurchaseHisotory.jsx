import { createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
let books = []
// let url = 'https://openlibrary.org/search.json'
let url = 'http://localhost:3001/'
let token = localStorage.getItem('jwtToken')

export const PurhcasesHistorySlice = createApi({
    reducerPath: 'BooksListSlice',
    baseQuery: fetchBaseQuery({ baseUr: 'http://localhost:3001/',

        prepareHeaders: (headers, { getState }) => {
            
            if (token) {
              headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
          },
     }),
    
    

    endpoints: (builder) => ({
        getPurhcases:builder.query({
            query: (value) => {
                
                return `http://localhost:3001/getPurhcases`},
          
        })
       
    })    
})    

export const { useLazyFetchBooksLIstQuery, useSearchBooksListQuery, useLazyFetchBooksForAutoCompleteQuery } = BooksListSlice;


