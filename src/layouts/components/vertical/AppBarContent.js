/* eslint-disable @next/next/no-img-element */
import { Box, TextField, IconButton, useMediaQuery } from '@mui/material';
import Menu from 'mdi-material-ui/Menu';
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler';
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown';
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props;

  // ** Hook
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'));

  // For company logo
  const [logoUrls, setLogoUrls] = useState(null);
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;

  useEffect(() => {
    const fetchCompanyLogos = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/company-logo/${authToken?.companyId}`, {
          responseType: 'arraybuffer',
        });

        const imageData = new Uint8Array(response.data);
        const blob = new Blob([imageData], { type: 'image/png' });
        const dataURL = URL.createObjectURL(blob);

        setLogoUrls(dataURL);
      } catch (error) {
        console.error("Error fetching company logos:", error);
      }
    };

    fetchCompanyLogos();
  }, [authToken?.companyId]);

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <>
            <IconButton
              color='inherit'
              onClick={toggleNavVisibility}
              sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
            >
              <Menu />
            </IconButton>

            <img src={logoUrls} alt={`Company Logo`} style={{ width: 35, height: 35 }} />
          </>
        ) : null}
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        <NotificationDropdown />
        <UserDropdown />
      </Box>
    </Box>
  )
}

export default AppBarContent;