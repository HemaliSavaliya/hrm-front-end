import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
  Divider,
  useTheme
} from '@mui/material'
import { cancelButton, saveButton } from 'src/Styles'

const EventInfoModal = ({ open, handleClose, onDeleteEvent, currentEvent, onEditEvent }) => {
  const theme = useTheme()

  const onClose = () => {
    handleClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
    >
      <DialogTitle id='scroll-dialog-title'>
        <Typography variant='h6' fontWeight={600}>
          Event Information
        </Typography>
      </DialogTitle>
      <Divider sx={{ margin: 0 }} />
      <DialogContent>
        <DialogContentText id='scroll-dialog-description' tabIndex={-1}>
          <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>Description:</span>{' '}
          {currentEvent && currentEvent.description}
        </DialogContentText>
      </DialogContent>
      <Divider sx={{ margin: 0 }} />
      <DialogActions>
        <Button color='error' variant='contained' onClick={onDeleteEvent} sx={{ ...saveButton, mr: 0 }}>
          Delete
        </Button>
        <Button color='secondary' variant='outlined' onClick={onClose} sx={cancelButton}>
          Cancel
        </Button>
        <Button
          sx={{
            ...saveButton,
            mr: 0,
            '&.MuiButton-root:hover': {
              backgroundColor: theme.palette.primary.hover
            }
          }}
          variant='contained'
          onClick={() => onEditEvent(currentEvent.id)}
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EventInfoModal
