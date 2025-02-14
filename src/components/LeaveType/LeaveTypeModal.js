import { Dialog, DialogContent, DialogTitle, Typography, Button, useTheme } from '@mui/material'
import LeaveTypeForm from './LeaveTypeForm'
import { saveButton } from 'src/Styles'
import { PlusSignIcon } from 'hugeicons-react'

const LeaveTypeModal = ({
  leaveTypeData,
  editLeaveTypeId,
  open,
  setOpen,
  scroll,
  handleClickOpen,
  handleClose,
  addLeaveType,
  editLeaveType
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
        Add Leave Type <PlusSignIcon size={15} />
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>
          <Typography fontWeight={600}>{editLeaveTypeId ? 'Edit Leave Type' : 'Add Leave Type'}</Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'body'} sx={{ borderBottom: '0' }}>
          <LeaveTypeForm
            handleClose={handleClose}
            editLeaveTypeId={editLeaveTypeId}
            leaveTypeData={leaveTypeData}
            setOpen={setOpen}
            addLeaveType={addLeaveType}
            editLeaveType={editLeaveType}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default LeaveTypeModal
