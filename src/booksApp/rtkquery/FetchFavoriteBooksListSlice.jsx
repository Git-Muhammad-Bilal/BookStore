import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import url  from '../url';


export const FetchFavoriteBooksSliceSlice = createApi({
    reducerPath: 'FetchFavoriteBooksSliceSlice',
    baseQuery: fetchBaseQuery({
        baseUr: url,

        prepareHeaders: (headers) => {
        let token = localStorage.getItem('jwtToken')
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            console.log('working');
            return headers;
        },
    }),

    tagTypes: ['Post'],

    endpoints: (builder) => ({
        createFavorite: builder.mutation({
            query: (newItem) => {
                return {
                    url: `${url}savefavorite`,
                    method: 'POST',
                    body: { bookId: newItem },
                }
            },
            invalidatesTags: ['Post']
        }),

        getFavorites: builder.query({
            query: () => `${url}getFavorites`,
        }),

        fetchFavBooksList: builder.query({
            query: (bookId) => `${url}getBook/${bookId}`,
        }),

        fetchFavBooksAuthorNames: builder.query({
            query: (data) => `${url}https://openlibrary.org${data?.authors[0]?.author?.key}.json`,
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



