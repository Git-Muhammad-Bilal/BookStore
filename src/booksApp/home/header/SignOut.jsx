import { Button, Typography } from '@mui/material'
import { fontSize } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignOut({isWideScreen}) {
    let navigate = useNavigate()
  
    function logout() {
        localStorage.removeItem('jwtToken')
        navigate('/')
        location.reload()
    }
    return (
        <>
            <Typography sx={{fontSize:!isWideScreen?'14px': '18px' }} onClick={logout} color='inherit' size='small' >
                log out
            </Typography>

        </>
    )
}
