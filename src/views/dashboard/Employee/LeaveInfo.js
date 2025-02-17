import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, Typography, useTheme } from '@mui/material';
import React from 'react'
import useLeaveInfo from 'src/hooks/Dashboard/Employee/useLeaveInfo';

const LeaveInfo = () => {
    const theme = useTheme();
    const { leaveData } = useLeaveInfo()

    return (
        <Card
            sx={{
                height: {
                    xs: 'auto', // Small screens
                    sm: 'auto', // Medium screens
                    md: 'auto', // Large screens
                    lg: '390px', // Large screens
                },
            }}
        >
            <CardHeader
                title={<Typography fontSize={16} fontWeight={600}>Leave Details</Typography>}
            />
            <Divider sx={{ margin: 0 }} />
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6} sm={6}>
                        <Box mb={2}>
                            <Typography fontSize={13} gutterBottom>Total Leaves</Typography>
                            <Typography fontSize={18} fontWeight={600}>{leaveData?.totalLeave}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Box mb={2}>
                            <Typography fontSize={13} gutterBottom>Approved</Typography>
                            <Typography fontSize={18} fontWeight={600}>{leaveData?.totalApprovedLeave}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Box mb={2}>
                            <Typography fontSize={13} gutterBottom>Rejected</Typography>
                            <Typography fontSize={18} fontWeight={600}>{leaveData?.totalApprovedLeave}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Box mb={2}>
                            <Typography fontSize={13} gutterBottom>Pending</Typography>
                            <Typography fontSize={18} fontWeight={600}>{leaveData?.totalPendingLeave}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Box mb={2}>
                            <Typography fontSize={13} gutterBottom>Absent</Typography>
                            <Typography fontSize={18} fontWeight={600}>{leaveData?.absentDays}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Box mb={2}>
                            <Typography fontSize={13} gutterBottom>Worked Days</Typography>
                            <Typography fontSize={18} fontWeight={600}>{leaveData?.workedDays}</Typography>
                        </Box>
                    </Grid>
                    {/* <Grid item xs={6} sm={6}>
                        <Box mb={2}>
                            <Typography fontSize={13} gutterBottom>Loss of Pay</Typography>
                            <Typography fontSize={18} fontWeight={600}>{leaveData?.lossOfPayDays}</Typography>
                        </Box>
                    </Grid> */}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            // color="primary"
                            fullWidth
                            sx={{
                                '&.MuiButton-root:hover': {
                                    backgroundColor: theme.palette.primary.hover
                                }
                            }}
                            onClick={() => console.log('Apply New Leave')}
                        >
                            Apply New Leave
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default LeaveInfo
