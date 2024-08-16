import React, { useEffect, useState } from 'react'
import { Box, Card } from '@mui/material'
import { TabList, TabPanel, TabContext } from '@mui/lab'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import ListStatus from 'mdi-material-ui/ListStatus'
import ScaleBalance from 'mdi-material-ui/ScaleBalance'
import ApplicationImport from 'mdi-material-ui/ApplicationImport'
import NoteEditOutline from 'mdi-material-ui/NoteEditOutline'
import LeaveRequest from 'src/views/leave/LeaveRequest'
import AllLeaveRequest from 'src/views/leave/AllLeaveRequest'
import LeaveBalance from 'src/views/leave/LeaveBalance'
import LeaveType from 'src/views/leave/LeaveType'
import { motion } from 'framer-motion'

const LeaveManagement = () => {
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

  const [value, setValue] = useState('')

  useEffect(() => {
    if (role) {
      if (role === 'HR' || role === 'Admin') {
        setValue('leave-request')
      } else {
        setValue('add-request')
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
            <TabList
              onChange={handleChange}
              aria-label='account-settings tabs'
              sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
            >
              {role !== 'Employee' && (
                <Tab
                  value='leave-request'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ApplicationImport />
                      <TabName>All Leave Request</TabName>
                    </Box>
                  }
                />
              )}
              {role !== 'Admin' && (
                <Tab
                  value='add-request'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <NoteEditOutline />
                      <TabName>Leave Request</TabName>
                    </Box>
                  }
                />
              )}
              {role !== 'Admin' && (
                <Tab
                  value='leave-balance'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ScaleBalance />
                      <TabName>Leave Balance</TabName>
                    </Box>
                  }
                />
              )}
              {role !== 'Employee' && (
                <Tab
                  value='leave-type'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ListStatus />
                      <TabName>Leave Type</TabName>
                    </Box>
                  }
                />
              )}
            </TabList>
          </Card>
        </motion.div>

        {role !== 'Employee' && (
          <TabPanel sx={{ p: 0 }} value='leave-request'>
            <AllLeaveRequest />
          </TabPanel>
        )}

        {role !== 'Admin' && (
          <TabPanel sx={{ p: 0 }} value='add-request'>
            <LeaveRequest />
          </TabPanel>
        )}

        {role !== 'Admin' && (
          <TabPanel sx={{ p: 0 }} value='leave-balance'>
            <LeaveBalance />
          </TabPanel>
        )}

        {role !== 'Employee' && (
          <TabPanel sx={{ p: 0 }} value='leave-type'>
            <LeaveType />
          </TabPanel>
        )}
      </TabContext>
    </>
  )
}

export default LeaveManagement
