import React, { useEffect, useState } from 'react'
import {
  Card,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
  Skeleton,
  useTheme
} from '@mui/material'
import { motion } from 'framer-motion'
import axios from 'axios'
import { getComparator, stableSort } from 'src/common/CommonLogic'
import { EnhancedTableHead } from 'src/common/EnhancedTableHead'
import { leaveBalanceCells } from 'src/TableHeader/TableHeader'

const LeaveBalance = () => {
  // for table
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [leaveBal, setLeaveBal] = useState([])
  const [loading, setLoading] = useState(true)
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const theme = useTheme()

  useEffect(() => {
    const fetchLeaveBalance = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`http://localhost:9000/api/leaveBalance`, {
          headers: {
            Authorization: `Bearer ${authToken?.token}`
          }
        })

        setLeaveBal(response.data)
      } catch (error) {
        console.error('Error fetching Role Wise Attendance', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaveBalance()
  }, [authToken?.token])

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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - leaveBal.length) : 0

  const visibleRows = stableSort(leaveBal, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <Card sx={{ mt: 4, p: 5, boxShadow: '0px 9px 20px rgba(46, 35, 94, 0.07)' }}>
      <Box sx={{ width: '100%' }}>
        {loading ? (
          <TableContainer sx={{ height: '235px', border: `1px solid ${theme.palette.action.focus}` }}>
            <Table stickyHeader sx={{ minWidth: { xs: 800, sm: 800, lg: 800 } }} aria-labelledby='tableTitle'>
              <EnhancedTableHead
                headCells={leaveBalanceCells}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {Array.from(new Array(rowsPerPage)).map((_, index) => (
                  <TableRow key={index}>
                    {leaveBalanceCells.map(cell => (
                      <TableCell key={cell.id}>
                        <Skeleton variant='text' height={25} />
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
            <TableContainer sx={{ height: '235px', border: `1px solid ${theme.palette.action.focus}` }}>
              <Table
                stickyHeader
                sx={{ minWidth: { xs: 900, sm: 900, lg: 900 } }}
                size='small'
                aria-label='a dense table'
              >
                <EnhancedTableHead
                  headCells={leaveBalanceCells}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {visibleRows.map((row, index) => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={index} sx={{ cursor: 'pointer' }}>
                        {/* <TableCell align="left">{row.emp_name}</TableCell> */}
                        <TableCell align='left'>{row.leaveName}</TableCell>
                        <TableCell align='left'>{row.leaveBalance}</TableCell>
                        <TableCell align='left'>{row.totalUtilized}</TableCell>
                        <TableCell align='left'>{row.totalBalanced}</TableCell>
                        <TableCell align='left'>{row.totalCarriedForward}</TableCell>
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
              count={leaveBal.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Box>
    </Card>
  )
}

export default LeaveBalance
