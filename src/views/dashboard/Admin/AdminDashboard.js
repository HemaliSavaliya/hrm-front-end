import { Box, Grid, List, ListItem, Typography } from '@mui/material'
import { ChevronRight } from 'mdi-material-ui'
import React from 'react'
import WelcomeCard from './WelcomeCard'
import Attendance from './Attendance'
import TotalProjects from './TotalProjects'
import TotalClient from './TotalClient'
import TotalTask from './TotalTask'
import TotalEarning from './TotalEarning'
import TotalProfit from './ProfitWeek'
import JobApplicants from './JobApplicants'
import NewHire from './NewHire'
import EmployeesByDepartment from './EmployeesByDepartment'
import EmployeeStatus from './EmployeeStatus'
import AttendanceOverview from './AttendanceOverview'
import ClockInOutCard from './ClockInOutCard'
import RecentActivities from './RecentActivities'
import Birthdays from './Birthdays'
import Schedules from './Schedules'
import JobApplicant from './JobsApplicants'
import EmployeesCard from './EmployeesCard'
import TodoList from './TodoList'
import SalesOverviewCard from './SalesOverviewCard'
import InvoicesCard from './InvoicesCard'
import Projects from './Projects'
import TasksStatistics from './TasksStatistics'

const AdminDashboard = () => {
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <Box>
                    <Typography fontWeight={600} fontSize={'16px'}>Admin</Typography>
                </Box>
                <List sx={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '1rem', fontWeight: 'normal', padding: 0 }}>
                    <ListItem sx={{ color: 'text.primary', padding: 0, fontSize: 14 }}>Dashboard</ListItem>
                    <ChevronRight sx={{ fontSize: 14 }} />
                    <ListItem sx={{ color: 'text.primary', padding: 0, fontSize: 14 }}>Admin</ListItem>
                </List>
            </Box>

            <WelcomeCard />

            <Grid container spacing={5} mt={3}>
                {/* First Grid (8 columns in xl) */}
                <Grid item xs={12} xl={8} sx={{ order: { xs: 1, xl: 1 } }}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={4} md={3} lg={3} xl={3}><Attendance /></Grid>
                        <Grid item xs={12} sm={4} md={3} lg={3} xl={3}><TotalProjects /></Grid>
                        <Grid item xs={12} sm={4} md={3} lg={3} xl={3}><TotalClient /></Grid>
                        <Grid item xs={12} sm={4} md={3} lg={3} xl={3}><TotalTask /></Grid>
                        <Grid item xs={12} sm={4} md={3} lg={3} xl={3}><TotalEarning /></Grid>
                        <Grid item xs={12} sm={4} md={3} lg={3} xl={3}><TotalProfit /></Grid>
                        <Grid item xs={12} sm={4} md={3} lg={3} xl={3}><JobApplicants /></Grid>
                        <Grid item xs={12} sm={4} md={3} lg={3} xl={3}><NewHire /></Grid>
                    </Grid>
                </Grid>

                {/* Second Grid (4 columns in xl) */}
                <Grid item xs={12} xl={4} sx={{ order: { xs: 2, xl: 2 } }}>
                    <EmployeesByDepartment />
                </Grid>

                {/* Other sections with controlled order */}
                <Grid item xs={12} xl={4} sx={{ order: { xs: 3, xl: 4 } }}><EmployeeStatus /></Grid>
                <Grid item xs={12} md={6} lg={6} xl={4} sx={{ order: { xs: 4, xl: 5 } }}><AttendanceOverview /></Grid>
                <Grid item xs={12} md={6} lg={6} xl={4} sx={{ order: { xs: 5, xl: 6 } }}><ClockInOutCard /></Grid>
                <Grid item xs={12} xl={4} sx={{ order: { xs: 6, xl: 7 } }}><JobApplicant /></Grid>
                <Grid item xs={12} md={6} lg={6} xl={4} sx={{ order: { xs: 7, xl: 8 } }}><EmployeesCard /></Grid>
                <Grid item xs={12} xl={4} sx={{ order: { xs: 13, xl: 14 } }}><Schedules /></Grid>
                <Grid item xs={12} md={6} lg={6} xl={4} sx={{ order: { xs: 8, xl: 9 } }}><TodoList /></Grid>
                <Grid item xs={12} md={6} lg={6} xl={4} sx={{ order: { xs: 14, xl: 15 } }}><RecentActivities /></Grid>
                <Grid item xs={12} md={6} lg={6} xl={4} sx={{ order: { xs: 15, xl: 16 } }}><Birthdays /></Grid>
                <Grid item xs={12} md={7} lg={7} xl={7} sx={{ order: { xs: 9, xl: 10 } }}><SalesOverviewCard /></Grid>
                <Grid item xs={12} md={5} lg={5} xl={5} sx={{ order: { xs: 10, xl: 11 } }}><InvoicesCard /></Grid>
                <Grid item xs={12} md={7} lg={7} xl={8} sx={{ order: { xs: 11, xl: 12 } }}><Projects /></Grid>
                <Grid item xs={12} md={5} lg={5} xl={4} sx={{ order: { xs: 12, xl: 13 } }}><TasksStatistics /></Grid>
            </Grid>
        </Box>
    )
}

export default AdminDashboard
