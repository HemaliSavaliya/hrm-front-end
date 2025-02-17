import axios from 'axios'
import { useEffect, useState } from 'react'

const useUserPermissions = (authToken, role) => {
  const [permissions, setPermissions] = useState([])

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/get-permission`, {
          params: { role },
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })

        if (response.data.success) {
          setPermissions(response.data.permission)
        }
      } catch (error) {
        console.error('Error fetching permissions:', error)
      }
    }

    if (authToken && role) {
      fetchPermissions()
    }
  }, [authToken, role])

  return permissions
}

export default useUserPermissions
