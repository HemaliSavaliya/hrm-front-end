import { Avatar, Box, Card, CardContent, Link, Typography } from '@mui/material'
import { UserGroupIcon } from 'hugeicons-react'
import { MenuDown } from 'mdi-material-ui'
import React from 'react'

const TotalClient = () => {
    return (
        <Card sx={{ flex: 1, height: { xl: '190px' } }}>
            <CardContent>
                <Box display="flex" flexDirection="column" mb={2}>
                    <Avatar sx={{ backgroundColor: "#1B84FF", width: 42, height: 42 }}>
                        <UserGroupIcon color="#fff" />
                    </Avatar>
                </Box>
                <Typography variant="subtitle2" fontWeight="medium" color="text.secondary" mb={1}>
                    Total No of Clients
                </Typography>
                <Typography fontSize={15} fontWeight={600} mb={2}>
                    69/86 <Typography component="span" variant="body2" color="red" sx={{ fontWeight: "medium" }}>
                        <MenuDown fontSize="small" sx={{ verticalAlign: "middle", mr: 0.5 }} />-11.2%
                    </Typography>
                </Typography>
                <Link href="#" color="primary" fontSize={12}>View Details</Link>
            </CardContent>
        </Card>
    )
}

export default TotalClient
