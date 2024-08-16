import {
  Box,
  Card,
  Chip,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { visuallyHidden } from '@mui/utils'
import useDesignationData from 'src/hooks/useDesignationData'
import DesignationModal from 'src/components/DesignationModal/DesignationModal'
import { Toaster } from 'react-hot-toast'

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
  { id: 'name', label: 'Designation Name' },
  { id: 'start', label: 'Starting Date' },
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
  Active: 'success',
  Inactive: 'error'
}

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
    updateDesignationStatus
  } = useDesignationData()

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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - designationData.length) : 0

  const visibleRows = stableSort(designationData, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  // For toggle status
  const handleStatusToggle = (id, currentStatus) => {
    // Assume you have a function to update the status in your data
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active'
    updateDesignationStatus(id, newStatus)
  }

  return (
    <>
      <Toaster />

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
                <TableContainer sx={{ height: '330px' }}>
                  <Table stickyHeader sx={{ minWidth: 900 }} aria-labelledby='tableTitle'>
                    <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                    <TableBody>
                      {visibleRows.map((row, index) => {
                        return (
                          <TableRow hover role='checkbox' tabIndex={-1} key={row.id} sx={{ cursor: 'pointer' }}>
                            <TableCell align='left'>{index + 1 + page * rowsPerPage}</TableCell>
                            <TableCell align='left'>{row.designationName}</TableCell>
                            <TableCell align='left'>{row.startingDate}</TableCell>
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
                  count={designationData.length}
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

export default Designation
