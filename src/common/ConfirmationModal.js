import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, useTheme } from '@mui/material'
import { cancelButton, saveButton } from 'src/Styles'

const ConfirmationModal = ({ open, onClose, onConfirm, title, content }) => {
  const theme = useTheme()

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='outlined' color='secondary' sx={cancelButton}>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant='contained' color='primary' autoFocus
          sx={{
            ...saveButton,
            '&.MuiButton-root:hover': {
              backgroundColor: theme.palette.primary.hover
            }
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationModal
