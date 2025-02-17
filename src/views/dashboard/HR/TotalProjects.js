import { Box, Card, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { MoreVerticalSquare01Icon } from 'hugeicons-react';
import dynamic from 'next/dynamic';
import React, { useState } from 'react'
const TotalProjectChart = dynamic(() => import('./charts/TotalProjectChart'), { ssr: false });

const TotalProjects = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card sx={{ p: 5, height: '512px' }}>
            <Box display="flex" alignItems="baseline" gap={2} mb={3}>
                <Typography variant="subtitle1" fontWeight={600} mb={3} flexGrow={1}>
                    Total Projects (247)
                </Typography>
                <Box>
                    <IconButton
                        aria-controls={open ? 'total-projects-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleMenuClick}
                        sx={{
                            color: 'text.secondary',
                        }}
                    >
                        <MoreVerticalSquare01Icon size={20} />
                    </IconButton>
                    <Menu
                        id="total-projects-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        PaperProps={{
                            style: {
                                minWidth: '10rem',
                            },
                        }}
                    >
                        {['1 Weekly', '1 Monthly', '3 Monthly', '6 Monthly', 'This Yearly'].map((option) => (
                            <MenuItem
                                key={option}
                                onClick={handleMenuClose}
                                sx={{
                                    fontSize: '1rem'
                                }}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Box>
            <TotalProjectChart />
        </Card>
    )
}

export default TotalProjects
