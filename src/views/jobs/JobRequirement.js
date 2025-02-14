import React from 'react'
import {
  Card,
  Box,
  TextField,
  useTheme
} from '@mui/material'
import useJobData from 'src/hooks/useJobData'
import JobModal from 'src/components/JobModal/JobModal'
import { Toaster } from 'react-hot-toast'
import ConfirmationModal from 'src/common/ConfirmationModal'
import JobTable from './JobTable'
import { formStyles } from 'src/Styles'

const JobRequirement = () => {
  const {
    jobData,
    editJobId,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    handleEdit,
    addJobs,
    editJobs,
    deleteModalOpen,
    setDeleteModalOpen,
    confirmDeleteJobs,
    handleDeleteJobs,
    loading,
    searchQuery,
    handleSearchChange
  } = useJobData()
  const theme = useTheme()
  const styles = formStyles(theme);

  return (
    <>
      <Toaster />

      <ConfirmationModal
        open={deleteModalOpen}
        onConfirm={confirmDeleteJobs}
        onClose={() => setDeleteModalOpen(false)}
        title='Delete Job'
        content='Are you sure you want to delete this job?'
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
          <JobModal
            editJobId={editJobId}
            jobData={jobData}
            open={open}
            setOpen={setOpen}
            scroll={scroll}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            addJobs={addJobs}
            editJobs={editJobs}
          />
          <TextField
            sx={{ mt: { xs: 3, sm: 0, lg: 0 }, ...styles.inputLabel, ...styles.inputField }}
            label='Search Job'
            variant='filled'
            size='small'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>

        <JobTable searchQuery={searchQuery} jobData={jobData} loading={loading} handleEdit={handleEdit} handleDeleteJobs={handleDeleteJobs} />
      </Card>
    </>
  )
}

export default JobRequirement
