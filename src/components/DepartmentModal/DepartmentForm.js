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
  Chip
} from '@mui/material'
import DepartmentFormLogic from './DepartmentFormLogic'

const DepartmentForm = ({ handleClose, editDepartId, setOpen, departmentData, addDepartments, editDepartments }) => {
  const { formData, handleInputChange, errors, validateForm, setFormData, handleTeamMembersChange, initialFormValue } =
    DepartmentFormLogic(departmentData, editDepartId)

  // const [teamMemberData, setTeamMemberData] = useState([]);
  // const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;

  // useEffect(() => {
  //   const fetchEmpList = async () => {
  //     try {
  //       const response = await axios.get("${process.env.NEXT_PUBLIC_URL}/empList", {
  //         headers: {
  //           Authorization: `Bearer ${authToken?.token}`,
  //         },
  //       });

  //       setTeamMemberData(response.data.map((item) => item.name));
  //     } catch (error) {
  //       console.error("Error fetching user list", error);
  //     }
  //   }
  //   fetchEmpList();
  // }, [authToken?.token]);

  const handleFormSubmit = event => {
    event.preventDefault()

    if (!validateForm()) {
      return // If the form is not valid, don't submit
    }

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
  }

  const isInEditMode = !!editDepartId

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
            {!isInEditMode && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Department Name'
                  id='departmentName'
                  name='departmentName'
                  value={formData.departmentName}
                  onChange={handleInputChange}
                />
                {errors.departmentName && (
                  <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.departmentName}</Typography>
                )}
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Department Head'
                id='departmentHead'
                name='departmentHead'
                value={formData.departmentHead}
                onChange={handleInputChange}
              />
              {errors.departmentHead && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.departmentHead}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Department Email'
                id='departmentEmail'
                name='departmentEmail'
                value={formData.departmentEmail}
                onChange={handleInputChange}
              />
              {errors.departmentEmail && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.departmentEmail}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
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
            {isInEditMode && (
              <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                <Autocomplete
                  multiple
                  options={formData.teamMembers}
                  getOptionLabel={option => option}
                  value={formData?.teamMembers || []}
                  onChange={handleTeamMembersChange}
                  disabled
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                      const { key, ...rest } = getTagProps({ index })

                      return <Chip key={key} variant='outlined' label={option} {...rest} />
                    })
                  }
                  renderInput={params => (
                    <TextField {...params} label='Team Members' id='teamMembers' name='teamMembers' />
                  )}
                />
              </Grid>
            )}
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

export default DepartmentForm
