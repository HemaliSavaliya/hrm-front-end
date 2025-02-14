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
import { roleCells } from 'src/TableHeader/TableHeader';
import { EnhancedTableHead } from 'src/common/EnhancedTableHead';

const statusObj = {
    Enable: 'success',
    Disable: 'error'
}

const RoleTable = ({
    loading,
    roleData,
    updateRoleStatus,
    totalItems,
    page,
    rowsPerPage,
    setPage,
    setRowsPerPage,
    setSortBy,
    setSortOrder
}) => {
    const theme = useTheme()

    // for table sorting
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('name')

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        const newOrder = isAsc ? 'desc' : 'asc'
        setOrder(newOrder)
        setOrderBy(property)
        setSortBy(property) // Set the sortBy state for the backend
        setSortOrder(newOrder) // Set the sortOrder state for the backend
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    // For toggle status
    const handleStatusToggle = (id, currentStatus) => {
        const newStatus = currentStatus === 'Enable' ? 'Disable' : 'Enable'
        updateRoleStatus(id, newStatus)
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
                    <TableContainer sx={{ height: '245px', border: `1px solid ${theme.palette.action.focus}` }}>
                        <Table stickyHeader sx={{ minWidth: { xs: 800, sm: 800, lg: 800 } }} aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                headCells={roleCells}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                                {Array.from(new Array(rowsPerPage)).map((_, index) => (
                                    <TableRow key={index}>
                                        {roleCells.map((cell) => (
                                            <TableCell key={cell.id}>
                                                <Skeleton variant="text" height={25} />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : roleData && roleData.length === 0 ? (
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
                                sx={{ minWidth: { xs: 800, sm: 800, lg: 800 } }}
                                size='small'
                                aria-label='a dense table'
                            >
                                <EnhancedTableHead
                                    headCells={roleCells}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {roleData.map((row, index) => {
                                        return (
                                            <TableRow hover role='checkbox' tabIndex={-1} key={row.id} sx={{ cursor: 'pointer' }}>
                                                <TableCell align='left'>{index + 1 + page * rowsPerPage}</TableCell>
                                                <TableCell align='left'>{row.roleName}</TableCell>
                                                <TableCell align='left'>{row.date}</TableCell>
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
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component='div'
                            count={totalItems}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </>
                )}
            </Box>
        </motion.div>
    )
}

export default RoleTable
