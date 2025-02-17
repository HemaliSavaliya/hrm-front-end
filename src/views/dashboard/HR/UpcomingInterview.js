import { Avatar, Box, Button, Card, Divider, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material'
import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Calendar04Icon, Clock01Icon, MoreVerticalSquare01Icon } from 'hugeicons-react';

const UpcomingInterview = () => {
    const [anchorElInter, setAnchorElInter] = useState(null);
    const openInter = Boolean(anchorElInter);

    const handleMenuOpen = (event) => {
        setAnchorElInter(event.currentTarget);
    };

    const handleMenuCloseInter = () => {
        setAnchorElInter(null);
    };

    const interviews = [
        {
            id: 1,
            name: "James Krogman",
            email: "james@tailwick.com",
            date: "25 Nov",
            time: "02:41 PM",
            status: "Confirm",
            avatar: "/images/avatars/avatar-2.png",
            statusColor: "success.main",
        },
        {
            id: 2,
            name: "Michael Scott",
            email: "michael@tailwick.com",
            date: "05 Dec",
            time: "01:23 PM",
            status: "Re-scheduled",
            avatar: "/images/avatars/avatar-3.png",
            statusColor: "warning.main",
        },
        {
            id: 3,
            name: "Denise Ledford",
            email: "ledford@tailwick.com",
            date: "27 Nov",
            time: "11:59 PM",
            status: "Scheduled",
            avatar: "/images/avatars/avatar-7.png",
            statusColor: "info.main",
        },
        {
            id: 4,
            name: "Gladys Smith",
            email: "gap-4@tailwick.com",
            date: "07 Dec",
            time: "05:19 PM",
            status: "Cancelled",
            avatar: "/images/avatars/avatar-10.png",
            statusColor: "error.main",
        },
    ];

    return (
        <Card sx={{ p: 5, height: '512px' }}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Typography variant="subtitle1" fontWeight={600} mb={3} flexGrow={1}>
                    Upcoming Interview
                </Typography>
            </Box>

            {/* Wrap scrollable area with PerfectScrollbar */}
            <PerfectScrollbar style={{ maxHeight: 350 }}>
                <Box px={2}>
                    <Stack spacing={2}>
                        {interviews.map((interview) => (
                            <Box
                                key={interview.id}
                                border={1}
                                borderColor="divider"
                                borderRadius={2}
                                p={2}
                            >
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar alt={interview.name} src={interview.avatar} />
                                    <Box flexGrow={1}>
                                        <Typography variant="subtitle1" gutterBottom fontWeight={600} fontSize={'14px'}>
                                            {interview.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {interview.email}
                                        </Typography>
                                    </Box>
                                    <IconButton
                                        aria-controls={openInter ? 'interview-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={openInter ? 'true' : undefined}
                                        onClick={handleMenuOpen}
                                        sx={{
                                            color: 'text.secondary',
                                        }}
                                    >
                                        <MoreVerticalSquare01Icon size={20} />
                                    </IconButton>

                                    <Menu
                                        id="interview-menu"
                                        anchorEl={anchorElInter}
                                        open={openInter}
                                        onClose={handleMenuCloseInter}
                                        PaperProps={{
                                            style: {
                                                minWidth: '10rem',
                                            },
                                        }}
                                    >
                                        {['Overview', 'Edit', 'Delete'].map((option) => (
                                            <MenuItem
                                                key={option}
                                                onClick={handleMenuCloseInter}
                                                sx={{
                                                    fontSize: '1rem',
                                                }}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Stack>
                                <Divider sx={{ mt: 2, mb: 2 }} />
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        display="flex"
                                        alignItems="center"
                                        fontSize={'12px'}
                                        gap={1}
                                    >
                                        <Calendar04Icon size={13} /> {interview.date}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        display="flex"
                                        alignItems="center"
                                        flexGrow={1}
                                        fontSize={'12px'}
                                        gap={1}
                                    >
                                        <Clock01Icon size={13} /> {interview.time}
                                    </Typography>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                            borderColor: interview.statusColor,
                                            color: interview.statusColor,
                                            textTransform: 'capitalize',
                                            fontSize: '12px',
                                            padding: '5px 10px !important'
                                        }}
                                    >
                                        {interview.status}
                                    </Button>
                                </Stack>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </PerfectScrollbar>
        </Card>
    )
}

export default UpcomingInterview;
