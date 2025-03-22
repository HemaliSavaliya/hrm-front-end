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
import { PencilOutline } from 'mdi-material-ui';
import { EnhancedTableHead } from 'src/common/EnhancedTableHead';
import { leaveTypeCells } from 'src/TableHeader/TableHeader';
import { getComparator, stableSort } from 'src/common/CommonLogic';
import { Delete03Icon } from 'hugeicons-react';

const statusObj = {
    Active: 'success',
    Inactive: 'error'
};

const LeaveTypeTable = ({
    searchQuery,
    leaveTypeData,
    loading,
    handleEdit,
    updateLeaveTypeStatus,
    handleDeleteLeaveType
}) => {
    // for table sorting and pagination
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('leaveName'); // Default sorting by Role Name
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const theme = useTheme();

    // Filter data based on search query
    const filteredData = leaveTypeData.filter((leave) => {
        return (
            leave.leaveName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            leave.leaveStatus?.toLowerCase().includes(searchQuery.toLowerCase())
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

    // For toggle status
    const handleStatusToggle = (id, currentStatus) => {
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
        updateLeaveTypeStatus(id, newStatus);
    };

    return (
        <Box sx={{ width: '100%' }}>
            {loading ? (
                <TableContainer sx={{ height: '180px', border: `1px solid ${theme.palette.action.focus}` }}>
                    <Table stickyHeader sx={{ minWidth: { xs: 800, sm: 800, lg: 800 } }} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            headCells={leaveTypeCells}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {Array.from(new Array(rowsPerPage)).map((_, index) => (
                                <TableRow key={index}>
                                    {leaveTypeCells.map((cell) => (
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
                            sx={{ minWidth: { xs: 1000, sm: 1000, lg: 1000 } }}
                            size='small'
                            aria-label='a dense table'
                        >
                            <EnhancedTableHead
                                headCells={leaveTypeCells}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                                {visibleRows.map((row, index) => (
                                    <TableRow key={row.id} sx={{ cursor: 'pointer' }}>
                                        <TableCell
                                            sx={{
                                                position: 'sticky',
                                                background: theme.palette.background.paper,
                                                left: 0,
                                                zIndex: 1
                                            }}
                                        >
                                            <Tooltip title='Edit Leave Type'>
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
                                            <Tooltip title='Delete Leave Type'>
                                                <Button
                                                    onClick={() => handleDeleteLeaveType(row.id)}
                                                    sx={{ minWidth: '32px' }}
                                                >
                                                    <Delete03Icon size={20} color='rgb(211, 47, 47)' />
                                                </Button>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align='left'>{index + 1 + page * rowsPerPage}</TableCell>
                                        <TableCell align='left'>{row.leaveName}</TableCell>
                                        <TableCell align='left'>{row.leaveBalance}</TableCell>
                                        <TableCell align='left'>
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
                                        <TableCell align='left'>{row.leaveAddingDate}</TableCell>
                                    </TableRow>
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={leaveTypeCells.length} />
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

export default LeaveTypeTable;
