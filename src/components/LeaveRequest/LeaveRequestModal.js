import { Dialog, DialogContent, DialogTitle, Typography, Button, useTheme } from '@mui/material'
import LeaveRequestForm from './LeaveRequestForm'
import { PlusSignIcon } from 'hugeicons-react'
import { saveButton } from 'src/Styles'

const LeaveRequestModal = ({ leaveReqData, open, setOpen, scroll, handleClickOpen, handleClose, addLeaveRequest }) => {
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
        Apply for Leave <PlusSignIcon size={15} />
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>
          <Typography fontWeight={600}>Add Leave Requests</Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'body'} sx={{ borderBottom: '0' }}>
          <LeaveRequestForm
            handleClose={handleClose}
            leaveReqData={leaveReqData}
            setOpen={setOpen}
            addLeaveRequest={addLeaveRequest}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default LeaveRequestModal
