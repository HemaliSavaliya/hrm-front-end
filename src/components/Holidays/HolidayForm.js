/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, Divider, TextField, Typography, CardActions } from '@mui/material'
import { useState } from 'react'
import HolidayFormLogic from './HolidayFormLogic'

const HolidayForm = ({ handleClose, editHolidayId, holidayData, setOpen, addHoliday, editHoliday }) => {
  const { formData, handleInputChange, errors, validateForm, setFormData, initialFormValue } = HolidayFormLogic(
    holidayData,
    editHolidayId
  )

  const [isSaving, setIsSaving] = useState(false)

  const handleFormSubmit = async event => {
    event.preventDefault()

    if (!validateForm()) {
      return // If the form is not valid, don't submit
    }

    if (editHolidayId) {
      // Disable the save button to prevent multiple submissions
      setIsSaving(true)
      try {
        await editHoliday(formData, editHolidayId)
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
        await addHoliday(formData)
        setFormData(initialFormValue)
      } catch (error) {
        console.error('Error')
      } finally {
        // Ensure to re-enable the save button even if an error occurs
        setIsSaving(false)
      }
    }
  }

  const isInEditMode = !!editHolidayId

  return (
    <>
      <div>
        <form onSubmit={handleFormSubmit} autoComplete='off'>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label='Name'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.name}</Typography>}
            </Grid>
            <Grid item xs={12} sm={12} sx={{ mb: 5 }}>
              <TextField
                fullWidth
                type='date'
                label='Date'
                id='date'
                name='date'
                value={formData.date}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  placeholder: '' // Set an empty string as the placeholder
                }}
              />
              {errors.date && <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.date}</Typography>}
            </Grid>
          </Grid>
          <Divider sx={{ margin: 0 }} />
          <CardActions sx={{ pl: 0, pb: 0 }}>
            <Button
              size='large'
              type='submit'
              sx={{ mr: 2, lineHeight: 0, padding: '20px 25px !important' }}
              variant='contained'
              disabled={isSaving} // Disable button while uploading or saving
            >
              {isSaving ? 'Saving...' : isInEditMode ? 'Update' : 'Save'}
            </Button>
            <Button
              size='large'
              color='secondary'
              variant='outlined'
              onClick={handleClose}
              sx={{ lineHeight: 0, padding: '20px 25px !important' }}
            >
              Cancel
            </Button>
          </CardActions>
        </form>
      </div>
    </>
  )
}

export default HolidayForm
