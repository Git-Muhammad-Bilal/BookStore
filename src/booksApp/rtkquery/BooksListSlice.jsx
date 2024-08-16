import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import url from '../url'



export const BooksListSlice = createApi({
    reducerPath: 'BooksListSlice',
    baseQuery: fetchBaseQuery({
        baseUr: url,

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
            query: ([page, subject]) => `${url}getBooks?subject=${subject || 'fiction'}&limit=${Number(page || 1) * 8}&page=${page || 1}`,
        }),

         

        fetchBooksForAutoComplete: builder.query({
            query: (value) => `${url}serchBooks?title=${value}&page=${1}&limit=${20}`,

        })

    })
})

export const { useLazyFetchBooksLIstQuery, useSearchBooksListQuery, useLazyFetchBooksForAutoCompleteQuery } = BooksListSlice;



