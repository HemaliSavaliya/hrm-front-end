import React from 'react';
import { Box, Card, Typography, Avatar, Button, Divider, useTheme } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Call02Icon, Comment01Icon, Mail01Icon } from 'hugeicons-react';

const TeamMembers = () => {
    const theme = useTheme();

    const teamMembers = [
        {
            name: 'Alexander Jermai',
            role: 'UI/UX Designer',
            img: '/images/avatars/1.png',
        },
        {
            name: 'Doglas Martini',
            role: 'Product Designer',
            img: '/images/avatars/2.png',
        },
        {
            name: 'Daniel Esbella',
            role: 'Project Manager',
            img: '/images/avatars/3.png',
        },
        {
            name: 'Daniel Esbella',
            role: 'Team Lead',
            img: '/images/avatars/4.png',
        },
        {
            name: 'Stephan Peralt',
            role: 'Team Lead',
            img: '/images/avatars/5.png',
        },
        {
            name: 'Andrew Jermia',
            role: 'Project Lead',
            img: '/images/avatars/6.png',
        },
        {
            name: 'Daniel Esbella',
            role: 'Team Lead',
            img: '/images/avatars/4.png',
        },
        {
            name: 'Stephan Peralt',
            role: 'Team Lead',
            img: '/images/avatars/5.png',
        },
        {
            name: 'Andrew Jermia',
            role: 'Project Lead',
            img: '/images/avatars/6.png',
        },
        {
            name: 'Daniel Esbella',
            role: 'Team Lead',
            img: '/images/avatars/4.png',
        },
        {
            name: 'Stephan Peralt',
            role: 'Team Lead',
            img: '/images/avatars/5.png',
        },
        {
            name: 'Andrew Jermia',
            role: 'Project Lead',
            img: '/images/avatars/6.png',
        },
    ];

    return (
        <Card sx={{ height: "461px" }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px',
            }}>
                <Typography fontSize={16} fontWeight={600}>Team Members</Typography>
                <Button
                    variant="outlined"
                    size="small"
                    sx={{
                        backgroundColor: theme.palette.mode === 'light' ? '#F8F9FA' : '#312d4b',
                        border: theme.palette.mode === "light" ? '1px solid #F8F9FA' : "1px solid #ffffff36",
                        color: theme.palette.mode === 'light' ? '#111827' : '#fff',
                        '&:hover': {
                            border: theme.palette.mode === 'light' ? '1px solid primary.main' : '1px solid #F8F9FA',
                        }
                    }}
                >
                    View All
                </Button>
            </Box>
            <Divider sx={{ m: 0 }} />
            <PerfectScrollbar style={{ maxHeight: 380 }}>
                <Box padding={'15px'}>
                    {teamMembers.map((member, index) => (
                        <Box
                            key={index}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={4}
                        >
                            {/* Member Info */}
                            <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }}>
                                <Avatar
                                    src={member.img}
                                    alt={member.name}
                                    sx={{ width: 42, height: 42, border: '2px solid', borderColor: 'divider' }}
                                />
                                <Box ml={2}>
                                    <Typography
                                        sx={{
                                            whiteSpace: 'normal',
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: 'vertical',
                                            display: '-webkit-box',
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                color: 'primary.main'
                                            }
                                        }}
                                    >
                                        {member.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {member.role}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Action Buttons */}
                            <Box display="flex" alignItems="center">
                                <Button
                                    sx={{
                                        backgroundColor: theme.palette.mode === 'light' ? '#F8F9FA' : '#312d4b',
                                        border: theme.palette.mode === "light" ? '1px solid #F8F9FA' : "1px solid #ffffff36",
                                        color: theme.palette.mode === 'light' ? '#111827' : '#fff',
                                        width: 28,
                                        height: 28,
                                        padding: '4px 8px',
                                        minWidth: 28,
                                        mr: 2,
                                        '&:hover': {
                                            border: theme.palette.mode === 'light' ? '1px solid primary.main' : '1px solid #F8F9FA',
                                        },
                                    }}
                                >
                                    <Call02Icon size={12} />
                                </Button>
                                <Button
                                    sx={{
                                        width: 28,
                                        height: 28,
                                        backgroundColor: theme.palette.mode === 'light' ? '#F8F9FA' : '#312d4b',
                                        border: theme.palette.mode === "light" ? '1px solid #F8F9FA' : "1px solid #ffffff36",
                                        color: theme.palette.mode === 'light' ? '#111827' : '#fff',
                                        '&:hover': {
                                            border: theme.palette.mode === 'light' ? '1px solid primary.main' : '1px solid #F8F9FA',
                                        },
                                        padding: '4px 8px',
                                        minWidth: 28,
                                        mr: 2
                                    }}
                                >
                                    <Mail01Icon size={12} />
                                </Button>
                                <Button
                                    sx={{
                                        width: 28,
                                        height: 28,
                                        backgroundColor: theme.palette.mode === 'light' ? '#F8F9FA' : '#312d4b',
                                        border: theme.palette.mode === "light" ? '1px solid #F8F9FA' : "1px solid #ffffff36",
                                        color: theme.palette.mode === 'light' ? '#111827' : '#fff',
                                        '&:hover': {
                                            border: theme.palette.mode === 'light' ? '1px solid primary.main' : '1px solid #F8F9FA',
                                        },
                                        padding: '4px 8px',
                                        minWidth: 28,
                                    }}
                                >
                                    <Comment01Icon size={12} />
                                </Button>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </PerfectScrollbar>
        </Card>
    );
};

export default TeamMembers;
