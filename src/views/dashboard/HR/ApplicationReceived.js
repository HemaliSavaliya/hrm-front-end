import { Box, Card, Typography, useTheme } from '@mui/material'
import dynamic from 'next/dynamic';
import React from 'react'
import { styled } from '@mui/material/styles'
const ApplicationReceivedChart = dynamic(() => import('./charts/ApplicationReceivedChart'), { ssr: false });

const MainButton = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    p: 0,
    fontSize: '0.75rem', // Equivalent to text-xs
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.chart : theme.palette.primary.chartDark,
    cursor: "pointer",
    color: 'rgb(14, 165, 233)',
    width: '2rem',
    height: '2rem', // Equivalent to size-8
    borderRadius: '.375rem',
    '&:hover': {
        color: 'white',
        backgroundColor: theme.palette.primary.hover,
        borderColor: theme.palette.primary.hover,
    },
    '&:focus': {
        color: 'white',
        backgroundColor: theme.palette.primary.hover,
        borderColor: theme.palette.primary.hover,
        boxShadow: '0 0 0 4px rgba(100, 181, 246, 0.25)', // Equivalent to focus:ring
    },
    '&:active': {
        color: 'white',
        backgroundColor: theme.palette.primary.hover,
        borderColor: theme.palette.primary.hover,
        boxShadow: '0 0 0 4px rgba(100, 181, 246, 0.25)', // Equivalent to active:ring
    },
    '&.Mui-focusVisible': {
        boxShadow: '0 0 0 4px rgba(100, 181, 246, 0.25)', // Fallback for focus-visible
    },
}))

const ApplicationReceived = () => {
    const theme = useTheme();

    return (
        <Card sx={{ p: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', gap: 2, mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 0 }}>Application Received</Typography>
                <Box display={'flex'} gap={'10px'}>
                    <MainButton sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>All</MainButton>
                    <MainButton>1M</MainButton>
                    <MainButton>6M</MainButton>
                    <MainButton>1Y</MainButton>
                </Box>
            </Box>
            <ApplicationReceivedChart />
        </Card>
    )
}

export default ApplicationReceived
