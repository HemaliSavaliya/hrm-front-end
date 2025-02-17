import React from "react";
import { Card, CardHeader, CardContent, Typography, Avatar, Button, Box, Divider, useTheme } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";

const birthdays = [
    { name: "Andrew Jermia", role: "IOS Developer", avatar: "images/avatars/avatar-2.png", date: "Today" },
    { name: "Andrew Jermia", role: "IOS Developer", avatar: "images/avatars/avatar-2.png", date: "Today" },
    { name: "Mary Zeen", role: "UI/UX Designer", avatar: "images/avatars/avatar-3.png", date: "Tomorrow" },
    { name: "Antony Lewis", role: "Android Developer", avatar: "images/avatars/avatar-7.png", date: "Tomorrow" },
    { name: "Antony Lewis", role: "Android Developer", avatar: "images/avatars/avatar-7.png", date: "Tomorrow" },
    { name: "Doglas Martini", role: ".Net Developer", avatar: "images/avatars/avatar-10.png", date: "25 Jan 2025" },
    { name: "Doglas Martini", role: ".Net Developer", avatar: "images/avatars/avatar-10.png", date: "25 Jan 2025" },
];

const groupByDate = (birthdays) => {
    return birthdays.reduce((acc, person) => {
        if (!acc[person.date]) {
            acc[person.date] = [];
        }
        acc[person.date].push(person);
        return acc;
    }, {});
};

const Birthdays = () => {
    const theme = useTheme();
    const groupedBirthdays = groupByDate(birthdays);

    return (
        <Card sx={{ height: { xs: "509px", xl: '529px' }, display: "flex", flexDirection: "column" }}>
            <CardHeader
                title={<Typography fontSize={16} fontWeight={600}>Birthdays</Typography>}
                action={
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
                }
            />
            <Divider sx={{ margin: 0 }} />

            {/* Ensure proper height and scrolling behavior */}
            <Box sx={{ flex: 1, overflow: "hidden" }}>
                <PerfectScrollbar style={{ maxHeight: "450px" }}>
                    <CardContent>
                        {Object.entries(groupedBirthdays).map(([date, people]) => (
                            <Box key={date} sx={{ marginBottom: "15px" }}>
                                <Typography variant="subtitle2" gutterBottom fontSize={14} fontWeight={600}>
                                    {date}
                                </Typography>
                                {people.map((person, index) => (
                                    <Box key={index} sx={{ background: theme.palette.mode === "light" ? "#f8f9fa" : "#403d59", padding: "10px", borderRadius: "5px", marginBottom: "10px" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                <Avatar src={person.avatar} />
                                                <Box sx={{ marginLeft: "10px" }}>
                                                    <Typography variant="body1"
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
                                                    >{person.name}</Typography>
                                                    <Typography variant="body2" color="textSecondary">{person.role}</Typography>
                                                </Box>
                                            </Box>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                sx={{
                                                    backgroundColor: '#3B7080',
                                                    border: '1px solid #3B7080',
                                                    color: '#FFF',
                                                    padding: '0.25rem 0.5rem',
                                                    fontSize: '0.6rem',
                                                    borderRadius: '5px',
                                                    transition: 'all 0.5s',
                                                    fontWeight: 500
                                                }}
                                            >
                                                Send
                                            </Button>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        ))}
                    </CardContent>
                </PerfectScrollbar>
            </Box>
        </Card>
    );
};

export default Birthdays;
