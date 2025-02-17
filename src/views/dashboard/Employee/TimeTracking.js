import React from 'react';
import { Box, Card, Typography, Grid, useTheme } from '@mui/material';

const TimeTracking = () => {
    const theme = useTheme();

    return (
        <Card sx={{ padding: 5, height: '100%' }}>
            <Grid container spacing={2}>
                {/* Total Working Hours */}
                <Grid item xs={12} sm={6} md={3}>
                    <Box mb={4}>
                        <Typography fontSize={12} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                            <Box
                                component="span"
                                sx={{ display: 'inline-block', mr: 1, color: 'rgba(0,0,0,0.7)' }}
                            >
                                ●
                            </Box>
                            Total Working Hours
                        </Typography>
                        <Typography fontSize={20} fontWeight={600}>12h 36m</Typography>
                    </Box>
                </Grid>

                {/* Productive Hours */}
                <Grid item xs={12} sm={6} md={3}>
                    <Box mb={4}>
                        <Typography fontSize={12} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                            <Box
                                component="span"
                                sx={{ display: 'inline-block', mr: 1, color: 'green' }}
                            >
                                ●
                            </Box>
                            Productive Hours
                        </Typography>
                        <Typography fontSize={20} fontWeight={600}>08h 36m</Typography>
                    </Box>
                </Grid>

                {/* Break Hours */}
                <Grid item xs={12} sm={6} md={3}>
                    <Box mb={4}>
                        <Typography fontSize={12} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                            <Box
                                component="span"
                                sx={{ display: 'inline-block', mr: 1, color: 'orange' }}
                            >
                                ●
                            </Box>
                            Break Hours
                        </Typography>
                        <Typography fontSize={20} fontWeight={600}>22m 15s</Typography>
                    </Box>
                </Grid>

                {/* Overtime */}
                <Grid item xs={12} sm={6} md={3}>
                    <Box mb={4}>
                        <Typography fontSize={12} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                            <Box
                                component="span"
                                sx={{ display: 'inline-block', mr: 1, color: 'blue' }}
                            >
                                ●
                            </Box>
                            Overtime
                        </Typography>
                        <Typography fontSize={20} fontWeight={600}>02h 15m</Typography>
                    </Box>
                </Grid>
            </Grid>

            {/* Progress Bar */}
            <Box sx={{ backgroundColor: theme.palette.mode === "light" ? 'rgba(0, 0, 0, 0.1)' : "rgb(255 255 255 / 13%)", height: '24px', borderRadius: 1, mb: 7 }}>
                <Box
                    sx={{
                        display: 'flex',
                        height: '100%',
                        borderRadius: 1,
                        overflow: 'hidden',
                    }}
                >
                    <Box sx={{ width: '18%', backgroundColor: theme.palette.mode === "light" ? 'white' : "#312d4b" }} />
                    <Box sx={{ width: '18%', backgroundColor: '#03C95A', borderRadius: '4px', mr: '8px' }} />
                    <Box sx={{ width: '5%', backgroundColor: '#FFC107', borderRadius: '4px', mr: '8px' }} />
                    <Box sx={{ width: '28%', backgroundColor: '#03C95A', borderRadius: '4px', mr: '8px' }} />
                    <Box sx={{ width: '17%', backgroundColor: '#FFC107', borderRadius: '4px', mr: '8px' }} />
                    <Box sx={{ width: '22%', backgroundColor: '#03C95A', borderRadius: '4px', mr: '8px' }} />
                    <Box sx={{ width: '5%', backgroundColor: '#FFC107', borderRadius: '4px', mr: '8px' }} />
                    <Box sx={{ width: '3%', backgroundColor: '#1B84FF', borderRadius: '4px', mr: '8px' }} />
                    <Box sx={{ width: '2%', backgroundColor: '#1B84FF', borderRadius: '4px' }} />
                    <Box sx={{ width: '18%', backgroundColor: theme.palette.mode === "light" ? 'white' : "#312d4b" }} />
                </Box>
            </Box>

            {/* Time Labels */}
            <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                {[
                    '06:00',
                    '07:00',
                    '08:00',
                    '09:00',
                    '10:00',
                    '11:00',
                    '12:00',
                    '01:00',
                    '02:00',
                    '03:00',
                    '04:00',
                    '05:00',
                    '06:00',
                    '07:00',
                    '08:00',
                    '09:00',
                    '10:00',
                    '11:00',
                ].map((time, index) => (
                    <Typography key={index} fontSize={10}>
                        {time}
                    </Typography>
                ))}
            </Grid>
        </Card>
    );
};

export default TimeTracking;
