import React from 'react'
import {
  Card,
  Box,
  TextField,
  useTheme
} from '@mui/material'
import AwardsModal from 'src/components/AwardsModal/AwardsModal'
import useAwardsData from 'src/hooks/useAwardsData'
import { Toaster } from 'react-hot-toast'
import ConfirmationModal from 'src/common/ConfirmationModal'
import AwardsTable from 'src/views/awards/AwardsTable'
import { formStyles } from 'src/Styles'

const Awards = () => {
  const {
    loading,
    awardsData,
    editAwardId,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    handleEdit,
    addAwards,
    editAwards,
    deleteModalOpen,
    setDeleteModalOpen,
    confirmDeleteAward,
    handleDeleteAward,
    searchQuery,
    handleSearchChange
  } = useAwardsData()
  const theme = useTheme()
  const styles = formStyles(theme);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh'
        }}
      >
        <img src='/images/loader.svg' alt='loader' />
      </div>
    )
  }

  return (
    <>
      <Toaster />

      <ConfirmationModal
        open={deleteModalOpen}
        onConfirm={confirmDeleteAward}
        onClose={() => setDeleteModalOpen(false)}
        title='Delete Award'
        content='Are you sure you want to delete this award?'
      />

      <Card sx={{ p: 5, boxShadow: '0px 9px 20px rgba(46, 35, 94, 0.07)' }}>
        <Box
          sx={{
            width: '100%',
            display: { xs: 'grid', sm: 'flex', lg: 'flex' },
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          mb={4}
        >
          <AwardsModal
            editAwardId={editAwardId}
            awardsData={awardsData}
            open={open}
            setOpen={setOpen}
            scroll={scroll}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            addAwards={addAwards}
            editAwards={editAwards}
          />
          <TextField
            sx={{ mt: { xs: 3, sm: 0, lg: 0 }, ...styles.inputLabel, ...styles.inputField }}
            label='Search Awards'
            variant='filled'
            size='small'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>

        <AwardsTable
          searchQuery={searchQuery}
          awardsData={awardsData}
          loading={loading}
          handleEdit={handleEdit}
          handleDeleteAward={handleDeleteAward}
        />
      </Card>
    </>
  )
}

export default Awards
