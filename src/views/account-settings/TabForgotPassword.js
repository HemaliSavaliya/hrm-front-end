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
  Select,
  MenuItem,
  useTheme,
  FilledInput
} from '@mui/material'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { Toaster } from 'react-hot-toast'
import useForgotPasswordData from 'src/hooks/useForgotPasswordData'
import { cancelButton, formStyles, saveButton } from 'src/Styles'

const TabForgotPassword = () => {
  const {
    handleNewPasswordChange,
    handleClickShowNewPassword,
    handleMouseDownNewPassword,
    handleConfirmNewPasswordChange,
    handleClickShowConfirmNewPassword,
    handleMouseDownConfirmNewPassword,
    handleEmployeeName,
    handleChangePassword,
    values,
    setValues,
    userPassword
  } = useForgotPasswordData()
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
                  <InputLabel id='form-layouts-separator-select-label' sx={styles.inputLabelDrop}>Employee</InputLabel>
                  <Select
                    label='Employee'
                    defaultValue=''
                    labelId='form-layouts-separator-select-label'
                    id='employeeName'
                    name='employeeName'
                    value={values.employeeName}
                    onChange={handleEmployeeName('employeeName')}
                    sx={styles.inputFieldDrop}
                  >
                    {userPassword.length === 0 ? (
                      <MenuItem disabled>No Employee</MenuItem>
                    ) : (
                      userPassword.map(user => (
                        <MenuItem key={user.id} value={user.name}>
                          {user.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
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
        <Button
          variant='contained'
          sx={{
            ...saveButton,
            '&.MuiButton-root:hover': {
              backgroundColor: theme.palette.primary.hover
            }
          }}
          onClick={handleChangePassword}
        >
          Save Changes
        </Button>
        <Button
          type='reset'
          variant='outlined'
          color='secondary'
          onClick={() => setValues({ ...values, employeeId: '', newPassword: '', confirmPassword: '' })}
          sx={cancelButton}
        >
          Reset
        </Button>
      </CardContent>
    </>
  )
}

export default TabForgotPassword
