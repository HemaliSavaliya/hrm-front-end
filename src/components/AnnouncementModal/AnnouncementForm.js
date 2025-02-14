/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Grid,
  Divider,
  MenuItem,
  TextField,
  InputLabel,
  Typography,
  CardActions,
  FormControl,
  Select,
  useTheme
} from '@mui/material'
import { DropFiles } from 'src/@core/DropFile/DropFiles'
import { useEffect, useState } from 'react'
import AnnouncementFormLogic from './AnnouncementFormLogic'
import { cancelButton, formStyles, saveButton } from 'src/Styles'

const AnnouncementForm = ({
  handleClose,
  editAnnoId,
  announcementData,
  setOpen,
  addAnnouncement,
  editAnnouncement
}) => {
  const {
    formData,
    handleImageChange,
    handleInputChange,
    errors,
    validateForm,
    setFormData,
    initialFormValue,
    fetchDepartment,
    departmentData
  } = AnnouncementFormLogic(announcementData, editAnnoId)

  const [isSaving, setIsSaving] = useState(false)
  const theme = useTheme()
  const styles = formStyles(theme);

  const handleFormSubmit = async event => {
    event.preventDefault()

    if (!validateForm()) {
      return // If the form is not valid, don't submit
    }

    if (editAnnoId) {
      // Disable the save button to prevent multiple submissions
      setIsSaving(true)
      try {
        await editAnnouncement(formData, editAnnoId)
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
        await addAnnouncement(formData)
        setFormData(initialFormValue)
      } catch (error) {
        console.error('Error')
      } finally {
        // Ensure to re-enable the save button even if an error occurs
        setIsSaving(false)
      }
    }
  }

  const isInEditMode = !!editAnnoId

  useEffect(() => {
    fetchDepartment()
  }, [])

  return (
    <>
      <div>
        <form onSubmit={handleFormSubmit} autoComplete='off'>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                variant="filled"
                size='small'
                label='Announcement Title'
                id='announcementTitle'
                name='announcementTitle'
                value={formData.announcementTitle}
                onChange={handleInputChange}
                sx={{ ...styles.inputLabel, ...styles.inputField }}
              />
              {errors.announcementTitle && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.announcementTitle}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                variant="filled"
                size='small'
                label='Announcement Details'
                id='announcementDetails'
                name='announcementDetails'
                value={formData.announcementDetails}
                onChange={handleInputChange}
                sx={{ ...styles.inputLabel, ...styles.inputField }}
              />
              {errors.announcementDetails && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.announcementDetails}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth variant="filled" size='small'>
                <InputLabel id='form-layouts-separator-select-label' sx={styles.inputLabelDrop}>Department</InputLabel>
                <Select
                  label='Department'
                  labelId='form-layouts-separator-select-label'
                  id='selectDepartment'
                  name='selectDepartment'
                  value={formData.selectDepartment}
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
              {errors.selectDepartment && (
                <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.selectDepartment}</Typography>
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

export default AnnouncementForm
