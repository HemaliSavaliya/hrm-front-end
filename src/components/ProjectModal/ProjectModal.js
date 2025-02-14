import { Dialog, DialogContent, DialogTitle, Typography, Button, useTheme } from '@mui/material'
import ProjectForm from './ProjectForm'
import { saveButton } from 'src/Styles'
import { PlusSignIcon } from 'hugeicons-react'

const ProjectModal = ({
  editProjectId,
  projectData,
  open,
  setOpen,
  scroll,
  handleClickOpen,
  handleClose,
  addProjects,
  editProjects
}) => {
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const role = authToken?.role
  const theme = useTheme()

  return (
    <>
      {(role === 'Admin' || role === 'HR') && (
        <Button
          variant='contained'
          onClick={handleClickOpen('body')}
          sx={{
            ...saveButton,
            gap: 1,
            '&.MuiButton-root:hover': {
              backgroundColor: theme.palette.primary.hover
            }
          }}
        >
          Add Projects <PlusSignIcon size={15} />
        </Button>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>
          <Typography fontWeight={600}>{editProjectId ? 'Edit Projects' : 'Add Projects'}</Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'body'} sx={{ borderBottom: '0' }}>
          <ProjectForm
            handleClose={handleClose}
            editProjectId={editProjectId}
            projectData={projectData}
            setOpen={setOpen}
            addProjects={addProjects}
            editProjects={editProjects}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ProjectModal
