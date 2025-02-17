import { Avatar, Box, Card, CardContent, Link, Typography } from '@mui/material'
import { MenuDown } from 'mdi-material-ui'
import { ProfileIcon } from 'hugeicons-react'
import React from 'react'

const TotalProjects = () => {
    return (
        <Card sx={{ flex: 1, height: { xl: '190px' } }}>
            <CardContent>
                <Box display="flex" flexDirection="column" mb={2}>
                    <Avatar sx={{ backgroundColor: "#3B7080", width: 42, height: 42 }}>
                        <ProfileIcon color="#fff" />
                    </Avatar>
                </Box>
                <Typography variant="subtitle2" fontWeight="medium" color="text.secondary" mb={1}>
                    Total No of Project's
                </Typography>
                <Typography fontSize={15} fontWeight={600} mb={2}>
                    90/125 <Typography component="span" variant="body2" color="red" sx={{ fontWeight: "medium" }}>
                        <MenuDown fontSize="small" sx={{ verticalAlign: "middle", mr: 0.5 }} />-2.1%
                    </Typography>
                </Typography>
                <Link href="#" color="primary" fontSize={12}>View Details</Link>
            </CardContent>
        </Card>
    )
}

export default TotalProjects
