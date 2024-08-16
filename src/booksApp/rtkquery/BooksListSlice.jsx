import { DeblurTwoTone } from '@mui/icons-material'
import { createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { useSearchParams } from 'react-router-dom'
// let url = 'https://openlibrary.org/search.json'
let url = 'http://localhost:3001/'


export const BooksListSlice = createApi({
    reducerPath: 'BooksListSlice',
    baseQuery: fetchBaseQuery({
        baseUr: 'http://localhost:3001/',

        prepareHeaders: (headers) => {
            let token = localStorage.getItem('jwtToken')
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),


    endpoints: (builder) => ({
        fetchBooksLIst: builder.query({

            query: ([page, subject]) => {
                return `http://localhost:3001/getBooks?subject=${subject || 'fiction'}&limit=${Number(page || 1) * 8}&page=${page || 1}`
            },
        }),



        fetchBooksForAutoComplete: builder.query({
            query: (value) => {

                return `http://localhost:3001/serchBooks?title=${value}&page=${1}&limit=${20}`
            },

        })

    })
})

export const { useLazyFetchBooksLIstQuery, useSearchBooksListQuery, useLazyFetchBooksForAutoCompleteQuery } = BooksListSlice;



