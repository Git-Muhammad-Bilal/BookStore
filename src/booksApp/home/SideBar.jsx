import { Box, Button, Container, CssBaseline, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { slectedCurSub, slectSubject } from '../rtkquery/BooksSubjectSlice';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { setPrevSubWithPage } from '../rtkquery/PagesNumberSlice';


let catogoriesArr = [

  {
    type: 'fantasy',
    url: '../fantasy.png'
  },
  {
    type: 'fiction',
    url: '../sci-fi.png'
  },
  {
    type: 'mystery',
    url: '../mystery.png'
  },

  {
    type: 'history',
    url: '../history.png'
  },
  {
    type: 'biographies',
    url: '../biography.png'
  },
  {
    type: 'children',
    url: '../children.png'
  },
]



export default function SideBar({ sbOn }) {

  const dispatach = useDispatch()
  const navigate = useNavigate()
  let { pathname } = useLocation()

  const { pageWithSubh } = useSelector(({ pagesData }) => pagesData)

  let isSubject = !pathname.includes('List');

  function handleNavigate(type) {

    if (isSubject) {
      navigate(`/BookToBuy/List`)
    }

    if (type === 'favorite' || type === 'purchases') {

      navigate(`/BookToBuy/${type}`)

    }


  }
  return (
    <>



      <ListItem sx={{ mb: 2 }} disablePadding onClick={() => handleNavigate('favorite')} >

        <ListItemButton>
          <ListItemIcon>
            <StarBorderOutlinedIcon />
          </ListItemIcon >
          <ListItemText sx={{ color: pathname.includes('favorite') ? 'blue' : 'black' }} primary='favorite' />
        </ListItemButton>
      </ListItem>
      <Divider />

      <Box flexDirection={'column'} display={'flex'} alignItems={'center'} justifyContent={'space-between'} gap={2} >
        {
          catogoriesArr.map((item) => {

            return (
              <ListItem disablePadding onClick={() => {
                let pagesSubject = pageWithSubh.subject === item.type ? { ...pageWithSubh, subject: item.type } : { subject: item.type, pageNum: 1 }
                dispatach(setPrevSubWithPage(pagesSubject))
                handleNavigate(item.type)
              }} >
                <ListItemButton>
                  <ListItemIcon>
                    < img style={{ width: '20px', height: '20px' }} src={item.url} alt="notFound" />
                  </ListItemIcon >
                  <ListItemText sx={{ color: !isSubject && pageWithSubh?.subject === item.type ? 'blue' : 'black' }} primary={item.type} />


                </ListItemButton>
              </ListItem>



            )
          })
        }
      </Box>
      <Divider />
      <ListItem sx={{ mt: 2 }} disablePadding onClick={() => handleNavigate('purchases')} >

        <ListItemButton>
          <ListItemIcon>
            <ManageHistoryIcon />
          </ListItemIcon >
          <ListItemText sx={{ color: pathname.includes('purchases') ? 'blue' : 'black' }} primary='purchases' />
        </ListItemButton>
      </ListItem>
    </>
  )
}
