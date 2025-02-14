import {
    Box,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Typography,
    useTheme
} from '@mui/material';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { EnhancedTableHead } from 'src/common/EnhancedTableHead';
import { leaveReqCells } from 'src/TableHeader/TableHeader';
import { getComparator, stableSort } from 'src/common/CommonLogic';

const LeaveReqTable = ({
    searchQuery,
    leaveReqData,
    loading
}) => {
    // for table sorting and pagination
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('leaveName'); // Default sorting by Role Name
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const theme = useTheme();

    // Filter data based on search query
    const filteredData = leaveReqData.filter((leave) => {
        return (
            leave.leaveName.toLowerCase().includes(searchQuery.toLowerCase())
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

    // Define a function to get the status color based on the status value
    const getStatusStyle = status => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return { color: 'goldenrod', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '12px' }
            case 'approved':
                return { color: 'green', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '12px' }
            case 'rejected':
                return { color: 'red', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '12px' }
            default:
                return { color: 'inherit' } // default style
        }
    }

    return (
        <>
            <Toaster />

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exist={{ opacity: 0, y: 15 }}
                transition={{ delay: 0.25 }}
            >
                <Box sx={{ width: '100%' }}>
                    {loading ? (
                        <TableContainer sx={{ height: '180px', border: `1px solid ${theme.palette.action.focus}` }}>
                            <Table stickyHeader sx={{ minWidth: { xs: 800, sm: 800, lg: 800 } }} aria-labelledby="tableTitle">
                                <EnhancedTableHead
                                    headCells={leaveReqCells}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {Array.from(new Array(rowsPerPage)).map((_, index) => (
                                        <TableRow key={index}>
                                            {leaveReqCells.map((cell) => (
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
                            <TableContainer sx={{ height: '180px', border: `1px solid ${theme.palette.action.focus}` }}>
                                <Table
                                    stickyHeader
                                    sx={{ minWidth: { xs: 1400, sm: 1400, lg: 1400 } }}
                                    size='small'
                                    aria-label='a dense table'
                                >
                                    <EnhancedTableHead
                                        headCells={leaveReqCells}
                                        order={order}
                                        orderBy={orderBy}
                                        onRequestSort={handleRequestSort}
                                    />
                                    <TableBody>
                                        {visibleRows.map((row, index) => (
                                            <TableRow key={row.id} sx={{ cursor: 'pointer' }}>
                                                <TableCell align='left'>{index + 1 + page * rowsPerPage}</TableCell>
                                                <TableCell align='left'>{row.applyingDate}</TableCell>
                                                <TableCell align='left'>{row.leaveName}</TableCell>
                                                <TableCell align='left'>{row.startDate}</TableCell>
                                                <TableCell align='left'>{row.endDate || '-'}</TableCell>
                                                <TableCell align='left'>{row.leaveType}</TableCell>
                                                <TableCell align='left'>{row.description}</TableCell>
                                                <TableCell align='left' style={{ ...getStatusStyle(row.status) }}>
                                                    {row.status}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 53 * emptyRows }}>
                                                <TableCell colSpan={leaveReqCells.length} />
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
        </>
    );
};

export default LeaveReqTable;
