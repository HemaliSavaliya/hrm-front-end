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
  Typography,
  Skeleton,
  useTheme
} from '@mui/material'
import PropTypes from 'prop-types'
import { visuallyHidden } from '@mui/utils'
import { motion } from 'framer-motion'
import { useTimer } from 'src/@core/context/TimerContext'
import { getComparator, stableSort } from 'src/common/CommonLogic'
import { EnhancedTableHead } from 'src/common/EnhancedTableHead'
import { trackerCells } from 'src/TableHeader/TableHeader'

const AttendanceTable = () => {
  const { role, savedProjects, loading } = useTimer()
  const theme = useTheme()

  // for table
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const ipAddress = typeof window !== 'undefined' ? localStorage.getItem('userIP') : null

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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - savedProjects.length) : 0

  const visibleRows = stableSort(savedProjects, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  const HRData = visibleRows.filter(item => item.role === 'HR')
  const EmpData = visibleRows.filter(item => item.role === 'Employee')

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exist={{ opacity: 0, y: 15 }}
      transition={{ delay: 0.25 }}
    >
      <Card sx={{ mt: 5 }}>
        <Box sx={{ width: '100%' }}>
          {loading ? (
            <TableContainer sx={{ height: '200px', border: `1px solid ${theme.palette.action.focus}` }}>
              <Table stickyHeader sx={{ minWidth: 1500 }} aria-labelledby='tableTitle'>
                <EnhancedTableHead
                  headCells={trackerCells}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {Array.from(new Array(rowsPerPage)).map((_, index) => (
                    <TableRow key={index}>
                      {trackerCells.map(cell => (
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
              <TableContainer sx={{ height: '150px', border: `1px solid ${theme.palette.action.focus}` }}>
                <Table
                  stickyHeader
                  sx={{ minWidth: { xs: 1500, sm: 1500, lg: 1500 } }}
                  size='small'
                  aria-label='a dense table'
                >
                  <EnhancedTableHead
                    headCells={trackerCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {role === 'HR' &&
                      HRData &&
                      HRData.map((row, index) => {
                        return (
                          <TableRow hover role='checkbox' tabIndex={-1} key={row.id} sx={{ cursor: 'pointer' }}>
                            <TableCell align='left'>{index + 1 + page * rowsPerPage}</TableCell>
                            <TableCell align='left'>{ipAddress}</TableCell>
                            <TableCell align='left'>{row.date}</TableCell>
                            <TableCell align='left'>{row.description || '-'}</TableCell>
                            <TableCell align='left'>{row.startTime}</TableCell>
                            <TableCell align='left'>{row.resumeTime || '-'}</TableCell>
                            <TableCell align='left'>{row.pauseTime || '-'}</TableCell>
                            <TableCell align='left'>{row.stopTime}</TableCell>
                            <TableCell align='left'>{row.hours} hours</TableCell>
                            <TableCell align='left'>{row.minutes} minutes</TableCell>
                            <TableCell align='left'>{row.seconds} seconds</TableCell>
                          </TableRow>
                        )
                      })}

                    {role === 'Employee' &&
                      EmpData &&
                      EmpData.map((row, index) => {
                        return (
                          <TableRow hover role='checkbox' tabIndex={-1} key={row.id} sx={{ cursor: 'pointer' }}>
                            <TableCell align='left'>{index + 1 + page * rowsPerPage}</TableCell>
                            <TableCell align='left'>{ipAddress}</TableCell>
                            <TableCell align='left'>{row.date}</TableCell>
                            <TableCell align='left'>{row.description || '-'}</TableCell>
                            <TableCell align='left'>{row.startTime}</TableCell>
                            <TableCell align='left'>{row.resumeTime || '-'}</TableCell>
                            <TableCell align='left'>{row.pauseTime || '-'}</TableCell>
                            <TableCell align='left'>{row.stopTime}</TableCell>
                            <TableCell align='left'>{row.hours} hours</TableCell>
                            <TableCell align='left'>{row.minutes} minutes</TableCell>
                            <TableCell align='left'>{row.seconds} seconds</TableCell>
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
                count={savedProjects.length}
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
  )
}

export default AttendanceTable
