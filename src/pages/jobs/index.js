import { useEffect, useState } from 'react'
import { Box, Tooltip, useTheme } from '@mui/material'
import { TabList, TabPanel, TabContext } from '@mui/lab'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import JobRequirement from 'src/views/jobs/JobRequirement'
import ApplicantList from 'src/views/jobs/ApplicantList'
import { motion } from 'framer-motion'
import { LicenseDraftIcon, UserAccountIcon } from 'hugeicons-react'

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

const Jobs = () => {
  // ** State
  const [value, setValue] = useState('requirement')
  const [loading, setLoading] = useState(true)
  const theme = useTheme()

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
          <Box
            sx={{
              borderTop: `1px solid ${theme.palette.customColors.borderPrimary}`,
              borderBottom: `1px solid ${theme.palette.customColors.borderPrimary}`,
              borderRadius: '12px'
            }}
          >
            <TabList
              onChange={handleChange}
              aria-label='account-settings tabs'
              indicatorColor='none'
            >
              <Tab
                value='requirement'
                label={
                  <Tooltip title='Requirement'>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <UserAccountIcon />
                      <TabName>Requirement</TabName>
                    </Box>
                  </Tooltip>
                }
              />
              <Tab
                value='applicant'
                label={
                  <Tooltip title='Applicant List'>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LicenseDraftIcon />
                      <TabName>Applicant List</TabName>
                    </Box>
                  </Tooltip>
                }
              />
            </TabList>
          </Box>
        </motion.div>

        <TabPanel sx={{ p: 0 }} value='requirement'>
          <JobRequirement />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='applicant'>
          <ApplicantList />
        </TabPanel>
      </TabContext>
    </>
  )
}

export default Jobs