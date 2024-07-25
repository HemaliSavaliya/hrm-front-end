import { Dialog, DialogContent, DialogTitle, Typography, Button, TextField, InputAdornment, Box } from '@mui/material';
import EmployeeForm from './EmployeeForm';
import { motion } from "framer-motion";
import { Magnify } from 'mdi-material-ui';

const EmployeeModal = ({ editEmployeeId, employeeData, open, setOpen, scroll, handleClickOpen, handleClose, handleSearch, addEmployee, editEmployee }) => {
  return (
    <>
      <Box sx={{ width: '100%', display: { xs: "grid", sm: "flex", lg: "flex" }, alignItems: 'center', justifyContent: "space-between" }}>
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
          Add Employees
        </Button>

        <TextField
          autoComplete='off'
          size='small'
          placeholder='Search Here'
          onChange={handleSearch}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 }, mt: { xs: 3, sm: 0, lg: 0 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Magnify fontSize='small' />
              </InputAdornment>
            )
          }}
        />
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Typography fontWeight={600}>{editEmployeeId ? 'Edit Employee' : 'Add Employee'}</Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'body'} sx={{ borderBottom: "0" }}>
          <EmployeeForm handleClose={handleClose} editEmployeeId={editEmployeeId} employeeData={employeeData} setOpen={setOpen} addEmployee={addEmployee} editEmployee={editEmployee} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EmployeeModal;