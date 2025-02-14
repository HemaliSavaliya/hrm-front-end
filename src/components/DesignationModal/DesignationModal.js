import { Button, Dialog, DialogContent, DialogTitle, Typography, useTheme } from '@mui/material'
import React from 'react'
import DesignationForm from './DesignationForm'
import { saveButton } from 'src/Styles'
import { PlusSignIcon } from 'hugeicons-react'

const DesignationModal = ({
  editDesignationId,
  designationData,
  open,
  setOpen,
  scroll,
  handleClickOpen,
  handleClose,
  addDesignation
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
        Add Designation <PlusSignIcon size={15} />
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>
          <Typography fontWeight={600}>{editDesignationId ? 'Edit Designation' : 'Add Designation'}</Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'body'} sx={{ borderBottom: '0' }}>
          <DesignationForm
            handleClose={handleClose}
            editDesignationId={editDesignationId}
            designationData={designationData}
            setOpen={setOpen}
            addDesignation={addDesignation}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DesignationModal
