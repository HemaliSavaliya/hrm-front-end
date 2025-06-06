import React, { useEffect, useState } from 'react'
import { Card, Box, TextField, useTheme } from '@mui/material'
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
    totalItems,
    page,
    rowsPerPage,
    search,
    fetchDepartment,
    setPage,
    setRowsPerPage,
    setSearch,
    setSortBy,
    setSortOrder
  } = useDepartmentData()
  const theme = useTheme()
  const styles = formStyles(theme)
  const [debounceTimeout, setDebounceTimeout] = useState(null)

  const handleInputChange = event => {
    const value = event.target.value
    setSearch(value)

    // Clear the previous timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout)
    }

    // Set a new timeout
    setDebounceTimeout(
      setTimeout(() => {
        fetchDepartment(value) // Call fetchDepartment after a delay
      }, 300)
    ) // 300 milliseconds delay
  }

  useEffect(() => {
    if (search === '') {
      fetchDepartment() // Fetch original data when search box is cleared
    }
  }, [search])

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
            value={search}
            onChange={handleInputChange} // Update the input value as the user types
            // onKeyDown={handleSearchChange} // Trigger the search when Enter is pressed
          />
        </Box>

        <DepartmentTable
          totalItems={totalItems}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          setSortBy={setSortBy}
          setSortOrder={setSortOrder}
          departmentData={departmentData}
          loading={loading}
          updateDepartmentStatus={updateDepartmentStatus}
          handleEdit={handleEdit}
        />
      </Card>
    </>
  )
}

export default Department
