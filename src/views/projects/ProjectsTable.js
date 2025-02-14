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
} from '@mui/material';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DeleteOutline, PencilOutline } from 'mdi-material-ui';
import { getComparator, stableSort } from 'src/common/CommonLogic';
import { EnhancedTableHead } from 'src/common/EnhancedTableHead';
import { projectCells } from 'src/TableHeader/TableHeader';
import { Delete03Icon } from 'hugeicons-react';

const statusObj = {
  Completed: 'success',
  Inprogress: 'warning',
  Upcoming: 'info'
};

const ProjectsTable = ({
  searchQuery,
  projectData,
  loading,
  handleEdit,
  handleDeleteProject,
  handleButtonClick,
  // updateProjectStatus
}) => {
  // for table sorting and pagination
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('projectName'); // Default sorting by Role Name
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const theme = useTheme();

  // For fetch login detail wise role
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const role = authToken?.role

  // Filter data based on search query
  const filteredData = projectData.filter((project) => {
    return (
      project.projectName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.clientEmail?.toLowerCase().includes(searchQuery.toLowerCase())
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

  // Further filter data based on the role and ID condition
  const roleBasedData =
    role === 'Admin'
      ? filteredData // Admin sees all filtered projects
      : role === role && authToken?.id === ''
        ? filteredData.filter((project) => ['Upcoming', 'Inprogress'].includes(project.status)) // Employee with no ID sees all upcoming and in-progress projects
        : filteredData.filter(
          (project) =>
            project.userId.includes(authToken?.id) &&
            ['Upcoming', 'Inprogress'].includes(project.status)
        ); // Employee with ID sees only their upcoming and in-progress projects

  const visibleRows = stableSort(roleBasedData, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - visibleRows.length) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exist={{ opacity: 0, y: 15 }}
      transition={{ delay: 0.25 }}
    >
      <Box sx={{ width: '100%' }}>
        {loading ? (
          <TableContainer sx={{ height: '245px', border: `1px solid ${theme.palette.action.focus}` }}>
            <Table stickyHeader sx={{ minWidth: { xs: 800, sm: 800, lg: 800 } }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                headCells={projectCells}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {Array.from(new Array(rowsPerPage)).map((_, index) => (
                  <TableRow key={index}>
                    {projectCells.map((cell) => (
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
                sx={{ minWidth: { xs: 1900, sm: 1900, lg: 1900 } }}
                size='small'
                aria-label='a dense table'
              >
                <EnhancedTableHead
                  headCells={projectCells}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {
                    visibleRows.map((row, index) => {
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
                            {role === 'Admin' && (
                              <>
                                <Tooltip title='Edit Project'>
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
                                <Tooltip title='Delete Project'>
                                  <Button
                                    onClick={() => handleDeleteProject(row.id)}
                                    sx={{ minWidth: '32px' }}
                                  >
                                    <Delete03Icon size={20} color='rgb(211, 47, 47)' />
                                  </Button>
                                </Tooltip>
                              </>
                            )}
                          </TableCell>
                          <TableCell align='left'>{index + 1 + page * rowsPerPage}</TableCell>
                          <TableCell align='left'>{row.projectName}</TableCell>
                          <TableCell align='left'>{row.clientName}</TableCell>
                          <TableCell align='left'>{row.clientEmail}</TableCell>
                          <TableCell align='left'>{row.startDate}</TableCell>
                          <TableCell align='left'>{row.endDate || '-'}</TableCell>
                          <TableCell align='left'>
                            <Chip
                              label={row.status}
                              color={statusObj[row.status]}
                              // onClick={() => handleStatusToggle(row.id, row.status)}
                              sx={{
                                height: 24,
                                fontSize: '0.75rem',
                                textTransform: 'capitalize',
                                '& .MuiChip-label': { fontWeight: 500 }
                              }}
                            />
                          </TableCell>
                          <TableCell align='left'>{row.teamMembers.length}</TableCell>
                          <TableCell align='left'>
                            {row.document?.length === 0 ? (
                              <span>No documents available</span>
                            ) : (
                              row.document?.map((document, index) => (
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
                                    onClick={() => handleButtonClick(document, row.id)}  // Pass the correct loading index
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
                    })
                  }

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={projectCells.length} />
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
    </motion.div>
  );
};

export default ProjectsTable;
