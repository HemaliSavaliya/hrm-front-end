import {
  Box,
  Card,
  TextField,
  useTheme,
} from '@mui/material'
import React from 'react'
import useDesignationData from 'src/hooks/useDesignationData'
import DesignationModal from 'src/components/DesignationModal/DesignationModal'
import { Toaster } from 'react-hot-toast'
import { formStyles } from 'src/Styles'
import DesignationTable from './DesignationTable'

const Designation = () => {
  const {
    loading,
    designationData,
    editDesignationId,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    addDesignation,
    updateDesignationStatus,
    handleSearchChange,
    searchQuery,
  } = useDesignationData()
  const theme = useTheme()
  const styles = formStyles(theme);

  return (
    <>
      <Toaster />

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
          <DesignationModal
            editDesignationId={editDesignationId}
            designationData={designationData}
            open={open}
            setOpen={setOpen}
            scroll={scroll}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            addDesignation={addDesignation}
          />
          <TextField
            sx={{ mt: { xs: 3, sm: 0, lg: 0 }, ...styles.inputLabel, ...styles.inputField }}
            label='Search Designation'
            variant="filled"
            size='small'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>

        <DesignationTable searchQuery={searchQuery} designationData={designationData} loading={loading} updateDesignationStatus={updateDesignationStatus} />
      </Card>
    </>
  )
}

export default Designation
