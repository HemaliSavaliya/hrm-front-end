import React from 'react'
import {
  Card,
  Box,
  TextField,
  useTheme
} from '@mui/material'
import useDepartmentData from 'src/hooks/useDepartmentData'
import { Toaster } from 'react-hot-toast'
import DepartmentModal from 'src/components/DepartmentModal/DepartmentModal'
import { formStyles } from 'src/Styles'
import DepartmentTable from './DepartmentTable'

const Department = () => {
  const {
    departmentData,
    editDepartId,
    open,
    setOpen,
    scroll,
    handleEdit,
    handleClickOpen,
    handleClose,
    addDepartments,
    editDepartments,
    updateDepartmentStatus,
    loading,
    handleSearchChange,
    searchQuery,
  } = useDepartmentData()
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
          <DepartmentModal
            editDepartId={editDepartId}
            departmentData={departmentData}
            open={open}
            setOpen={setOpen}
            scroll={scroll}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            addDepartments={addDepartments}
            editDepartments={editDepartments}
          />
          <TextField
            sx={{ mt: { xs: 3, sm: 0, lg: 0 }, ...styles.inputLabel, ...styles.inputField }}
            label='Search Department'
            variant='filled'
            size='small'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>

        <DepartmentTable searchQuery={searchQuery} departmentData={departmentData} loading={loading} updateDepartmentStatus={updateDepartmentStatus} handleEdit={handleEdit} />
      </Card>
    </>
  )
}

export default Department
