import JobForm from './JobForm'
import { Dialog, DialogContent, DialogTitle, Typography, Button, useTheme } from '@mui/material'
import { PlusSignIcon } from 'hugeicons-react'
import { saveButton } from 'src/Styles'

const JobModal = ({ editJobId, jobData, open, setOpen, scroll, handleClickOpen, handleClose, addJobs, editJobs }) => {
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
        Add Jobs <PlusSignIcon size={15} />
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>
          <Typography fontWeight={600}>{editJobId ? 'Edit Jobs' : 'Add Jobs'}</Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'body'} sx={{ borderBottom: '0' }}>
          <JobForm
            handleClose={handleClose}
            editJobId={editJobId}
            jobData={jobData}
            setOpen={setOpen}
            addJobs={addJobs}
            editJobs={editJobs}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default JobModal
