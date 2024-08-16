import {
  Button,
  CardActions,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import React from 'react'
import DesignationFormLogic from './DesignationFormLogic'

const DesignationForm = ({ handleClose, editDesignationId, designationData, setOpen, addDesignation }) => {
  const { handleInputChange, formData, errors, validateForm, setFormData, initialFormValue } = DesignationFormLogic(
    designationData,
    editDesignationId
  )

  const handleFormSubmit = event => {
    event.preventDefault()

    if (!validateForm()) {
      return // If the form is not valid, don't submit
    }

    addDesignation(formData)

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
    <div>
      <form onSubmit={handleFormSubmit} autoComplete='off'>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label='Designation Name'
              id='designationName'
              name='designationName'
              value={formData.designationName}
              onChange={handleInputChange}
            />
            {errors.designationName && (
              <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.designationName}</Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={12} sx={{ mb: 5 }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label='Status'
                defaultValue='Active'
                labelId='form-layouts-separator-select-label'
                id='status'
                name='status'
                value={formData.status}
                onChange={handleInputChange}
              >
                <MenuItem value='Active'>Active</MenuItem>
                <MenuItem value='Inactive'>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Divider sx={{ margin: 0 }} />
        <CardActions sx={{ pl: 0, pb: 0 }}>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Save
          </Button>
          <Button size='large' color='secondary' variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
        </CardActions>
      </form>
    </div>
  )
}

export default DesignationForm
