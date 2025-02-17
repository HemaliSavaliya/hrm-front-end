import React from 'react';
import {
    Card,
    Typography,
    Avatar,
    Box,
} from '@mui/material';
import { Calendar02Icon } from 'hugeicons-react';

const TotalHoursWeek = () => {
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
                        backgroundColor: '#212529',
                        border: '1px solid #212529',
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
                    <Calendar02Icon size={20} />
                </Avatar>
                <Typography fontSize={20} fontWeight={700} textAlign={"justify"} gutterBottom>
                    10 / <Typography component="span" fontSize={20} color="textSecondary">40</Typography>
                </Typography>
                <Typography color="textSecondary" whiteSpace={'normal'} fontWeight={500} fontSize={14} textAlign={'left'}>
                    Total Hours Week
                </Typography>
            </Box>
        </Card>
    );
};

export default TotalHoursWeek;
