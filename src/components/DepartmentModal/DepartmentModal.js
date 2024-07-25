import { Dialog, DialogContent, DialogTitle, Typography, Button, Box } from '@mui/material';
import DepartmentForm from './DepartmentForm';
import { motion } from "framer-motion";

const DepartmentModal = ({ editDepartId, departmentData, open, setOpen, scroll, handleClickOpen, handleClose, addDepartments, editDepartments }) => {
  return (
    <>
      <Box sx={{ mt: 3, textAlign: "end" }}>
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
          Add Departments
        </Button>
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
            {editDepartId ? 'Edit Departments' : 'Add Departments'}
          </Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'body'} sx={{ borderBottom: "0" }}>
          <DepartmentForm handleClose={handleClose} editDepartId={editDepartId} departmentData={departmentData} setOpen={setOpen} addDepartments={addDepartments} editDepartments={editDepartments} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DepartmentModal;