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
import { motion } from 'framer-motion';
import { PencilOutline } from 'mdi-material-ui';
import { getComparator, stableSort } from 'src/common/CommonLogic';
import { EnhancedTableHead } from 'src/common/EnhancedTableHead';
import { announcementCells } from 'src/TableHeader/TableHeader';
import { Delete03Icon } from 'hugeicons-react';

const AnnouncementTable = ({ searchQuery, announcementData, loading, handleEdit, handleDeleteAnnouncement, handleButtonClick }) => {
    // for table sorting and pagination
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('announcementTitle'); // Default sorting by Role Name
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const theme = useTheme();
    // For fetch login detail wise role
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
    const role = authToken?.role

    // Filter data based on search query
    const filteredData = announcementData.filter((role) => {
        return (
            role.announcementTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            role.announcementDetails?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            role.selectDepartment?.toLowerCase().includes(searchQuery.toLowerCase())
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
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exist={{ opacity: 0, y: 15 }}
            transition={{ delay: 0.25 }}
        >
            <Box sx={{ width: '100%' }}>
                {loading ? (
                    <TableContainer sx={{ height: '245px', border: `1px solid ${theme.palette.action.focus}` }}>
                        <Table stickyHeader sx={{ minWidth: { xs: 1200, sm: 1200, lg: 1200 } }} aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                headCells={announcementCells}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                                {Array.from(new Array(rowsPerPage)).map((_, index) => (
                                    <TableRow key={index}>
                                        {announcementCells.map((cell) => (
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
                                sx={{ minWidth: { xs: 1000, sm: 1000, lg: 1000 } }}
                                size='small'
                                aria-label='a dense table'
                            >
                                <EnhancedTableHead
                                    headCells={announcementCells}
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
                                                    left: 0,
                                                    background: theme.palette.background.paper,
                                                    zIndex: 1
                                                }}
                                            >
                                                {role === 'Employee' ? null : (
                                                    <>
                                                        <Tooltip title='Edit Announcement'>
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
                                                        <Tooltip title='Delete Announcement'>
                                                            <Button
                                                                onClick={() => handleDeleteAnnouncement(row.id)}
                                                                sx={{ minWidth: '32px' }}
                                                            >
                                                                <Delete03Icon size={20} color='rgb(211, 47, 47)' />
                                                            </Button>
                                                        </Tooltip>
                                                    </>
                                                )}
                                            </TableCell>
                                            <TableCell align='left'>{index + 1 + page * rowsPerPage}</TableCell>
                                            <TableCell align='left'>{row.announcementTitle}</TableCell>
                                            {/* <TableCell align='left'>{row.announcementDetails}</TableCell> */}
                                            <TableCell align='left'>{row.selectDepartment}</TableCell>
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
                                                                onClick={() => handleButtonClick(document, row.id)}  // Pass the image name
                                                            >
                                                                {document}
                                                            </Button>
                                                            {index % 2 === 1 && <br />}
                                                        </React.Fragment>
                                                    ))
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={announcementCells.length} />
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

export default AnnouncementTable;
