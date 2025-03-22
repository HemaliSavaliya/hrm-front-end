import {
  Box,
  Button,
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
} from '@mui/material';
import React, { useState } from 'react';
import { PencilOutline } from 'mdi-material-ui';
import { getComparator, stableSort } from 'src/common/CommonLogic';
import { EnhancedTableHead } from 'src/common/EnhancedTableHead';
import { EmployeeCells } from 'src/TableHeader/TableHeader';
import { Delete03Icon } from 'hugeicons-react';

const EmployeeTable = ({
  searchQuery,
  employeeData,
  loading,
  handleEdit,
  handleDeleteEmployee,
  handleButtonClick,
  loadingStates
}) => {
  // for table sorting and pagination
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('name'); // Default sorting by Role Name
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const theme = useTheme();

  // Filter data based on search query
  const filteredData = employeeData.filter((emp) => {
    return (
      emp.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.designation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department?.includes(searchQuery) ||
      emp.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Handle sort request
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Pagination Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

  const visibleRows = stableSort(filteredData, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: '100%' }}>
      {loading ? (
        <TableContainer sx={{ height: '245px', border: `1px solid ${theme.palette.action.focus}` }}>
          <Table stickyHeader sx={{ minWidth: { xs: 400, sm: 400, lg: 400 } }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              headCells={EmployeeCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {Array.from(new Array(rowsPerPage)).map((_, index) => (
                <TableRow key={index}>
                  {EmployeeCells.map((cell) => (
                    <TableCell key={cell.id}>
                      <Skeleton variant="text" height={25} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : visibleRows.length === 0 ? (
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
          <TableContainer sx={{ height: '245px', border: `1px solid ${theme.palette.action.focus}` }}>
            <Table
              stickyHeader
              sx={{ minWidth: { xs: 2000, sm: 2000, lg: 2000 } }}
              size='small'
              aria-label='a dense table'
            >
              <EnhancedTableHead
                headCells={EmployeeCells}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const loadingIndex = employeeData.findIndex(employee => employee.id === row.id) // Find the index in the employeeData array

                  return (
                    <TableRow key={row.id} sx={{ cursor: 'pointer' }}>
                      <TableCell
                        align='left'
                        sx={{
                          position: 'sticky',
                          left: 0,
                          background: theme.palette.background.paper,
                          zIndex: 1
                        }}
                      >
                        <Tooltip title='Edit Employee'>
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
                        <Tooltip title='Delete Employee'>
                          <Button
                            onClick={() => handleDeleteEmployee(row.id)}
                            sx={{ minWidth: '32px' }}
                          >
                            <Delete03Icon size={20} color='rgb(211, 47, 47)' />
                          </Button>
                        </Tooltip>
                      </TableCell>
                      <TableCell align='left'>{index + 1 + page * rowsPerPage}</TableCell>
                      {/* <TableCell align='left'>{row.id}</TableCell> */}
                      <TableCell align='left'>{row.name}</TableCell>
                      <TableCell align='left'>{row.designation}</TableCell>
                      <TableCell align='left'>{row.department}</TableCell>
                      <TableCell align='left'>{row.email}</TableCell>
                      {/* <TableCell align='left'>{row.address}</TableCell> */}
                      <TableCell align='left'>{row.mobileNo}</TableCell>
                      {/* <TableCell align='left'>{row.alternateNumber || '-'}</TableCell> */}
                      <TableCell align='left'>{row.birthDate}</TableCell>
                      <TableCell align='left'>{row.joiningDate}</TableCell>
                      {/* <TableCell align='left'>{row.bloodGroup}</TableCell> */}
                      <TableCell align='left'>{row.role}</TableCell>
                      <TableCell align='left'>{row.salary}</TableCell>
                      {/* <TableCell align='left'>{row.bankAccountHolderName}</TableCell>
                        <TableCell align='left'>{row.bankAccountNumber}</TableCell>
                        <TableCell align='left'>{row.bankName}</TableCell>
                        <TableCell align='left'>{row.bankIFSCCode}</TableCell>
                        <TableCell align='left'>{row.bankBranchLocation}</TableCell> */}
                      <TableCell align='left'>
                        {loadingStates[loadingIndex] ? ( // Use the correct loading state based on the index in the data array
                          'Loading...'
                        ) : row.governmentDocument?.length === 0 ? (
                          <span>No documents available</span>
                        ) : (
                          row.governmentDocument?.map((document, index) => (
                            <React.Fragment key={index}>
                              <Button
                                sx={{
                                  mt: 1,
                                  mb: 1,
                                  mr: 2,
                                  fontSize: 14,
                                  textTransform: 'none !important',
                                  borderRadius: 0
                                }}
                                variant='outlined'
                                size='small'
                                onClick={() => handleButtonClick(document, row.id, loadingIndex)} // Pass the correct loading index
                              >
                                {document}
                              </Button>
                              {index % 2 === 1 && <br />}
                            </React.Fragment>
                          ))
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={EmployeeCells.length} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length} // Update count based on filtered data
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Box>
  );
};

export default EmployeeTable;
