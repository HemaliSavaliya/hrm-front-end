import { Avatar, Box, Button, Card, Checkbox, Grid, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles'
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Delete02Icon, Download03Icon, PencilEdit01Icon } from 'hugeicons-react';

const CustomStyledCheckbox = styled(Checkbox)(({ theme }) => ({
    '&.MuiCheckbox-root': {
        color: 'rgb(226, 232, 240)', // Change the color here
        '&.Mui-checked': {
            color: '#7366FF', // Change the checked color here
        },
    },
}));

const Employee = () => {
    const theme = useTheme();

    const employees = [
        {
            id: 'TW-1001',
            img: 'images/avatars/avatar-2.png',
            name: 'Kristen Redden',
            email: 'kredden@tailwick.com',
            designation: 'Designer',
            performance: 'Good',
            status: 'Active',
        },
        {
            id: 'TW-1002',
            img: 'images/avatars/avatar-3.png',
            name: 'Howard George',
            email: 'george@tailwick.com',
            designation: 'ASP.Net Developer',
            performance: 'Low',
            status: 'Disabled',
        },
        {
            id: 'TW-1001',
            img: 'images/avatars/avatar-7.png',
            name: 'Kristen Redden',
            email: 'kredden@tailwick.com',
            designation: 'Designer',
            performance: 'Good',
            status: 'Active',
        },
        {
            id: 'TW-1002',
            img: 'images/avatars/avatar-10.png',
            name: 'Howard George',
            email: 'george@tailwick.com',
            designation: 'ASP.Net Developer',
            performance: 'Low',
            status: 'Active',
        },
        {
            id: 'TW-1002',
            img: 'images/avatars/2.png',
            name: 'Denise Ledford',
            email: 'ledford@tailwick.com',
            designation: 'ASP.Net Developer',
            performance: 'Low',
            status: 'Active',
        },
    ];

    return (
        <Card sx={{ p: 5 }}>
            <Box sx={{ padding: 2 }}>
                <Grid container spacing={2} mb={'20px'}>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h6">Employee Performance</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <TextField
                                    fullWidth
                                    placeholder="Search for ..."
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="outlined" color="primary" sx={{ borderStyle: "dashed", textTransform: "capitalize", gap: 2 }}>
                                    <Download03Icon size={20} />  Export
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <PerfectScrollbar style={{ maxHeight: "300px", overflowX: "hidden" }}>
                    <TableContainer sx={{ borderTop: "1px solid rgba(58, 53, 65, 0.12)" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <CustomStyledCheckbox />
                                    </TableCell>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Designation</TableCell>
                                    <TableCell>Performance</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees.map((employee) => (
                                    <TableRow key={employee.id}>
                                        <TableCell padding="checkbox">
                                            <CustomStyledCheckbox />
                                        </TableCell>
                                        <TableCell>{employee.id}</TableCell>
                                        <TableCell>
                                            <Box display={'flex'} gap={'10px'} alignItems={'center'}>
                                                <Box>
                                                    <Avatar width={'2.5rem'} height={'2.5rem'} src={employee.img} alt={employee.name} sx={{
                                                        borderRadius: '9999px',
                                                        background: theme.palette.mode === 'light' ? 'rgb(224, 242, 254)' : '#24978233'
                                                    }}
                                                    />
                                                </Box>
                                                <Box>
                                                    <Typography variant="body1" fontSize={'14px'} fontWeight={600}>{employee.name}</Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {employee.email}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{employee.designation}</TableCell>
                                        <TableCell>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: employee.performance === 'Good' ? 'green' : 'red',
                                                }}
                                            >
                                                {employee.performance}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box
                                                sx={{
                                                    color: employee.status === 'Active' ? 'rgb(36, 151, 130)' : 'rgb(100, 116, 139)',
                                                    fontWeight: 500,
                                                    fontSize: '.75rem',
                                                    paddingTop: '.125rem',
                                                    paddingBottom: '.125rem',
                                                    paddingLeft: '.625rem',
                                                    paddingRight: '.625rem',
                                                    background: employee.status === 'Active' ? theme.palette.buttons.statusSuccess : theme.palette.buttons.statusDisable,
                                                    border: employee.status === 'Active' ? `1px solid ${theme.palette.buttons.statusBorder}` : `1px solid ${theme.palette.buttons.statusDisableBorder}`,
                                                    borderRadius: '.25rem',
                                                    textAlign: 'center',
                                                    width: 'fit-content'
                                                }}
                                            >
                                                {employee.status}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box display={'flex'} gap={'5px'}>
                                                <Box
                                                    sx={{
                                                        color: theme.palette.mode === 'light' ? 'rgba(100, 116, 139, 0.7)' : 'rgb(146, 175, 211)',
                                                        borderRadius: '.375rem',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        width: '2rem',
                                                        height: '2rem',
                                                        cursor: 'pointer',
                                                        background: theme.palette.mode === 'light' ? 'rgb(241, 245, 249)' : 'rgb(28, 46, 69)',
                                                        transition: 'background 0.3s, color 0.3s',
                                                        '&:hover': {
                                                            background: theme.palette.mode === 'light' ? 'rgb(219, 234, 254)' : '#3b82f633',
                                                            color: 'rgb(59, 130, 246)',
                                                        },
                                                    }}
                                                >
                                                    <PencilEdit01Icon />
                                                </Box>
                                                <Box
                                                    sx={{
                                                        color: theme.palette.mode === 'light' ? 'rgba(100, 116, 139, 0.7)' : 'rgb(146, 175, 211)',
                                                        borderRadius: '.375rem',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        width: '2rem',
                                                        height: '2rem',
                                                        cursor: 'pointer',
                                                        background: theme.palette.mode === 'light' ? 'rgb(241, 245, 249)' : 'rgb(28, 46, 69)',
                                                        transition: 'background 0.3s, color 0.3s',
                                                        '&:hover': {
                                                            background: theme.palette.mode === 'light' ? 'rgb(254, 226, 226)' : '#ef444433',
                                                            color: 'rgb(239, 68, 68)',
                                                        },
                                                    }}
                                                >
                                                    <Delete02Icon />
                                                </Box>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </PerfectScrollbar>

                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                    <Typography variant="body2">
                        Showing <b>{employees.length}</b> of <b>19</b> Results
                    </Typography>
                    <Pagination count={3} variant="outlined" shape="rounded" />
                </Box>
            </Box>
        </Card>
    )
}

export default Employee
