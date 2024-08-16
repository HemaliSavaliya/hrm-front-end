import React, { useEffect, useState } from 'react'
import Tracker from '../tracker'
import AttendanceTable from 'src/components/Attendance/AttendanceTable'
import { TabList, TabPanel, TabContext } from '@mui/lab'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import { Box, Card } from '@mui/material'
import Clock from 'mdi-material-ui/Clock'
import WalletOutline from 'mdi-material-ui/WalletOutline'
import RoleWiseAttendance from 'src/views/attendance/RoleWiseAttendance'
import { motion } from 'framer-motion'

const Attendance = () => {
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authToken = JSON.parse(localStorage.getItem('login-details'))
      if (authToken) {
        setRole(authToken?.role)
      }
    }
  }, [])

  const Tab = styled(MuiTab)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      minWidth: 100
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: 67
    }
  }))

  const TabName = styled('span')(({ theme }) => ({
    lineHeight: 1.71,
    fontSize: '0.875rem',
    marginLeft: theme.spacing(2.4),
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  }))

  // ** State
  const [value, setValue] = useState('')

  useEffect(() => {
    if (role) {
      if (role === 'HR' || role === 'Employee') {
        setValue('tracker')
      } else {
        setValue('role-attendance')
      }
    }
  }, [role])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh'
        }}
      >
        <img src='/images/loader.svg' alt='loader' />
      </div>
    )
  }

  return (
    <>
      <TabContext value={value}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exist={{ opacity: 0, y: 15 }}
          transition={{ delay: 0.25 }}
        >
          <Card sx={{ borderRadius: 0 }}>
            <TabList onChange={handleChange} aria-label='account-settings tabs'>
              {(role === 'HR' || role === 'Employee') && (
                <Tab
                  value='tracker'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Clock />
                      <TabName>Tracker</TabName>
                    </Box>
                  }
                />
              )}
              {role !== 'Employee' && (
                <Tab
                  value='role-attendance'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <WalletOutline />
                      <TabName>Role Wise Attendance</TabName>
                    </Box>
                  }
                />
              )}
            </TabList>
          </Card>
        </motion.div>

        {(role === 'HR' || role === 'Employee') && (
          <TabPanel sx={{ p: 0 }} value='tracker'>
            <Tracker />
            <AttendanceTable />
          </TabPanel>
        )}

        {role !== 'Employee' && (
          <TabPanel sx={{ p: 0 }} value='role-attendance'>
            <RoleWiseAttendance />
          </TabPanel>
        )}
      </TabContext>
    </>
  )
}

export default Attendance
