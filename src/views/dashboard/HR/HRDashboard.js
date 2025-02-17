import { Box, Grid, List, ListItem, Typography } from '@mui/material'
import { ChevronRight } from 'mdi-material-ui'
import React from 'react'
import WelcomeSection from './WelcomeSection';
import TotalEmployee from './TotalEmployee';
import TotalApplication from './TotalApplication';
import HiredCandidates from './HiredCandidates';
import RejectedCandidates from './RejectedCandidates';
import ApplicationReceived from './ApplicationReceived';
import Employee from './Employee';
import UpcomingScheduled from './UpcomingScheduled';
import TotalProjects from './TotalProjects';
import UpcomingInterview from './UpcomingInterview';
import TodayCard from './TodayCard';
import RecentPayroll from './RecentPayroll';

const HRDashboard = () => {
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <Box>
                    <Typography fontWeight={600} fontSize={'16px'}>HR</Typography>
                </Box>
                <List sx={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '1rem', fontWeight: 'normal', padding: 0 }}>
                    <ListItem sx={{ color: 'text.primary', padding: 0, fontSize: 14 }}>Dashboard</ListItem>
                    <ChevronRight sx={{ fontSize: 14 }} />
                    <ListItem sx={{ color: 'text.primary', padding: 0, fontSize: 14 }}>HR</ListItem>
                </List>
            </Box>

            <Grid container spacing={3} mt={3}>
                <WelcomeSection />
            </Grid>

            <Grid container spacing={5} mt={3}>
                <Grid item xs={12} sm={6} md={6}><TotalEmployee /></Grid>
                <Grid item xs={12} sm={6} md={6}><TotalApplication /></Grid>
                <Grid item xs={12} sm={6} md={6}><HiredCandidates /></Grid>
                <Grid item xs={12} sm={6} md={6}><RejectedCandidates /></Grid>
            </Grid>

            <Grid container spacing={5} mt={3}>
                <Grid item xs={12}><ApplicationReceived /></Grid>
                <Grid item xs={12}><Employee /></Grid>
            </Grid>

            <Grid container spacing={3} mt={3}>
                {/* Left Sidebar */}
                <Grid item xs={12} md={4}><UpcomingScheduled /></Grid>

                {/* Center and Right Section */}
                <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}><TotalProjects /></Grid>
                        <Grid item xs={12} md={6}><UpcomingInterview /></Grid>
                        <Grid item xs={12}><TodayCard /></Grid>
                        <Grid item xs={12}><RecentPayroll /></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default HRDashboard
