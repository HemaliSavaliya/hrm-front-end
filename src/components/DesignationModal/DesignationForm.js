import { Button, CardActions, CardContent, DialogContentText, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import DesignationFormLogic from './DesignationFormLogic';

const DesignationForm = ({ handleClose, editDesignationId, designationData, setOpen, addDesignation }) => {
  const { handleInputChange, formData, errors, validateForm, setFormData, initialFormValue } = DesignationFormLogic(designationData, editDesignationId)

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return; // If the form is not valid, don't submit
    }

    addDesignation(formData);

    setFormData(initialFormValue);
    setOpen(false);
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
      <form onSubmit={handleFormSubmit} autoComplete="off">
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label='Designation Name'
                id="designationName"
                name="designationName"
                value={formData.designationName}
                onChange={handleInputChange}
              />
              {errors.designationName && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.designationName}</Typography>}
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label='Status'
                  defaultValue="Active"
                  labelId='form-layouts-separator-select-label'
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <MenuItem value='Active'>Active</MenuItem>
                  <MenuItem value='Inactive'>Inactive</MenuItem>
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

export default DesignationForm;