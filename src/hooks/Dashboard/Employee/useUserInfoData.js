import axios from 'axios';
import { useEffect, useState } from 'react'

const useUserInfoData = () => {
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = authToken?.token; // Assuming token is stored in localStorage
                const response = await axios.get(`http://localhost:9000/api/user/details`, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                });
                setUser(response.data.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    return { user }
}

export default useUserInfoData
