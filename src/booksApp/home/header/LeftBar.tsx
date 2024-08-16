import React, { Suspense, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Breadcrumbs, Container, Drawer, Grid } from '@mui/material'
import { Box, Stack, useMediaQuery } from '@mui/system'
import { useTheme } from '@emotion/react'
import SideBar from '../SideBar'

export default function LeftBar({openLeftBart, setOpenLeftBar}) {

    const theme = useTheme();
    const isWideScreen = useMediaQuery(theme.breakpoints.up('lg'));
     

    return (


            <Drawer
                variant={isWideScreen?'permanent':'temporary'}
                anchor='left'
                open={openLeftBart}
                onClose={()=>setOpenLeftBar(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 273,
                        boxSizing: 'border-box',
                        paddingTop: 3,
                        mt: 8,


                    },
                }}

            >
                <SideBar />
            </Drawer>
        // </Box>
    )
}
