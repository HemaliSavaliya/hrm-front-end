import React from "react";
import { Card, CardHeader, CardContent, Typography, Box, Avatar, Button, Badge, useTheme, Divider, AvatarGroup } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import { styled } from "@mui/material/styles";

const schedules = [
    {
        role: "UI/UX Designer",
        title: "Interview Candidates - UI/UX Designer",
        date: "Thu, 15 Feb 2025",
        time: "01:00 PM - 02:20 PM",
        badgeColor: "secondary",
        avatars: [
            "images/avatars/avatar-2.png",
            "images/avatars/avatar-3.png",
            "images/avatars/avatar-7.png",
            "images/avatars/avatar-10.png",
            "images/avatars/avatar-2.png",
        ],
    },
    {
        role: "IOS Developer",
        title: "Interview Candidates - IOS Developer",
        date: "Thu, 15 Feb 2025",
        time: "02:00 PM - 04:20 PM",
        badgeColor: "error",
        avatars: [
            "images/avatars/avatar-2.png",
            "images/avatars/avatar-10.png",
            "images/avatars/avatar-7.png",
            "images/avatars/avatar-3.png",
            "images/avatars/avatar-2.png",
        ],
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

const SchedulesCard = () => {
    const theme = useTheme();

    return (
        <Card sx={{ height: { xs: 480, xl: '529px' }, display: "flex", flexDirection: "column" }}>
            {/* Card Header */}
            <CardHeader title={<Typography fontSize={16} fontWeight={600}>Schedules</Typography>} action={
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
            <PerfectScrollbar style={{ maxHeight: "450px" }}>
                <CardContent>
                    {schedules.map((schedule, index) => (
                        <Box key={index} sx={{ backgroundColor: "action.hover", p: 5, borderRadius: 2, mb: 5 }}>
                            <Badge color={schedule.badgeColor} badgeContent={schedule.role}
                                sx={{
                                    mb: 2,
                                    "& .MuiBadge-badge": {
                                        position: "relative !important",
                                        transform: "none"
                                    }
                                }}
                            />
                            <Typography
                                variant="subtitle1"
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
                            >
                                {schedule.title}
                            </Typography>
                            <Box sx={{ display: "flex", flexWrap: "wrap", mt: 1, mb: 1 }}>
                                <Typography fontSize={13} sx={{ mr: 2 }}>
                                    📅 {schedule.date}
                                </Typography>
                                <Typography fontSize={13}>⏰ {schedule.time}</Typography>
                            </Box>

                            <Divider />

                            <Box sx={{ display: { xs: "block", lg: "flex" }, alignItems: "center", justifyContent: "space-between" }}>
                                <Box sx={{ display: "flex", mb: { xs: 2 } }}>
                                    <AvatarGroup max={5}>
                                        {schedule.avatars.slice(0, 4).map((src, idx) => (
                                            <StyledAvatar key={idx} src={src} />
                                        ))}
                                        {schedule.avatars.length > 4 && (
                                            <StyledAvatar sx={{ backgroundColor: "primary.main", color: "white", fontSize: "10px" }}>
                                                +{schedule.avatars.length - 4}
                                            </StyledAvatar>
                                        )}
                                    </AvatarGroup>
                                </Box>
                                <Button
                                    variant="contained"
                                    size="small"
                                    sx={{
                                        padding: '0.25rem 0.5rem',
                                        fontSize: '0.6rem',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    Join Meeting
                                </Button>
                            </Box>
                        </Box>
                    ))}
                </CardContent>
            </PerfectScrollbar>
        </Card >
    );
};

export default SchedulesCard;
