import React, { useEffect, useState } from 'react';
import {
    Card,
    Typography,
    Box,
    CircularProgress,
    Button,
    useTheme,
} from '@mui/material';
import { Fingerprint } from 'mdi-material-ui';
import axios from 'axios';

const AttendanceCard = () => {
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
    const theme = useTheme();
    const progressValue = 65; // Example value for progress

    const [attendance, setAttendance] = useState(null);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const token = authToken?.token; // Assuming token is stored in localStorage
                const response = await axios.get(`http://localhost:9000/api/timer-list`, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                });

                setAttendance(response.data[0]); // Assuming you want the first entry
            } catch (error) {
                console.error("Error fetching attendance data", error);
            }
        };

        fetchAttendance();
    }, []);

    return (
        <Card sx={{ padding: 5, border: '1px solid', borderColor: 'primary.main', background: theme.palette.mode === "light" ? 'linear-gradient(180deg, #c7c3f738 0%, #ada7ea1f 100%)' : "linear-gradient(180deg, #c7c3f705 0%, #ada7ea1f 100%)" }}>
            <Box mb={4} textAlign="center">
                <Typography color="#6B7280" fontWeight={500} fontSize={14} gutterBottom>
                    Attendance
                </Typography>
                <Typography fontSize={18} fontWeight={600}>{attendance?.date}</Typography>
            </Box>

            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 3,
                    mx: 'auto',
                }}
            >
                <CircularProgress
                    variant="determinate"
                    value={(attendance?.totalHours / 8) * 100}
                    size={120}
                    thickness={1}
                    sx={{
                        color: 'primary.main',
                    }}
                />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography fontSize={13}>
                        Total Hours
                    </Typography>
                    <Typography fontSize={14} fontWeight={600}>{attendance?.hours}:{attendance?.minutes}:{attendance?.seconds}</Typography>
                    
                    {/* <Typography fontSize={14} fontWeight={600}>{attendance?.totalHours}</Typography> */}
                </Box>
            </Box>

            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} textAlign="center" mb={3}>
                <Box sx={{
                    background: '#212529',
                    color: '#FFF',
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '5px 12px',
                    lineHeight: 1.5,
                    width: '155px',
                    height: '28px',
                    marginTop: '10px',
                    borderRadius: '4px'
                }}>
                    Production : {attendance?.productionHours} hrs
                </Box>
                <Typography
                    fontWeight={500}
                    fontSize={14}
                    mt={5}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    mb={5}
                >
                    <Fingerprint color="primary" sx={{ mr: 1 }} /> Punch In at {attendance?.startTime}
                </Typography>
                <Button variant="contained" fullWidth sx={{
                    '&.MuiButton-root:hover': {
                        backgroundColor: theme.palette.primary.hover
                    }
                }}>
                    Punch Out
                </Button>
            </Box>
        </Card>
    );
};

export default AttendanceCard;
