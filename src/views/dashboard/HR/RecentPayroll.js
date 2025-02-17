import { Avatar, Box, Card, Chip, IconButton, Menu, MenuItem, Typography, useTheme } from '@mui/material'
import { MoreVerticalSquare01Icon } from 'hugeicons-react';
import { ArrowBottomLeft, ArrowTopRight, DotsVertical } from 'mdi-material-ui'
import React, { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar';

const RecentPayroll = () => {
    const theme = useTheme();
    const [anchorElRecent, setAnchorElRecent] = useState(null);
    const openRecent = Boolean(anchorElRecent);

    const handleMenuRecent = (event) => {
        setAnchorElRecent(event.currentTarget);
    };

    const handleMenuCloseRecent = () => {
        setAnchorElRecent(null);
    };

    const payrollData = [
        { name: "Christopher Horn", amount: "$145.32", status: "Cancelled", color: "error" },
        { name: "Richard Peters", amount: "$4512.99", status: "Pending", color: "warning" },
        { name: "James Perez", amount: "$879.99", status: "Paid", color: "success" },
        { name: "Myrtle Velez", amount: "$978.14", status: "Cancelled", color: "error" },
        { name: "Brad Castillo", amount: "$412.59", status: "Pending", color: "warning" },
        { name: "Christopher Horn", amount: "$145.32", status: "Cancelled", color: "error" },
        { name: "Richard Peters", amount: "$4512.99", status: "Pending", color: "warning" },
        { name: "James Perez", amount: "$879.99", status: "Paid", color: "success" },
        { name: "Myrtle Velez", amount: "$978.14", status: "Cancelled", color: "error" },
        { name: "Brad Castillo", amount: "$412.59", status: "Pending", color: "warning" },
    ];

    return (
        <Card sx={{ p: 5, mt: 5, height: "296px" }}>
            <Box display="flex" alignItems="baseline" gap={2} mb={3}>
                <Typography variant="subtitle1" fontWeight={600} mb={3} flexGrow={1}>
                    Recent Payroll
                </Typography>
                <Box>
                    <IconButton
                        aria-controls={openRecent ? 'recent-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openRecent ? 'true' : undefined}
                        onClick={handleMenuRecent}
                        sx={{
                            color: 'text.secondary',
                        }}
                    >
                        <MoreVerticalSquare01Icon size={20} />
                    </IconButton>
                    <Menu
                        id="recent-menu"
                        anchorEl={anchorElRecent}
                        open={openRecent}
                        onClose={handleMenuCloseRecent}
                        PaperProps={{
                            style: {
                                minWidth: '10rem',
                            },
                        }}
                    >
                        {['Today', 'Yesterday', 'Thursday'].map((option) => (
                            <MenuItem
                                key={option}
                                onClick={handleMenuCloseRecent}
                                sx={{
                                    fontSize: '1rem',
                                }}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Box>

            <PerfectScrollbar style={{ maxHeight: "193px" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: '18px',
                        paddingRight: "10px" // Prevents content from hiding under scrollbar
                    }}
                >
                    {payrollData.map((item, index) => (
                        <Box key={index} display="flex" justifyContent={'space-between'} alignItems="center" gap={2}>
                            <Box display={'flex'} gap={2}>
                                {/* Icon */}
                                <Avatar
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    {item.status === "Paid" || item.status === "Pending" ? (
                                        <ArrowBottomLeft fontSize="small" color='success' />
                                    ) : (
                                        <ArrowTopRight fontSize="small" color='error' />
                                    )}
                                </Avatar>

                                {/* Name */}
                                <Typography variant='subtitle1' fontSize={'14px'} fontWeight={600}>{item.name}</Typography>
                            </Box>

                            <Box display={'flex'} gap={2}>
                                {/* Amount */}
                                <Typography variant='subtitle1' fontSize={'14px'} fontWeight={600}>{item.amount}</Typography>

                                {/* Status */}
                                <Chip
                                    label={item.status}
                                    size="small"
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: '11px',
                                        paddingTop: '.125rem',
                                        paddingBottom: '.125rem',
                                        paddingLeft: '.625rem',
                                        paddingRight: '.625rem',
                                        borderRadius: '.25rem',
                                        marginRight: '15px',
                                        backgroundColor:
                                            item.color === "error"
                                                ? theme.palette.buttons.statusError
                                                : item.color === "success"
                                                    ? theme.palette.buttons.statusSuccess
                                                    : theme.palette.buttons.statusPending,
                                        color:
                                            item.color === "error"
                                                ? "rgb(239, 68, 68)"
                                                : item.color === "success"
                                                    ? "rgb(36, 151, 130)"
                                                    : "rgb(234, 179, 8) ",
                                    }}
                                />
                            </Box>
                        </Box>
                    ))}
                </Box>
            </PerfectScrollbar>
        </Card>
    )
}

export default RecentPayroll
