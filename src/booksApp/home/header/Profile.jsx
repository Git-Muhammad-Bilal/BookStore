import React, { useEffect, useRef, useState } from 'react'
import { Popover, Avatar, Button, Typography, List, ListItem, ListItemText, Divider, InputLabel } from '@mui/material';
import axiosApi from '../../axiosApi/AxiosApi';
import {url} from '../../url';

export default function Profile({ isWideScreen }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState({
    name: '',
    lastName: '',
    email: '',
    profileName: '',
    profile: '',
  });
  const [profileFile, setProfileFile] = useState();
  const fileInputRef = useRef()

  const { name, lastName, email, profileName, profile } = user;

  const fetchProfile = async () => {
    let { data } = await axiosApi.get('getProfile')
    setUser({ ...data, profileName: data?.profile, profile: data.profile && `${url}${data.profile}` })
  }

  useEffect(() => {
    fetchProfile()
  }, [])


  async function saveProfile() {

    try {
      const formData = new FormData()
      formData.append('profile', profileFile)
      
      let { data } = await axiosApi.post('uploadProfile', formData)

      setUser({ ...user, profileName: data, profile: data && `${url}${data}` })

      setAnchorEl(null)
      setProfileFile('')

    } catch (error) {
      console.log(error.message, 'messgage');

    }


  }
  async function removeProfile() {
    try {

      let { data } = await axiosApi.post('removeProfile', {
        profile: profileName
      })
      if (data) {
        setUser({ ...user, profileName: '', profile: '' })

        setAnchorEl(null)

      }
    } catch (error) {

    }

  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setProfileFile(null)
  };

  function handleFileChange(e) {
    setProfileFile(e.target.files[0])
  }

  const open = Boolean(anchorEl);
  const id = open ? 'profile-popover' : undefined;

  return (
    <>
      <Button aria-describedby={id} onClick={handleClick}>
        <Avatar sx={{ width: !isWideScreen ? '35px' : '40px' }} alt={name} src={profile} />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          '& .MuiPopover-paper': {
            width: '200px',
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Typography sx={{ p: 2, textAlign: 'center' }}>
          <InputLabel htmlFor="store-profile">
            <Avatar alt={name} src={profileFile ? URL.createObjectURL(profileFile) : profile} sx={{ width: 100, height: 100, margin: '0 auto' }} />
          </InputLabel>

          <input
            ref={fileInputRef}
            type="file"
            id="store-profile"
            accept='image/*'
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <Typography fontSize={14} variant="h6">{`${name} ${lastName}`}</Typography>
          <Typography fontSize={14} variant="body2" color="textSecondary">{email}</Typography>
        </Typography>
        <Divider />

        <List component="nav" aria-label="profile settings">
          <ListItem onClick={() => profileFile && saveProfile()} >
            <ListItemText primary="Save" />
          </ListItem>
          <ListItem onClick={() => profileName && removeProfile()}>
            <ListItemText primary="Remove" />
          </ListItem>
        </List>

      </Popover>
    </>
  );
}


