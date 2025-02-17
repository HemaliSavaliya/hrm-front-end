import React, { useState } from "react";
import { Card, CardHeader, CardContent, Typography, Menu, MenuItem, Button, IconButton, Divider, useTheme, Box } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { ArcElement } from "chart.js";
import { Calendar04Icon } from "hugeicons-react";

// Register required elements
Chart.register(ArcElement);

const TasksStatistics = () => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState("Today");

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = (filter) => {
        if (filter) setSelectedFilter(filter);
        setAnchorEl(null);
    };

    const data = {
        labels: ["Ongoing", "On Hold", "Completed", "Overdue"],
        datasets: [
            {
                label: "Task",
                data: [20, 40, 20, 10],
                backgroundColor: ["#FFC107", "#1B84FF", "#03C95A", "#E70D0D"],
                borderWidth: 0,
                borderColor: "transparent",
                hoverBorderWidth: 0,
                cutout: "75%",
                spacing: -40,
            },
        ],
    };

    const options = {
        rotation: -100,
        circumference: 185,
        layout: {
            padding: {
                top: 0,
                bottom: 20,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        elements: {
            arc: {
                borderWidth: 0,
                borderRadius: 30,
            },
        },
    };

    return (
        <Card sx={{ height: "481px", display: "flex", flexDirection: "column" }}>
            {/* Header (Fixed, Not Scrolling) */}
            <CardHeader
                title={<Typography fontSize={16} fontWeight={600}>Tasks Statistics</Typography>}
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
                    <CardContent>
                        <Box
                            position="relative"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            mb={8}
                            sx={{ height: "190px" }} // Adjust width and height as needed
                        >
                            <Doughnut data={data} options={options} />
                            <Box position="absolute" textAlign="center" top={'50%'}>
                                <Typography variant="body2" color="textSecondary">Total Tasks</Typography>
                                <Typography variant="h5" fontWeight="bold">124/165</Typography>
                            </Box>
                        </Box>

                        <Box display="flex" justifyContent="space-around" flexWrap="wrap" mb={5}>
                            {[
                                { label: "Ongoing", value: "24%", color: "#ffc107" },
                                { label: "On Hold", value: "10%", color: "#17a2b8" },
                                { label: "Overdue", value: "16%", color: "#dc3545" },
                                { label: "Completed", value: "40%", color: "#28a745" },
                            ].map((item, index) => (
                                <Box key={index} textAlign="center" sx={{ mb: 2 }}>
                                    <Typography variant="body2" sx={{ display: "flex", alignItems: "center", fontSize: 13 }}>
                                        <Box
                                            component="span"
                                            sx={{ width: 8, height: 8, backgroundColor: item.color, borderRadius: "50%", mr: 1 }}
                                        ></Box>
                                        {item.label}
                                    </Typography>
                                    <Typography fontSize={15} fontWeight={600}>{item.value}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </CardContent>

                    <Divider sx={{ margin: 0 }} />

                    <Box
                        sx={{
                            backgroundColor: theme.palette.mode === "light" ? "#343a40" : "#48445f",
                            color: "#fff",
                            borderRadius: "5px",
                            p: 2,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            margin: '10px'
                        }}
                    >
                        <Box>
                            <Typography fontSize={18} fontWeight={600} color="success.main">389/689 hrs</Typography>
                            <Typography fontSize={12} color={'#fff'}>Spent on Overall Tasks This Week</Typography>
                        </Box>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{
                                backgroundColor: 'rgb(248, 249, 250)',
                                color: 'rgb(17, 24, 39)',
                                border: '1px solid rgb(248, 249, 250)',
                                textTransform: 'capitalize',
                                fontSize: '11px'
                            }}
                        >
                            View All
                        </Button>
                    </Box>

                </PerfectScrollbar>
            </Box>
        </Card >
    );
};

export default TasksStatistics;
