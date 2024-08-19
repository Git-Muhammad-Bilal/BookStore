import { AppBar, Box, Card, CardContent, CardMedia, Container, CssBaseline, Divider, Drawer, Stack, Toolbar, Typography, menuClasses, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SignOut from './SignOut';
import CartIcon from './CartIcon';
import Profile from './Profile';
import SideBar from '../SideBar';
import AddToCart from '../AddToCart';
import MyAutocomplete from './AutoComplete';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    color: 'white',
    display: 'flex',
    alignItems: 'center',
}));

export default function Header({ setSerVal, setOpenLeftBar }) {
    const [openSerachBarForSmScreen, SetOpenSerachBarForSmScreen] = useState(false);
    const [openAddToCM, setOpenAddToCM] = useState(false)
    const navigate = useNavigate()
    const theme = useTheme();
    const isWideScreen = useMediaQuery(theme.breakpoints.up('sm'));

    function goBack() {
        navigate(`/BookToBuy/List?page=1`)
    }

    return (
        < >
            <AppBar sx={{ position: 'relative', position: 'fixed', background: '#263238' }} >
                <CssBaseline />
                <Toolbar  >
                    {
                        !isWideScreen && openSerachBarForSmScreen ?
                            <>

                                <SearchIconWrapper onClick={() => SetOpenSerachBarForSmScreen(!openSerachBarForSmScreen)}>
                                    <ArrowBackIcon />
                                </SearchIconWrapper>
                                <MyAutocomplete setSerVal={setSerVal} SetOpenSerachBarForSmScreen={SetOpenSerachBarForSmScreen} openSerachBarForSmScreen={openSerachBarForSmScreen} />

                            </> :
                            <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}  >

                                <Box display={'flex'} flex={!isWideScreen ? 1 : 0} alignItems={'center'} justifyContent={'start'}  >
                                    <IconButton onClick={() => { setOpenLeftBar(true) }} edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
                                        <MenuIcon />
                                    </IconButton>

                                    <Typography fontSize={15} onClick={goBack} variant='h6'>
                                        BookToBuy
                                    </Typography>
                                </Box>
                                {

                                    !isWideScreen ?
                                        <SearchIconWrapper onClick={() => SetOpenSerachBarForSmScreen(true)}>
                                            <SearchIcon />
                                        </SearchIconWrapper>
                                        :
                                        <MyAutocomplete setSerVal={setSerVal} SetOpenSerachBarForSmScreen ={SetOpenSerachBarForSmScreen} />
                                }

                                <Box width={!isWideScreen ? '150px' : '210px'} display={'flex'} alignItems={'center'} justifyContent={'space-evenly'}  >
                                    <CartIcon setOpenAddToCM={setOpenAddToCM} />
                                    <Profile isWideScreen={isWideScreen} />
                                    <SignOut isWideScreen={isWideScreen} />
                                </Box>

                            </Box>
                    }
                </Toolbar>
            </AppBar>
            {<Drawer
                anchor='right'
                open={openAddToCM}
                onClose={() => setOpenAddToCM(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width:!isWideScreen?270: 330
                    },
                }}

            >
                <AddToCart />

            </Drawer>}


        </>
    )
}
