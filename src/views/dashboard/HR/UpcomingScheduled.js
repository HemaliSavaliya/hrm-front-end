import { Box, Card, Grid, Paper, Typography, useTheme } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { Calendar } from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/styles/index.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

const EventItem = ({ day, month, title, time, creator }) => {
    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item>
                <Paper sx={{ width: '3rem', height: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: 'none' }}>
                    <Typography variant="subtitle1">{day}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{month}</Typography>
                </Paper>
            </Grid>
            <Grid item xs>
                <Typography variant="body1" fontSize={'14px'} fontWeight={600}> {title}
                    {time &&
                        <Typography component="span" sx={{ display: 'inline-block', marginLeft: 1, padding: '2px 8px', fontSize: 11, borderRadius: 1, backgroundColor: 'background.default', color: 'text.secondary' }}>
                            {time}
                        </Typography>
                    }
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>{creator}
                </Typography>
            </Grid>
        </Grid>
    )
};

const UpcomingScheduled = () => {
    const theme = useTheme();
    const calendarRef = useRef(null);

    useEffect(() => {
        if (calendarRef.current) {
            const calendar = new Calendar(calendarRef.current, {
                settings: {
                    selection: {
                        day: 'single', // Allow single day selection
                    },
                },
                selectedTheme: theme.palette.mode === 'light' ? 'light' : 'dark'
            });

            // Initialize the calendar
            calendar.init();
        }
    }, [theme.palette.mode]);

    return (
        <Card sx={{ p: 5, height: "982px" }}>
            <Box>
                <Typography variant="subtitle1" fontWeight={600} mb={3}>Upcoming Scheduled</Typography>
                <Box id="calendar" sx={{ width: 'auto', padding: 1 }}>
                </Box>
                <Box ref={calendarRef} padding={0} />
                <PerfectScrollbar style={{ maxHeight: "650px", paddingRight: "10px" }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 3 }}> {/* Event Items */}
                        <EventItem day="28" month="July" title="Meeting with Designer" time="09:57 AM" creator="Created by Admin" />
                        <EventItem day="08" month="June" title="Developing Line Managers Conference" time="10:54 AM" creator="Created by HR" />
                        <EventItem day="17" month="July" title="Airplane in Las Vegas" time="12:00 PM" creator="Created by HR" />
                        <EventItem day="11" month="Nov" title="Hospitality Project Discuses" creator="Created by Admin" />
                        <EventItem day="20" month="Nov" title="Gartner Digital Workplace" time="03:49 PM" creator="Created by HR" />
                        <EventItem day="04" month="Dec" title="Nordic People Analytics" time="11:00 AM" creator="Created by Admin" />
                        <EventItem day="17" month="Jan" title="CIPD Festival of Work" time="01:29 PM" creator="Created by HR" />
                        <EventItem day="03" month="Feb" title="HRO Today Forum" time="02:15 PM" creator="Created by Admin" />
                        <EventItem day="28" month="July" title="Meeting with Designer" time="09:57 AM" creator="Created by Admin" />
                        <EventItem day="08" month="June" title="Developing Line Managers Conference" time="10:54 AM" creator="Created by HR" />
                        <EventItem day="17" month="July" title="Airplane in Las Vegas" time="12:00 PM" creator="Created by HR" />
                    </Box>
                </PerfectScrollbar>

            </Box>
        </Card>
    )
}

export default UpcomingScheduled
