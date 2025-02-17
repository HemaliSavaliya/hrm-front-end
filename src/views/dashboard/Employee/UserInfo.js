import { Avatar, Box, Card, CardContent, CardHeader, Typography, useTheme } from '@mui/material'
import React from 'react'
import useUserInfoData from 'src/hooks/Dashboard/Employee/useUserInfoData';

const UserInfo = () => {
    const theme = useTheme();
    const { user } = useUserInfoData()

    if (!user) {
        return <Typography>Loading...</Typography>;
    }

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
            {/* Card Header */}
            <CardHeader
                sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    padding: '1rem 1.25rem 1rem',
                }}
                avatar={
                    <Avatar
                        src={user?.profileImage || '/images/avatars/default-face.png'} // Dynamic avatar
                        alt={user?.name}
                        sx={{ width: 45, height: 45, border: '2px solid white' }}
                    />
                }
                title={
                    <Typography fontSize={'16px'} color={'white'} fontWeight={600} mb={1}>
                        {user?.name}
                    </Typography>
                }
                subheader={
                    <Box>
                        <Typography color={'white'} fontSize={12}>
                            {user?.designation}
                        </Typography>
                    </Box>
                }
            />
            {/* Card Body */}
            <CardContent sx={{ paddingTop: '20px !important', paddingBottom: '20px' }}>
                <Box mb={3}>
                    <Typography variant="caption" mb={0.5} fontWeight={600}>
                        Phone Number
                    </Typography>
                    <Typography variant="body2" color={theme.palette.mode === "light" ? "black" : "#cfcce5"}>
                        {user?.mobileNo || 'N/A'}
                    </Typography>
                </Box>
                <Box mb={3}>
                    <Typography variant="caption" mb={0.5} fontWeight={600}>
                        Email Address
                    </Typography>
                    <Typography variant="body2" color={theme.palette.mode === "light" ? "black" : "#cfcce5"}>
                        <a href={`mailto:${user?.email}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {user?.email || 'N/A'}
                        </a>
                    </Typography>
                </Box>
                <Box mb={3}>
                    <Typography variant="caption" mb={0.5} fontWeight={600}>
                        Birth on
                    </Typography>
                    <Typography variant="body2" color={theme.palette.mode === "light" ? "black" : "#cfcce5"}>
                        {user?.birthDate || 'N/A'}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="caption" mb={0.5} fontWeight={600}>
                        Joined on
                    </Typography>
                    <Typography variant="body2" color={theme.palette.mode === "light" ? "black" : "#cfcce5"}>
                        {user?.joiningDate || 'N/A'}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default UserInfo
