import React, { useState } from "react";
import { Card, CardHeader, CardContent, Typography, Avatar, Menu, MenuItem, IconButton, Divider, useTheme, Box, TableContainer, Table, TableBody, TableRow, TableCell, TableHead, AvatarGroup, LinearProgress, Badge } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import { styled } from "@mui/material/styles";
import { Calendar04Icon } from "hugeicons-react";

const projectData = [
    {
        id: "PRO-001",
        name: "Office Management App",
        team: ["images/avatars/avatar-2.png", "images/avatars/avatar-3.png", "images/avatars/avatar-7.png"],
        hours: "15/255",
        progress: 40,
        deadline: "12 Sep 2024",
        priority: "High",
        priorityColor: "error",
    },
    {
        id: "PRO-002",
        name: "Clinic Management",
        team: ["images/avatars/avatar-2.png", "images/avatars/avatar-7.png", "images/avatars/avatar-10.png"],
        hours: "15/255",
        progress: 40,
        deadline: "24 Oct 2024",
        priority: "Low",
        priorityColor: "success",
    },
    {
        id: "PRO-003",
        name: "Office Management App",
        team: ["images/avatars/avatar-2.png", "images/avatars/avatar-3.png", "images/avatars/avatar-7.png"],
        hours: "15/255",
        progress: 40,
        deadline: "12 Sep 2024",
        priority: "Medium",
        priorityColor: "warning",
    },
    {
        id: "PRO-004",
        name: "Clinic Management",
        team: ["images/avatars/avatar-2.png", "images/avatars/avatar-7.png", "images/avatars/avatar-10.png"],
        hours: "15/255",
        progress: 40,
        deadline: "24 Oct 2024",
        priority: "Low",
        priorityColor: "success",
    },
    {
        id: "PRO-005",
        name: "Office Management App",
        team: ["images/avatars/avatar-2.png", "images/avatars/avatar-3.png", "images/avatars/avatar-7.png"],
        hours: "15/255",
        progress: 40,
        deadline: "12 Sep 2024",
        priority: "High",
        priorityColor: "error",
    },
    {
        id: "PRO-006",
        name: "Clinic Management",
        team: ["images/avatars/avatar-2.png", "images/avatars/avatar-7.png", "images/avatars/avatar-10.png"],
        hours: "15/255",
        progress: 40,
        deadline: "24 Oct 2024",
        priority: "Low",
        priorityColor: "success",
    },
];

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

const Projects = () => {
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
                title={<Typography fontSize={16} fontWeight={600}>Projects </Typography>}
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
                <PerfectScrollbar style={{ maxHeight: "400px" }}>
                    <CardContent sx={{ padding: 0 }}>
                        <TableContainer>
                            <Table sx={{ minWidth: '700px' }}>
                                <TableHead
                                    sx={{
                                        fontWeight: 600,
                                        borderColor: '#E9EDF4',
                                        background: theme.palette.mode === "light" ? '#E5E7EB' : "#44405b",
                                        fontSize: '14px',
                                    }}
                                >
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Team</TableCell>
                                        <TableCell>Hours</TableCell>
                                        <TableCell>Deadline</TableCell>
                                        <TableCell>Priority</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {projectData.map((project) => (
                                        <TableRow key={project.id}>
                                            <TableCell>
                                                <Typography color="primary" fontSize={12}>
                                                    {project.id}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body1" fontSize={12} fontWeight={600}>
                                                    {project.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <AvatarGroup max={4}>
                                                    {project.team.map((img, index) => (
                                                        <StyledAvatar key={index} src={img} />
                                                    ))}
                                                </AvatarGroup>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" fontSize={12}>{project.hours} Hrs</Typography>
                                                <LinearProgress variant="determinate" value={project.progress} />
                                            </TableCell>
                                            <TableCell>
                                                <Typography fontSize={12}>{project.deadline}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    color={project.priorityColor === "error" ? "error"
                                                        : project.priorityColor === "success" ? "success"
                                                            : "warning"}
                                                    variant="dot"
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        flexDirection: 'row-reverse',
                                                        gap: '5px',
                                                        padding: '5px',
                                                        borderRadius: "5px",
                                                        backgroundColor: project.priorityColor === "error" ? "#FAE7E7"
                                                            : project.priorityColor === "success" ? "#D2F5E1"
                                                                : "#FFF3CD",
                                                        "& .MuiBadge-badge": {
                                                            position: "relative !important",
                                                            transform: "none"
                                                        }
                                                    }}
                                                >
                                                    <Typography fontSize={12} color={project.priorityColor === "error" ? "#E70D0D"
                                                        : project.priorityColor === "success" ? "#03C95A"
                                                            : "#E3A008"
                                                    }>{project.priority}</Typography>
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
        </Card>
    );
};

export default Projects;
