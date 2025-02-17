import { Box, Card, Grid, Typography } from '@mui/material'
import dynamic from 'next/dynamic';
import React from 'react'
const EmployeeChart = dynamic(() => import('./charts/EmployeeChart'), { ssr: false });

const TotalEmployee = () => {
    return (
        <Card sx={{ p: 5 }}>
            <Grid container spacing={2}>
                <Grid item xs={7} sm={7} md={9}>
                    <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
                        Total Employee
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 3, mb: 4 }}>
                        615
                    </Typography>
                </Grid>
                <Grid item xs={5} sm={5} md={3}>
                    <EmployeeChart />
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 3 }}>
                <Typography variant='subtitle2' sx={{ color: 'text.secondary', flexGrow: 1 }}>
                    <span style={{ fontWeight: 'medium', color: 'green' }}>15%</span> Increase
                </Typography>
                <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>This Month</Typography>
            </Box>
        </Card>
    )
}

export default TotalEmployee
