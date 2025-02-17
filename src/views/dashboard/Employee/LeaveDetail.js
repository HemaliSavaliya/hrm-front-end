import { Box, Card, CardContent, CardHeader, Checkbox, Divider, FormControlLabel, Grid, IconButton, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import { Circle } from 'mdi-material-ui';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Calendar04Icon } from 'hugeicons-react';
const LeaveDetailChart = dynamic(() => import('./charts/LeaveDetailChart'), { ssr: false });

const LeaveDetail = () => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card
            sx={{
                height: {
                    xs: 'auto', // Small screens
                    sm: 'auto', // Medium screens
                    md: 'auto', // Large screens
                    lg: '390px', // Large screens
                },
            }}
        >
            <CardHeader
                title={<Typography fontSize={16} fontWeight={600}>Leave Details</Typography>}
                action={
                    <>
                        <IconButton
                            aria-controls={open ? 'year-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleMenuClick}
                            sx={{
                                border: theme.palette.mode === "light" ? '1px solid #E5E7EB !important' : "1px solid #ffffff36 !important",
                                borderRadius: 0,
                                height: 27,
                            }}
                        >
                            <Calendar04Icon size={18} />

                            {/* <CalendarAccountOutline fontSize="small" /> */}
                            <Typography variant="body2" sx={{ ml: 1 }}>
                                2024
                            </Typography>
                        </IconButton>
                        <Menu
                            id="year-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleMenuClose}
                            MenuListProps={{ 'aria-labelledby': 'year-button' }}
                            PaperProps={{
                                style: {
                                    minWidth: '10rem',
                                },
                            }}
                        >
                            <MenuItem onClick={handleMenuClose}>2024</MenuItem>
                            <MenuItem onClick={handleMenuClose}>2023</MenuItem>
                            <MenuItem onClick={handleMenuClose}>2022</MenuItem>
                        </Menu>
                    </>
                }
            />
            <Divider sx={{ margin: 0 }} />
            <CardContent>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} md={5} lg={5} padding={'0px !important'}>
                        <Box mb={3}>
                            <Typography fontSize={12} display="flex" alignItems="center" mb={3}>
                                <Circle fontSize="small" sx={{ color: '#212529', mr: 1, fontSize: 8 }} />
                                <Typography component="span" color={theme.palette.mode === "light" ? '#111827' : "#fff"} fontWeight={600} fontSize={14} mr={1}>1254</Typography>
                                on time
                            </Typography>
                            <Typography fontSize={12} display="flex" alignItems="center" mb={3}>
                                <Circle fontSize="small" sx={{ color: '#03C95A', mr: 1, fontSize: 8 }} />
                                <Typography component="span" color={theme.palette.mode === "light" ? '#111827' : "#fff"} fontWeight={600} fontSize={14} mr={1}>32</Typography>
                                Late Attendance
                            </Typography>
                            <Typography fontSize={12} display="flex" alignItems="center" mb={3}>
                                <Circle fontSize="small" sx={{ color: '#F26512', mr: 1, fontSize: 8 }} />
                                <Typography component="span" color={theme.palette.mode === "light" ? '#111827' : "#fff"} fontWeight={600} fontSize={14} mr={1}>658</Typography>
                                Work From Home
                            </Typography>
                            <Typography fontSize={12} display="flex" alignItems="center" mb={3}>
                                <Circle fontSize="small" sx={{ color: '#E70D0D', mr: 1, fontSize: 8 }} />
                                <Typography component="span" color={theme.palette.mode === "light" ? '#111827' : "#fff"} fontWeight={600} fontSize={14} mr={1}>14</Typography>
                                Absent
                            </Typography>
                            <Typography fontSize={12} display="flex" alignItems="center">
                                <Circle fontSize="small" sx={{ color: '#FFC107', mr: 1, fontSize: 8 }} />
                                <Typography component="span" color={theme.palette.mode === "light" ? '#111827' : "#fff"} fontWeight={600} fontSize={14} mr={1}>68</Typography>
                                Sick Leave
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={7} lg={7} display="flex" justifyContent="flex-end" padding={'0px !important'}>
                        <LeaveDetailChart />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox id="todo1" />}
                            label={<Typography fontSize={14}>Better than <span style={{ fontWeight: 600 }}>85%</span> of Employees</Typography>}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default LeaveDetail
