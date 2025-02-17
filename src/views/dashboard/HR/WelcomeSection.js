import { Card, Divider, Grid, Link, Typography } from '@mui/material'
import React from 'react'

const WelcomeSection = () => {
  return (
    <>
      <Grid item xs={12} sm={12} md={8}>
        <Typography variant="h6" sx={{ mb: 2 }}>Welcome Paula Keenan 🎉</Typography> <Typography variant='body2' sx={{ mb: 5, color: 'text.secondary' }}>
          The salary of
          <Link href="#!" underline="hover" sx={{ color: 'text.primary' }}> Glennie Langosh
          </Link> is pending since 05 Dec, 2023. The documentation of the tasks, workflows, and activities that make up a process managed by the HR or People Ops team.
          <Link href="#!" sx={{ color: 'red' }}> Learn More </Link>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Card sx={{ padding: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Grid container spacing={2} textAlign={'center'}>
            <Grid item xs={4} sm={4} md={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                36
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Absent</Typography>
            </Grid>
            <Divider />
            <Grid item xs={4} sm={4} md={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                465
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Attendance</Typography>
            </Grid>
            <Divider />
            <Grid item xs={4} sm={4} md={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                50
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Late</Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </>
  )
}

export default WelcomeSection
