/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const useAwardsData = () => {
  const [awardsData, setAwardsData] = useState([])
  const [editAwardId, setEditAwardId] = useState(null)
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
    setEditAwardId(null)
  }

  // For Edit data
  const handleEdit = id => {
    setEditAwardId(id)
    setOpen(true)
  }

  // for dialog box
  const handleClickOpen = scrollType => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const fetchAwards = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`http://localhost:9000/api/awardsList`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      // Filter out deleted awards before setting the state
      const awardData = response.data.filter(award => !award.deleted)

      setAwardsData(awardData, response.data)
    } catch (error) {
      console.error('Error fetching Awards:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAwards()
  }, [authToken?.token])

  // Function to add form data to localStorage
  const addAwards = async newAward => {
    try {
      const response = await axios.post(
        `http://localhost:9000/api/add-awards`,
        {
          ...newAward,
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
        toast.success('Award Added Successful!', {
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
          setAwardsData(prevData => [...prevData, response.data])
          setOpen(false)

          await fetchAwards()
        }, 1000) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      console.error('Error Adding Awards', error)
      toast.error('Error Adding Award. Please try again.', {
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
  const editAwards = async (updatedData, awardId) => {
    try {
      const response = await axios.put(`http://localhost:9000/api/update-awards/${awardId}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      toast.success('Award Updated Successful!', {
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
        // Handle the updated Awards in your state or UI
        const awardData = response.data

        setAwardsData(prevAward => {
          return prevAward.map(award => (award.id === awardData.id ? awardData : award))
        })

        // Wait for the fetchAwards to complete before proceeding
        await fetchAwards()
        setEditAwardId(null)
      }, 1000) // 1000 milliseconds = 1 seconds
    } catch (error) {
      console.error('Error Updating Awards', error)
      toast.error('Error Updating Award. Please try again.', {
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

  const handleDeleteAward = id => {
    setDeleteTargetId(id)
    setDeleteModalOpen(true)
  }

  const confirmDeleteAward = () => {
    if (deleteTargetId) {
      deleteAwards(deleteTargetId)
      setDeleteModalOpen(false)
    }
  }

  // Function to delete form data to localStorage
  const deleteAwards = async id => {
    try {
      const response = await axios.delete(`http://localhost:9000/api/delete-awards/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      // check the success status from the API response
      if (response.data) {
        toast.success('Award Deleted Successful!', {
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
          // Update the state in your frontend
          setAwardsData(prevData => prevData.filter(award => award.id !== id))

          // Wait for the fetchAwards to complete before proceeding
          await fetchAwards()
        }, 1000) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      console.error('Error Deleting Awards', error)
      toast.error('Error Deleting Award. Please try again.', {
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
    awardsData,
    editAwardId,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    handleEdit,
    addAwards,
    editAwards,
    deleteAwards,
    deleteModalOpen,
    setDeleteModalOpen,
    confirmDeleteAward,
    handleDeleteAward,
    searchQuery,
    handleSearchChange
  }
}

export default useAwardsData
