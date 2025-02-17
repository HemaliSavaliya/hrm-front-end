import axios from 'axios';
import { useEffect, useState } from 'react';

const useLeaveInfo = () => {
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
    const [leaveData, setLeaveData] = useState();

    useEffect(() => {
        const fetchUserLeave = async () => {
            try {
                const token = authToken?.token; // Assuming token is stored in localStorage
                const response = await axios.get(`http://localhost:9000/api/leaves/details`, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                });
                setLeaveData(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserLeave();
    }, []);

    return { leaveData }
}

export default useLeaveInfo
