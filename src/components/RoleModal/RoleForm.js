import {
  Button,
  CardActions,
  CardContent,
  DialogContentText,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import React, { useEffect, useRef } from 'react'
import RoleFormLogic from './RoleFormLogic'

const RoleForm = ({ handleClose, editRoleId, roleData, setOpen, addRole }) => {
  const { handleInputChange, formData, errors, validateForm, setFormData, initialFormValue } = RoleFormLogic(
    roleData,
    editRoleId
  )

  const handleFormSubmit = event => {
    event.preventDefault()

    if (!validateForm()) {
      return // If the form is not valid, don't submit
    }

    addRole(formData)

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
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label='Role Name'
                id='roleName'
                name='roleName'
                value={formData.roleName}
                onChange={handleInputChange}
              />
              {errors.roleName && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.roleName}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label='Status'
                  defaultValue='Enable'
                  id='status'
                  name='status'
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <MenuItem value='Enable'>Enable</MenuItem>
                  <MenuItem value='Disable'>Disable</MenuItem>
                </Select>
              </FormControl>
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
  )
}

export default RoleForm
