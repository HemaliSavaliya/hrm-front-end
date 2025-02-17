import React from 'react';
import {
    Card,
    Typography,
    Avatar,
    Box,
} from '@mui/material';
import { Calendar03Icon } from 'hugeicons-react';

const TotalHoursMonth = () => {
    return (
        <Card sx={{ padding: 5, height: '100%' }}>
            <Box
                sx={{
                    mb: 3,
                    pb: 2,
                    textAlign: 'center',
                }}
            >
                <Avatar
                    sx={{
                        backgroundColor: '#1B84FF',
                        border: '1px solid #1B84FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '4px',
                        color: '#FFF',
                        fontWeight: 500,
                        mb: 2,
                        width: 30,
                        height: 30
                    }}
                >
                    <Calendar03Icon size={20} />
                </Avatar>
                <Typography fontSize={20} fontWeight={700} textAlign={"justify"} gutterBottom>
                    75 / <Typography component="span" fontSize={20} color="textSecondary">98</Typography>
                </Typography>
                <Typography color="textSecondary" whiteSpace={'normal'} fontWeight={500} fontSize={14} textAlign={'left'}>
                    Total Hours Month
                </Typography>
            </Box>
        </Card>
    );
};

export default TotalHoursMonth;
