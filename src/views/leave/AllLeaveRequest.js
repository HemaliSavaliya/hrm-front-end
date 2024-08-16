import React, { useState } from 'react'
import {
  Card,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Button,
  Typography,
  Skeleton
} from '@mui/material'
import PropTypes from 'prop-types'
import { visuallyHidden } from '@mui/utils'
import useAllLeaveReqData from 'src/hooks/useAllLeaveReqData'
import { motion } from 'framer-motion'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }

    return a[1] - b[1]
  })

  return stabilizedThis.map(el => el[0])
}

const headCells = [
  { id: 'no', label: 'No' },
  { id: 'name', label: 'Employee Name' },
  { id: 'date', label: 'Applying Date' },
  { id: 'type', label: 'Leave Type' },
  { id: 'start', label: 'Start Date' },
  { id: 'end', label: 'End Date' },
  { id: 'day', label: 'Days' },
  { id: 'description', label: 'Description' },
  { id: 'status', label: 'status' }
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

const LeaveRequest = () => {
  const { leaveReqData, updateLeaveRequestStatus, loading } = useAllLeaveReqData()

  // for table
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - leaveReqData.length) : 0

  const visibleRows = stableSort(leaveReqData, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  // Change approved or reject button
  const handleApprove = id => {
    // Assuming updateLeaveRequestStatus takes an ID and a status
    updateLeaveRequestStatus(id, 'Approved')
  }

  const handleReject = id => {
    // Assuming updateLeaveRequestStatus takes an ID and a status
    updateLeaveRequestStatus(id, 'Rejected')
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exist={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        <Card sx={{ mt: 3 }}>
          <Box sx={{ width: '100%' }}>
            {loading ? (
              <TableContainer sx={{ height: '380px' }}>
                <Table stickyHeader sx={{ minWidth: 1500 }} aria-labelledby='tableTitle'>
                  <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                  <TableBody>
                    {Array.from(new Array(rowsPerPage)).map((_, index) => (
                      <TableRow key={index}>
                        {headCells.map(cell => (
                          <TableCell key={cell.id}>
                            <Skeleton variant='text' />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : visibleRows && visibleRows.length === 0 ? (
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
                <TableContainer sx={{ height: '380px' }}>
                  <Table stickyHeader sx={{ minWidth: 1500 }} aria-labelledby='tableTitle'>
                    <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                    <TableBody>
                      {visibleRows.map((row, index) => {
                        return (
                          <TableRow hover role='checkbox' tabIndex={-1} key={row.id} sx={{ cursor: 'pointer' }}>
                            <TableCell align='left'>{index + 1 + page * rowsPerPage}</TableCell>
                            <TableCell align='left'>{row.userName}</TableCell>
                            <TableCell align='left'>{row.applyingDate}</TableCell>
                            <TableCell align='left'>{row.leaveName}</TableCell>
                            <TableCell align='left'>{row.startDate}</TableCell>
                            <TableCell align='left'>{row.endDate || '-'}</TableCell>
                            <TableCell align='left'>{row.leaveType}</TableCell>
                            <TableCell align='left'>{row.description}</TableCell>
                            <TableCell align='left'>
                              {(row.status === 'Pending' || !row.status) && (
                                <>
                                  <Button
                                    size='small'
                                    variant='contained'
                                    color='success'
                                    sx={{ color: '#FFF !important', mr: 3 }}
                                    onClick={() => handleApprove(row.id)}
                                  >
                                    Approved
                                  </Button>
                                  <Button
                                    size='small'
                                    variant='contained'
                                    color='error'
                                    sx={{ color: '#FFF !important' }}
                                    onClick={() => handleReject(row.id)}
                                  >
                                    Rejected
                                  </Button>
                                </>
                              )}
                              {row.status === 'Approved' && (
                                <Button
                                  size='small'
                                  variant='contained'
                                  color='success'
                                  sx={{ color: '#FFF !important' }}
                                >
                                  Approved
                                </Button>
                              )}
                              {row.status === 'Rejected' && (
                                <Button
                                  size='small'
                                  variant='contained'
                                  color='error'
                                  sx={{ color: '#FFF !important' }}
                                  disabled
                                >
                                  Rejected
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        )
                      })}

                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={headCells.length} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component='div'
                  count={leaveReqData.length}
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

export default LeaveRequest
