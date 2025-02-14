/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Grid,
  Divider,
  TextField,
  Typography,
  CardActions,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  useTheme
} from '@mui/material'
import { useEffect, useState } from 'react'
import LeaveRequestFormLogic from './LeaveRequestFormLogic'
import axios from 'axios'
import { cancelButton, formStyles, saveButton } from 'src/Styles'

const LeaveRequestForm = ({ handleClose, setOpen, addLeaveRequest }) => {
  const { formData, handleInputChange, errors, validateForm, setFormData, initialFormValue } = LeaveRequestFormLogic()
  const theme = useTheme()
  const styles = formStyles(theme);
  const [selectedTotalDays, setSelectedTotalDays] = useState('')
  const [loading, setLoading] = useState(false) // Add loading state
  const [leaveType, setLeaveType] = useState([])
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null

  const fetchLeaveRequest = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/leaveTypeList`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      const activeLeaveTypes = response.data.filter(leave => leave.leaveStatus === 'Active' && leave.deleted === 0)

      setLeaveType(activeLeaveTypes)
    } catch (error) {
      console.error('Error fetching leave request', error)
    }
  }

  useEffect(() => {
    fetchLeaveRequest()
  }, [authToken?.token])

  const handleFormSubmit = event => {
    event.preventDefault()

    if (!validateForm()) {
      return // If the form is not valid, don't submit
    }

    setLoading(true)
    try {
      addLeaveRequest(formData)

      setFormData(initialFormValue)
      setOpen(false)
    } catch (error) {
      console.error('Error submitting the form:', error)
    } finally {
      setLoading(false) // Set loading to false once submission is done
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleFormSubmit} autoComplete='off'>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="filled" size='small'>
                <InputLabel sx={styles.inputLabelDrop}>Leave Type</InputLabel>
                <Select
                  label='Leave Type'
                  defaultValue=''
                  labelId='form-layouts-separator-select-label'
                  id='leaveName'
                  name='leaveName'
                  value={formData.leaveName}
                  onChange={handleInputChange}
                  sx={styles.inputFieldDrop}
                >
                  {leaveType.length === 0 ? (
                    <MenuItem disabled>No Leave Type</MenuItem>
                  ) : (
                    leaveType.map(leave => (
                      <MenuItem key={leave.id} value={leave.leaveName}>
                        {leave.leaveName}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
              {errors.leaveName && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.leaveName}</Typography>
              )}
            </Grid>
            {/* <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label='Applying Date'
                  id="applyingDate"
                  name="applyingDate"
                  value={formData.applyingDate}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    placeholder: '',
                  }}
                />
                {errors.applyingDate && <Typography sx={{ color: "#FF4433", fontSize: "13px", pt: 1 }}>{errors.applyingDate}</Typography>}
              </Grid> */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="filled" size='small'>
                <InputLabel sx={styles.inputLabelDrop}>Total Days</InputLabel>
                <Select
                  label='Total Days'
                  defaultValue=''
                  labelId='form-layouts-separator-select-label'
                  id='leaveType'
                  name='leaveType'
                  value={formData.leaveType}
                  onChange={e => {
                    handleInputChange(e)
                    setSelectedTotalDays(e.target.value)
                  }}
                  sx={styles.inputFieldDrop}
                >
                  <MenuItem value='Half Day'>Half Day</MenuItem>
                  <MenuItem value='Full Day'>Full Day</MenuItem>
                </Select>
              </FormControl>
              {errors.leaveType && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.leaveType}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {selectedTotalDays === 'Full Day' && (
                <>
                  <TextField
                    fullWidth
                    variant="filled"
                    size='small'
                    type='date'
                    label='Start Date'
                    id='startDate'
                    name='startDate'
                    value={formData.startDate}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      placeholder: ''
                    }}
                    sx={{ ...styles.inputLabel, ...styles.inputField }}
                  />

                  {errors.startDate && (
                    <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.startDate}</Typography>
                  )}
                </>
              )}
              {selectedTotalDays === 'Half Day' && (
                <>
                  <TextField
                    fullWidth
                    variant="filled"
                    size='small'
                    type='date'
                    label='Start Date'
                    id='startDate'
                    name='startDate'
                    value={formData.startDate}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      placeholder: ''
                    }}
                    sx={{ ...styles.inputLabel, ...styles.inputField }}
                  />

                  {errors.startDate && (
                    <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.startDate}</Typography>
                  )}
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {selectedTotalDays === 'Full Day' && (
                <>
                  <TextField
                    fullWidth
                    variant="filled"
                    size='small'
                    type='date'
                    label='End Date'
                    id='endDate'
                    name='endDate'
                    value={formData.endDate}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      placeholder: ''
                    }}
                    sx={{ ...styles.inputLabel, ...styles.inputField }}
                  />

                  {/* {errors.endDate && <Typography sx={{ color: "#FF4433", fontSize: "13px", pt: 1 }}>{errors.endDate}</Typography>} */}
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={12} sx={{ mb: 5 }}>
              <TextField
                fullWidth
                variant="filled"
                size='small'
                multiline
                rows={3}
                label='Description'
                id='description'
                name='description'
                value={formData.description}
                onChange={handleInputChange}
                sx={{ ...styles.inputLabel, ...styles.inputField }}
              />
              {errors.description && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.description}</Typography>
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
              disabled={loading} // Disable button while loading
            >
              {loading ? <>Saving...</> : 'Save'}
            </Button>
            <Button
              size='large'
              color='secondary'
              variant='outlined'
              onClick={handleClose}
              disabled={loading} // Disable button while loading
              sx={cancelButton}
            >
              Cancel
            </Button>
          </CardActions>
        </form>
      </div>
    </>
  )
}

export default LeaveRequestForm
