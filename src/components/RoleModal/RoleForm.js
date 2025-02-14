import {
  Button,
  CardActions,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import React, { useState } from 'react'
import RoleFormLogic from './RoleFormLogic'
import { cancelButton, formStyles, saveButton } from 'src/Styles'

const RoleForm = ({ handleClose, editRoleId, roleData, setOpen, addRole }) => {
  const { handleInputChange, formData, errors, validateForm, setFormData, initialFormValue } = RoleFormLogic(
    roleData,
    editRoleId
  )
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
      addRole(formData)

      setFormData(initialFormValue)
      setOpen(false)
    } catch (error) {
      console.error('Error submitting the form:', error)
    } finally {
      setLoading(false) // Set loading to false once submission is done
    }
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit} autoComplete='off'>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              size='small'
              variant='filled'
              label='Role Name'
              id='roleName'
              name='roleName'
              value={formData.roleName}
              onChange={handleInputChange}
              sx={{ ...styles.inputLabel, ...styles.inputField }}
            />
            {errors.roleName && (
              <Typography sx={{ color: '#FF4433', fontSize: '13px', pt: 1 }}>{errors.roleName}</Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={12} sx={{ mb: 5 }}>
            <FormControl fullWidth variant="filled" size='small'>
              <InputLabel sx={styles.inputLabelDrop}>Status</InputLabel>
              <Select
                label='Status'
                defaultValue='Enable'
                id='status'
                name='status'
                value={formData.status}
                onChange={handleInputChange}
                sx={styles.inputFieldDrop}
              >
                <MenuItem value='Enable'>Enable</MenuItem>
                <MenuItem value='Disable'>Disable</MenuItem>
              </Select>
            </FormControl>
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
            {loading ? <>Saving...</> : 'Save'}
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
  )
}

export default RoleForm
