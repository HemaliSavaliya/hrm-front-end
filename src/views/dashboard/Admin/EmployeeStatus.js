import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Box,
    Grid,
    Button,
    Avatar,
    useTheme,
    Divider,
} from "@mui/material";
import { Calendar04Icon } from "hugeicons-react";

const EmployeeStatus = () => {
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

    return (
        <Card sx={{ flexGrow: 1, height: { xl: '511px' } }}>
            <CardHeader
                title={<Typography fontSize={16} fontWeight={600}>Employee Status</Typography>}
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
            <CardContent>
                {/* Total Employee Count */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    <Typography variant="body2" sx={{ fontSize: 13 }}>
                        Total Employees
                    </Typography>
                    <Typography fontSize={20} fontWeight={600}>
                        154
                    </Typography>
                </Box>

                {/* Progress Bar */}
                <Box
                    sx={{
                        display: "flex",
                        height: 24,
                        borderRadius: "6px",
                        overflow: "hidden",
                        width: "100%",
                        mb: 4
                    }}
                >
                    <Box sx={{ width: "40%", bgcolor: "#FFC107" }} /> {/* Yellow */}
                    <Box sx={{ width: "20%", bgcolor: "#3F6974" }} /> {/* Dark Blue */}
                    <Box sx={{ width: "10%", bgcolor: "#E60000" }} /> {/* Red */}
                    <Box sx={{ width: "30%", bgcolor: "#FF3E9D" }} /> {/* Pink */}
                </Box>

                {/* Employee Breakdown */}
                <Box sx={{ border: theme.palette.mode === "light" ? "1px solid #ddd" : "1px solid #474461", borderRadius: 2, mb: 3 }}>
                    <Grid container>
                        {[
                            { label: "Fulltime", percentage: "48%", value: "112", color: "#ffc107" },
                            { label: "Contract", percentage: "20%", value: "112", color: "#3f6974" },
                            { label: "Probation", percentage: "22%", value: "12", color: "#e60000" },
                            { label: "WFH", percentage: "20%", value: "04", color: "#ff3e9d" },
                        ].map((item, index) => (
                            <Grid
                                item
                                xs={6}
                                key={item.label}
                                sx={{
                                    p: 2,
                                    borderBottom: index < 2 ? `1px solid ${theme.palette.mode === "light" ? "#ddd" : "#474461"}` : "none",
                                    borderRight: index % 2 === 0 ? `1px solid ${theme.palette.mode === "light" ? "#ddd" : "#474461"}` : "none",
                                }}
                            >
                                <Typography variant="body2" sx={{ fontSize: 13, display: "flex", alignItems: "center", mb: 1, color: theme.palette.mode === "light" ? "#777" : "#fff" }}>
                                    <Box
                                        component="span"
                                        sx={{
                                            display: "inline-block",
                                            width: 12,
                                            height: 12,
                                            bgcolor: `${item.color}`,
                                            borderRadius: "2px",
                                            mr: 1,
                                        }}
                                    />
                                    {item.label} <span style={{ color: theme.palette.mode === "light" ? "#777" : "#fff", fontWeight: 600, marginLeft: '4px' }}>({item.percentage})</span>
                                </Typography>
                                <Typography fontSize={25} fontWeight={600}>
                                    {item.value}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Top Performer */}
                <Typography fontSize={14} fontWeight={600} mb={2}>
                    Top Performer
                </Typography>
                <Box
                    sx={{
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        border: "1px solid",
                        borderColor: "#7366ff",
                        bgcolor: "#7366ff21",
                        borderRadius: 2,
                        mb: 5,
                    }}
                >
                    <Box display="flex" alignItems="center">
                        {/* <EmojiEventsIcon color="primary" sx={{ fontSize: 30, mr: 1 }} /> */}
                        <Avatar
                            src="images/avatars/avatar-3.png"
                            sx={{ width: 40, height: 40, border: "2px solid white", mr: 3 }}
                        />
                        <Box>
                            <Typography variant="body1" fontWeight="medium" fontSize={14}>
                                Daniel Esbella
                            </Typography>
                            <Typography variant="body2" fontSize={11}>
                                iOS Developer
                            </Typography>
                        </Box>
                    </Box>
                    <Box textAlign="right">
                        <Typography variant="body2" sx={{ fontSize: 13 }}>
                            Performance
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" color="primary" fontSize={16}>
                            99%
                        </Typography>
                    </Box>
                </Box>

                {/* View All Employees Button */}
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
                    View All Employees
                </Button>
            </CardContent>
        </Card>
    );
};

export default EmployeeStatus;
