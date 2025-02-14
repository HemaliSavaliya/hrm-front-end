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
  Autocomplete,
  Chip,
  useTheme
} from '@mui/material'
import DepartmentFormLogic from './DepartmentFormLogic'
import { useState } from 'react'
import { cancelButton, formStyles, saveButton } from 'src/Styles'

const DepartmentForm = ({ handleClose, editDepartId, setOpen, departmentData, addDepartments, editDepartments }) => {
  const { formData, handleInputChange, errors, validateForm, setFormData, handleTeamMembersChange, initialFormValue } =
    DepartmentFormLogic(departmentData, editDepartId)
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
      // Convert the team members from an array of objects to an array of strings
      const teamMembersArray = formData.teamMembers ? formData.teamMembers.map(member => member) : []

      // Update the formData object to include the team members array
      const updatedFormData = {
        ...formData,
        teamMembers: teamMembersArray
      }

      if (editDepartId) {
        editDepartments(updatedFormData, editDepartId)
      } else {
        addDepartments(updatedFormData)
      }

      setFormData(initialFormValue)
      setOpen(false)
    } catch (error) {
      console.error('Error submitting the form:', error)
    } finally {
      setLoading(false) // Set loading to false once submission is done
    }
  }

  const isInEditMode = !!editDepartId

  return (
    <>
      <div>
        <form onSubmit={handleFormSubmit} autoComplete='off'>
          <Grid container spacing={5}>
            {!isInEditMode && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size='small'
                  variant='filled'
                  label='Department Name'
                  id='departmentName'
                  name='departmentName'
                  value={formData.departmentName}
                  onChange={handleInputChange}
                  sx={{ ...styles.inputLabel, ...styles.inputField }}
                />
                {errors.departmentName && (
                  <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.departmentName}</Typography>
                )}
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size='small'
                variant='filled'
                label='Department Head'
                id='departmentHead'
                name='departmentHead'
                value={formData.departmentHead}
                onChange={handleInputChange}
                sx={{ ...styles.inputLabel, ...styles.inputField }}
              />
              {errors.departmentHead && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.departmentHead}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size='small'
                variant='filled'
                label='Department Email'
                id='departmentEmail'
                name='departmentEmail'
                value={formData.departmentEmail}
                onChange={handleInputChange}
                sx={{ ...styles.inputLabel, ...styles.inputField }}
              />
              {errors.departmentEmail && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.departmentEmail}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <FormControl fullWidth variant="filled" size='small'>
                <InputLabel sx={styles.inputLabelDrop}>Status</InputLabel>
                <Select
                  label='Status'
                  defaultValue='Active'
                  labelId='form-layouts-separator-select-label'
                  id='status'
                  name='status'
                  value={formData.status}
                  onChange={handleInputChange}
                  sx={styles.inputFieldDrop}
                >
                  <MenuItem value='Active'>Active</MenuItem>
                  <MenuItem value='Inactive'>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {isInEditMode && (
              <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                <Autocomplete
                  multiple
                  options={formData.teamMembers}
                  getOptionLabel={option => option}
                  value={formData?.teamMembers || []}
                  onChange={handleTeamMembersChange}
                  disabled
                  sx={styles.inputLabelDrop}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                      const { key, ...rest } = getTagProps({ index })

                      return <Chip key={key} variant='outlined' label={option} {...rest} />
                    })
                  }
                  renderInput={params => (
                    <TextField {...params} variant="filled" size='small' sx={styles.inputFieldDrop} label='Team Members' id='teamMembers' name='teamMembers' />
                  )}
                />
              </Grid>
            )}
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

export default DepartmentForm
