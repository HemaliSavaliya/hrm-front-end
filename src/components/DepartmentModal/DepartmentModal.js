import { Dialog, DialogContent, DialogTitle, Typography, Button, useTheme } from '@mui/material'
import DepartmentForm from './DepartmentForm'
import { PlusSignIcon } from 'hugeicons-react'
import { saveButton } from 'src/Styles'

const DepartmentModal = ({
  editDepartId,
  departmentData,
  open,
  setOpen,
  scroll,
  handleClickOpen,
  handleClose,
  addDepartments,
  editDepartments
}) => {
  const theme = useTheme()

  return (
    <>
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
        Add Departments  <PlusSignIcon size={15} />
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>
          <Typography fontWeight={600}>{editDepartId ? 'Edit Departments' : 'Add Departments'}</Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'body'} sx={{ borderBottom: '0' }}>
          <DepartmentForm
            handleClose={handleClose}
            editDepartId={editDepartId}
            departmentData={departmentData}
            setOpen={setOpen}
            addDepartments={addDepartments}
            editDepartments={editDepartments}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DepartmentModal
