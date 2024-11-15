import {
  Box,
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { visuallyHidden } from '@mui/utils'
import useRoleData from 'src/hooks/useRoleData'
import { Toaster } from 'react-hot-toast'
import RoleModal from 'src/components/RoleModal/RoleModal'

const headCells = [
  { id: 'no', label: 'No' },
  { id: 'roleName', label: 'Role Name' },
  { id: 'date', label: 'Date' },
  { id: 'status', label: 'Status' }
]

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props

  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align='left'
            padding='normal'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired
}

const statusObj = {
  Enable: 'success',
  Disable: 'error'
}

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

  // for table sorting
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    const newOrder = isAsc ? 'desc' : 'asc'
    setOrder(newOrder)
    setOrderBy(property)
    setSortBy(property) // Set the sortBy state for the backend
    setSortOrder(newOrder) // Set the sortOrder state for the backend
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSearchChange = event => {
    if (event.key === 'Enter') {
      fetchRole() // Trigger the search when Enter is pressed
    }
  }

  const handleInputChange = event => {
    const value = event.target.value
    setSearch(value)

    if (value === '') {
      fetchRole() // Fetch original data when search box is cleared
    }
  }

  // For toggle status
  const handleStatusToggle = (id, currentStatus) => {
    const newStatus = currentStatus === 'Enable' ? 'Disable' : 'Enable'
    updateRoleStatus(id, newStatus)
  }

  // if (loading) {
  //   return (
  //     <div
  //       style={{
  //         display: 'flex',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         height: '80vh'
  //       }}
  //     >
  //       <img src='/images/loader.svg' alt='loader' />
  //     </div>
  //   )
  // }

  return (
    <>
      <Toaster />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exist={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        <Card>
          <Box sx={{ width: '100%', padding: '20px' }}>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={4}>
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
                label='Search Roles'
                variant='outlined'
                size='small'
                value={search}
                onChange={handleInputChange} // Update the input value as the user types
                onKeyDown={handleSearchChange} // Trigger the search when Enter is pressed
              />
            </Box>
            {roleData && roleData.length === 0 ? (
              <Typography
                textTransform={'uppercase'}
                letterSpacing={1}
                fontSize={15}
                my={6}
                textAlign={'center'}
                fontWeight={600}
              >
                No Data Available Yet!
              </Typography>
            ) : (
              <>
                <TableContainer sx={{ height: '330px' }}>
                  <Table stickyHeader sx={{ minWidth: 600 }} aria-labelledby='tableTitle'>
                    <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                    <TableBody>
                      {roleData.map((row, index) => {
                        return (
                          <TableRow hover role='checkbox' tabIndex={-1} key={row.id} sx={{ cursor: 'pointer' }}>
                            <TableCell align='left'>{index + 1 + page * rowsPerPage}</TableCell>
                            <TableCell align='left'>{row.roleName}</TableCell>
                            <TableCell align='left'>{row.date}</TableCell>
                            <TableCell align='left'>
                              <Chip
                                label={row.status}
                                color={statusObj[row.status]}
                                onClick={() => handleStatusToggle(row.id, row.status)}
                                sx={{
                                  height: 24,
                                  fontSize: '0.75rem',
                                  textTransform: 'capitalize',
                                  '& .MuiChip-label': { fontWeight: 500 }
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component='div'
                  count={totalItems}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            )}
          </Box>
        </Card>
      </motion.div>
    </>
  )
}

export default Role
