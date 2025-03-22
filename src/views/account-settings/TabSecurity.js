import {
  Box,
  Grid,
  Button,
  Divider,
  InputLabel,
  IconButton,
  CardContent,
  FormControl,
  InputAdornment,
  useTheme,
  FilledInput
} from '@mui/material'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import useTabSecurityData from 'src/hooks/useTabSecurityData'
import { cancelButton, formStyles, saveButton } from 'src/Styles'

const TabSecurity = () => {
  const {
    handleCurrentPasswordChange,
    handleClickShowCurrentPassword,
    handleMouseDownCurrentPassword,
    handleNewPasswordChange,
    handleClickShowNewPassword,
    handleMouseDownNewPassword,
    handleConfirmNewPasswordChange,
    handleClickShowConfirmNewPassword,
    handleMouseDownConfirmNewPassword,
    handlePasswordChange,
    values,
    setValues
  } = useTabSecurityData()
  const theme = useTheme()
  const styles = formStyles(theme);

  return (
    <>
      <Toaster />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="filled" size='small'>
                  <InputLabel htmlFor='account-settings-current-password' sx={styles.inputLabelDrop}>Current Password</InputLabel>
                  <FilledInput
                    label='Current Password'
                    value={values.password}
                    id='account-settings-current-password'
                    type={values.showPassword ? 'text' : 'password'}
                    onChange={handleCurrentPasswordChange('password')}
                    sx={styles.inputFieldDrop}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowCurrentPassword}
                          onMouseDown={handleMouseDownCurrentPassword}
                        >
                          {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth variant="filled" size='small'>
                  <InputLabel htmlFor='account-settings-new-password' sx={styles.inputLabelDrop}>New Password</InputLabel>
                  <FilledInput
                    label='New Password'
                    value={values.newPassword}
                    id='account-settings-new-password'
                    onChange={handleNewPasswordChange('newPassword')}
                    type={values.showNewPassword ? 'text' : 'password'}
                    sx={styles.inputFieldDrop}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowNewPassword}
                          aria-label='toggle password visibility'
                          onMouseDown={handleMouseDownNewPassword}
                        >
                          {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth variant="filled" size='small'>
                  <InputLabel htmlFor='account-settings-confirm-new-password' sx={styles.inputLabelDrop}>Confirm New Password</InputLabel>
                  <FilledInput
                    label='Confirm New Password'
                    value={values.confirmPassword}
                    id='account-settings-confirm-new-password'
                    type={values.showConfirmPassword ? 'text' : 'password'}
                    onChange={handleConfirmNewPasswordChange('confirmPassword')}
                    sx={styles.inputFieldDrop}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownConfirmNewPassword}
                        >
                          {values.showConfirmPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
            sx={{ display: 'flex', marginTop: [7.5, 2.5], alignItems: 'center', justifyContent: 'center' }}
          >
            <img alt='avatar' src='/images/pages/secure.svg' width={330} />
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ margin: 0 }} />

      <CardContent>
        <Box>
          <Button
            variant='contained'
            sx={{
              ...saveButton,
              '&.MuiButton-root:hover': {
                backgroundColor: theme.palette.primary.hover
              }
            }}
            onClick={handlePasswordChange}
          >
            Save Changes
          </Button>
          <Button
            type='reset'
            variant='outlined'
            color='secondary'
            sx={cancelButton}
            onClick={() => setValues({ ...values, password: '', newPassword: '', confirmPassword: '' })}
          >
            Reset
          </Button>
        </Box>
      </CardContent>
    </>
  )
}

export default TabSecurity
