import React, { useEffect, useRef, useState } from 'react'
import { Popover, Avatar, Button, Typography, List, ListItem, ListItemText, Divider, InputLabel } from '@mui/material';
import axiosApi from '../../axiosApi/AxiosApi';
import { Try } from '@mui/icons-material';

export default function Profile({isWideScreen}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileName, setProfileName] = useState('');
  const [profileFile, setProfileFile] = useState();
  const fileInputRef = useRef()

  const fetchProfile = async () => {
    let { data } = await axiosApi.get('getProfile')
    setProfileName(data)
  }

  useEffect(() => {
    fetchProfile()

  }, [profileName])


  async function saveProfile() {

    try {
      const formData = new FormData()
      formData.append('profile', profileFile)

      let { data } = await axiosApi.post('uploadProfile', formData)
      setProfileName(data)
      setAnchorEl(null)

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
        setAnchorEl(null)
        setProfileName("")

      }
    } catch (error) {

    }

  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  };

  const handleClose = () => {
    setAnchorEl(null);
    !profileName && setProfileFile(null)
  };


  function handleFileChange(e) {
    setProfileFile(e.target.files[0])
  }

  const open = Boolean(anchorEl);
  const id = open ? 'profile-popover' : undefined;

  return (
    <>
      <Button aria-describedby={id} onClick={handleClick}>
        <Avatar sx={{width:!isWideScreen?'35px': '40px'}} alt="User Name" src={profileName && `${url}${profileName}` } />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
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
            <Avatar alt="User Name" src={profileFile ? URL.createObjectURL(profileFile) : `${url}${profileName} `} sx={{ width: 100, height: 100, margin: '0 auto' }} />
          </InputLabel>

          <input
            ref={fileInputRef}
            type="file"
            id="store-profile"
            accept='image/*'
            onChange={handleFileChange}
            style={{ display: 'none' }} // Hide the actual file input
          />


          <Typography variant="h6">John Doe</Typography>
          <Typography variant="body2" color="textSecondary">johndoe@example.com</Typography>
        </Typography>
        <Divider />

        <List component="nav" aria-label="profile settings">
          <ListItem onClick={saveProfile} >
            <ListItemText primary="Save" />
          </ListItem>
          <ListItem onClick={removeProfile}>
            <ListItemText primary="Remove" />
          </ListItem>
        </List>

      </Popover>
    </>
  );
}


