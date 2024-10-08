/* eslint-disable react-hooks/exhaustive-deps */
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Dialog,
  DialogContent,
  Slide,
  DialogTitle,
  Typography
} from '@mui/material'
import axios from 'axios'
import { forwardRef, useEffect, useState } from 'react'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const ConfirmationModal = ({
  showConfirm,
  setShowConfirm,
  onSaveProject,
  onCancelConfirm,
  projectName,
  setProjectName,
  description,
  handleChange,
  setDescription,
  isTimerRunning
}) => {
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null

  const [projectData, setProjectData] = useState([])

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/projects-list`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      // Filter out deleted projects before setting the state
      const activeProjects = response.data.filter(project => !project.deleted)

      setProjectData(activeProjects, response.data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <Dialog
      TransitionComponent={Transition}
      keepMounted
      open={showConfirm}
      onClose={() => setShowConfirm(false)}
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogContent>
        {!isTimerRunning && (
          <>
            <DialogTitle id='scroll-dialog-title' sx={{ padding: '0 !important', mb: 5 }}>
              <Typography fontWeight={600}>Project Details</Typography>
            </DialogTitle>
            {authToken?.role === 'HR' ? null : (
              <FormControl fullWidth>
                <InputLabel>Project Name</InputLabel>
                <Select
                  sx={{ mb: 5 }}
                  label='Project Name'
                  labelId='form-layouts-separator-select-label'
                  id='name'
                  name='name'
                  value={projectName}
                  onChange={e => setProjectName(e.target.value)}
                >
                  {projectData.length === 0 ? (
                    <MenuItem disabled>No Project</MenuItem>
                  ) : (
                    projectData.map(project => (
                      <MenuItem key={project.id} value={project.projectName}>
                        {project.projectName}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            )}

            <TextField
              fullWidth
              multiline
              rows={4}
              label='Description'
              id='description'
              name='description'
              value={description}
              onChange={e => setDescription(e.target.value)}
              onKeyPress={handleChange}
            />
          </>
        )}

        {isTimerRunning && (
          <>
            <p>Are you sure you want to stop the timer and save the data?</p>
            <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={onSaveProject}>
              Save
            </Button>
            <Button size='large' color='secondary' variant='outlined' onClick={onCancelConfirm}>
              Cancel
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmationModal
