import React, { Suspense, useState } from 'react'
import Header from '../home/header/Header'
import { Box, Stack, useMediaQuery } from '@mui/system'
import { useTheme } from '@emotion/react'
import LeftBar from '../home/header/LeftBar'
import { Navigate, Outlet } from 'react-router-dom'

export default function BookToBuyLayOut({ setSerVal }) {
  const [openLeftBart, setOpenLeftBar] = useState(false)
  
  const theme = useTheme();
  const isWideScreen = useMediaQuery(theme.breakpoints.up('lg'));
      
  let token = localStorage.getItem('jwtToken')
  if (!token) {
    return <Navigate to='/Login' />

  }
  return (

    <Suspense fallback={'Loading'}>
      <Header setSerVal={setSerVal} setOpenLeftBar ={setOpenLeftBar} />

      <Stack display={'flex'} flexDirection={'row'} paddingTop={7}  >
         <Box flex={1}  display={isWideScreen?'block':'none'} >
         
         <LeftBar openLeftBart ={openLeftBart} setOpenLeftBar={setOpenLeftBar}/>
         </Box>
        <Box flex={4}>

           <Outlet />
        </Box>
      </Stack>
    </Suspense >
  )
}

{/* <div style={{zIndex:33, position:'fixed', width:'100%'}}>
      <BasicBreadcrumbs />
      </div> */}