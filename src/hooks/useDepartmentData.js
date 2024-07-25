/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { useTheme } from '@mui/material/styles';

const useDepartmentData = () => {
    const [departmentData, setDepartmentData] = useState([]);
    const [editDepartId, setEditDepartId] = useState(null);
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('body');
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;
    const theme = useTheme();

    const handleClose = () => {
        setOpen(false);
        setEditDepartId(null);
    };

    // For Edit Data
    const handleEdit = (id) => {
        setEditDepartId(id);
        setOpen(true);
    }

    // for dialog box
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    // Function for toggle status
    const updateDepartmentStatus = async (id, newStatus) => {
        try {
            const response = await axios.put(`http://localhost:9000/api/department-update-status/${id}`, { status: newStatus }, {
                headers: {
                    Authorization: `Bearer ${authToken?.token}`,
                },
            });

            // Check the success status from the API response
            if (response.data.success) {
                toast.success('Department Status Update Successful!', {
                    duration: 2000,
                    position: 'top-center',

                    // Styling
                    style: {
                        background: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        fontSize: "15px",
                    },
                });

                setTimeout(() => {
                    // Update the frontend status
                    const updatedData = departmentData.map((item) =>
                        item.id === id ? { ...item, status: newStatus } : item
                    );

                    // Update the state with the new data
                    setDepartmentData(updatedData);
                }, 800); // 1000 milliseconds = 1 seconds
            }
        } catch (error) {
            console.error("Error updating department status", error);
            toast.error('Error Updating Department Status.', {
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

    const fetchDepartment = async () => {
        try {
            const response = await axios.get("http://localhost:9000/api/department-list", {
                headers: {
                    Authorization: `Bearer ${authToken?.token}`,
                },
            });

            setDepartmentData(response.data);
        } catch (error) {
            console.error("Error fetching department:", error);
        }
    }

    useEffect(() => {
        fetchDepartment();
    }, [authToken?.token]);

    // Function to add from data to localStorage
    const addDepartments = async (newDepartment) => {
        try {
            const response = await axios.post("http://localhost:9000/api/add-department", {
                ...newDepartment, companyId: authToken.companyId
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken?.token}`
                }
            });

            // Check the success status from the API response
            if (response.data) {
                // Display success toast upon add Department
                toast.success('Department Added Successful!', {
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
                    setDepartmentData((prevData) => [...prevData, response.data]);
                    setOpen(false);

                    await fetchDepartment();
                }, 1000); // 1000 milliseconds = 1 seconds
            }
        } catch (error) {
            console.error("Error Adding Department:", error);

            // Display error toast upon Add Department
            toast.error('Error Adding Department. Please try again.', {
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

    // Function to update from data to localStorage
    const editDepartments = async (updatedData, departId) => {
        try {
            const response = await axios.put(`http://localhost:9000/api/update-department/${departId}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken?.token}`
                }
            });

            if (response.status === 200) {
                toast.success('Department Updated Successful!', {
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
                    // Handle the updated Department in your state or UI
                    const department = response.data;

                    setDepartmentData((prevDep) => {
                        return prevDep.map((depart) =>
                            depart.id === department.id ? department : depart
                        );
                    });

                    // Wait for the fetchDepartment to complete before proceeding
                    await fetchDepartment();
                    setEditDepartId(null);
                }, 1000); // 1000 milliseconds = 1 seconds
            }
        } catch (error) {
            console.error("Error Updating Department", error);
            toast.error('Error Updating Department. Please try again.', {
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
        departmentData,
        editDepartId,
        open,
        handleEdit,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose,
        addDepartments,
        editDepartments,
        updateDepartmentStatus
    }
}

export default useDepartmentData;