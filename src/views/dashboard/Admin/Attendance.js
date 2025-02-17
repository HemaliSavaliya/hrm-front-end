import { Avatar, Box, Card, CardContent, Link, Typography } from '@mui/material'
import { Calendar01Icon } from 'hugeicons-react'
import { MenuUp } from 'mdi-material-ui'
import React from 'react'

const Attendance = () => {
    return (
        <Card sx={{ flex: 1, height: { xl: '190px' } }}>
            <CardContent>
                <Box display="flex" flexDirection="column" mb={2}>
                    <Avatar sx={{ backgroundColor: "#F26522", width: 42, height: 42 }}>
                        <Calendar01Icon color="#fff" />
                    </Avatar>
                </Box>
                <Typography variant="subtitle2" fontWeight="medium" color="text.secondary" mb={1}>
                    Attendance Overview
                </Typography>
                <Typography fontSize={15} fontWeight={600} mb={2}>
                    120/154 <Typography component="span" variant="body2" color="success.main" sx={{ fontWeight: "medium" }}>
                        <MenuUp fontSize="small" sx={{ verticalAlign: "middle", mr: 0.5 }} />+2.1%
                    </Typography>
                </Typography>
                <Link href="#" color="primary" fontSize={12}>View Details</Link>
            </CardContent>
        </Card>
    )
}

export default Attendance
