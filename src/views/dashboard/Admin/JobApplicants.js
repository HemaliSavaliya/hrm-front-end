import { Avatar, Box, Card, CardContent, Link, Typography } from '@mui/material'
import { PermanentJobIcon } from 'hugeicons-react'
import { MenuUp } from 'mdi-material-ui'
import React from 'react'

const JobApplicants = () => {
    return (
        <Card sx={{ flex: 1, height: { xl: '190px' } }}>
            <CardContent>
                <Box display="flex" flexDirection="column" mb={2}>
                    <Avatar sx={{ backgroundColor: "#03C95A", width: 42, height: 42 }}>
                        <PermanentJobIcon color="#fff" />
                    </Avatar>
                </Box>
                <Typography variant="subtitle2" fontWeight="medium" color="text.secondary" mb={1}>
                    Job Applicants
                </Typography>
                <Typography fontSize={15} fontWeight={600} mb={2}>
                    98  <Typography component="span" variant="body2" color="success.main" sx={{ fontWeight: "medium" }}>
                        <MenuUp fontSize="small" sx={{ verticalAlign: "middle", mr: 0.5 }} />+2.1%
                    </Typography>
                </Typography>
                <Link href="#" color="primary" fontSize={12}>View Details</Link>
            </CardContent>
        </Card>
    )
}

export default JobApplicants
