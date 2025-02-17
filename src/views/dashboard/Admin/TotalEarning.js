import { Avatar, Box, Card, CardContent, Link, Typography } from '@mui/material'
import { MoneySavingJarIcon } from 'hugeicons-react'
import { MenuUp } from 'mdi-material-ui'
import React from 'react'

const TotalEarning = () => {
    return (
        <Card sx={{ flex: 1, height: { xl: '190px' } }}>
            <CardContent>
                <Box display="flex" flexDirection="column" mb={2}>
                    <Avatar sx={{ backgroundColor: "#AB47BC", width: 42, height: 42 }}>
                        <MoneySavingJarIcon color="#fff" />
                    </Avatar>
                </Box>
                <Typography variant="subtitle2" fontWeight="medium" color="text.secondary" mb={1}>
                    Earnings
                </Typography>
                <Typography fontSize={15} fontWeight={600} mb={2}>
                    $21445  <Typography component="span" variant="body2" color="success.main" sx={{ fontWeight: "medium" }}>
                        <MenuUp fontSize="small" sx={{ verticalAlign: "middle", mr: 0.5 }} />+10.2%
                    </Typography>
                </Typography>
                <Link href="#" color="primary" fontSize={12}>View Details</Link>
            </CardContent>
        </Card>
    )
}

export default TotalEarning
