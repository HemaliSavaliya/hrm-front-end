/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Grid,
  Divider,
  MenuItem,
  TextField,
  InputLabel,
  IconButton,
  Typography,
  CardActions,
  FormControl,
  InputAdornment,
  Select,
  FilledInput,
  useTheme
} from '@mui/material'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { DropFiles } from 'src/@core/DropFile/DropFiles'
import { useEffect, useState } from 'react'
import EmployeeModalLogic from './EmployeeFormLogic'
import { cancelButton, formStyles, saveButton } from 'src/Styles'

const EmployeeForm = ({ handleClose, editEmployeeId, setOpen, employeeData, addEmployee, editEmployee }) => {
  const {
    formData,
    handleInputChange,
    handleImageChange,
    errors,
    validateForm,
    setFormData,
    initialFormValue,
    fetchDepartment,
    fetchDesignation,
    departmentData,
    designationData,
    fetchRole,
    roleData
  } = EmployeeModalLogic(employeeData, editEmployeeId)

  const [isSaving, setIsSaving] = useState(false)
  const theme = useTheme()
  const styles = formStyles(theme);

  const handleFormSubmit = async event => {
    event.preventDefault()

    if (!validateForm()) {
      return // If the form is not valid, don't submit
    }

    const adminToSubmit = {
      ...formData,
      department: departmentData.find(d => d.departmentName === formData.department)?.id
    }

    if (editEmployeeId) {
      // Disable the save button to prevent multiple submissions
      setIsSaving(true)
      try {
        await editEmployee(adminToSubmit, editEmployeeId)
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
        await addEmployee(adminToSubmit)
        setFormData(initialFormValue)
      } catch (error) {
        console.error('Error')
      } finally {
        // Ensure to re-enable the save button even if an error occurs
        setIsSaving(false)
      }
    }
  }

  const isInEditMode = !!editEmployeeId

  useEffect(() => {
    fetchDepartment()
    fetchRole()
    fetchDesignation()
  }, [])

  return (
    <>
      <div>
        <form onSubmit={handleFormSubmit} autoComplete='off'>
          <Grid container spacing={5}>
            {!isInEditMode && (
              <>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    variant="filled"
                    size='small'
                    label='Name'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    sx={{ ...styles.inputLabel, ...styles.inputField }}
                  />
                  {errors.name && (
                    <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.name}</Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="filled" size='small'>
                    <InputLabel htmlFor='form-layouts-separator-password' sx={styles.inputLabelDrop}>Password</InputLabel>
                    <FilledInput
                      label='Password'
                      variant="filled"
                      size='small'
                      id='password'
                      name='password'
                      value={formData.password}
                      onChange={handleInputChange}
                      type={formData.showPassword ? 'text' : 'password'}
                      sx={styles.inputFieldDrop}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={() =>
                              setFormData({
                                ...formData,
                                showPassword: !formData.showPassword
                              })
                            }
                            aria-label='toggle password visibility'
                          >
                            {formData.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {errors.password && (
                      <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.password}</Typography>
                    )}
                  </FormControl>
                </Grid>
              </>
            )}
            <Grid item xs={12} sm={!isInEditMode ? 6 : 12}>
              <TextField
                fullWidth
                variant="filled"
                size='small'
                type='email'
                label='Email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                sx={{ ...styles.inputLabel, ...styles.inputField }}
              />
              {errors.email && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.email}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="filled" size='small'>
                <InputLabel sx={styles.inputLabelDrop}>Designation</InputLabel>
                <Select
                  label='Designation'
                  id='designation'
                  name='designation'
                  value={formData.designation}
                  onChange={handleInputChange}
                  sx={styles.inputFieldDrop}
                >
                  {designationData.length === 0 ? (
                    <MenuItem disabled>No Designation</MenuItem>
                  ) : (
                    designationData.map(designation => (
                      <MenuItem key={designation.id} value={designation.designationName}>
                        {designation.designationName}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
              {errors.designation && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.designation}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="filled" size='small'>
                <InputLabel sx={styles.inputLabelDrop}>Department</InputLabel>
                <Select
                  label='Department'
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
            <Grid item xs={12} sm={12}>
              <TextField
                multiline
                variant="filled"
                size='small'
                rows={2}
                fullWidth
                label='Address'
                id='address'
                name='address'
                value={formData.address}
                onChange={handleInputChange}
                sx={{ ...styles.inputLabel, ...styles.inputField }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="filled"
                size='small'
                label='Mobile No.'
                id='mobileNo'
                name='mobileNo'
                maxLength={10}
                value={formData.mobileNo}
                onChange={handleInputChange}
                sx={{ ...styles.inputLabel, ...styles.inputField }}
              />
              {errors.mobileNo && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.mobileNo}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="filled"
                size='small'
                label='Alternative No.'
                id='alternateNumber'
                name='alternateNumber'
                maxLength={10}
                value={formData.alternateNumber}
                onChange={handleInputChange}
                sx={{ ...styles.inputLabel, ...styles.inputField }}
              />
            </Grid>
            {!isInEditMode && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="filled"
                    size='small'
                    type='date'
                    label='Birth Date'
                    id='birthDate'
                    name='birthDate'
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      placeholder: '' // Set an empty string as the placeholder
                    }}
                    sx={{ ...styles.inputLabel, ...styles.inputField }}
                  />
                  {errors.birthDate && (
                    <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.birthDate}</Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="filled"
                    size='small'
                    type='date'
                    label='Joining Date'
                    id='joiningDate'
                    name='joiningDate'
                    value={formData.joiningDate}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      placeholder: '' // Set an empty string as the placeholder
                    }}
                    sx={{ ...styles.inputLabel, ...styles.inputField }}
                  />
                  {errors.joiningDate && (
                    <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.joiningDate}</Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="filled" size='small'>
                    <InputLabel sx={styles.inputLabelDrop}>Gender</InputLabel>
                    <Select
                      label='Gender'
                      defaultValue=''
                      labelId='form-layouts-separator-select-label'
                      id='gender'
                      name='gender'
                      value={formData.gender}
                      onChange={handleInputChange}
                      sx={styles.inputFieldDrop}
                    >
                      <MenuItem value='Male'>Male</MenuItem>
                      <MenuItem value='Female'>Female</MenuItem>
                    </Select>
                  </FormControl>
                  {errors.gender && (
                    <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.gender}</Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="filled" size='small'>
                    <InputLabel id='form-layouts-separator-select-label' sx={styles.inputLabelDrop}>Blood Group</InputLabel>
                    <Select
                      label='Blood Group'
                      defaultValue=''
                      labelId='form-layouts-separator-select-label'
                      id='bloodGroup'
                      name='bloodGroup'
                      value={formData.bloodGroup}
                      onChange={handleInputChange}
                      sx={styles.inputFieldDrop}
                    >
                      <MenuItem value='A+'>A+</MenuItem>
                      <MenuItem value='A-'>A-</MenuItem>
                      <MenuItem value='B+'>B+</MenuItem>
                      <MenuItem value='B-'>B-</MenuItem>
                      <MenuItem value='AB+'>AB+</MenuItem>
                      <MenuItem value='AB-'>AB-</MenuItem>
                      <MenuItem value='O-'>O-</MenuItem>
                      <MenuItem value='O+'>O+</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="filled" size='small'>
                <InputLabel sx={styles.inputLabelDrop}>Role</InputLabel>
                <Select label='Role' id='role' name='role' value={formData.role} onChange={handleInputChange} sx={styles.inputFieldDrop}>
                  {roleData.length === 0 ? (
                    <MenuItem disabled>No Role</MenuItem>
                  ) : (
                    roleData.map(role => (
                      <MenuItem key={role.id} value={role.roleName}>
                        {role.roleName}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
              {errors.role && <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.role}</Typography>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="filled" size='small'>
                <InputLabel id='form-layouts-separator-select-label' sx={styles.inputLabelDrop}>Status</InputLabel>
                <Select
                  label='Status'
                  defaultValue=''
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
              {errors.status && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.status}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="filled"
                size='small'
                label='Salary'
                id='salary'
                name='salary'
                value={formData.salary}
                onChange={handleInputChange}
                sx={{ ...styles.inputLabel, ...styles.inputField }}
              />
              {errors.salary && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.salary}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="filled"
                size='small'
                label='Bank Account Holder Name'
                id='bankAccountHolderName'
                name='bankAccountHolderName'
                value={formData.bankAccountHolderName}
                onChange={handleInputChange}
                sx={{ ...styles.inputLabel, ...styles.inputField }}
              />
              {errors.bankAccountHolderName && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>
                  {errors.bankAccountHolderName}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="filled"
                size='small'
                label='Bank Account Number'
                id='bankAccountNumber'
                name='bankAccountNumber'
                value={formData.bankAccountNumber}
                onChange={handleInputChange}
                sx={{ ...styles.inputLabel, ...styles.inputField }}
              />
              {errors.bankAccountNumber && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.bankAccountNumber}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="filled"
                size='small'
                label='Bank Name'
                id='bankName'
                name='bankName'
                value={formData.bankName}
                onChange={handleInputChange}
                sx={{ ...styles.inputLabel, ...styles.inputField }}
              />
              {errors.bankName && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.bankName}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="filled"
                size='small'
                label='Bank IFSC Code'
                id='bankIFSCCode'
                name='bankIFSCCode'
                value={formData.bankIFSCCode}
                onChange={handleInputChange}
                sx={{ ...styles.inputLabel, ...styles.inputField }}
              />
              {errors.bankIFSCCode && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.bankIFSCCode}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="filled"
                size='small'
                label='Bank Branch Location'
                id='bankBranchLocation'
                name='bankBranchLocation'
                value={formData.bankBranchLocation}
                onChange={handleInputChange}
                sx={{ ...styles.inputLabel, ...styles.inputField }}
              />
              {errors.bankBranchLocation && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.bankBranchLocation}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <div
                id='governmentDocument'
                name='governmentDocument'
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
              {errors.governmentDocument && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.governmentDocument}</Typography>
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
              disabled={isSaving} // Disable button while uploading or saving
            >
              {isSaving ? 'Saving...' : isInEditMode ? 'Update' : 'Save'}
            </Button>
            <Button
              size='large'
              color='secondary'
              variant='outlined'
              onClick={handleClose}
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

export default EmployeeForm

{
  /* <Grid item xs={12} sm={12}>
  <Typography variant="subtitle1" gutterBottom>
    Current Document:
  </Typography>
  {formData.governmentDocument.map((document, index) => (
    <Typography key={index}>
      <span>{document}</span>
    </Typography>
  ))}
</Grid> */
}
