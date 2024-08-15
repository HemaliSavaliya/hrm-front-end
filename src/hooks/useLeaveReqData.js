/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTheme } from '@mui/material/styles';

const useLeaveReqData = () => {
    const [leaveReqData, setLeaveReqData] = useState([]);
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('body');
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;
    const theme = useTheme();

    const handleClose = () => {
        setOpen(false);
    };

    // for dialog box
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const updateLeaveRequestStatus = async (leaveRequestId, newStatus) => {
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_URL}/update-leave-status`, {
                leaveRequestId,
                newStatus
            }, {
                headers: {
                    Authorization: `Bearer ${authToken?.token}`,
                },
            });

            if (response.data.message) {
                toast.success('Leave Request Status Update Successful!', {
                    duration: 2000,
                    position: 'top-center',

                    // Styling
                    style: {
                        background: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        fontSize: "15px",
                    },
                });

                setTimeout(async () => {
                    // Update the frontend status
                    const updatedData = leaveReqData.map((item) => item._id === leaveRequestId ? { ...item, status: newStatus } : item);

                    setLeaveReqData(updatedData);
                }, 1000); // 1000 milliseconds = 1 seconds
            }
        } catch (error) {
            console.error("Error updating leave request status", error);
            toast.error('Error Updating Leave Request Status.', {
                duration: 2000,
                position: 'top-center',

                // Styling
                style: {
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    fontSize: "15px",
                },
            });
        }
    };

    const fetchLeaveRequest = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/leaveRequestList`, {
                headers: {
                    Authorization: `Bearer ${authToken?.token}`,
                },
            });

            setLeaveReqData(response.data);
        } catch (error) {
            console.error("Error fetching leave request", error);
        }
    };

    useEffect(() => {
        fetchLeaveRequest();
    }, [authToken?.token]);

    // Function to add form data to localStorage
    const addLeaveRequest = async (newLeaveReq) => {
        console.log("leave request", newLeaveReq);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/add-leaveRequest`, {
                ...newLeaveReq, companyId: authToken.companyId
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken?.token}`
                }
            });

            // Check the success status from the API response
            if (response.data) {
                toast.success('Leave Request Added Successful!', {
                    duration: 2000,
                    position: 'top-center',

                    // Styling
                    style: {
                        background: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        fontSize: "15px",
                    },
                });

                setTimeout(async () => {
                    // Instead of relying on the previous state, you can use the response data directly
                    setLeaveReqData((prevData) => [...prevData, response.data]);
                    setOpen(false);

                    await fetchLeaveRequest();
                }, 1000); // 1000 milliseconds = 1 seconds 
            }
        } catch (error) {
            console.error("Error Adding Leave Request", error);
            toast.error('Error Adding Leave Request. Please try again.', {
                duration: 2000,
                position: 'top-center',

                // Styling
                style: {
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    fontSize: "15px",
                },
            });
        }
    }

    return {
        leaveReqData,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose,
        addLeaveRequest,
        updateLeaveRequestStatus
    }
}

export default useLeaveReqData;