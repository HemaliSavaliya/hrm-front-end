/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const useAnnouncementData = () => {
  const [announcementData, setAnnouncementData] = useState([])
  const [editAnnoId, setEditAnnoId] = useState(null)
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState('body')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState(null)
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const theme = useTheme()

  const handleClose = () => {
    setOpen(false)
    setEditAnnoId(null)
  }

  // For Edit data
  const handleEdit = id => {
    setEditAnnoId(id)
    setOpen(true)
  }

  // for dialog box
  const handleClickOpen = scrollType => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const fetchAnnouncement = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/announcementList`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      // Filter out deleted announcements before setting the state
      const announcementData = response.data.filter(anno => !anno.deleted)

      setAnnouncementData(announcementData, response.data)
    } catch (error) {
      console.error('Error fetching announcement:', error)
    }
  }

  useEffect(() => {
    fetchAnnouncement()
  }, [authToken?.token])

  // Function to add form data to localStorage
  const addAnnouncement = async newAnno => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/add-announcement`,
        {
          ...newAnno,
          companyId: authToken.companyId
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken?.token}`
          }
        }
      )

      // Check the success status from the API response
      if (response.data) {
        toast.success('Announcement Added Successful!', {
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
          setAnnouncementData(prevData => [...prevData, response.data])
          setOpen(false)

          await fetchAnnouncement()
        }, 1000) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      console.error('Error Adding announcement', error)
      toast.error('Error Adding Announcement. Please try again.', {
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
  const editAnnouncement = async (updatedData, annoId) => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_URL}/update-announcement/${annoId}`, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      toast.success('Announcement Updated Successful!', {
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
        // Handle the updated announcement in your state or UI
        const updateAnno = response.data

        setAnnouncementData(prevAnno => {
          return prevAnno.map(anno => (anno.id === updateAnno.id ? updateAnno : anno))
        })

        // Wait for the fetchAnnouncement to complete before proceeding
        await fetchAnnouncement()
        setEditAnnoId(null)
      }, 1000) // 1000 milliseconds = 1 seconds
    } catch (error) {
      console.error('Error Updating Project', error)
      toast.error('Error Updating Announcement. Please try again.', {
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

  const handleDeleteAnnouncement = id => {
    setDeleteTargetId(id)
    setDeleteModalOpen(true)
  }

  const confirmDeleteAnnouncement = () => {
    if (deleteTargetId) {
        deleteAnnouncement(deleteTargetId)
      setDeleteModalOpen(false)
    }
  }

  // Function to delete form data to localStorage
  const deleteAnnouncement = async id => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/delete-announcement/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      // Check the success status from the API response
      if (response.data) {
        toast.success('Announcement Deleted Successful!', {
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
          setAnnouncementData(prevData => prevData.filter(anno => anno.id !== id))
        }, 1000) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      console.error('Error Deleting Announcement', error)
      toast.error('Error Deleting Announcement. Please try again.', {
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

  // Function to delete specified announcement document data from database
  const deleteDocumentData = async (fileName, announcementId) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/delete-document/${announcementId}`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        },
        data: { document: fileName }
      })

      // Check the success status from the API response
      if (response.data) {
        toast.success('Announcement Document Deleted Successful!', {
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
          // Wait for the fetchAnnouncement to complete before proceeding
          await fetchAnnouncement()
        }, 1000) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      console.error('Error Deleting Announcement Document', error)
      toast.error('Error Deleting Announcement Document.', {
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
    announcementData,
    editAnnoId,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    handleEdit,
    addAnnouncement,
    editAnnouncement,
    deleteAnnouncement,
    deleteDocumentData,
    deleteModalOpen,
    setDeleteModalOpen,
    confirmDeleteAnnouncement,
    handleDeleteAnnouncement
  }
}

export default useAnnouncementData
