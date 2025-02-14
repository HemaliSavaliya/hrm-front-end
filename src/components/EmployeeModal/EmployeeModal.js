import { Dialog, DialogContent, DialogTitle, Typography, Button, useTheme } from '@mui/material'
import EmployeeForm from './EmployeeForm'
import { saveButton } from 'src/Styles'
import { PlusSignIcon } from 'hugeicons-react'

const EmployeeModal = ({
  editEmployeeId,
  employeeData,
  open,
  setOpen,
  scroll,
  handleClickOpen,
  handleClose,
  addEmployee,
  editEmployee
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
        Add Employees <PlusSignIcon size={15} />
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>
          <Typography fontWeight={600}>{editEmployeeId ? 'Edit Employee' : 'Add Employee'}</Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'body'} sx={{ borderBottom: '0' }}>
          <EmployeeForm
            handleClose={handleClose}
            editEmployeeId={editEmployeeId}
            employeeData={employeeData}
            setOpen={setOpen}
            addEmployee={addEmployee}
            editEmployee={editEmployee}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EmployeeModal
