/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  DialogContentText,
  Grid,
  Divider,
  TextField,
  Typography,
  CardContent,
  CardActions,
  MenuItem,
  InputLabel,
  FormControl,
  Select
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import LeaveRequestFormLogic from './LeaveRequestFormLogic'
import axios from 'axios'

const LeaveRequestForm = ({ handleClose, setOpen, addLeaveRequest }) => {
  const { formData, handleInputChange, errors, validateForm, setFormData, initialFormValue } = LeaveRequestFormLogic()

  const [selectedTotalDays, setSelectedTotalDays] = useState('')

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

    addLeaveRequest(formData)

    setFormData(initialFormValue)
    setOpen(false)
  }

  // const descriptionElementRef = useRef(null);

  // useEffect(() => {
  //   const { current: descriptionElement } = descriptionElementRef;
  //   if (descriptionElement !== null) {
  //     descriptionElement.focus();
  //   }
  // }, []);

  return (
    <>
      <div>
        <form onSubmit={handleFormSubmit} autoComplete='off'>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Leave Type</InputLabel>
                  <Select
                    label='Leave Type'
                    defaultValue=''
                    labelId='form-layouts-separator-select-label'
                    id='leaveName'
                    name='leaveName'
                    value={formData.leaveName}
                    onChange={handleInputChange}
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
                <FormControl fullWidth>
                  <InputLabel>Total Days</InputLabel>
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
                    />

                    {/* {errors.endDate && <Typography sx={{ color: "#FF4433", fontSize: "13px", pt: 1 }}>{errors.endDate}</Typography>} */}
                  </>
                )}
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label='Description'
                  id='description'
                  name='description'
                  value={formData.description}
                  onChange={handleInputChange}
                />
                {errors.description && (
                  <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.description}</Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ margin: 0 }} />
          <CardActions>
            <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
              Save
            </Button>
            <Button size='large' color='secondary' variant='outlined' onClick={handleClose}>
              Cancel
            </Button>
          </CardActions>
        </form>
      </div>
    </>
  )
}

export default LeaveRequestForm
