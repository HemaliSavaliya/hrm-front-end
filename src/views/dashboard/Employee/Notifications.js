import React from 'react';
import { Box, Card, Typography, Avatar, Button, Divider, useTheme } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';

const Notifications = () => {
    const theme = useTheme();
    const notifications = [
        {
            user: 'Lex Murphy',
            message: 'requested access to UNIX',
            time: 'Today at 9:42 AM',
            img: '/images/avatars/1.png',
        },
        {
            user: 'Lex Murphy',
            message: 'requested access to UNIX',
            time: 'Today at 10:00 AM',
            img: '/images/avatars/2.png',
        },
        {
            user: 'Lex Murphy',
            message: 'requested access to UNIX',
            time: 'Today at 10:50 AM',
            img: '/images/avatars/4.png',
            actions: true,
        },
        {
            user: 'Lex Murphy',
            message: 'requested access to UNIX',
            time: 'Today at 12:00 PM',
            img: '/images/avatars/7.png',
        },
        {
            user: 'Lex Murphy',
            message: 'requested access to UNIX',
            time: 'Today at 05:00 PM',
            img: '/images/avatars/8.png',
        },
        {
            user: 'Lex Murphy',
            message: 'requested access to UNIX',
            time: 'Today at 05:00 PM',
            img: '/images/avatars/8.png',
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
                <Typography fontSize={16} fontWeight={600}>Notifications</Typography>
                <Button
                    variant="outlined"
                    size="small"
                    sx={{
                        backgroundColor: theme.palette.mode === 'light' ? '#F8F9FA' : '#312d4b',
                        border: theme.palette.mode === "light" ? '1px solid #F8F9FA' : "1px solid #ffffff36",
                        color: theme.palette.mode === 'light' ? '#111827' : '#fff',
                        '&:hover': {
                            border: theme.palette.mode === 'light' ? '1px solid primary.main' : '1px solid #F8F9FA',
                        },
                    }}
                >
                    View All
                </Button>
            </Box>
            <Divider sx={{ m: 0 }} />
            <PerfectScrollbar style={{ maxHeight: 380 }}>
                <Box padding={'15px'}>
                    {notifications.map((notification, index) => (
                        <Box
                            key={index}
                            display="flex"
                            alignItems="start"
                            mb={4}
                        >
                            {/* User Avatar */}
                            <Avatar
                                src={notification.img}
                                alt={notification.user}
                                sx={{ width: 42, height: 42, border: '2px solid', borderColor: 'divider', flexShrink: 0 }}
                            />
                            <Box ml={2}>
                                <Typography
                                    sx={{
                                        whiteSpace: 'normal',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                        display: '-webkit-box',
                                        fontSize: 14,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        fontWeight: 500
                                    }}
                                >
                                    {notification.user} {notification.message}
                                </Typography>
                                <Typography color="textSecondary" fontSize={13} mb={2}>
                                    {notification.time}
                                </Typography>

                                {/* Attachment */}
                                {notification.attachment && (
                                    <Box display="flex" alignItems="center" mb={1}>
                                        <Avatar
                                            src={notification.attachment.img}
                                            alt={notification.attachment.name}
                                            sx={{ width: 24, height: 24, mr: 2, fontSize: 10 }}
                                        />
                                        <Typography variant="body2" fontWeight={400}>
                                            {notification.attachment.name}
                                        </Typography>
                                    </Box>
                                )}

                                {/* Actions */}
                                {notification.actions && (
                                    <Box display="flex" alignItems="center">
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                            sx={{
                                                padding: '0.25rem 0.5rem',
                                                fontSize: '0.75rem',
                                                textTransform: 'capitalize',
                                                borderRadius: '5px',
                                                transition: 'all 0.5s',
                                                fontWeight: 500,
                                                mr: 2
                                            }}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            color="primary"
                                            sx={{
                                                padding: '0.25rem 0.5rem',
                                                fontSize: '0.75rem',
                                                textTransform: 'capitalize',
                                                borderRadius: '5px',
                                                transition: 'all 0.5s',
                                                fontWeight: 500
                                            }}
                                        >
                                            Decline
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </PerfectScrollbar>
        </Card>
    )
}

export default Notifications
