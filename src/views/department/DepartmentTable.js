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
import { getComparator, stableSort } from 'src/common/CommonLogic';
import { EnhancedTableHead } from 'src/common/EnhancedTableHead';
import { departmentCells } from 'src/TableHeader/TableHeader';

const statusObj = {
    Active: 'success',
    Inactive: 'error'
};

const DepartmentTable = ({
    searchQuery,
    departmentData,
    loading,
    updateDepartmentStatus,
    handleEdit
}) => {
    // for table sorting and pagination
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('departmentName'); // Default sorting by Role Name
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const theme = useTheme();

    // Filter data based on search query
    const filteredData = departmentData.filter((dept) => {
        return (
            dept.departmentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dept.departmentHead?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dept.departmentEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dept.startingDate?.includes(searchQuery) ||
            dept.status?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    // Handle sort request
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    // Pagination Handlers
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

    const visibleRows = stableSort(filteredData, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    // For toggle status
    const handleStatusToggle = (id, currentStatus) => {
        // Assume you have a function to update the status in your data
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active'
        updateDepartmentStatus(id, newStatus)
    }

    return (
        <Box sx={{ width: '100%' }}>
            {loading ? (
                <TableContainer sx={{ height: '180px', border: `1px solid ${theme.palette.action.focus}` }}>
                    <Table stickyHeader sx={{ minWidth: { xs: 1500, sm: 1500, lg: 1500 } }} aria-labelledby='tableTitle'>
                        <EnhancedTableHead
                            headCells={departmentCells}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {Array.from(new Array(rowsPerPage)).map((_, index) => (
                                <TableRow key={index}>
                                    {departmentCells.map(cell => (
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
                    <TableContainer sx={{ height: '180px', border: `1px solid ${theme.palette.action.focus}` }}>
                        <Table
                            stickyHeader
                            sx={{ minWidth: { xs: 1300, sm: 1300, lg: 1300 } }}
                            size='small'
                            aria-label='a dense table'
                        >
                            <EnhancedTableHead
                                headCells={departmentCells}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                                {visibleRows.map((row, index) => {
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
                                                <Tooltip title='Edit Department'>
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
                                            </TableCell>
                                            <TableCell align='left'>{index + 1 + page * rowsPerPage}</TableCell>
                                            <TableCell align='left'>{row.departmentName}</TableCell>
                                            <TableCell align='left'>{row.departmentHead}</TableCell>
                                            <TableCell align='left'>{row.departmentEmail}</TableCell>
                                            <TableCell align='left'>{row.startingDate}</TableCell>
                                            <TableCell align='left'>{row.teamMembers?.length || '-'}</TableCell>
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
                                        <TableCell colSpan={departmentCells.length} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component='div'
                        count={filteredData.length}
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

export default DepartmentTable;
