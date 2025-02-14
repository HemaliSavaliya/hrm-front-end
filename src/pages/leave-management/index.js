import React, { useEffect, useState } from 'react'
import { Box, Tooltip, useTheme } from '@mui/material'
import { TabList, TabPanel, TabContext } from '@mui/lab'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import LeaveRequest from 'src/views/leave/LeaveRequest'
import AllLeaveRequest from 'src/views/leave/AllLeaveRequest'
import LeaveBalance from 'src/views/leave/LeaveBalance'
import LeaveType from 'src/views/leave/LeaveType'
import { motion } from 'framer-motion'
import { CursorInfo02Icon, ReturnRequestIcon } from 'hugeicons-react'

const Tab = styled(MuiTab)(({ theme }) => ({
  lineHeight: 1,
  '&.Mui-selected': {
    fontWeight: 800 // Font weight for selected tab
  },
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  // lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const LeaveManagement = () => {
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)
  const [value, setValue] = useState('')
  const theme = useTheme()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authToken = JSON.parse(localStorage.getItem('login-details'))
      if (authToken) {
        setRole(authToken?.role)
      }
    }
  }, [])

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
    <TabContext value={value}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exist={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        <Box
          sx={{
            borderTop: `1px solid ${theme.palette.customColors.borderPrimary}`,
            borderBottom: `1px solid ${theme.palette.customColors.borderPrimary}`,
            borderRadius: '12px'
          }}
        >
          <TabList onChange={handleChange} aria-label='account-settings tabs' indicatorColor='none'>
            {role !== 'Employee' && (
              <Tab
                value='leave-request'
                label={
                  <Tooltip title='All Leave Request'>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ReturnRequestIcon />
                      <TabName>All Leave Request</TabName>
                    </Box>
                  </Tooltip>
                }
              />
            )}
            {role !== 'Admin' && (
              <Tab
                value='add-request'
                label={
                  <Tooltip title='Leave Request'>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CursorInfo02Icon />
                      <TabName>Leave Request</TabName>
                    </Box>
                  </Tooltip>
                }
              />
            )}
            {role !== 'Admin' && (
              <Tab
                value='leave-balance'
                label={
                  <Tooltip title='Leave Balance'>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <svg viewBox="0 0 24 24" width={24} height={24} fill={"none"}>
                        <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 5H4M14 5H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M17 21H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 7V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M22 14C22 15.6569 20.6569 17 19 17C17.3431 17 16 15.6569 16 14M22 14L19.5 8H18.5L16 14M22 14H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 14C8 15.6569 6.65685 17 5 17C3.34315 17 2 15.6569 2 14M8 14L5.5 8H4.5L2 14M8 14H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <TabName>Leave Balance</TabName>
                    </Box>
                  </Tooltip>
                }
              />
            )}
            {role !== 'Employee' && (
              <Tab
                value='leave-type'
                label={
                  <Tooltip title='Leave Type'>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <svg viewBox="0 0 24 24" width={24} height={24} fill={"none"}>
                        <path d="M3.5 9V14C3.5 17.7712 3.5 19.6569 4.67157 20.8284C5.84315 22 7.72876 22 11.5 22H12.5C16.2712 22 18.1569 22 19.3284 20.8284C20.5 19.6569 20.5 17.7712 20.5 14V10C20.5 6.22876 20.5 4.34315 19.3284 3.17157C18.1569 2 16.2712 2 12.5 2H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.5 17H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.5 7H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.5 12H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.5 16.5C6.5 16.5 7.46758 16.7672 8 18C8 18 9 15 11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 5H3.5M10 5C10 4.15973 7.67332 2.58984 7.08333 2M10 5C10 5.84027 7.67331 7.41016 7.08333 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <TabName>Leave Type</TabName>
                    </Box>
                  </Tooltip>
                }
              />
            )}
          </TabList>
        </Box>
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
  )
}

export default LeaveManagement
