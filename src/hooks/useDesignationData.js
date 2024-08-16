/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const useDesignationData = () => {
  const [designationData, setDesignationData] = useState([])
  const [editDesignationId, setEditDesignationId] = useState(null)
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState('body')
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const theme = useTheme()

  const handleClose = () => {
    setOpen(false)
    setEditDesignationId(null)
  }

  // for dialog box
  const handleClickOpen = scrollType => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const fetchDesignation = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/designation-list`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      setDesignationData(response.data)
    } catch (error) {
      console.error('Error fetching department:', error)
    }
  }

  useEffect(() => {
    fetchDesignation()
  }, [authToken?.token])

  // Function to add from data to localStorage
  const addDesignation = async newDepartment => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/add-designation`,
        {
          ...newDepartment,
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
        toast.success('Designation Added Successful!', {
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
          setDesignationData(prevData => [...prevData, response.data])
          setOpen(false)

          await fetchDesignation()
        }, 1000) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      console.error('Error Adding Designation:', error)
      toast.error('Error Adding Designation. Please try again.', {
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

  // Function for toggle status
  const updateDesignationStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/designation-update-status/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${authToken?.token}`
          }
        }
      )

      // Check the success status from the API response
      if (response.data.success) {
        toast.success('Designation Status Update Successful!', {
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
          const updatedData = designationData.map(item => (item.id === id ? { ...item, status: newStatus } : item))

          // Update the state with the new data
          setDesignationData(updatedData)
        }, 800) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      console.error('Error updating designation status', error)
      toast.error('Error Updating Designation Status.', {
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
    designationData,
    editDesignationId,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    addDesignation,
    updateDesignationStatus
  }
}

export default useDesignationData
