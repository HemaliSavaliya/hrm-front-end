import { Box, Button, Divider, TextField, InputLabel, Typography, IconButton, CardContent, FormControl, OutlinedInput, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';
import themeConfig from 'src/configs/themeConfig';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration';
import useAuth from '../../../hooks/useAuth';
import { motion } from "framer-motion";
import { Toaster } from 'react-hot-toast';

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' },
}));

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main,
}));

const LoginPage = () => {
  const { values, handleChange, handleClickShowPassword, handleMouseDownPassword, handleRadioChange, handleSubmit } = useAuth();

  return (
    <Box className='content-center'>
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card sx={{ zIndex: 1 }}>
          <CardContent sx={{ padding: (theme) => `${theme.spacing(7, 9, 7)} !important` }}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'start', justifyContent: 'start' }}>
              <Typography
                variant='h6'
                sx={{
                  lineHeight: 1,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '1.5rem !important',
                }}
              >
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='caption'>Please sign-in to your account and start the adventure</Typography>
            </Box>
            <form noValidate autoComplete='off'>
              <TextField
                autoFocus
                fullWidth
                id='email'
                label='Email'
                sx={{ marginBottom: 4 }}
                value={values.email}
                onChange={handleChange('email')}
              />
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
                <OutlinedInput
                  label='Password'
                  value={values.password}
                  id='auth-login-password'
                  onChange={handleChange('password')}
                  type={values.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {/* <FormControl sx={{ mt: 2 }}>
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='row-radio-buttons-group'
                  value={values.role}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel value='Employee' control={<Radio />} label='Employee' />
                  <FormControlLabel value='HR' control={<Radio />} label='HR' />
                  <FormControlLabel value='Admin' control={<Radio />} label='Admin' />
                </RadioGroup>
              </FormControl> */}
              <Button fullWidth size='large' variant='contained' sx={{ marginTop: 7 }} onClick={handleSubmit}>
                Login
              </Button>
              <Divider sx={{ my: 5 }} />
              <Box
                sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}
              >
                <LinkStyled passHref href='/' onClick={(e) => e.preventDefault()}>
                  Forgot Password?
                </LinkStyled>
              </Box>
            </form>
          </CardContent>
        </Card>
      </motion.div>
      <FooterIllustrationsV1 />
    </Box>
  );
};

LoginPage.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default LoginPage;