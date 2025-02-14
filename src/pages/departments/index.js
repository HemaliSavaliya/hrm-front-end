import React, { useEffect, useState } from 'react'
import { Box, useTheme, Tooltip } from '@mui/material'
import { motion } from 'framer-motion'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import Department from 'src/views/department/Department'
import { IdVerifiedIcon, PackageSearchIcon } from 'hugeicons-react'
import Designation from 'src/views/designation/Designation'

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

const Departments = () => {
    const [value, setValue] = useState('department')
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
                            value='department'
                            label={
                                <Tooltip title='Department'>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <PackageSearchIcon />
                                        <TabName>Department</TabName>
                                    </Box>
                                </Tooltip>
                            }
                        />
                        <Tab
                            value='designation'
                            label={
                                <Tooltip title='Designation'>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <IdVerifiedIcon />
                                        <TabName>Designation</TabName>
                                    </Box>
                                </Tooltip>
                            }
                        />
                    </TabList>
                </Box>
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

export default Departments
