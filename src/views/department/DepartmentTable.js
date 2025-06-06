import {
  Box,
  Button,
  Chip,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material'
import React, { useState } from 'react'
import { PencilOutline } from 'mdi-material-ui'
import { getComparator, stableSort } from 'src/common/CommonLogic'
import { EnhancedTableHead } from 'src/common/EnhancedTableHead'
import { departmentCells } from 'src/TableHeader/TableHeader'

const statusObj = {
  Active: 'success',
  Inactive: 'error'
}

const DepartmentTable = ({
  loading,
  departmentData,
  updateDepartmentStatus,
  handleEdit,
  totalItems,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  setSortBy,
  setSortOrder
}) => {
  const theme = useTheme()

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

  // Pagination Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // For toggle status
  const handleStatusToggle = (id, currentStatus) => {
    // Assume you have a function to update the status in your data
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active'
    updateDepartmentStatus(id, newStatus)
  }

  return (
    <Box sx={{ width: '100%' }}>
      {loading ? (
        <TableContainer sx={{ height: '180px', border: `1px solid ${theme.palette.action.focus}` }}>
          <Table stickyHeader sx={{ minWidth: { xs: 1500, sm: 1500, lg: 1500 } }} aria-labelledby='tableTitle'>
            <EnhancedTableHead
              headCells={departmentCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {Array.from(new Array(rowsPerPage)).map((_, index) => (
                <TableRow key={index}>
                  {departmentCells.map(cell => (
                    <TableCell key={cell.id}>
                      <Skeleton variant='text' height={25} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : departmentData && departmentData.length === 0 ? (
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
          <TableContainer sx={{ height: '180px', border: `1px solid ${theme.palette.action.focus}` }}>
            <Table
              stickyHeader
              sx={{ minWidth: { xs: 1300, sm: 1300, lg: 1300 } }}
              size='small'
              aria-label='a dense table'
            >
              <EnhancedTableHead
                headCells={departmentCells}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {departmentData &&
                  departmentData?.map((row, index) => {
                    return (
                      <TableRow key={row.id} sx={{ cursor: 'pointer' }}>
                        <TableCell
                          align='left'
                          sx={{
                            position: 'sticky',
                            background: theme.palette.background.paper,
                            left: 0,
                            zIndex: 1
                          }}
                        >
                          <Tooltip title='Edit Department'>
                            <Button
                              onClick={() => handleEdit(row.id)}
                              sx={{
                                height: '32px',
                                margin: '0 3px',
                                minWidth: '32px',
                                width: '32px'
                              }}
                            >
                              <PencilOutline sx={{ fontSize: '20px', color: '#7366FF' }} />
                            </Button>
                          </Tooltip>
                        </TableCell>
                        <TableCell align='left'>{index + 1 + page * rowsPerPage}</TableCell>
                        <TableCell align='left'>{row.departmentName}</TableCell>
                        <TableCell align='left'>{row.departmentHead}</TableCell>
                        <TableCell align='left'>{row.departmentEmail}</TableCell>
                        <TableCell align='left'>{row.startingDate}</TableCell>
                        <TableCell align='left'>{row.teamMembers?.length || '-'}</TableCell>
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
  )
}

export default DepartmentTable
