/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'

const useLeaveReqData = () => {
  const [leaveReqData, setLeaveReqData] = useState([])
  const [loading, setLoading] = useState(true)
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null

  const updateLeaveRequestStatus = async (leaveRequestId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:9000/api/update-leave-status`,
        {
          leaveRequestId,
          newStatus
        },
        {
          headers: {
            Authorization: `Bearer ${authToken?.token}`
          }
        }
      )

      if (response.data.message) {
        // Update the frontend status
        const updatedData = leaveReqData.map(item =>
          item.id === leaveRequestId ? { ...item, status: newStatus } : item
        )

        setLeaveReqData(updatedData)
      } else {
        console.error('Error updating Leave status', response.data.error)
      }
    } catch (error) {
      console.error('Error updating leave request status', error)
    }
  }

  const fetchAllLeaveRequest = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`http://localhost:9000/api/leaveRequestListRoleWise`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      setLeaveReqData(response.data)
    } catch (error) {
      console.error('Error fetching leave request', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllLeaveRequest()
  }, [authToken?.token])

  return {
    loading,
    leaveReqData,
    updateLeaveRequestStatus
  }
}

export default useLeaveReqData
