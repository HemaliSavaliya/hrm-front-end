import React, { useState } from 'react'
import {
  Card,
  Box,
  TextField,
  useTheme
} from '@mui/material'
import ProjectModal from 'src/components/ProjectModal/ProjectModal'
import useProjectData from 'src/hooks/useProjectData'
import DocumentModal from 'src/common/DocumentModal'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import ConfirmationModal from 'src/common/ConfirmationModal'
import { formStyles, inputField, inputLabel } from 'src/Styles'
import ProjectsTable from 'src/views/projects/ProjectsTable'

const Project = () => {
  const {
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
    // updateProjectStatus,
    deleteDocumentData,
    deleteModalOpen,
    setDeleteModalOpen,
    confirmDeleteProject,
    handleDeleteProject,
    searchQuery,
    handleSearchChange
  } = useProjectData()

  // For fetch login detail wise role
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const theme = useTheme()
  const styles = formStyles(theme);

  // For view all file and fetch that
  const [fileData, setFileData] = useState(null)
  const [fileType, setFileType] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [fileId, setFileId] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [loadingStates, setLoadingStates] = useState(new Array(projectData.length).fill(false))

  // Function to handle button click and call the API
  const handleButtonClick = async (documentName, id, loadingIndex) => {
    try {
      // Update the loading state for the specific button clicked
      const newLoadingStates = [...loadingStates]
      newLoadingStates[loadingIndex] = true
      setLoadingStates(newLoadingStates)

      const extension = documentName.split('.').pop().toLowerCase()
      let contentType

      // Determine content type based on file extension
      switch (extension) {
        case 'pdf':
          contentType = 'application/pdf'
          break
        case 'png':
        case 'jpg':
        case 'jpeg':
          contentType = `image/${extension}`
          break
        case 'pptx':
          contentType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
          break
        case 'docx':
          contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          break
        case 'xlsx':
          contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          break
        default:
          throw new Error('Unsupported file type')
      }

      // Fetch the document from the API
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/projects-document/${documentName}`, {
        headers: {
          'Content-Type': contentType,
          Authorization: `Bearer ${authToken?.token}`
        },
        responseType: 'blob' // Expect the response as a Blob
      })

      if (response.data) {
        const blobUrl = URL.createObjectURL(response.data)
        setFileData(blobUrl)
        setFileType(extension)
        setFileName(documentName)
        setFileId(id)
        setOpenModal(true)
      } else {
        console.error('No data received')
      }
    } catch (error) {
      console.error('Error fetching the document:', error)
    } finally {
      // Update the loading state back to false after fetch completes
      const newLoadingStates = [...loadingStates]
      newLoadingStates[loadingIndex] = false
      setLoadingStates(newLoadingStates)
    }
  }

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh'
        }}
      >
        <img src='/images/loader.svg' alt='loader' />
      </div>
    )
  }

  return (
    <>
      <Toaster />

      <ConfirmationModal
        open={deleteModalOpen}
        onConfirm={confirmDeleteProject}
        onClose={() => setDeleteModalOpen(false)}
        title='Delete Project'
        content='Are you sure you want to delete this project?'
      />

      <DocumentModal
        fileData={fileData}
        fileType={fileType}
        fileName={fileName}
        open={openModal}
        onClose={() => setOpenModal(false)}
        scroll={scroll}
        deleteDocumentData={deleteDocumentData}
        fileId={fileId}
      />

      <Card sx={{ p: 5, boxShadow: '0px 9px 20px rgba(46, 35, 94, 0.07)' }}>
        <Box
          sx={{
            width: '100%',
            display: { xs: 'grid', sm: 'flex', lg: 'flex' },
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          mb={4}
        >
          <ProjectModal
            editProjectId={editProjectId}
            projectData={projectData}
            open={open}
            setOpen={setOpen}
            scroll={scroll}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            addProjects={addProjects}
            editProjects={editProjects}
          />
          <TextField
            sx={{ mt: { xs: 3, sm: 0, lg: 0 }, ...styles.inputLabel, ...styles.inputField }}
            label='Search Project'
            variant='filled'
            size='small'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>

        <ProjectsTable
          searchQuery={searchQuery}
          projectData={projectData}
          loading={loading}
          handleEdit={handleEdit}
          handleDeleteProject={handleDeleteProject}
          handleButtonClick={handleButtonClick}
        />
      </Card>
    </>
  )
}

export default Project
