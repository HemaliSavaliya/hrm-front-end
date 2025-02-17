import React, { useState } from 'react';
import { Box, Card, Typography, Divider, IconButton, Menu, MenuItem, useTheme } from '@mui/material';
import { CalendarAccountOutline } from 'mdi-material-ui';
import dynamic from 'next/dynamic';
const PerformanceChart = dynamic(() => import('./charts/PerformanceChart'), { ssr: false });

const Performance = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme()

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card sx={{
            height: {
                xs: 'auto', // Small screens
                sm: 'auto', // Medium screens
                md: 'auto', // Large screens
                lg: '471px', // Large screens
            },
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px',
            }}>
                <Typography fontSize={16} fontWeight={600}>Performance</Typography>
                <IconButton
                    aria-controls={open ? 'year-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleMenuClick}
                    sx={{
                        border: theme.palette.mode === "light" ? '1px solid #F8F9FA' : "1px solid #ffffff36",
                        borderRadius: 0,
                        height: 27,
                    }}
                >
                    <CalendarAccountOutline fontSize="small" />
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
            </Box>
            <Divider sx={{ m: 0 }} />
            <Box padding={'15px'}>
                <Box
                    sx={{
                        backgroundColor: theme.palette.mode === "light" ? '#F8F9FA !important' : '#f8f9fa05 !important',
                        border: theme.palette.mode === "light" ? '1px solid #F8F9FA !important' : "1px solid #f8f9fa1c !important",
                        color: '#6B727E',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        mb: 2
                    }}
                >
                    <Typography fontSize={20} fontWeight={600}>98%</Typography>
                    <Typography component='span' fontWeight={600} fontSize={10} height={'fit-content'} borderRadius={'100px'} color={'#03C95A'} p={'4px 7px'} sx={{ backgroundColor: '#D2F5E1' }}>12%</Typography>
                    <Typography component='span' fontSize={14}>vs last years</Typography>
                </Box>
                <PerformanceChart />
            </Box>
        </Card>
    )
}

export default Performance
