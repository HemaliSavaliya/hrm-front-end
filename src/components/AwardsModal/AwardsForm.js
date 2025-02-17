/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Grid,
  Divider,
  TextField,
  Typography,
  CardActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme
} from '@mui/material'
import { useEffect, useState } from 'react'
import AwardsFormLogic from './AwardsFormLogic'
import axios from 'axios'
import { cancelButton, formStyles, saveButton } from 'src/Styles'

const AwardsForm = ({ handleClose, editAwardId, awardsData, setOpen, addAwards, editAwards }) => {
  const { formData, handleInputChange, errors, validateForm, setFormData, initialFormValue } = AwardsFormLogic(
    awardsData,
    editAwardId
  )
  const [isSaving, setIsSaving] = useState(false)
  const [awardsUser, setAwardsUser] = useState([])
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const theme = useTheme()
  const styles = formStyles(theme);

  const fetchUserList = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/empList`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      const adminFilter = response.data.filter(roleUser => roleUser.role !== 'Admin' && roleUser.deleted !== 1)

      setAwardsUser(adminFilter)
    } catch (error) {
      console.error('Error fetching user list', error)
    }
  }

  useEffect(() => {
    fetchUserList()
  }, [authToken?.token])

  const handleFormSubmit = async event => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    // Find the selected user based on employeeName
    const selectedUser = awardsUser.find(user => user.name === formData.employeeName)

    if (selectedUser) {
      // Include userId in the formData before making the API request
      const formDataWithUserId = {
        ...formData,
        employeeId: selectedUser.id || ''
      }

      if (editAwardId) {
        // Disable the save button to prevent multiple submissions
        setIsSaving(true)
        try {
          await editAwards(formDataWithUserId, editAwardId)
        } catch (error) {
          console.error('Error')
        } finally {
          // Ensure to re-enable the save button even if an error occurs
          setIsSaving(false)
          setOpen(false)
        }
      } else {
        // Disable the save button to prevent multiple submissions
        setIsSaving(true)
        try {
          await addAwards(formDataWithUserId)
          setFormData(initialFormValue)
        } catch (error) {
          console.error('Error')
        } finally {
          // Ensure to re-enable the save button even if an error occurs
          setIsSaving(false)
        }
      }
    } else {
      console.error('Error: Selected user not found')
    }
  }

  const isInEditMode = !!editAwardId

  return (
    <>
      <div>
        <form onSubmit={handleFormSubmit} autoComplete='off'>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                variant="filled"
                size='small'
                label='Awards Name'
                id='awardsName'
                name='awardsName'
                value={formData.awardsName}
                onChange={handleInputChange}
                sx={{ ...styles.inputLabel, ...styles.inputField }}
              />
              {errors.awardsName && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.awardsName}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                variant="filled"
                size='small'
                label='Awards Details'
                id='awardsDetails'
                name='awardsDetails'
                multiline
                rows={3}
                value={formData.awardsDetails}
                onChange={handleInputChange}
                sx={{ ...styles.inputLabel, ...styles.inputField }}
              />
              {errors.awardsDetails && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.awardsDetails}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth variant="filled" size='small'>
                <InputLabel id='form-layouts-separator-select-label' sx={styles.inputLabelDrop}>Employee</InputLabel>
                <Select
                  label='Employee'
                  defaultValue=''
                  labelId='form-layouts-separator-select-label'
                  id='employeeName'
                  name='employeeName'
                  value={formData.employeeName}
                  onChange={handleInputChange}
                  sx={styles.inputFieldDrop}
                >
                  {awardsUser.length === 0 ? (
                    <MenuItem disabled>No Employee</MenuItem>
                  ) : (
                    awardsUser.map(user => (
                      <MenuItem key={user.id} value={user.name}>
                        {user.name} - {user.id}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
              {errors.employeeName && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.employeeName}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={12} sx={{ mb: 5 }}>
              <TextField
                fullWidth
                variant="filled"
                size='small'
                label='Reward'
                id='reward'
                name='reward'
                value={formData.reward}
                onChange={handleInputChange}
                sx={{ ...styles.inputLabel, ...styles.inputField }}
              />
              {errors.reward && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.reward}</Typography>
              )}
            </Grid>
          </Grid>
          <Divider sx={{ margin: 0 }} />
          <CardActions sx={{ pl: 0, pb: 0 }}>
            <Button
              size='large'
              type='submit'
              sx={{
                ...saveButton,
                '&.MuiButton-root:hover': {
                  backgroundColor: theme.palette.primary.hover
                }
              }}
              variant='contained'
              disabled={isSaving} // Disable button while loading
            >
              {isSaving ? <>Saving...</> : !isInEditMode ? 'Save' : 'Update'}
            </Button>
            <Button
              size='large'
              color='secondary'
              variant='outlined'
              onClick={handleClose}
              sx={cancelButton}
              disabled={isSaving} // Disable button while loading
            >
              Cancel
            </Button>
          </CardActions>
        </form>
      </div>
    </>
  )
}

export default AwardsForm
