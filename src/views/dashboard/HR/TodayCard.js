import { Avatar, Box, Button, Card, Typography, useTheme } from '@mui/material'
import React from 'react'

const TodayCard = () => {
    const theme = useTheme();

    return (
        <Card sx={{
            position: "relative",
            background: theme.palette.mode === 'light' ? "linear-gradient(to right, transparent, #dbeafe, #b39ddb20)" : 'linear-gradient(to right, transparent, #3b82f633, #3b82f633)',
            overflow: "hidden",
            p: 5,
            mt: 3
        }}>
            {/* Background Image */}
            <Box
                sx={{
                    backgroundImage: "url('/images/cards/hr-dashboard.png')",
                    position: "absolute",
                    inset: 0,
                    backgroundSize: "cover",
                    opacity: 0.3,
                    zIndex: 0,
                }}
            />

            {/* Card Content */}
            <Box sx={{ position: "relative", zIndex: 1 }}>
                {/* Header Section */}
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    {/* Avatar Section */}
                    <Avatar
                        src="/images/avatars/avatar-2.png"
                        alt="Nakisha Short"
                        sx={{
                            backgroundColor: "#ede7f6",
                            width: 40,
                            height: 40,
                        }}
                    />
                    {/* Name and Details */}
                    <Box>
                        <Typography variant="body1" fontWeight={600} component="div" gutterBottom fontSize={'14px'}>
                            Nakisha Short
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Her Birthday Today
                        </Typography>
                    </Box>
                </Box>

                {/* Wish Button */}
                <Button
                    variant="contained"
                    size="small"
                    sx={{
                        color: "#fff",
                        textTransform: "capitalize",
                        "&:hover": {
                            backgroundColor: theme.palette.primary.hover,
                        },
                    }}
                >
                    Wish Her
                </Button>
            </Box>

            {/* Birthday Image */}
            <Box
                component="img"
                src="/images/cards/birthday.png"
                alt="Birthday Icon"
                sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    height: "110px",
                }}
            />
        </Card>
    )
}

export default TodayCard
