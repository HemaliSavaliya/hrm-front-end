/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const useJobData = () => {
  const [jobData, setJobData] = useState([])
  const [editJobId, setEditJobId] = useState(null)
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState('body')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState(null)
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const theme = useTheme()

  const handleClose = () => {
    setOpen(false)
    setEditJobId(null)
  }

  // For Edit data
  const handleEdit = id => {
    setEditJobId(id)
    setOpen(true)
  }

  // for dialog box
  const handleClickOpen = scrollType => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/jobsList`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      // Filter out deleted jobs before setting the state
      const jobsData = response.data.filter(job => !job.deleted)

      setJobData(jobsData, response.data)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [authToken?.token])

  // Function to add form data to localStorage
  const addJobs = async newJobs => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/add-job`,
        {
          ...newJobs,
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
        toast.success('Job Added Successful!', {
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
          setJobData(prevData => [...prevData, response.data])
          setOpen(false)

          await fetchJobs()
        }, 1000) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      console.error('Error Adding Jobs', error)
      toast.error('Error Adding Job. Please try again.', {
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
  const editJobs = async (updatedData, jobId) => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_URL}/update-job/${jobId}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      toast.success('Job Updated Successful!', {
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
        // Handle the updated jobs in your state or UI
        const updateJobs = response.data

        setJobData(prevJobs => {
          return prevJobs.map(job => (job.id === updateJobs.id ? updateJobs : job))
        })

        // Wait for the fetchJobs to complete before proceeding
        await fetchJobs()
        setEditJobId(null)
      }, 1000) // 1000 milliseconds = 1 seconds
    } catch (error) {
      console.error('Error Updating Jobs', error)
      toast.error('Error Updating Job. Please try again.', {
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

  const handleDeleteJobs = id => {
    setDeleteTargetId(id)
    setDeleteModalOpen(true)
  }

  const confirmDeleteJobs = () => {
    if (deleteTargetId) {
      deleteJobs(deleteTargetId)
      setDeleteModalOpen(false)
    }
  }

  // Function to delete form data to localStorage
  const deleteJobs = async id => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/delete-job/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      // Check the success status from the API response
      if (response.data) {
        toast.success('Job Deleted Successful!', {
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
          setJobData(prevData => prevData.filter(job => job.id !== id))
        }, 1000) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      console.error('Error Deleting Job', error)
      toast.error('Error Deleting Job. Please try again.', {
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
    jobData,
    editJobId,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    handleEdit,
    addJobs,
    editJobs,
    deleteJobs,
    deleteModalOpen,
    setDeleteModalOpen,
    confirmDeleteJobs,
    handleDeleteJobs
  }
}

export default useJobData
