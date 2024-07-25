import { Dialog, DialogContent, DialogTitle, Typography, Button, Box } from '@mui/material';
import AnnouncementForm from './AnnouncementForm';
import { motion } from "framer-motion";

const AnnouncementModal = ({ editAnnoId, announcementData, open, setOpen, scroll, handleClickOpen, handleClose, addAnnouncement, editAnnouncement }) => {
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;
  const role = authToken?.role;

  return (
    <>
      <Box>
        {role === "Employee" ? null :
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
            sx={{ lineHeight: 0, padding: "20px 25px" }}
          >
            Add Announcements
          </Button>
        }
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Typography fontWeight={600}>
            {editAnnoId ? 'Edit Announcements' : 'Add Announcements'}
          </Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'body'} sx={{ borderBottom: "0" }}>
          <AnnouncementForm handleClose={handleClose} editAnnoId={editAnnoId} announcementData={announcementData} setOpen={setOpen} addAnnouncement={addAnnouncement} editAnnouncement={editAnnouncement} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AnnouncementModal;