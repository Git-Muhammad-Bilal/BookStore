import React, { useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography, ListItem, ListItemButton, ListItemIcon } from '@mui/material'
import { NavLink } from 'react-router-dom'
import AddSharpIcon from '@mui/icons-material/AddSharp';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import { useDispatch, useSelector } from 'react-redux';
import { emtpyCart, handleDec, handleInc, removeCartItem } from '../rtkquery/AddToCartToSlice';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useLazyFetchFavBooksListQuery } from '../rtkquery/FetchFavoriteBooksListSlice';
import axiosApi from '../axiosApi/AxiosApi';

export default function AddToCart() {
    const cartItems = useSelector(({ cartItems }) => cartItems.cartItems)
    const dispatach = useDispatch()
    const [booksToPurhcase, setBooksToPurchase] = useState([])
        




    function increaseQauntity(item) {
        dispatach(handleInc(item))
    }

    function decreaseQuantity(item) {
        dispatach(handleDec(item))
    }



    const createPurchase = async () => {
        let isQuantity = false;
       
        let cartBooks = cartItems?.map((item) => {
            if (item.quanity <= 0) {
                isQuantity = true
                
            }else{
                
                return {
                    title:
                    item.title, 
                    bookId: item?.bookId, 
                    price: item?.price, 
                    quanity: item?.quanity,
                    imageUrl:item?.cover_id
                }
            }
            
        })
        if (!isQuantity) {
            let { data } = await axiosApi.post(`createPurchase`, {
                books: cartBooks
            })
            data && dispatach(emtpyCart())``
        }
    }


    return (
        <Stack direction="column" alignItems={'center'} height={'100vh'} gap={4} >
            {
                !cartItems.length ? <Box height={'80vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                    <Typography variant='h6'  >
                        No Books in Cart yet!
                    </Typography>
                    <MenuBookIcon sx={{ color: 'black', fontSize: '30px' }} />
                </Box> :

                    <Stack overflow={'auto'} width={370} display={'flex'} direction={'column'} alignItems={'center'} height={"86%"}>
                        {
                            cartItems?.map((item) => {
                                const { cover_id, title, authors, first_publish_year, price, quanity, bookId } = item
                                return <Box mt={5} >
                                    <Card sx={{ width: '260px', }}  >
                                        <Stack direction="row" alignItems={'start'} >
                                            <Box>
                                                <CardMedia
                                                    sx={{ width: 80, height: 100 }}
                                                    image={cover_id ? `https://covers.openlibrary.org/b/id/${cover_id}.jpg` : 'https://openlibrary.org/images/icons/avatar_book-sm.png'}
                                                    title={title}
                                                />

                                            </Box>
                                            <Box width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'start'} pl={2} gap={2}>

                                                <Stack height={56} width={'94%'} direction={'row'} alignItems={'start'} justifyContent={'space-between'} >
                                                    <Box>
                                                        <Typography gutterBottom variant="p" fontSize={14} >
                                                            {title}
                                                        </Typography>

                                                        <Typography fontSize={14} >
                                                            $ {price}
                                                        </Typography>
                                                    </Box>
                                                    <Button onClick={() => dispatach(removeCartItem(bookId))}
                                                        sx={{ fontSize: 9, minWidth: '20px' }}
                                                        variant='contained'
                                                        size="small"
                                                        color='primary'
                                                    > X
                                                    </Button>
                                                </Stack>
                                                <Stack direction="row" alignItems={'center'} justifyContent={'space-between'} border={'1px solid #dfdfdf'}>


                                                    <ListItemIcon onClick={() => increaseQauntity(item)} >
                                                        <AddSharpIcon fontSize={'4px'} />
                                                    </ListItemIcon >

                                                    <ListItemIcon  >
                                                        <Typography fontSize={'14px'} >
                                                            {quanity}
                                                        </Typography>

                                                    </ListItemIcon >

                                                    <ListItemIcon onClick={() => decreaseQuantity(item)}  >
                                                        <RemoveSharpIcon fontSize={'4px'} />
                                                    </ListItemIcon >

                                                </Stack>
                                            </Box>

                                        </Stack>
                                    </Card>
                                </Box>
                            })
                        }


                    </Stack>
            }
            <Box >
               <Button onClick={createPurchase} variant='contained' size='large'>Checkout</Button>
            </Box>
       
        </Stack>
    )
}
