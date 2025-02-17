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
    Divider,
    useTheme,
} from "@mui/material";
import dynamic from "next/dynamic";
import { Calendar04Icon } from "hugeicons-react";
const EmployeeChart = dynamic(() => import('./charts/EmployeeChart'), { ssr: false });

const EmployeesByDepartment = () => {
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
        <Card sx={{ flexGrow: 1, height: { xl: '400px' } }}>
            <CardHeader
                title={<Typography fontSize={16} fontWeight={600}>Employees By Department</Typography>}
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
            <CardContent>
                <EmployeeChart />
                <Typography variant="body2" sx={{ fontSize: 13, mt: 1 }}>
                    <Box
                        component="span"
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            color: "#FF6F28",
                            fontSize: 15,
                            marginRight: 1,
                        }}
                    >
                        ●
                    </Box>
                    No of Employees increased by{" "}
                    <Box component="span" sx={{ color: "success.main", fontWeight: "bold" }}>
                        +20%
                    </Box>{" "}
                    from last Week
                </Typography>
            </CardContent>
        </Card>
    );
};

export default EmployeesByDepartment;
