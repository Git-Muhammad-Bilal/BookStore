import React from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';

export default function CartIcon({setOpenAddToCM ,openAddToCM}) {
    const cartItems = useSelector(({ cartItems }) => cartItems.cartItems)
    return (
        <>
            <IconButton onClick={()=>setOpenAddToCM(!openAddToCM)}  sx={{  color:'white' }}>
                <Badge badgeContent={cartItems?.length} color="error">
                    <ShoppingCartOutlinedIcon  />
                </Badge>
            </IconButton>
        </>
    )
}
