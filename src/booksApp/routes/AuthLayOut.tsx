import React, { Suspense, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import AuthLeftSide from '../authorization/AuthLeftSide'
import { Box, Stack, useMediaQuery } from '@mui/system'

export default function AuthLayOut() {
    const { pathname } = useLocation()
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    return (
        <Suspense fallback={'Loading'}>
            <Stack display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                {(pathname.includes('login') || pathname.includes('createAccount')) && !isSmallScreen &&

                    <Box flex={1}>
                        <AuthLeftSide />
                    </Box>
                }
                <Box flex={1}
                    sx={{
                        backgroundImage: isSmallScreen ? 'url(../authImg.jpg)' : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '100vh', // Adjust as needed
                        color: isSmallScreen ? 'white' : 'black',
                    }}
                >
                    <Outlet />
                </Box>
            </Stack>
        </Suspense >
    )
}
