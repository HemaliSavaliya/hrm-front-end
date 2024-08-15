/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const useEmployeeData = () => {
  const [employeeData, setEmployeeData] = useState([])
  const [editEmployeeId, setEditEmployeeId] = useState(null)
  // const [deleteDocumentModalOpen, setDeleteDocumentModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState(null)
  // const [deleteTargetDocument, setDeleteTargetDocument] = useState(null)
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState('body')
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const theme = useTheme()

  const handleClose = () => {
    setOpen(false)
    setEditEmployeeId(null)
  }

  // for dialog box
  const handleClickOpen = scrollType => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const handleEdit = id => {
    setEditEmployeeId(id)
    setOpen(true)
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/empList`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      // Filter out deleted employee before setting the state
      const activeEmployee = response.data.filter(emp => !emp.deleted)

      setEmployeeData(activeEmployee, response.data)
    } catch (error) {
      console.error('Error fetching Employee', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [authToken?.token])

  // Function to add form data to localStorage
  const addEmployee = async newEmployee => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/add-emp`,
        {
          ...newEmployee,
          addedBy: authToken.name,
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
        toast.success('Employee Added Successful!', {
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
          setEmployeeData(prevData => [...prevData, response.data])
          setOpen(false)

          await fetchData()
        }, 1000) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      console.error('Error Adding Employee', error)
      toast.error('Error Adding Employee. Please try again.', {
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

  const editEmployee = async (updatedData, empId) => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_URL}/update-emp/${empId}`, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      toast.success('Employee Updated Successful!', {
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
        // Handle the updated Employee in your state or UI
        const updateEmp = response.data

        setEmployeeData(prevEmp => {
          return prevEmp.map(emp => (emp.id === updateEmp.id ? updateEmp : emp))
        })

        // Wait for the fetchData to complete before proceeding
        await fetchData()
        setEditEmployeeId(null)
      }, 800) // 1000 milliseconds = 1 seconds
    } catch (error) {
      console.error('Error Updating Employee', error)
      toast.error('Error Updating Employee. Please try again.', {
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

  const handleDeleteEmployee = id => {
    setDeleteTargetId(id)
    setDeleteModalOpen(true)
  }

  const confirmDeleteEmployee = () => {
    if (deleteTargetId) {
      deleteEmployee(deleteTargetId)
      setDeleteModalOpen(false)
    }
  }

  // const handleDeleteDocument = (fileName, empId) => {
  //   setDeleteTargetDocument(fileName, empId)
  //   setDeleteDocumentModalOpen(true)
  // }

  // const confirmDeleteDocument = () => {
  //   if (deleteTargetDocument) {
  //     deleteDocumentData(deleteTargetDocument)
  //     setDeleteDocumentModalOpen(false)
  //   }
  // }

  const deleteEmployee = async id => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/delete-emp/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      // Check the success status from the API response
      if (response.data) {
        toast.success('Employee Deleted Successful!', {
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
          setEmployeeData(prevData => prevData.filter(emp => emp.id !== id))
          setDeleteModalOpen(false)
          setDeleteTargetId(null)
        }, 800) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      console.error('Error deleting Employee', error)
      toast.error('Error Deleting Employee. Please try again.', {
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

  // Function to delete specified employee document data from database
  const deleteDocumentData = async (fileName, empId) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/delete-emp-document/${empId}`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        },
        data: { document: fileName }
      })

      // Check the success status from the API response
      if (response.data) {
        toast.success('Employee Document Deleted Successful!', {
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
          // Wait for the fetchData to complete before proceeding
          await fetchData()
        }, 800) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      console.error('Error Deleting Employee Document', error)
      toast.error('Error Deleting Employee Document.', {
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
    employeeData,
    editEmployeeId,
    addEmployee,
    editEmployee,
    deleteEmployee,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    handleEdit,
    deleteDocumentData,
    // deleteDocumentModalOpen,
    deleteModalOpen,
    // deleteTargetDocument,
    setDeleteModalOpen,
    // setDeleteDocumentModalOpen,
    confirmDeleteEmployee,
    // confirmDeleteDocument,
    handleDeleteEmployee,
    // handleDeleteDocument
  }
}

export default useEmployeeData
