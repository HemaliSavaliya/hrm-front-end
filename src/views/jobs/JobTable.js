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
import { EnhancedTableHead } from 'src/common/EnhancedTableHead';
import { getComparator, stableSort } from 'src/common/CommonLogic';
import { Delete03Icon } from 'hugeicons-react';
import { jobCells } from 'src/TableHeader/TableHeader';

const JobTable = ({
    searchQuery,
    jobData,
    loading,
    handleEdit,
    handleDeleteJobs
}) => {
    // for table sorting and pagination
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('jobTitle'); // Default sorting by Role Name
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const theme = useTheme();

    // Filter data based on search query
    const filteredData = jobData.filter((job) => {
        return (
            job.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.position?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.noOfPosition?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.jobDescription?.toLowerCase().includes(searchQuery.toLowerCase())
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
                <TableContainer sx={{ height: '180px', border: `1px solid ${theme.palette.action.focus}` }}>
                    <Table stickyHeader sx={{ minWidth: { xs: 1500, sm: 1500, lg: 1500 } }} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            headCells={jobCells}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {Array.from(new Array(rowsPerPage)).map((_, index) => (
                                <TableRow key={index}>
                                    {jobCells.map((cell) => (
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
                            sx={{ minWidth: { xs: 1500, sm: 1500, lg: 1500 } }}
                            size='small'
                            aria-label='a dense table'
                        >
                            <EnhancedTableHead
                                headCells={jobCells}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    return (
                                        <TableRow key={row.id} sx={{ cursor: 'pointer' }}>
                                            <TableCell
                                                sx={{
                                                    position: 'sticky',
                                                    left: 0,
                                                    background: theme.palette.background.paper,
                                                    zIndex: 1
                                                }}
                                            >
                                                <Tooltip title='Edit Job'>
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
                                                <Tooltip title='Delete Job'>
                                                    <Button
                                                        onClick={() => handleDeleteJobs(row.id)}
                                                        sx={{ minWidth: '32px' }}
                                                    >
                                                        <Delete03Icon size={20} color='rgb(211, 47, 47)' />
                                                    </Button>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell align='left'>{index + 1 + page * rowsPerPage}</TableCell>
                                            <TableCell align='left'>{row.jobTitle}</TableCell>
                                            <TableCell align='left'>{row.position}</TableCell>
                                            <TableCell align='left'>{row.department}</TableCell>
                                            <TableCell align='left'>{row.noOfPosition}</TableCell>
                                            <TableCell align='left'>{row.jobDescription}</TableCell>
                                        </TableRow>
                                    )
                                })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={jobCells.length} />
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

export default JobTable;
