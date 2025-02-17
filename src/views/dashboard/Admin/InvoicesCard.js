import React, { useState } from "react";
import { Card, CardHeader, CardContent, Typography, Avatar, Menu, MenuItem, Button, IconButton, Divider, useTheme, Box, TableContainer, Table, TableBody, TableRow, TableCell, Badge } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Calendar04Icon } from "hugeicons-react";

const invoicesData = [
    {
        id: "INVOO1",
        name: "Redesign Website",
        company: "Logistics",
        amount: "$3560",
        status: "Unpaid",
        img: "images/avatars/avatar-2.png",
    },
    {
        id: "INVOO2",
        name: "Module Completion",
        company: "Yip Corp",
        amount: "$4175",
        status: "Unpaid",
        img: "images/avatars/avatar-7.png",
    },
    {
        id: "INVOO3",
        name: "Change on Emp Module",
        company: "Ignis LLP",
        amount: "$6985",
        status: "Unpaid",
        img: "images/avatars/avatar-3.png",
    },
    {
        id: "INVOO4",
        name: "Changes on the Board",
        company: "Ignis LLP",
        amount: "$1457",
        status: "Unpaid",
        img: "images/avatars/avatar-10.png",
    },
    {
        id: "INVOO5",
        name: "Hospital Management",
        company: "HCL Corp",
        amount: "$6458",
        status: "Paid",
        img: "images/avatars/avatar-2.png",
    },
    {
        id: "INVOO6",
        name: "Hospital Management",
        company: "HCL Corp",
        amount: "$6458",
        status: "Paid",
        img: "images/avatars/avatar-2.png",
    },
];

const InvoicesCard = () => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState("Today");

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = (filter) => {
        if (filter) setSelectedFilter(filter);
        setAnchorEl(null);
    };

    return (
        <Card sx={{ height: "481px", display: "flex", flexDirection: "column" }}>
            {/* Header (Fixed, Not Scrolling) */}
            <CardHeader
                title={<Typography fontSize={16} fontWeight={600}>Invoices</Typography>}
                action={
                    <>
                        <IconButton
                            onClick={handleClick}
                            sx={{
                                border: theme.palette.mode === "light" ? '1px solid #E5E7EB !important' : "1px solid #5d5971 !important",
                                padding: "6px 12px",
                                borderRadius: "4px",
                                fontSize: "14px",
                                display: "flex",
                                alignItems: "center",
                                gap: 1
                            }}
                        >
                            <Calendar04Icon size={18} />
                            {selectedFilter}
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => handleClose()}
                        >
                            {["This Month", "This Week", "Today"].map((period) => (
                                <MenuItem
                                    key={period}
                                    onClick={() => handleClose(period)}
                                    sx={{ borderRadius: "4px" }}
                                >
                                    {period}
                                </MenuItem>
                            ))}
                        </Menu>
                    </>
                }
            />
            <Divider sx={{ margin: 0 }} />

            {/* Scrollable Content */}
            <Box sx={{ flex: 1, overflow: "hidden" }}>
                <PerfectScrollbar style={{ maxHeight: "100%" }}>
                    <CardContent sx={{ padding: 0 }}>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    {invoicesData.map((invoice) => (
                                        <TableRow key={invoice.id}>
                                            <TableCell>
                                                <Box display="flex" alignItems="center">
                                                    <Avatar src={invoice.img} sx={{ width: 40, height: 40, mr: 2 }} />
                                                    <Box>
                                                        <Typography
                                                            sx={{
                                                                whiteSpace: 'normal',
                                                                WebkitLineClamp: 1,
                                                                WebkitBoxOrient: 'vertical',
                                                                display: '-webkit-box',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                fontSize: '14px',
                                                                fontWeight: 600,
                                                            }}
                                                        >{invoice.name}</Typography>
                                                        <Typography variant="body2" color="textSecondary" fontSize={12}>
                                                            #{invoice.id} • {invoice.company}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">Payment</Typography>
                                                <Typography fontWeight={600} fontSize={14}>{invoice.amount}</Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Badge
                                                    color={invoice.status === "Paid" ? "success" : "error"}
                                                    variant="dot"
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        flexDirection: 'row-reverse',
                                                        gap: '5px',
                                                        padding: '5px',
                                                        borderRadius: "5px",
                                                        // background: invoice.status === "Paid" ? (theme.palette.mode === "light" ? '#D2F5E1' : "#265a51") : (theme.palette.mode === "light" ? "#FAE7E7" : "#59263e"),
                                                        backgroundColor: invoice.status !== "Paid" ? "#FAE7E7"
                                                            : invoice.status === "Paid" ? "#D2F5E1"
                                                                : "none",
                                                        "& .MuiBadge-badge": {
                                                            position: "relative !important",
                                                            transform: "none"
                                                        }
                                                    }}
                                                >
                                                    <Typography fontSize={10} color={invoice.status === "Paid" ? '#03C95A' : "#E70D0D"}>{invoice.status}</Typography>
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </PerfectScrollbar>
            </Box>

            {/* Fixed Button (Not Scrolling) */}
            <Divider sx={{ margin: 0 }} />
            <Box sx={{ padding: 2 }}>
                <Button variant="outlined" fullWidth
                    sx={{
                        backgroundColor: theme.palette.mode === "light" ? '#F8F9FA' : "#403d59",
                        border: theme.palette.mode === "light" ? '1px solid #cbcbcb' : "1px solid #524f68",
                        color: theme.palette.mode === "light" ? '#111827' : "#e1e3e7",
                        textTransform: 'capitalize',
                        "&:hover": {
                            backgroundColor: 'rgba(115, 102, 255, 0%)',
                            border: '1px solid #7366ff',
                            color: "primary.main"
                        }
                    }}
                >
                    View All
                </Button>
            </Box>
        </Card>
    );
};

export default InvoicesCard;
