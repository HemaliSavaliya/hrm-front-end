import { Dialog, DialogContent, DialogTitle, Typography, Button, useTheme } from '@mui/material'
import HolidayForm from './HolidayForm'
import { PlusSignIcon } from 'hugeicons-react'
import { saveButton } from 'src/Styles'

const HolidayModal = ({
  editHolidayId,
  holidayData,
  open,
  setOpen,
  scroll,
  handleClickOpen,
  handleClose,
  addHoliday,
  editHoliday
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
        Add Holiday <PlusSignIcon size={15} />
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>
          <Typography fontWeight={600}>{editHolidayId ? 'Edit Holiday' : 'Add Holiday'}</Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'body'} sx={{ borderBottom: '0' }}>
          <HolidayForm
            handleClose={handleClose}
            editHolidayId={editHolidayId}
            holidayData={holidayData}
            setOpen={setOpen}
            addHoliday={addHoliday}
            editHoliday={editHoliday}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default HolidayModal
