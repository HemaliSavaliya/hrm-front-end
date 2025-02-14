import React from 'react'
import {
  Card,
  Box,
  TextField,
  useTheme
} from '@mui/material'
import useLeaveTypeData from 'src/hooks/useLeaveTypeData'
import LeaveTypeModal from 'src/components/LeaveType/LeaveTypeModal'
import { Toaster } from 'react-hot-toast'
import ConfirmationModal from 'src/common/ConfirmationModal'
import LeaveTypeTable from './LeaveTypeTable'
import { formStyles } from 'src/Styles'

const LeaveType = () => {
  const {
    leaveTypeData,
    editLeaveTypeId,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    handleEdit,
    addLeaveType,
    editLeaveType,
    updateLeaveTypeStatus,
    deleteModalOpen,
    setDeleteModalOpen,
    confirmDeleteLeaveType,
    handleDeleteLeaveType,
    loading,
    searchQuery,
    handleSearchChange
  } = useLeaveTypeData()
  const theme = useTheme()
  const styles = formStyles(theme);

  return (
    <>
      <Toaster />

      <ConfirmationModal
        open={deleteModalOpen}
        onConfirm={confirmDeleteLeaveType}
        onClose={() => setDeleteModalOpen(false)}
        title='Delete Leave Type'
        content='Are you sure you want to delete this leave type?'
      />

      <Card sx={{ mt: 4, p: 5, boxShadow: '0px 9px 20px rgba(46, 35, 94, 0.07)' }}>
        <Box
          sx={{
            width: '100%',
            display: { xs: 'grid', sm: 'flex', lg: 'flex' },
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          mb={4}
        >
          <LeaveTypeModal
            editLeaveTypeId={editLeaveTypeId}
            leaveTypeData={leaveTypeData}
            open={open}
            setOpen={setOpen}
            scroll={scroll}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            addLeaveType={addLeaveType}
            editLeaveType={editLeaveType}
          />
          <TextField
            sx={{ mt: { xs: 3, sm: 0, lg: 0 }, ...styles.inputLabel, ...styles.inputField }}
            label='Search Leave Type'
            variant='filled'
            size='small'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>

        <LeaveTypeTable
          searchQuery={searchQuery}
          leaveTypeData={leaveTypeData}
          loading={loading}
          handleEdit={handleEdit}
          handleDeleteLeaveType={handleDeleteLeaveType}
          updateLeaveTypeStatus={updateLeaveTypeStatus}
        />
      </Card>
    </>
  )
}

export default LeaveType
