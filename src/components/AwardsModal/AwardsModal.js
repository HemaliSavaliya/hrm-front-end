import AwardsForm from './AwardsForm'
import { Dialog, DialogContent, DialogTitle, Typography, Button, useTheme } from '@mui/material'
import { PlusSignIcon } from 'hugeicons-react'
import { saveButton } from 'src/Styles'

const AwardsModal = ({
  editAwardId,
  awardsData,
  open,
  setOpen,
  scroll,
  handleClickOpen,
  handleClose,
  addAwards,
  editAwards
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
          Add Awards <PlusSignIcon size={15} />
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
          <Typography fontWeight={600}>{editAwardId ? 'Edit Awards' : 'Add Awards'}</Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'body'} sx={{ borderBottom: '0' }}>
          <AwardsForm
            handleClose={handleClose}
            editAwardId={editAwardId}
            awardsData={awardsData}
            setOpen={setOpen}
            addAwards={addAwards}
            editAwards={editAwards}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AwardsModal
