import {
    Box,
    Chip,
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
import { getComparator, stableSort } from 'src/common/CommonLogic';
import { EnhancedTableHead } from 'src/common/EnhancedTableHead';
import { designationCells } from 'src/TableHeader/TableHeader';

const statusObj = {
    Active: 'success',
    Inactive: 'error'
}

const DesignationTable = ({
    searchQuery,
    designationData,
    updateDesignationStatus,
    loading,
    handleEdit
}) => {
    // for table
    const [order, setOrder] = useState('desc')
    const [orderBy, setOrderBy] = useState('designationName')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const theme = useTheme();

    // Filter data based on search query
    const filteredData = designationData.filter((des) => {
        return (
            des.designationName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            des.startingDate?.includes(searchQuery) ||
            des.status?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    // Handle sort request
    const handleRequestSort = (property) => {
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
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0

    const visibleRows = stableSort(filteredData, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    )

    // For toggle status
    const handleStatusToggle = (id, currentStatus) => {
        // Assume you have a function to update the status in your data
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active'
        updateDesignationStatus(id, newStatus)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exist={{ opacity: 0, y: 15 }}
            transition={{ delay: 0.25 }}
        >
            <Box sx={{ width: '100%' }}>
                {loading ? (
                    <TableContainer sx={{ height: '180px', border: `1px solid ${theme.palette.action.focus}` }}>
                        <Table stickyHeader sx={{ minWidth: { xs: 800, sm: 800, lg: 800 } }} aria-labelledby='tableTitle'>
                            <EnhancedTableHead
                                headCells={designationCells}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                                {Array.from(new Array(rowsPerPage)).map((_, index) => (
                                    <TableRow key={index}>
                                        {designationCells.map(cell => (
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
                                sx={{ minWidth: { xs: 800, sm: 800, lg: 800 } }}
                                size='small'
                                aria-label='a dense table'
                            >
                                <EnhancedTableHead
                                    headCells={designationCells}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {visibleRows.map((row, index) => {
                                        return (
                                            <TableRow key={row.id} sx={{ cursor: 'pointer' }}>
                                                {/* <TableCell
                                                        align='left'
                                                        sx={{
                                                            position: 'sticky',
                                                            background: theme.palette.background.paper,
                                                            left: 0,
                                                            zIndex: 1
                                                        }}
                                                    >
                                                        <Tooltip title='Edit Designation'>
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
                                                    </TableCell> */}
                                                <TableCell align='left'>{index + 1 + page * rowsPerPage}</TableCell>
                                                <TableCell align='left'>{row.designationName}</TableCell>
                                                <TableCell align='left'>{row.startingDate}</TableCell>
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
                                            <TableCell colSpan={designationCells.length} />
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
        </motion.div>
    );
};

export default DesignationTable;
