import React from 'react';
import { Box, Card, Typography, Divider } from '@mui/material';
import { Circle } from 'mdi-material-ui';
import PerfectScrollbar from 'react-perfect-scrollbar';

const MeetingSchedule = () => {
    const meetings = [
        {
            time: '09:25 AM',
            title: 'Marketing Strategy Presentation',
            category: 'Marketing',
            color: '#F26522',
        },
        {
            time: '09:20 AM',
            title: 'Design Review Hospital, doctors Management Project',
            category: 'Review',
            color: '#3B7080',
        },
        {
            time: '09:18 AM',
            title: 'Birthday Celebration of Employee',
            category: 'Celebration',
            color: '#FFC107',
        },
        {
            time: '09:10 AM',
            title: 'Update of Project Flow',
            category: 'Development',
            color: '#03C95A',
        },
        {
            time: '11:00 AM',
            title: 'Birthday Celebration of Employee',
            category: 'Celebration',
            color: '#000',
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
                <Typography fontSize={16} fontWeight={600}>Meetings Schedule</Typography>
            </Box>
            <Divider sx={{ m: 0 }} />
            <PerfectScrollbar style={{ maxHeight: 380 }}>
                <Box padding={'15px'}>
                    {meetings.map((meeting, index) => (
                        <Box
                            key={index}
                            display="flex"
                            alignItems="start"
                            mb={index !== meetings.length - 1 ? 4 : 0}
                        >
                            {/* Time and Icon */}
                            <Box display="flex" alignItems="center">
                                <Typography variant="body2" sx={{ minWidth: 70 }}>
                                    {meeting.time}
                                </Typography>
                                <Circle
                                    fontSize="small"
                                    // color={meeting.color}
                                    sx={{ ml: 1, fontSize: 15, width: 15, height: 15, color: meeting.color }}
                                />
                            </Box>
                            {/* Meeting Details */}
                            <Box flex="1" ml={3}>
                                <Box
                                    bgcolor="lightgray"
                                    p={2}
                                    borderRadius={1}
                                    sx={{ backgroundColor: 'background.default' }}
                                >
                                    <Typography variant="body1" fontSize={13} fontWeight="medium" gutterBottom>
                                        {meeting.title}
                                    </Typography>
                                    <Typography fontSize={12} color="text.secondary">
                                        {meeting.category}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </PerfectScrollbar>
        </Card>
    )
}

export default MeetingSchedule
