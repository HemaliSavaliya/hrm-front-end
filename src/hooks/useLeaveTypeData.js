/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const useLeaveTypeData = () => {
  const [leaveTypeData, setLeaveTypeData] = useState([])
  const [editLeaveTypeId, setEditLeaveTypeId] = useState(null)
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState('body')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const theme = useTheme()

  // Handle search input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleClose = () => {
    setOpen(false)
    setEditLeaveTypeId(null)
  }

  // For Edit data
  const handleEdit = id => {
    setEditLeaveTypeId(id)
    setOpen(true)
  }

  // for dialog box
  const handleClickOpen = scrollType => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  // Function for toggle leaveStatus
  const updateLeaveTypeStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/leave-update-status/${id}`,
        { leaveStatus: newStatus },
        {
          headers: {
            Authorization: `Bearer ${authToken?.token}`
          }
        }
      )

      // Check the success status from the API response
      if (response.data.success) {
        toast.success('Leave Type Status Updated Successful!', {
          duration: 2000,
          position: 'top-center',

          // Styling
          style: {
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            fontSize: '15px'
          }
        })

        setTimeout(() => {
          // Update the frontend status
          const updatedData = leaveTypeData.map(item => (item.id === id ? { ...item, leaveStatus: newStatus } : item))

          // Update the status with the new data
          setLeaveTypeData(updatedData)
        }, 1000) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      console.error('Error updating leave type status', error)
      toast.error('Error Updating Leave Type Status.', {
        duration: 2000,
        position: 'top-center',

        // Styling
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })
    }
  }

  const fetchLeaveType = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/leaveTypeList`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      // Filter out deleted leave type before setting the state
      const leaveType = response.data.filter(leave => !leave.deleted)

      setLeaveTypeData(leaveType, response.data)
    } catch (error) {
      console.error('Error fetching leave type', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeaveType()
  }, [authToken?.token])

  // Function to add form data to localStorage
  const addLeaveType = async newLeaveType => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/add-leaveType`,
        {
          ...newLeaveType,
          companyId: authToken.companyId
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken?.token}`
          }
        }
      )

      // Check the success status from the API response
      if (response.data) {
        toast.success('Leave Type Added Successful!', {
          duration: 2000,
          position: 'top-center',

          // Styling
          style: {
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            fontSize: '15px'
          }
        })

        setTimeout(async () => {
          // Instead of relying on the previous state, you can use the response data directly
          setLeaveTypeData(prevData => [...prevData, response.data])
          setOpen(false)

          await fetchLeaveType()
        }, 1000) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      console.error('Error Adding Leave Type', error)
      toast.error('Error Adding Leave Type. Please try again.', {
        duration: 2000,
        position: 'top-center',

        // Styling
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })
    }
  }

  // Function to edit form data to localStorage
  const editLeaveType = async (updatedData, leaveId) => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_URL}/update-leaveType/${leaveId}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      toast.success('Leave Type Updated Successful!', {
        duration: 2000,
        position: 'top-center',

        // Styling
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })

      setTimeout(async () => {
        // Handle the updated leave type in your state or UI
        const updateLeaveType = response.data

        setLeaveTypeData(prevLeave => {
          return prevLeave.map(leave => (leave.id === updateLeaveType.id ? updateLeaveType : leave))
        })

        // Wait for the fetchLeaveType to complete before proceeding
        await fetchLeaveType()
        setEditLeaveTypeId(null)
      }, 1000) // 1000 milliseconds = 1 seconds
    } catch (error) {
      console.error('Error Updating Leave Type', error)
      toast.error('Error Updating Leave Type. Please try again.', {
        duration: 2000,
        position: 'top-center',

        // Styling
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })
    }
  }

  const handleDeleteLeaveType = id => {
    setDeleteTargetId(id)
    setDeleteModalOpen(true)
  }

  const confirmDeleteLeaveType = () => {
    if (deleteTargetId) {
      deleteLeaveType(deleteTargetId)
      setDeleteModalOpen(false)
    }
  }

  // Function to delete form data to localStorage
  const deleteLeaveType = async id => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/delete-leaveType/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      // Check the success status from the API response
      if (response.data) {
        toast.success('Leave Type Deleted Successful!', {
          duration: 2000,
          position: 'top-center',

          // Styling
          style: {
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            fontSize: '15px'
          }
        })

        setTimeout(() => {
          // Update the state in your frontend
          setLeaveTypeData(prevData => prevData.filter(leave => leave.id !== id))
        }, 1000) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      console.error('Error deleting Leave Type', error)
      toast.error('Error Deleting Leave Type. Please try again.', {
        duration: 2000,
        position: 'top-center',

        // Styling
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })
    }
  }

  return {
    loading,
    leaveTypeData,
    editLeaveTypeId,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    handleEdit,
    addLeaveType,
    editLeaveType,
    deleteLeaveType,
    updateLeaveTypeStatus,
    deleteModalOpen,
    setDeleteModalOpen,
    confirmDeleteLeaveType,
    handleDeleteLeaveType,
    searchQuery,
    handleSearchChange
  }
}

export default useLeaveTypeData
