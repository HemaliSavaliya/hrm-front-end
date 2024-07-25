import React, { useState } from 'react';
import { Card, Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Chip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import DeleteOutline from 'mdi-material-ui/DeleteOutline';
import PencilOutline from 'mdi-material-ui/PencilOutline';
import { visuallyHidden } from '@mui/utils';
import useLeaveTypeData from 'src/hooks/useLeaveTypeData';
import LeaveTypeModal from 'src/components/LeaveType/LeaveTypeModal';
import { motion } from "framer-motion";
import { Toaster } from 'react-hot-toast';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'action', label: 'Action' },
  { id: 'no', label: 'No' },
  { id: 'name', label: 'Leave Type Name' },
  { id: 'balance', label: 'Leave Type Balance' },
  { id: 'status', label: 'Status' },
  { id: 'date', label: 'Leave Type Adding Date' },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            padding='normal'
            sortDirection={orderBy === headCell.id ? order : false}
            sx={headCell.id === "action" ?
              {
                position: "sticky",
                left: 0,
                zIndex: 6
              }
              : null
            }
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const statusObj = {
  Active: 'success',
  Inactive: "error"
}

const LeaveType = () => {
  const { leaveTypeData, editLeaveTypeId, open, setOpen, scroll, handleClickOpen, handleClose, handleEdit, deleteLeaveType, addLeaveType, editLeaveType, updateLeaveTypeStatus } = useLeaveTypeData();

  // for table 
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - leaveTypeData.length) : 0;

  const visibleRows = stableSort(leaveTypeData, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // For toggle status
  const handleStatusToggle = (id, currentStatus) => {
    // Assume you have a function to update the status in your data
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    updateLeaveTypeStatus(id, newStatus);
  };

  return (
    <>
      <Toaster />

      <LeaveTypeModal editLeaveTypeId={editLeaveTypeId} leaveTypeData={leaveTypeData} open={open} setOpen={setOpen} scroll={scroll} handleClickOpen={handleClickOpen} handleClose={handleClose} addLeaveType={addLeaveType} editLeaveType={editLeaveType} />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exist={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        <Card sx={{ mt: 3 }}>
          <Box sx={{ width: '100%' }}>
            {visibleRows && visibleRows.length === 0 ? (
              <Typography textTransform={"uppercase"} letterSpacing={1} fontSize={15} my={6} textAlign={"center"} fontWeight={600}>No Data Available Yet!</Typography>
            ) : (
              <>
                <TableContainer sx={{ height: "330px" }}>
                  <Table
                    stickyHeader
                    sx={{ minWidth: 1000 }}
                    aria-labelledby="tableTitle"
                  >
                    <EnhancedTableHead
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                      {visibleRows.map((row, index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.id}
                            sx={{ cursor: 'pointer' }}
                          >
                            <TableCell sx={{
                              position: "sticky",
                              background: "white",
                              left: 0,
                              zIndex: 1
                            }}>
                              <PencilOutline
                                onClick={() => handleEdit(row.id)}
                                sx={{ mr: 2, color: "#9155FD" }}
                              />
                              <DeleteOutline
                                onClick={() => deleteLeaveType(row.id)}
                                sx={{ color: "#9155FD" }}
                              />
                            </TableCell>
                            <TableCell align="left">{index + 1 + page * rowsPerPage}</TableCell>
                            <TableCell align="left">{row.leaveName}</TableCell>
                            <TableCell align="left">{row.leaveBalance}</TableCell>
                            <TableCell align="left">
                              <Chip
                                label={row.leaveStatus}
                                color={statusObj[row.leaveStatus]}
                                onClick={() => handleStatusToggle(row.id, row.leaveStatus)}
                                sx={{
                                  height: 24,
                                  fontSize: '0.75rem',
                                  textTransform: 'capitalize',
                                  '& .MuiChip-label': { fontWeight: 500 }
                                }}
                              />
                            </TableCell>
                            <TableCell align="left">{row.leaveAddingDate}</TableCell>
                          </TableRow>
                        );
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
                  component="div"
                  count={leaveTypeData.length}
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

export default LeaveType;