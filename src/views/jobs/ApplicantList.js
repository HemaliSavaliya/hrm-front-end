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
  TextField,
  useTheme
} from '@mui/material'
import { motion } from 'framer-motion'
import axios from 'axios'
import { formStyles } from 'src/Styles'
import { EnhancedTableHead } from 'src/common/EnhancedTableHead'
import { applicantCells } from 'src/TableHeader/TableHeader'
import { getComparator, stableSort } from 'src/common/CommonLogic'

const ApplicantList = () => {
  // for table
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [applicant, setApplicant] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const theme = useTheme()
  const styles = formStyles(theme);

  // Handle search input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  // Fetch data
  const fetchApplicant = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`http://localhost:9000/api/applicant-list`)

      setApplicant(response.data)
    } catch (error) {
      console.error('Error fetching Role Wise Attendance', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplicant()
  }, [])

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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - applicant.length) : 0

  const visibleRows = stableSort(applicant, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <Card sx={{ mt: 4, p: 5, boxShadow: '0px 9px 20px rgba(46, 35, 94, 0.07)' }}>
      <Box
        sx={{
          width: '100%',
          display: { xs: 'grid', sm: 'flex', lg: 'flex' },
          alignItems: 'center',
          justifyContent: 'end'
        }}
        mb={4}
      >
        <TextField
          sx={{ mt: { xs: 3, sm: 0, lg: 0 }, ...styles.inputLabel, ...styles.inputField }}
          label='Search Applicant'
          variant='filled'
          size='small'
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Box>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exist={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        <Box sx={{ width: '100%' }}>
          {loading ? (
            <TableContainer sx={{ height: '180px', border: `1px solid ${theme.palette.action.focus}` }}>
              <Table stickyHeader sx={{ minWidth: { xs: 1500, sm: 1500, lg: 1500 } }} aria-labelledby='tableTitle'>
                <EnhancedTableHead
                  headCells={applicantCells}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {Array.from(new Array(rowsPerPage)).map((_, index) => (
                    <TableRow key={index}>
                      {applicantCells.map(cell => (
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
              <TableContainer sx={{ height: '180px', border: `1px solid ${theme.palette.action.focus}` }}>
                <Table
                  stickyHeader
                  sx={{ minWidth: { xs: 1000, sm: 1000, lg: 1000 } }}
                  size='small'
                  aria-label='a dense table'
                >
                  <EnhancedTableHead
                    headCells={applicantCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {visibleRows.map((row, index) => {
                      return (
                        <TableRow hover role='checkbox' tabIndex={-1} key={row.id} sx={{ cursor: 'pointer' }}>
                          <TableCell align='left'>{index + 1 + page * rowsPerPage}</TableCell>
                          <TableCell align='left'>{row.applicantName}</TableCell>
                          <TableCell align='left'>{row.applicantEmail}</TableCell>
                          <TableCell align='left'>{row.jobTitle}</TableCell>
                          <TableCell align='left'>{row.phoneNumber}</TableCell>
                          <TableCell align='left'>{row.cv || '-'}</TableCell>
                          {/* <TableCell align="center">
                        <PencilOutline onClick={() => handleEditButtonClick(row.id)} />
                        <DeleteOutline onClick={() => deleteEmployee(row.id)} />
                      </TableCell> */}
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
                count={applicant.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Box>
      </motion.div>
    </Card>
  )
}

export default ApplicantList
