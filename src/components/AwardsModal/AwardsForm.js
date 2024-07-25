/* eslint-disable react-hooks/exhaustive-deps */
import { Button, DialogContentText, Grid, Divider, TextField, Typography, CardContent, CardActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import AwardsFormLogic from './AwardsFormLogic';
import axios from 'axios';

const AwardsForm = ({ handleClose, editAwardId, awardsData, setOpen, addAwards, editAwards }) => {
  const { formData, handleInputChange, errors, validateForm, setFormData, initialFormValue } = AwardsFormLogic(awardsData, editAwardId);

  const [awardsUser, setAwardsUser] = useState([]);
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;

  const fetchUserList = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/empList", {
        headers: {
          Authorization: `Bearer ${authToken?.token}`,
        },
      });

      const adminFilter = response.data.filter(roleUser => roleUser.role !== 'Admin' && roleUser.deleted !== 1);

      setAwardsUser(adminFilter);
    } catch (error) {
      console.error("Error fetching user list", error);
    }
  }

  useEffect(() => {
    fetchUserList();
  }, [authToken?.token]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Find the selected user based on employeeName
    const selectedUser = awardsUser.find(user => user.name === formData.employeeName);

    if (selectedUser) {
      // Include userId in the formData before making the API request
      const formDataWithUserId = {
        ...formData,
        employeeId: selectedUser.id || ""
      };

      if (editAwardId) {
        editAwards(formDataWithUserId, editAwardId);
      } else {
        addAwards(formDataWithUserId);
      }

      setFormData(initialFormValue);
      setOpen(false);
    } else {
      console.error("Error: Selected user not found");
    }
  }

  const isInEditMode = !!editAwardId;

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
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label='Awards Name'
                  id="awardsName"
                  name="awardsName"
                  value={formData.awardsName}
                  onChange={handleInputChange}
                />
                {errors.awardsName && <Typography sx={{ color: '#FF4433', fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.awardsName}</Typography>}
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label='Awards Details'
                  id="awardsDetails"
                  name="awardsDetails"
                  multiline
                  rows={3}
                  value={formData.awardsDetails}
                  onChange={handleInputChange}
                />
                {errors.awardsDetails && <Typography sx={{ color: '#FF4433', fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.awardsDetails}</Typography>}
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Employee</InputLabel>
                  <Select
                    label='Employee'
                    defaultValue=''
                    labelId='form-layouts-separator-select-label'
                    id="employeeName"
                    name="employeeName"
                    value={formData.employeeName}
                    onChange={handleInputChange}
                  >
                    {awardsUser.length === 0 ?
                      <MenuItem disabled>No Employee</MenuItem>
                      :
                      awardsUser.map((user) => (
                        <MenuItem key={user.id} value={user.name}>
                          {user.name} - {user.id}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
                {errors.employeeName && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.employeeName}</Typography>}
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label='Reward'
                  id="reward"
                  name="reward"
                  value={formData.reward}
                  onChange={handleInputChange}
                />
                {errors.reward && <Typography sx={{ color: '#FF4433', fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.reward}</Typography>}
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ margin: 0 }} />
          <CardActions>
            <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
              {isInEditMode ? "Update" : "Save"}
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

export default AwardsForm;