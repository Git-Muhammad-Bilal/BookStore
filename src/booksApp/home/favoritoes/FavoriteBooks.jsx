import { Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLoaderData, useLocation, useSearchParams } from 'react-router-dom'
import { useCreateFavoriteMutation, useGetFavoritesQuery, useLazyFetchFavBooksAuthorNamesQuery, useLazyFetchFavBooksListQuery, useLazyGetFavoritesQuery } from '../../rtkquery/FetchFavoriteBooksListSlice';
import { border, Stack, styled } from '@mui/system';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addFavoriteBooksWithPage } from '../../rtkquery/PagesNumberSlice';


const StyledButton = styled(Button)(({ theme }) => ({
    '&.Mui-disabled': {
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.66)',

    },
    '&:hover': {
        backgroundColor: 'initial', 
        color: 'inherit', 
    },

    fontSize: 12,
    marginLeft: '30px',
    width: 2,
    padding: '2px 2px 2px 2px',



}));


export default function FavoriteBooks() {

    const [searchParams, setSearchParams] = useSearchParams()
    let [fetchFavBooks, result] = useLazyFetchFavBooksListQuery()
    let [createFavorite] = useCreateFavoriteMutation()
    let { data: favorites, refetch } = useGetFavoritesQuery()
    const { favoriteBooksWithPage } = useSelector(({ pagesData }) => pagesData)
    const dispatach = useDispatch()
    let page = searchParams.get('page');

    let indexes = Number(page || 1) * 10
    const slicedFavsArr = favorites?.slice(indexes - 10, indexes)

    useEffect(() => {
        refetch()
    }, [])
    
    async function createBooksForPages() {
        let result = []
        slicedFavsArr?.map(async (id, index) => {
            let { data } = await fetchFavBooks(id)
            result.push(data)
            if (result.length === slicedFavsArr.length) {
                let filters = result.filter((book) => book)
               !page && setSearchParams({ page: 1 })
                dispatach(addFavoriteBooksWithPage({ [page || 1]: filters }))
            }

        })

    }

    useEffect(() => {
        if (favoriteBooksWithPage[page] && favoriteBooksWithPage[page].length === 10 ) return;
        createBooksForPages()
    }, [page, favorites?.length])

    function handlePagination(e) {
        setSearchParams({ page: Number(e.target.innerText) })
    }


    function renderButtonForPagination() {
        let pagBtnNumbers = favorites?.length / 10

        let btns = []
        for (let index = 0; index < pagBtnNumbers; index++) {
            let is = Number(page) === index + 1
            btns.push(
                <StyledButton
                    disabled={is}
                    onClick={is ? null : handlePagination}
                    variant='outlined'
                >{index + 1}</StyledButton>
            )
        }
        return btns;
    }

    async function handleRemoveFromFavBooksList(bookId) {

        let { data } = await createFavorite(bookId)

        if (data) {

            let updatedBooks = favoriteBooksWithPage[page]?.filter((b) => {
                // debugger
                if (b.bookId !== bookId) {
                    return b
                }
            })

            dispatach(addFavoriteBooksWithPage({ [page]: updatedBooks }))
        }
    }



    return (
        <>
            {result.isFetching ? < Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'650px'} ><CircularProgress /></Box> :


                <Grid container mt={3} spacing={1} padding={1} minHeight={'560px'} >
                    {
                        favoriteBooksWithPage[page]?.map(((book, index) => {
                            // debugger
                            const { key = '', author = '', img = '', title = '', published = '', bookId = '' } = book

                            let data = published?.slice('0', '10')
                            return <Grid item xs={6} sm={4} md={3} lg={2} key={index} >
                                <Card >
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={book?.img ? `https://covers.openlibrary.org/b/id/${book?.img}.jpg` : 'https://openlibrary.org/images/icons/avatar_book-sm.png'}
                                        title={title}
                                    />
                                    <CardContent sx={{ fontSize: '15px' }} >
                                        <Typography gutterBottom variant="p"  >
                                            {author}
                                        </Typography>
                                        <Typography sx={{ fontSize: '15px' }}   >
                                            {data}
                                        </Typography>
                                    </CardContent>
                                    <CardActions  >
                                        <NavLink to={`/BookToBuy/Book/${bookId}`}>
                                            <Button sx={{ fontSize: 12 }} variant='contained' size="small" color='primary'>Buy</Button>
                                        </NavLink>
                                        <Button
                                            sx={{ color: 'red' }}
                                            onClick={() => handleRemoveFromFavBooksList(bookId)}
                                        >
                                            <FavoriteBorderIcon />
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        }

                        ))
                    }
                </Grid>

            }
            {<Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={1}  >
                { renderButtonForPagination() }
            </Box>}
        </>

    )
}

// useEffect(() => {
//     if (!page) return;
//     let result = []
//     if (!visitPage.includes(page)) {
//         slicedArr?.map(async (id, index) => {
//             let { data } = await fetchFavBooks(id)
//             let author = data && await fetcAuhorNames(data)
//             if (data && author?.data?.name) {
//                 const { authors, covers, works, description, title, created, subjects } = data
//                 let newBk = {
//                     author: author?.data?.name,
//                     img: covers && covers[0],
//                     description: description?.value,
//                     title,
//                     published: created?.value,
//                     subjects: subjects?.length ? subjects.slice(0, 10) : 'No subjects',
//                     bookId: id
//                 }
//                 result.push(newBk)
//                 if (result.length === slicedArr.length) {
//                     setBook([...books, ...result])
//                     setVisitPage([...visitPage, page || 1])
//                 }
//             }
//         })
//     }
// }, [page])