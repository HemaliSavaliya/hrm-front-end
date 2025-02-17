import React from 'react';
import {
    Card,
    Typography,
    Avatar,
    Box,
} from '@mui/material';
import { CalendarFavorite01Icon } from 'hugeicons-react';

const OverTime = () => {
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
                        backgroundColor: '#FD3995',
                        border: '1px solid #FD3995',
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
                    <CalendarFavorite01Icon size={20} />
                </Avatar>
                <Typography fontSize={20} fontWeight={700} textAlign={"justify"} gutterBottom>
                    16 / <Typography component="span" fontSize={20} color="textSecondary">28</Typography>
                </Typography>
                <Typography color="textSecondary" whiteSpace={'normal'} fontWeight={500} fontSize={14} textAlign={'left'} >
                    Overtime this Month
                </Typography>
            </Box>
        </Card>
    );
};

export default OverTime;
