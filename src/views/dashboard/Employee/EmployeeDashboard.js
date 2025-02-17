import { Alert, Box, Grid, IconButton, List, ListItem, Typography, useTheme } from '@mui/material'
import { ChevronRight, Close } from 'mdi-material-ui'
import React, { useState } from 'react'
import UserInfo from './UserInfo';
import LeaveDetail from './LeaveDetail';
import LeaveInfo from './LeaveInfo';
import AttendanceCard from './AttendanceCard';
import TotalHoursCard from './TotalHoursCard';
import TotalHoursWeek from './TotalHoursWeek';
import TotalHoursMonth from './TotalHoursMonth';
import OverTime from './OverTime';
import TimeTracking from './TimeTracking';
import TeamMembers from './TeamMembers';
import Notifications from './Notifications';
import MeetingSchedule from './MeetingSchedule';
import Performance from './Performance';
import MySkills from './MySkills';
import BasicCards from './BasicCards';
import Projects from './Projects';
import Tasks from './Tasks';

const EmployeeDashboard = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(true);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 5 }}>
                <Box>
                    <Typography fontWeight={600} fontSize={'16px'}>Employee</Typography>
                </Box>
                <List sx={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '1rem', fontWeight: 'normal', padding: 0 }}>
                    <ListItem sx={{ color: 'text.primary', padding: 0, fontSize: 14 }}>Dashboard</ListItem>
                    <ChevronRight sx={{ fontSize: 14 }} />
                    <ListItem sx={{ color: 'text.primary', padding: 0, fontSize: 14 }}>Employee</ListItem>
                </List>
            </Box>

            {/* alert */}
            {open && (
                <Alert
                    severity="info"
                    style={{
                        backgroundColor: theme.palette.mode === "light" ? '#EDF2F4' : 'rgb(237 242 244 / 8%)',
                        color: theme.palette.mode === "light" ? "#3B7080" : "#fff",
                        marginBottom: '24px',
                        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                    }}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => setOpen(false)}
                            sx={{ color: theme.palette.mode === "light" ? '#3B7080' : "#fff" }}
                        >
                            <Close fontSize="inherit" />
                        </IconButton>
                    }
                >
                    Your Leave Request on “24th April 2024” has been Approved!!!
                </Alert>
            )}

            {/* cards */}
            <Grid container spacing={5}>
                <Grid item xs={12} sm={12} md={12} lg={3}><UserInfo /></Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}><LeaveDetail /></Grid>
                <Grid item xs={12} sm={12} md={12} lg={3}><LeaveInfo /></Grid>
            </Grid>

            <Grid container spacing={5} mt={1}>
                {/* First Column */}
                <Grid item xs={12} sm={12} xl={4} lg={4} md={12}><AttendanceCard /></Grid>

                {/* Second Column */}
                <Grid item xs={12} sm={12} xl={8} lg={8} md={12} container spacing={2} display="flex">
                    <Grid item xs={12} sm={6} md={6} lg={3} xl={3}><TotalHoursCard /></Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3} xl={3}><TotalHoursWeek /></Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3} xl={3}><TotalHoursMonth /></Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3} xl={3}><OverTime /></Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><TimeTracking /></Grid>
                </Grid>
            </Grid>

            <Grid container spacing={5} mt={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}><Projects /></Grid>
            </Grid>

            <Grid container spacing={5} mt={1}>
                <Grid item xs={12} sm={12} md={6} lg={5}><Performance /></Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}><MySkills /></Grid>
                <Grid item xs={12} sm={12} md={12} lg={3}><BasicCards /></Grid>
            </Grid>

            <Grid container spacing={5} mt={1}>
                <Grid item xs={12} sm={12} md={6} lg={4}><TeamMembers /></Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}><Notifications /></Grid>
                <Grid item xs={12} sm={12} md={12} lg={4}><MeetingSchedule /></Grid>
            </Grid>
        </Box>
    )
}

export default EmployeeDashboard
