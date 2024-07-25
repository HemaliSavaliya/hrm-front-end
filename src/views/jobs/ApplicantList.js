import React, { useEffect, useState } from 'react';
import { Card, Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import DeleteOutline from 'mdi-material-ui/DeleteOutline';
import PencilOutline from 'mdi-material-ui/PencilOutline';
import { visuallyHidden } from '@mui/utils';
import { motion } from "framer-motion";
import axios from 'axios';

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
  { id: 'no', label: 'No' },
  { id: 'name', label: 'Applicant Name' },
  { id: 'email', label: 'Applicant Email' },
  { id: 'title', label: 'Job Title' },
  { id: 'phone', label: 'Phone Number' },
  { id: 'cv', label: 'CV' },
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

const ApplicantList = () => {
  // for table 
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [applicant, setApplicant] = useState([]);

  // Fetch data
  const fetchTimer = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/applicant-list");

      setApplicant(response.data);
    } catch (error) {
      console.error("Error fetching Role Wise Attendance", error);
    }
  }

  useEffect(() => {
    fetchTimer();
  }, []);

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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - applicant.length) : 0;

  const visibleRows = stableSort(applicant, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
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
              <TableContainer sx={{ height: "380px" }}>
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
                          <TableCell align="left">{index + 1 + page * rowsPerPage}</TableCell>
                          <TableCell align="left">{row.applicantName}</TableCell>
                          <TableCell align="left">{row.applicantEmail}</TableCell>
                          <TableCell align="left">{row.jobTitle}</TableCell>
                          <TableCell align="left">{row.phoneNumber}</TableCell>
                          <TableCell align="left">{row.cv || "-"}</TableCell>
                          {/* <TableCell align="center">
                        <PencilOutline onClick={() => handleEditButtonClick(row.id)} />
                        <DeleteOutline onClick={() => deleteEmployee(row.id)} />
                      </TableCell> */}
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
                count={applicant.length}
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

export default ApplicantList;