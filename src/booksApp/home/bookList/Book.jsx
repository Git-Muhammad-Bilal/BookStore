import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Hidden, ImageListItemBar, Link, ListItemButton, ListItemIcon, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from "react-router-dom"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import axios from 'axios';
import axiosApi from '../../axiosApi/AxiosApi';
import { useCreateFavoriteMutation, useLazyGetFavoritesQuery } from '../../rtkquery/FetchFavoriteBooksListSlice';
import { addToCart } from '../../rtkquery/AddToCartToSlice';
import { useDispatch, useSelector } from 'react-redux';
let url = 'https://openlibrary.org'
export default function Book({ bookId }) {
  const [book, setBook] = useState({});
  let { id } = useParams()
  const [favorites, setFavorites] = useState([])
  let [createFavorite, { data: newSavedFavorites }] = useCreateFavoriteMutation()
  let [getFavorites, { data: favoritesList }] = useLazyGetFavoritesQuery()
  const dispatach = useDispatch()
  const cartItems = useSelector(({ cartItems }) => cartItems.cartItems)

  useEffect(() => {
    const fetchBooks = async () => {

      let { data } = await axiosApi.get(`getBook/${bookId || id}`)
      const { data: favs } = await getFavorites()
      setFavorites(favs)
      setBook(data)

    }

    fetchBooks()

  }, [id])


  async function handleNewFavorite(id) {
    let { data } = await createFavorite(bookId || id)
    setFavorites(data)
  }

  return (
    <Container sx={{ mt: '40px' }}>
      <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap" >
        <Box >

          <CardMedia
            sx={{ width: 300, height: 350 }}
            image={book?.img ? `https://covers.openlibrary.org/b/id/${book?.img}.jpg` : 'https://openlibrary.org/images/icons/avatar_book-sm.png'}
            title={book?.title}

          />
          <CardContent sx={{ width: 314 }} >
            <Typography fontSize={17} gutterBottom variant="p"  >
              {book.title}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <Typography gutterBottom variant="p"  >
                  <span>(Author)</span>
                  <span>By</span>
                  {book?.author}
                </Typography>
              </Grid>

              <Grid item xs={6} >
                <Typography variant='p'   >
                  <strong>Published in</strong>  {book && book?.published}
                </Typography>
              </Grid>

              <Grid item xs={12}  >
                <Typography gutterBottom variant="p"  >
                  <strong>Subjects:</strong>{book && book?.subjects}
                </Typography>
              </Grid>

              <Grid item xs={6} >

                <ListItemButton sx={{ ml: -3 }} >
                  <ListItemIcon   >
                    <StarBorderOutlinedIcon />
                    <StarBorderOutlinedIcon />
                    <StarBorderOutlinedIcon />
                    <StarBorderOutlinedIcon />
                    <StarBorderOutlinedIcon />
                  </ListItemIcon >

                </ListItemButton>

              </Grid>
              <Grid item xs={4}  >
                <Typography variant='h6'>
                  $123
                </Typography>
              </Grid>
            </Grid>
          </CardContent>

          <CardActions  >
            {

              cartItems.find(item => item?.bookId === book?.bookId) ? <Button sx={{ width: 170 }} variant='contained' size="small" color='primary'> Added
              </Button> :

                <Button onClick={() => { dispatach(addToCart({ ...book, price: 7, cover_id: book?.img, bookId: id, quanity: 0 })) }}
                  sx={{ width: 170 }} variant='contained' size="small" color='primary'>Add To Cart
                </Button>
            }
            <NavLink to={-1}>
              <Button variant='contained' size="small" color='primary'>Back</Button>
            </NavLink>

            <ListItemButton  >
              <ListItemIcon  >
                {
                  favorites?.includes(id) ?
                    <FavoriteBorderIcon sx={{ color: 'red' }} onClick={() => handleNewFavorite(id)} /> :
                    <FavoriteBorderIcon onClick={() => handleNewFavorite(id)} />
                }
              </ListItemIcon >

            </ListItemButton>
          </CardActions>
        </Box>
        <Box width={500}>

          <Typography >{book && book?.description || 'No description found!'}
          </Typography>

        </Box>

      </Stack>





      {/* </Grid> */}
      {/* <Grid xs={3} sm={6} md={8} lg ={8} container justifyContent={'space-evenly'}>
          <Button sx={{ fontSize: 11 }} variant='contained' size="small" color='primary' >Favorite</Button>
          <NavLink to='/BookToBuy/Book/123'>
          <Button sx={{ fontSize: 12 }} variant='contained' size="small" color='primary'>Buy</Button>
          </NavLink>
          <Button sx={{ fontSize: 12 }} variant='contained' size="small" color='primary'>WishList</Button>
        </Grid> */}

    </Container>
  )
}
