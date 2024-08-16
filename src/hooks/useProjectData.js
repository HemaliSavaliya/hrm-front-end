/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const useProjectData = () => {
  const [projectData, setProjectData] = useState([])
  const [editProjectId, setEditProjectId] = useState(null)
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState('body')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState(null)
  const [loading, setLoading] = useState(true)
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const theme = useTheme()

  const handleClose = () => {
    setOpen(false)
    setEditProjectId(null)
  }

  // For Edit data
  const handleEdit = id => {
    setEditProjectId(id)
    setOpen(true)
  }

  // for dialog box
  const handleClickOpen = scrollType => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  // Function for toggle status
  const updateProjectStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/update-status/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${authToken?.token}`
          }
        }
      )

      // Check the success status from the API response
      if (response.data.success) {
        toast.success('Project Status Updated Successful!', {
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
          const updatedData = projectData.map(item => (item.id === id ? { ...item, status: newStatus } : item))

          // Update the status with the new data
          setProjectData(updatedData)
        }, 1000) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      console.error('Error updating project status', error)
      toast.error('Error Updating Project Status.', {
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

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/projects-list`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      // Filter out deleted projects before setting the state
      const activeProjects = response.data.filter(project => !project.deleted)

      setProjectData(activeProjects, response.data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [authToken?.token])

  // Function to add form data to localStorage
  const addProjects = async newProject => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/add-projects`,
        {
          ...newProject,
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
        toast.success('Project Added Successful!', {
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
          setProjectData(prevData => [...prevData, response.data])
          setOpen(false)

          await fetchProjects()
        }, 1000) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      console.error('Error Adding Project', error)
      toast.error('Error Adding Project. Please try again.', {
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
  const editProjects = async (updatedData, projectId) => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_URL}/update-project/${projectId}`, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      toast.success('Project Updated Successful!', {
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
        // Handle the updated project in your state or UI
        const updateProject = response.data

        setProjectData(prevProjects => {
          return prevProjects.map(project => (project.id === updateProject.id ? updateProject : project))
        })

        // Wait for the fetchProjects to complete before proceeding
        await fetchProjects()
        setEditProjectId(null)
      }, 1000) // 1000 milliseconds = 1 seconds
    } catch (error) {
      console.error('Error Updating Project', error)
      toast.error('Error Updating Project. Please try again.', {
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

  const handleDeleteProject = id => {
    setDeleteTargetId(id)
    setDeleteModalOpen(true)
  }

  const confirmDeleteProject = () => {
    if (deleteTargetId) {
      deleteProjects(deleteTargetId)
      setDeleteModalOpen(false)
    }
  }

  // Function to delete form data to localStorage
  const deleteProjects = async id => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/delete-project/${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      // check the success status from the API response
      if (response.data) {
        toast.success('Project Deleted Successful!', {
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
          setProjectData(prevData => prevData.filter(project => project.id !== id))
        }, 1000) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      console.error('Error deleting project', error)
      toast.error('Error Deleting Project. Please try again.', {
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

  // Function to delete specified project document data from database
  const deleteDocumentData = async (fileName, projectId) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/delete-project-document/${projectId}`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        },
        data: { document: fileName }
      })

      // Check the success status from the API response
      if (response.data) {
        toast.success('Project Document Deleted Successful!', {
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
          // Wait for the fetchProjects to complete before proceeding
          await fetchProjects()
        }, 1000) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      console.error('Error Deleting Project Document', error)
      toast.error('Error Deleting Project Document.', {
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
    projectData,
    editProjectId,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    handleEdit,
    addProjects,
    editProjects,
    deleteProjects,
    updateProjectStatus,
    deleteDocumentData,
    deleteModalOpen,
    setDeleteModalOpen,
    confirmDeleteProject,
    handleDeleteProject
  }
}

export default useProjectData
