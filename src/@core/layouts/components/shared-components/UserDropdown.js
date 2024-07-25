/* eslint-disable react-hooks/exhaustive-deps */

import { useState, Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Menu, Badge, Avatar, Divider, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import LogoutVariant from 'mdi-material-ui/LogoutVariant';
import AccountOutline from 'mdi-material-ui/AccountOutline';
import axios from 'axios';
import Link from 'next/link';

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const AvatarStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  fontSize: '20px',
  [theme.breakpoints.down('sm')]: {
    marginRight: 0
  }
}))

const UserDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedAuthToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;
    setAuthToken(storedAuthToken);
  }, []);

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (authToken) {
        try {
          const response = await axios.get(`http://localhost:9000/api/get-profile-image/${authToken.id}/${authToken.role}`, {
            responseType: 'arraybuffer',
          });
          const imageData = new Uint8Array(response.data);
          const blob = new Blob([imageData], { type: 'image/png' });
          const dataURL = URL.createObjectURL(blob);
          setImgSrc(dataURL);
        } catch (error) {
          console.error("Error fetching profile image:", error);
        }
      }
    };

    fetchProfileImage();
  }, [authToken]);

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  }

  const handleSignOut = async () => {
    try {
      await axios.post('http://localhost:9000/api/logout', {});

      // Remove the login-details object from local storage
      localStorage.removeItem('login-details');

      // Redirect to the sign-in page
      router.push('/pages/login');
    } catch (error) {
      // Handle any errors that occur during the logout API call
      console.error('Logout failed:', error);
    }
  };

  if (!authToken) {
    return null; // or a loading spinner
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        {imgSrc ? (
          <Avatar
            alt='John Doe'
            onClick={handleDropdownOpen}
            sx={{ width: 40, height: 40 }}
            src={imgSrc}
          />
        ) : (
          <AvatarStyled>
            {authToken?.name.charAt(0).toUpperCase()}
          </AvatarStyled>
        )}
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: "auto", marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              {imgSrc ? (
                <Avatar alt='John Doe' src={imgSrc} sx={{ width: '2.5rem', height: '2.5rem' }} />
              ) : (
                <AvatarStyled>
                  {authToken?.name.charAt(0).toUpperCase()}
                </AvatarStyled>
              )}
            </Badge>
            <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{authToken?.email}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {authToken?.role}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <Link href={"/account-settings"} style={{ textDecoration: "none" }}>
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
            <Box sx={styles}>
              <AccountOutline sx={{ marginRight: 2 }} />
              View Profile
            </Box>
          </MenuItem>
        </Link>
        <MenuItem sx={{ py: 2 }} onClick={handleSignOut}>
          <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown;