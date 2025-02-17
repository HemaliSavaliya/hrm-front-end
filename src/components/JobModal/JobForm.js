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
import JobFormLogic from './JobFormLogic'
import axios from 'axios'
import { cancelButton, formStyles, saveButton } from 'src/Styles'

const JobForm = ({ handleClose, editJobId, setOpen, jobData, addJobs, editJobs }) => {
  const { formData, handleInputChange, errors, validateForm, setFormData, initialFormValue } = JobFormLogic(
    jobData,
    editJobId
  )
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const [loading, setLoading] = useState(false) // Add loading state
  const theme = useTheme()
  const styles = formStyles(theme);

  const handleFormSubmit = event => {
    event.preventDefault()

    if (!validateForm()) {
      return // If the form is not valid, don't submit
    }

    setLoading(true) // Set loading to true when starting submission

    try {
      if (editJobId) {
        editJobs(formData, editJobId)
      } else {
        addJobs(formData)
      }

      setFormData(initialFormValue)
      setOpen(false)
    } catch (error) {
      console.error('Error submitting the form:', error)
    } finally {
      setLoading(false) // Set loading to false once submission is done
    }
  }

  const isInEditMode = !!editJobId

  // Fetch department data
  const [departmentData, setDepartmentData] = useState([])

  const fetchDepartment = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/department-list`, {
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
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="filled"
                size='small'
                label='Job Title'
                id='jobTitle'
                name='jobTitle'
                value={formData.jobTitle}
                onChange={handleInputChange}
                sx={{ ...styles.inputLabel, ...styles.inputField }}
              />
              {errors.jobTitle && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.jobTitle}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="filled"
                size='small'
                label='Position'
                id='position'
                name='position'
                value={formData.position}
                onChange={handleInputChange}
                sx={{ ...styles.inputLabel, ...styles.inputField }}
              />
              {errors.position && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.position}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="filled" size='small'>
                <InputLabel id='form-layouts-separator-select-label' sx={styles.inputLabelDrop}>Department</InputLabel>
                <Select
                  label='Department'
                  defaultValue=''
                  labelId='form-layouts-separator-select-label'
                  id='department'
                  name='department'
                  value={formData.department}
                  onChange={handleInputChange}
                  sx={styles.inputFieldDrop}
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
                variant="filled"
                size='small'
                label='No. of position'
                id='noOfPosition'
                name='noOfPosition'
                value={formData.noOfPosition}
                onChange={handleInputChange}
                sx={{ ...styles.inputLabel, ...styles.inputField }}
              />
              {errors.noOfPosition && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.noOfPosition}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={12} sx={{ mb: 5 }}>
              <TextField
                fullWidth
                variant="filled"
                size='small'
                multiline
                rows={4}
                label='Job jobDescription'
                id='jobDescription'
                name='jobDescription'
                value={formData.jobDescription}
                onChange={handleInputChange}
                sx={{ ...styles.inputLabel, ...styles.inputField }}
              />
              {errors.jobDescription && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.jobDescription}</Typography>
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
              {loading ? <>Saving...</> : !isInEditMode ? 'Save' : 'Update'}
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

export default JobForm
