import React, { useState } from 'react';
import { Card, Box } from '@mui/material';
import { motion } from "framer-motion";
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import Department from 'src/views/department/Department';
import Designation from 'src/views/department/Designation';
import { BadgeAccountOutline, CheckboxMultipleBlankOutline } from 'mdi-material-ui';

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

const DepartmentIndex = () => {
  const [value, setValue] = useState('department')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
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
            <Tab
              value='department'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckboxMultipleBlankOutline />
                  <TabName>Department</TabName>
                </Box>
              }
            />
            <Tab
              value='designation'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <BadgeAccountOutline />
                  <TabName>Designation</TabName>
                </Box>
              }
            />
          </TabList>
        </Card>
      </motion.div>

      <TabPanel sx={{ p: 0 }} value='department'>
        <Department />
      </TabPanel>
      <TabPanel sx={{ p: 0 }} value='designation'>
        <Designation />
      </TabPanel>
    </TabContext>
  )
}

export default DepartmentIndex;