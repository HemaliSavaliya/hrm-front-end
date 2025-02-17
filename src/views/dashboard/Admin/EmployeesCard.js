import React from "react";
import { Card, CardHeader, CardContent, Typography, Box, Avatar, Button, Badge, useTheme, Divider, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";

const employees = [
    { name: "Anthony Lewis", role: "Finance", avatar: "images/avatars/avatar-2.png" },
    { name: "Brian Villalobos", role: "Development", avatar: "images/avatars/avatar-7.png" },
    { name: "Stephan Peralt", role: "Marketing", avatar: "images/avatars/avatar-3.png" },
    { name: "Doglas Martini", role: "Manager", avatar: "images/avatars/avatar-10.png" },
    { name: "Anthony Lewis", role: "UI/UX Design", avatar: "images/avatars/avatar-7.png" },
    { name: "Brian Villalobos", role: "Development", avatar: "images/avatars/avatar-7.png" },
];

const badgeColors = { Finance: "#AB47BC", Development: "#FD3995", Marketing: "#1B84FF", Manager: "#3B7080", "UI/UX Design": "#FF4081" };

const EmployeesCard = () => {
    const theme = useTheme();

    return (
        <Card sx={{ height: 480, display: "flex", flexDirection: "column" }}>
            {/* Card Header */}
            <CardHeader title={<Typography fontSize={16} fontWeight={600}>Employees</Typography>} action={
                <Button
                    variant="outlined"
                    size="small"
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
            } />
            <Divider sx={{ margin: 0 }} />

            {/* Scrollable Card Body */}
            <CardContent sx={{ p: 0 }}>
                <PerfectScrollbar style={{ maxHeight: "400px", overflow: "hidden" }}>
                    <TableContainer>
                        <Table>
                            <TableHead sx={{
                                fontWeight: 600,
                                borderColor: '#E9EDF4',
                                background: theme.palette.mode === "light" ? '#E5E7EB' : "#44405b",
                                fontSize: '14px',
                            }}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Department</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees.map((employee, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
                                                <Avatar src={employee.avatar} sx={{ mr: 2 }} />
                                                <Box>
                                                    <Typography variant="body1" fontWeight={600} fontSize={15}>{employee.name}</Typography>
                                                    <Typography variant="body2" fontSize={13} color="textSecondary">{employee.role}</Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                sx={{
                                                    backgroundColor: badgeColors[employee.role] || "grey",
                                                    color: "#FFF",
                                                    padding: "4px 8px",
                                                    borderRadius: "5px",
                                                    fontSize: "0.75rem"
                                                }}
                                            >
                                                {employee.role}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </PerfectScrollbar>
            </CardContent>
        </Card >
    );
};

export default EmployeesCard;
