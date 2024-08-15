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
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import JobFormLogic from './JobFormLogic'
import axios from 'axios'

const JobForm = ({ handleClose, editJobId, setOpen, jobData, addJobs, editJobs }) => {
  const { formData, handleInputChange, errors, validateForm, setFormData, initialFormValue } = JobFormLogic(
    jobData,
    editJobId
  )
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null

  const handleFormSubmit = event => {
    event.preventDefault()

    if (!validateForm()) {
      return // If the form is not valid, don't submit
    }

    if (editJobId) {
      editJobs(formData, editJobId)
    } else {
      addJobs(formData)
    }

    setFormData(initialFormValue)
    setOpen(false)
  }

  const isInEditMode = !!editJobId

  const descriptionElementRef = useRef(null)

  // useEffect(() => {
  //   const { current: descriptionElement } = descriptionElementRef;
  //   if (descriptionElement !== null) {
  //     descriptionElement.focus();
  //   }
  // }, []);

  // Fetch department data
  const [departmentData, setDepartmentData] = useState([])

  const fetchDepartment = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/department-list`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      const filterData = response.data.filter(data => data.status === 'Active')

      setDepartmentData(filterData)
    } catch (error) {
      console.error('Error fetching department:', error)
    }
  }

  useEffect(() => {
    fetchDepartment()
  }, [])

  return (
    <>
      <div>
        <form onSubmit={handleFormSubmit} autoComplete='off'>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Job Title'
                  id='jobTitle'
                  name='jobTitle'
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                />
                {errors.jobTitle && (
                  <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.jobTitle}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Position'
                  id='position'
                  name='position'
                  value={formData.position}
                  onChange={handleInputChange}
                />
                {errors.position && (
                  <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.position}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Department</InputLabel>
                  <Select
                    label='Department'
                    defaultValue=''
                    labelId='form-layouts-separator-select-label'
                    id='department'
                    name='department'
                    value={formData.department}
                    onChange={handleInputChange}
                  >
                    {departmentData.length === 0 ? (
                      <MenuItem disabled>No Department</MenuItem>
                    ) : (
                      departmentData.map(department => (
                        <MenuItem key={department.id} value={department.departmentName}>
                          {department.departmentName}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
                {errors.department && (
                  <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.department}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='No. of position'
                  id='noOfPosition'
                  name='noOfPosition'
                  value={formData.noOfPosition}
                  onChange={handleInputChange}
                />
                {errors.noOfPosition && (
                  <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.noOfPosition}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label='Job jobDescription'
                  id='jobDescription'
                  name='jobDescription'
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                />
                {errors.jobDescription && (
                  <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.jobDescription}</Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ margin: 0 }} />
          <CardActions>
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

export default JobForm
