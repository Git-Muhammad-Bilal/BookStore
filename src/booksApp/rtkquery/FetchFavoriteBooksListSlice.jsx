import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// let url = 'https://openlibrary.org/search.json'

let url = 'http://localhost:3001/'

export const FetchFavoriteBooksSliceSlice = createApi({
    reducerPath: 'FetchFavoriteBooksSliceSlice',
    baseQuery: fetchBaseQuery({
        baseUr: url,
        
        prepareHeaders: (headers, { getState }) => {
            
            let token = localStorage.getItem('jwtToken')
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),

    tagTypes: ['Post'],
    endpoints: (builder) => ({
        createFavorite: builder.mutation({
            query: (newItem) => {
                return {
                    url: `http://localhost:3001/savefavorite`, // The endpoint to send the POST request to
                    method: 'POST',
                    body: { bookId: newItem }, // The body of the POST request
                }
            },

            invalidatesTags: ['Post']

        }),

        getFavorites: builder.query({

            query: () => {
                return `http://localhost:3001/getFavorites`
            },



        }),
        fetchFavBooksList: builder.query({

            query: (bookId) => {
                return `http://localhost:3001/getBook/${bookId}`
            },



        }),
        fetchFavBooksAuthorNames: builder.query({

            query: (data) => {
                return `https://openlibrary.org${data?.authors[0]?.author?.key}.json`
            },



        }),
    })
})

export const {
    useLazyFetchFavBooksListQuery,
    useLazyFetchFavBooksAuthorNamesQuery,
    useLazyGetFavoritesQuery,
    useGetFavoritesQuery,
    useCreateFavoriteMutation,
} = FetchFavoriteBooksSliceSlice;



