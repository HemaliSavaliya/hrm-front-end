import {
  Box,
  Card,
  TextField,
  useTheme,
} from '@mui/material'
import React from 'react'
import useRoleData from 'src/hooks/useRoleData'
import { Toaster } from 'react-hot-toast'
import RoleModal from 'src/components/RoleModal/RoleModal'
import RoleTable from 'src/views/role/RoleTable'
import { formStyles } from 'src/Styles'

const Role = () => {
  const {
    loading,
    roleData,
    editRoleId,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    addRole,
    updateRoleStatus,
    totalItems,
    page,
    rowsPerPage,
    search,
    fetchRole,
    setPage,
    setRowsPerPage,
    setSearch,
    setSortBy,
    setSortOrder
  } = useRoleData()
  const theme = useTheme()
  const styles = formStyles(theme);

  const handleInputChange = event => {
    const value = event.target.value
    setSearch(value)

    if (value === '') {
      fetchRole() // Fetch original data when search box is cleared
    }
  }

  const handleSearchChange = event => {
    if (event.key === 'Enter') {
      fetchRole() // Trigger the search when Enter is pressed
    }
  }

  return (
    <>
      <Toaster />

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
          <RoleModal
            editRoleId={editRoleId}
            roleData={roleData}
            open={open}
            setOpen={setOpen}
            scroll={scroll}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            addRole={addRole}
          />
          <TextField
            label='Search Role'
            variant='filled'
            size='small'
            value={search}
            onChange={handleInputChange} // Update the input value as the user types
            onKeyDown={handleSearchChange} // Trigger the search when Enter is pressed
            sx={{ mt: { xs: 3, sm: 0, lg: 0 }, ...styles.inputLabel, ...styles.inputField }}
          />
        </Box>

        <RoleTable
          loading={loading}
          roleData={roleData}
          updateRoleStatus={updateRoleStatus}
          totalItems={totalItems}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          setSortBy={setSortBy}
          setSortOrder={setSortOrder}
        />
      </Card>
    </>
  )
}

export default Role
