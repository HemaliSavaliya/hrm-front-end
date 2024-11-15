import { Dialog, DialogContent, DialogTitle, Typography, Button, Box } from '@mui/material'
import { motion } from 'framer-motion'
import HolidayForm from './HolidayForm'

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
  return (
    <>
      <Button
        component={motion.div}
        whileHover={{
          scale: 0.9,
          transition: { duration: 0.4 }
        }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exist={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
        variant='contained'
        onClick={handleClickOpen('body')}
        sx={{ lineHeight: 0, padding: '20px 25px' }}
      >
        Add Holiday
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
