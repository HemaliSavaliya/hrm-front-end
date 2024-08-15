import {
  Button,
  DialogContentText,
  Grid,
  Divider,
  MenuItem,
  TextField,
  InputLabel,
  Typography,
  CardContent,
  CardActions,
  FormControl,
  Select,
  Autocomplete,
  Chip
} from '@mui/material'
import { DropFiles } from 'src/@core/DropFile/DropFiles'
import { useEffect, useRef, useState } from 'react'
import ProjectFormLogic from './ProjectFormLogic'
import axios from 'axios'

const ProjectForm = ({ handleClose, editProjectId, setOpen, projectData, addProjects, editProjects }) => {
  const {
    formData,
    handleInputChange,
    handleImageChange,
    errors,
    validateForm,
    setFormData,
    initialFormValue,
    handleTeamMembersChange
  } = ProjectFormLogic(projectData, editProjectId)

  const [teamMemberData, setTeamMemberData] = useState([])
  const [teamMemberId, setTeamMemberId] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null

  useEffect(() => {
    const fetchEmpList = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/empList`, {
          headers: {
            Authorization: `Bearer ${authToken?.token}`
          }
        })

        // Filter out Employees
        const filteredTeamMemberData = response.data.filter(item => item.role !== 'HR')

        const fetchedTeamMemberData = filteredTeamMemberData.map(item => item.name)
        const fetchedTeamMemberId = filteredTeamMemberData.map(item => item.id)

        setTeamMemberData(fetchedTeamMemberData)
        setTeamMemberId(fetchedTeamMemberId)
      } catch (error) {
        console.error('Error fetching user list', error)
      }
    }
    fetchEmpList()
  }, [authToken?.token])

  const handleFormSubmit = async event => {
    event.preventDefault()

    if (!validateForm()) {
      return // If the form is not valid, don't submit
    }

    // Convert the team members from an array of objects to an array of strings
    const teamMembersArray = formData.teamMembers.map(member => member)
    const teamMembersIdArray = formData.userId.map(member => member)

    // Update the formData object to include the team members array
    const updatedFormData = {
      ...formData,
      teamMembers: teamMembersArray,
      userId: teamMembersIdArray
    }

    if (editProjectId) {
      // Disable the save button to prevent multiple submissions
      setIsSaving(true)
      try {
        await editProjects(updatedFormData, editProjectId)
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
        await addProjects(updatedFormData)
        setFormData(initialFormValue)
      } catch (error) {
        console.error('Error')
      } finally {
        // Ensure to re-enable the save button even if an error occurs
        setIsSaving(false)
      }
    }
  }

  const isInEditMode = !!editProjectId

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
              {!isInEditMode && (
                <>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label='Project Name'
                      id='projectName'
                      name='projectName'
                      value={formData.projectName}
                      onChange={handleInputChange}
                    />
                    {errors.projectName && (
                      <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.projectName}</Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Client Name'
                      id='clientName'
                      name='clientName'
                      value={formData.clientName}
                      onChange={handleInputChange}
                    />
                    {errors.clientName && (
                      <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.clientName}</Typography>
                    )}
                  </Grid>
                </>
              )}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type='email'
                  label='Client Email'
                  id='clientEmail'
                  name='clientEmail'
                  value={formData.clientEmail}
                  onChange={handleInputChange}
                />
              </Grid>
              {!isInEditMode && (
                <Grid item xs={12} sm={6}>
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
                      placeholder: '' // Set an empty string as the placeholder
                    }}
                  />
                  {errors.startDate && (
                    <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.startDate}</Typography>
                  )}
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
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
                    placeholder: '' // Set an empty string as the placeholder
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Status</InputLabel>
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
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  multiple
                  options={teamMemberData.map((member, index) => ({
                    name: member,
                    id: teamMemberId[index]
                  }))}
                  getOptionLabel={option => option.name}
                  value={formData.teamMembers}
                  onChange={handleTeamMembersChange}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                      const { key, ...rest } = getTagProps({ index })

                      return <Chip key={key} variant='outlined' label={`${option.name} (${option.id})`} {...rest} />
                    })
                  }
                  renderInput={params => (
                    <TextField {...params} label='Team Members' id='teamMembers' name='teamMembers' />
                  )}
                />
                {errors.teamMembers && (
                  <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.teamMembers}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12}>
                <div
                  id='document'
                  name='document'
                  style={{
                    marginBottom: '10px',
                    padding: '20px',
                    border: 'dashed',
                    borderColor: 'currentColor',
                    borderWidth: 'thin',
                    borderRadius: '6px',
                    textAlign: 'center'
                  }}
                >
                  <DropFiles handleImageChange={handleImageChange} />
                </div>
                {errors.document && (
                  <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.document}</Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ margin: 0 }} />
          <CardActions>
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

export default ProjectForm
