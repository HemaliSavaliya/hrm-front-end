/* eslint-disable @next/next/link-passhref */
import { useState, Fragment, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Menu, Badge, MenuItem, Typography, useTheme, Avatar } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import { Logout02Icon, UserEdit01Icon } from 'hugeicons-react'
import axios from 'axios'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const styles = {
  py: 2,
  px: 4,
  width: '100%',
  display: 'flex',
  gap: 2,
  alignItems: 'center',
  color: 'text.primary',
  textDecoration: 'none',
  '& svg': {
    fontSize: '1.375rem',
    color: 'text.secondary'
  }
}

const UserDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [imgSrc, setImgSrc] = useState(null)
  const [authToken, setAuthToken] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const storedAuthToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
    setAuthToken(storedAuthToken)
  }, [])

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (authToken) {
        try {
          const response = await axios.get(
            `http://localhost:9000/api/get-profile-image/${authToken.id}/${authToken.role}`,
            {
              responseType: 'arraybuffer'
            }
          )
          const imageData = new Uint8Array(response.data)
          const blob = new Blob([imageData], { type: 'image/png' })
          const dataURL = URL.createObjectURL(blob)
          setImgSrc(dataURL)
        } catch (error) {
          console.error('Error fetching profile image:', error)
        }
      }
    }

    fetchProfileImage()
  }, [authToken])

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const handleSignOut = async () => {
    try {
      await axios.post(`http://localhost:9000/api/logout`, {})

      // Remove the login-details object from local storage
      localStorage.removeItem('login-details')

      // Redirect to the sign-in page
      router.push('/login')
    } catch (error) {
      // Handle any errors that occur during the logout API call
      console.error('Logout failed:', error)
    }
  }

  if (!authToken) {
    return null // or a loading spinner
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        // onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        {imgSrc ? (
          <Avatar alt='John Doe' onClick={handleDropdownOpen} sx={{ width: 40, height: 40 }} src={imgSrc} />
        ) : (
          <Avatar alt='John Doe' onClick={handleDropdownOpen} sx={{ width: 40, height: 40 }} src="/images/avatars/default-face.png" />
        )}
      </Badge>
      <Box ml={4} sx={{ cursor: 'pointer' }} onClick={handleDropdownOpen}>
        <Typography sx={{ fontWeight: 600, textTransform: 'capitalize' }}>{authToken?.name}</Typography>
        <Box display={'flex'} justifyContent={'start'} alignItems={'center'}>
          <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
            {authToken?.role}
          </Typography>
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 'auto', marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Link href={'/account-settings'} style={{ textDecoration: 'none' }}>
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
            <Box sx={styles}>
              <UserEdit01Icon size={20} />
              View Profile
            </Box>
          </MenuItem>
        </Link>
        <MenuItem sx={{ p: 0 }} onClick={handleSignOut}>
          <Box sx={styles}>
            <Logout02Icon size={20} />
            Logout
          </Box>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
