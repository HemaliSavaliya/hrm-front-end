import React, { useState } from "react";
import { Card, CardHeader, CardContent, Typography, Box, IconButton, Menu, MenuItem, Avatar, AvatarGroup, Divider, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { ArcElement } from "chart.js";
import { Calendar04Icon } from "hugeicons-react";

// Register required elements
Chart.register(ArcElement);

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    background: 'rgb(224, 242, 254)',
    width: 30,
    height: 30,
    border: `2px solid ${theme.palette.background.paper}`,
    cursor: 'pointer',
    '&:hover': {
        zIndex: 1,
        transform: 'translateY(-0.188rem)'
    }
}));

const AttendanceOverview = () => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState("This Week");

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (period) => {
        if (period) setSelectedPeriod(period);
        setAnchorEl(null);
    };

    const borderColor = theme.palette.mode === "light" ? "#fff" : "#312d4b";

    const data = {
        labels: ['Late', 'Present', 'Permission', 'Absent'],
        datasets: [
            {
                label: 'Attendance',
                data: [40, 20, 30, 10],
                backgroundColor: ['#0C4B5E', '#03C95A', '#FFC107', '#E70D0D'],
                borderWidth: 5,
                borderRadius: 10,
                borderColor: borderColor, // Border between segments
                hoverBorderWidth: 0, // Border radius for curved edges
                cutout: '60%',
            }
        ]
    };

    const options = {
        rotation: -100,
        circumference: 200,
        layout: {
            padding: {
                top: -20, // Set to 0 to remove top padding
                bottom: -20, // Set to 0 to remove bottom padding
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false // Hide the legend
            }
        },
    };

    return (
        <Card sx={{ height: { xs: "481px", xl: '511px' }, display: "flex", flexDirection: "column" }}>
            {/* Card Header */}
            <CardHeader
                title={<Typography fontSize={16} fontWeight={600}>Attendance Overview</Typography>}
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
                            {selectedPeriod}
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => handleClose()}
                        >
                            {["This Month", "This Week", "Last Week"].map((period) => (
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

            {/* Card Content */}
            <CardContent sx={{ paddingTop: '10px', paddingBottom: "10px" }}>
                {/* Attendance Chart Placeholder */}
                <Box
                    position="relative"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mb={4}
                    sx={{ height: "178px" }} // Adjust width and height as needed
                >
                    <Doughnut data={data} options={options} />
                    <Box position="absolute" textAlign="center" top={'50%'}>
                        <Typography variant="body2" color="textSecondary">Total Attendance</Typography>
                        <Typography variant="h5" fontWeight="bold">120</Typography>
                    </Box>
                </Box>

                {/* Status */}
                <Typography variant="subtitle1" fontSize={14} fontWeight={600} mb={2} mt={2}>
                    Status
                </Typography>
                {[
                    { label: "Present", color: "#03C95A", value: "59%" },
                    { label: "Late", color: "#3B7080", value: "21%" },
                    { label: "Permission", color: "#FFC107", value: "2%" },
                    { label: "Absent", color: "#E70D0D", value: "15%" },
                ].map((item, index) => (
                    <Box key={index} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body2">
                            <span style={{ color: item.color, marginRight: 5 }}>●</span> {item.label}
                        </Typography>
                        <Typography variant="body2" fontSize={13} fontWeight={700} color={theme.palette.mode === "light" ? '#000' : "#fff"}>
                            {item.value}
                        </Typography>
                    </Box>
                ))}
            </CardContent>

            <Divider sx={{ margin: 0 }} />

            {/* Absent Employees Section (Outside CardContent) */}
            <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "background.default", borderRadius: 2, m: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ mr: 2 }}>
                        Total Absentees
                    </Typography>
                    <AvatarGroup max={5} spacing="small">
                        {["images/avatars/avatar-2.png", "images/avatars/avatar-3.png", "images/avatars/avatar-7.png", "images/avatars/avatar-10.png"].map((src, index) => (
                            <StyledAvatar key={index} src={src} />
                        ))}
                        <StyledAvatar sx={{ backgroundColor: "primary.main", color: "white", fontSize: "10px" }}>+1</StyledAvatar>
                    </AvatarGroup>
                </Box>
                <Typography variant="body2" color="primary" sx={{ textDecoration: "underline", cursor: "pointer" }}>
                    View Details
                </Typography>
            </Box>
        </Card>
    );
};

export default AttendanceOverview;
