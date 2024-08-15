/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import themeConfig from 'src/configs/themeConfig';
import axios from 'axios';
import { useEffect, useState } from 'react';

// ** Styled Components
const MenuHeaderWrapper = styled(Box)(({ theme }) => ({
  padding: "10px 10px 0px 10px",
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  lineHeight: 'normal',
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
}))

const StyledLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const VerticalNavHeader = props => {
  // ** Props
  const { verticalNavMenuBranding: userVerticalNavMenuBranding } = props

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
    <MenuHeaderWrapper className='nav-header'>
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <StyledLink href='/' passHref>
              {/* <StyledLink> */}
                <HeaderTitle variant='h6'>
                  {themeConfig.templateName}
                </HeaderTitle>
              {/* </StyledLink> */}
            </StyledLink>
          </Box>
          <Box>
            <img src={logoUrls} alt={`Company Logo`} style={{ width: 35, height: 35 }} />
          </Box>
        </Box>
      )}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader;