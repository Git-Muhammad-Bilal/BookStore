import React, { Suspense, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import AuthLeftSide from '../authorization/AuthLeftSide'
import { Stack } from '@mui/system'

export default function AuthLayOut() {
   const {pathname} = useLocation()
   return (
       <Suspense fallback={'Loading'}>
            <Stack display={'flex'} flexDirection={'row'}>
            {(pathname.includes('login') || pathname.includes('createAccount')) &&
                <AuthLeftSide />}
                <Outlet />
            </Stack>
        </Suspense >
    )
}
