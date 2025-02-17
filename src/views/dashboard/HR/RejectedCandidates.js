import { Box, Card, Grid, Typography } from '@mui/material'
import dynamic from 'next/dynamic';
import React from 'react'
const RejectedCandidatesChart = dynamic(() => import('./charts/RejectedCandidates'), { ssr: false });

const RejectedCandidates = () => {
    return (
        <Card sx={{ p: 5 }}>
            <Grid container spacing={2}>
                <Grid item xs={7} sm={7} md={9}>
                    <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
                        Rejected Candidates
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 3, mb: 4 }}>
                        110
                    </Typography>
                </Grid>
                <Grid item xs={5} sm={5} md={3}>
                    <RejectedCandidatesChart />
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 3 }}>
                <Typography variant='subtitle2' sx={{ color: 'text.secondary', flexGrow: 1 }}>
                    <span style={{ fontWeight: 'medium', color: 'red' }}>16%</span> Increase
                </Typography>
                <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>This Month</Typography>
            </Box>
        </Card>
    )
}

export default RejectedCandidates
