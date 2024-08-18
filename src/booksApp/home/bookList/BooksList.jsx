import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Link, ListItem, ListItemButton, ListItemIcon, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { NavLink, useSearchParams } from "react-router-dom"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CircularProgress from '@mui/material/CircularProgress'
import { useLazyFetchBooksLIstQuery } from '../../rtkquery/BooksListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addToFav, removeFromFav } from '../../rtkquery/AddToFavorite';
import { addCurBookListPageNum, setBookListPage, setPrevSubWithPage } from '../../rtkquery/PagesNumberSlice';
import { addToCart } from '../../rtkquery/AddToCartToSlice';
import { addBookToSubj } from '../../rtkquery/BooksSubjectSlice';
import axiosApi from '../../axiosApi/AxiosApi';
import { useCreateFavoriteMutation, useLazyGetFavoritesQuery } from '../../rtkquery/FetchFavoriteBooksListSlice';

let preListLength = '';

export default function BooksList({ serchVal }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [favBooks, setFavBooks] = useState([])

  const dispatach = useDispatch()
  const { pageWithSubh:{subject, pageNum} } = useSelector(({ pagesData }) => pagesData)

  let [fetchBooks, result] = useLazyFetchBooksLIstQuery()
  let [createFavorite, { data: newSavedFavorites }] = useCreateFavoriteMutation()
  let [getFavorites, { data: favoritesList }] = useLazyGetFavoritesQuery()
  const cartItems = useSelector(({ cartItems }) => cartItems.cartItems)
  
  let { data, error, isLoading } = result
  let page = searchParams.get('page');
  let priceCount = 0
  preListLength = data?.works?.length

  useEffect(() => {

    setSearchParams({ page: pageNum })
    fetchBooks([pageNum, subject])

  }, [subject])

  useEffect(() => {

    const hndleInfiniteScroll = async () => {
      let y = window.scrollY
      let a = document.documentElement.scrollHeight - window.innerHeight
      if (a === y) {
        setSearchParams({ page: Number(page) + 1 })
        dispatach(setPrevSubWithPage({ subject: subject, pageNum: Number(page) + 1 }))
        fetchBooks([Number(page) + 1, subject])

      }
    }
    window.addEventListener('scroll', hndleInfiniteScroll)

    return () => {
      window.removeEventListener('scroll', hndleInfiniteScroll)

    }

  }, [preListLength])


  useEffect(() => {

    let fetchFavs = async () => {
      let { data } = await getFavorites()
      data && setFavBooks(data)

    }
    fetchFavs()
  }, [])


  async function handleNewFavorite(id) {
    let { data } = await createFavorite(id)
    setFavBooks(data)
  }


  function handleCartItems(book) {
      dispatach(addToCart(book))
  }


  return (
    <Box margin={'auto'} display={'flex'}  >

      <Grid container spacing={4} padding={5} >

        {
          data?.works?.map((book, index) => {
            priceCount += 2
            let bookWdPrice = { ...book, price: priceCount }
            const { key, cover_id, title, authors, price } = bookWdPrice

            let id = key?.replace('/works/', '')
            return <Grid item xs={12} sm={6} md={4} lg={3} key={id}  >
              <Card sx={{ boxShadow: 10, width: 240 }} key={index}>
                <CardMedia
                  sx={{ boxShadow: 6, m: 'auto', width: 150, height: 240 }}
                  image={cover_id ? `https://covers.openlibrary.org/b/id/${cover_id}.jpg` : './avatar.png'}
                  title={title}
                  alt={'not found'}
                />

                <CardContent  >
                  <Stack direction={'column'} alignItems={'start'} justifyContent={'space-between'} >
                    <Box mb={1} overflow={'Hidden'} flexWrap={'wrap'}>

                      <Typography overflow={'hidden'} variant="p">
                        {authors[0].name}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant='p'  >
                        $ {price}
                      </Typography>
                    </Box>
                    <Box width={40} display={'flex'} direction={'column'} mb={-3} ml={-2} >
                      <ListItem disablePadding  >
                        <Link to={'/BookToBuy/Favorites'}>
                          <ListItemButton  >
                            <ListItemIcon  >
                              {
                                favBooks?.includes(id) ?
                                  <FavoriteBorderIcon sx={{ color: 'red' }} onClick={() => handleNewFavorite(id)} /> :
                                  <FavoriteBorderIcon onClick={() => handleNewFavorite(id)} />
                              }
                            </ListItemIcon >

                          </ListItemButton>
                        </Link>
                      </ListItem>
                    </Box>
                  </Stack>
                </CardContent>
                <CardActions>
                 {
                   cartItems.find(item=>item?.bookId === id) ? 
                   <Button
                   sx={{ fontSize: 12, padding:"4px 25px  4px 25px" }}
                    variant='contained'
                    size="small"
                    color='primary'
                  >
                    Added
                  </Button>:
                   <Button
                   sx={{ fontSize: 12 }}
                   variant='contained'
                    size="small"
                    color='primary'
                    onClick={() => { handleCartItems({ ...bookWdPrice, bookId: id, quanity: 0 }) }}
                  >
                    Add To Cart
                  </Button>
                  }
                  <NavLink
                    to={`/BookToBuy/Book/${id}`}
                  >
                    <Button
                      onClick={() => {

                        dispatach(addBookToSubj({ to: title, sub: subject }))
                      }}
                      variant='contained'
                      size="small"
                      color='primary'
                      sx={{ fontSize: 12 }}

                    >Learn more</Button>
                  </NavLink>

                </CardActions>
              </Card>
            </Grid>
          }
          )
        }
        <Grid item mr={'auto'} xs={24}>
          {
            isLoading ? null : <Box sx={{ display: 'flex', direction: 'column', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          }

        </Grid>
      </Grid >


    </Box>

  )
}

// useEffect(() => {

//   const fetchBooks = async () => {
//     let { data } = await axios.get(`${url}?title=war&page=1&limit=8`)
//     setBooksList(data?.docs)
//     if (data) {
//       setSearchParams({ page: 1 })
//     }
//   }
//   if (!booksList.length) {
//     fetchBooks()
//   }

// }, [])


// let { data } = await axios.get(`${url}?title=war&&page=${Number(page) + 1}&limit=8`)
// setBooksList([booksList, data?.docs])

