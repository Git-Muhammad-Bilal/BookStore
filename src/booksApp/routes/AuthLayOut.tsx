import React, { Suspense, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import AuthLeftSide from '../authorization/AuthLeftSide'
import { Stack } from '@mui/system'

export default function AuthLayOut() {
    return (
        <Suspense fallback={'Loading'}>
            <Stack display={'flex'} flexDirection={'row'}>
                <AuthLeftSide />
                <Outlet />
            </Stack>
        </Suspense >
    )
}
