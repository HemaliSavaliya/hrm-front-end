/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const useRoleData = () => {
  const [roleData, setRoleData] = useState([])
  const [editRoleId, setEditRoleId] = useState(null)
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState('body')
  const [loading, setLoading] = useState(true)
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const theme = useTheme()

  const handleClose = () => {
    setOpen(false)
    setEditRoleId(null)
  }

  // for dialog box
  const handleClickOpen = scrollType => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const fetchRole = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/role-list`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      setRoleData(response.data)
    } catch (error) {
      console.error('Error fetching department:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRole()
  }, [authToken?.token])

  // Function to add from data to localStorage
  const addRole = async newRole => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/add-role`,
        {
          ...newRole,
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
        toast.success('Role Added Successful!', {
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
          setRoleData(prevData => [...prevData, response.data])
          setOpen(false)

          await fetchRole()
        }, 1000) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      console.error('Error Adding Role:', error)
      toast.error('Error Adding Role. Please try again.', {
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
  const updateRoleStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/update-role-status/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${authToken?.token}`
          }
        }
      )

      // Check the success status from the API response
      if (response.data.success) {
        toast.success('Role Status Update Successful!', {
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
          const updatedData = roleData.map(item => (item.id === id ? { ...item, status: newStatus } : item))

          // Update the state with the new data
          setRoleData(updatedData)
        }, 800) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      console.error('Error updating role status', error)
      toast.error('Error Updating Role Status.', {
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
    roleData,
    editRoleId,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    addRole,
    updateRoleStatus
  }
}

export default useRoleData
