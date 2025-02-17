/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const useHolidayData = () => {
  const [holidayData, setHolidayData] = useState([])
  const [editHolidayId, setEditHolidayId] = useState(null)
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState('body')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const theme = useTheme()

  // Handle search input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleClose = () => {
    setOpen(false)
    setEditHolidayId(null)
  }

  // For Edit data
  const handleEdit = id => {
    setEditHolidayId(id)
    setOpen(true)
  }

  // for dialog box
  const handleClickOpen = scrollType => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const fetchHoliday = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`http://localhost:9000/api/holiday-list`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      setHolidayData(response.data)
    } catch (error) {
      console.error('Error fetching department:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHoliday()
  }, [authToken?.token])

  // Function to add form data to localStorage
  const addHoliday = async newHoliday => {
    try {
      const response = await axios.post(
        `http://localhost:9000/api/add-holiday`,
        {
          ...newHoliday
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
        // Display success toast upon add Department
        toast.success('Holiday Added Successful!', {
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
          setHolidayData(prevData => [...prevData, response.data])
          setOpen(false)

          await fetchHoliday()
        }, 1000) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      // Display error toast upon Add Department
      toast.error('Error Adding Holiday. Please try again.', {
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
  const editHoliday = async (updatedData, holidayId) => {
    try {
      const response = await axios.put(`http://localhost:9000/api/update-holiday/${holidayId}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      if (response.status === 200) {
        toast.success('Holiday Updated Successful!', {
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
          // Handle the updated holiday in your state or UI
          const holiday = response.data

          setHolidayData(prevDep => {
            return prevDep.map(hol => (hol.id === holiday.id ? holiday : hol))
          })

          // Wait for the fetchHoliday to complete before proceeding
          await fetchHoliday()
          setEditHolidayId(null)
        }, 1000) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      toast.error('Error Updating Holiday. Please try again.', {
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

  const handleDeleteHoliday = id => {
    setDeleteTargetId(id)
    setDeleteModalOpen(true)
  }

  const confirmDeleteHoliday = () => {
    if (deleteTargetId) {
      deleteHoliday(deleteTargetId)
      setDeleteModalOpen(false)
    }
  }

  // Function to delete form data to localStorage
  const deleteHoliday = async id => {
    try {
      const response = await axios.delete(`http://localhost:9000/api/delete-holiday/${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      // check the success status from the API response
      if (response.data) {
        toast.success('Holiday Deleted Successful!', {
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
          setHolidayData(prevData => prevData.filter(holiday => holiday.id !== id))
        }, 1000) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      toast.error('Error Deleting Holiday. Please try again.', {
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
    holidayData,
    editHolidayId,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    handleEdit,
    addHoliday,
    editHoliday,
    deleteHoliday,
    deleteModalOpen,
    setDeleteModalOpen,
    confirmDeleteHoliday,
    handleDeleteHoliday,
    searchQuery,
    handleSearchChange
  }
}

export default useHolidayData
