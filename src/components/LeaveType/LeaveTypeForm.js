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
  MenuItem
} from '@mui/material'
import { useEffect, useRef } from 'react'
import LeaveTypeFormLogic from './LeaveTypeFormLogic'

const LeaveTypeForm = ({ handleClose, leaveTypeData, editLeaveTypeId, setOpen, addLeaveType, editLeaveType }) => {
  const { formData, handleInputChange, errors, validateForm, setFormData, initialFormValue } = LeaveTypeFormLogic(
    leaveTypeData,
    editLeaveTypeId
  )

  const handleFormSubmit = event => {
    event.preventDefault()

    if (!validateForm()) {
      return // If the form is not valid, don't submit
    }

    if (editLeaveTypeId) {
      editLeaveType(formData, editLeaveTypeId)
    } else {
      addLeaveType(formData)
    }

    setFormData(initialFormValue)
    setOpen(false)
  }

  const isInEditMode = !!editLeaveTypeId

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
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label='Leave Type Name'
                id='leaveName'
                name='leaveName'
                value={formData.leaveName}
                onChange={handleInputChange}
              />
              {errors.leaveName && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.leaveName}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Leave Type Balance'
                id='leaveBalance'
                name='leaveBalance'
                value={formData.leaveBalance}
                onChange={handleInputChange}
              />
              {errors.leaveBalance && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.leaveBalance}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Leave Status</InputLabel>
                <Select
                  label='Leave Status'
                  defaultValue=''
                  labelId='form-layouts-separator-select-label'
                  id='leaveStatus'
                  name='leaveStatus'
                  value={formData.leaveStatus}
                  onChange={handleInputChange}
                >
                  <MenuItem value='Active'>Active</MenuItem>
                  <MenuItem value='Inactive'>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label='Leave Type Adding Date'
                  id="leaveAddingDate"
                  name="leaveAddingDate"
                  value={formData.leaveAddingDate}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    placeholder: '', // Set an empty string as the placeholder
                  }}
                />
                {errors.leaveAddingDate && <Typography sx={{ color: "#FF4433", fontSize: "13px",  pt: 1 }}>{errors.leaveAddingDate}</Typography>}
              </Grid> */}
          </Grid>
          <Divider sx={{ margin: 0 }} />
          <CardActions sx={{ pl: 0, pb: 0 }}>
            <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
              {isInEditMode ? 'Update' : 'Save'}
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

export default LeaveTypeForm
