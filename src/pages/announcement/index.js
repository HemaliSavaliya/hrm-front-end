import React, { useState } from 'react'
import {
  Card,
  Box,
  TextField,
  useTheme,
} from '@mui/material'
import useAnnouncementData from 'src/hooks/useAnnouncementData'
import AnnouncementModal from 'src/components/AnnouncementModal/AnnouncementModal'
import axios from 'axios'
import DocumentModal from 'src/common/DocumentModal'
import { Toaster } from 'react-hot-toast'
import ConfirmationModal from 'src/common/ConfirmationModal'
import AnnouncementTable from 'src/views/announcement/AnnouncementTable'
import { formStyles } from 'src/Styles'

const Announcement = () => {
  const {
    loading,
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
    deleteDocumentData,
    deleteModalOpen,
    setDeleteModalOpen,
    confirmDeleteAnnouncement,
    handleDeleteAnnouncement,
    searchQuery,
    handleSearchChange
  } = useAnnouncementData()
  const theme = useTheme()
  const styles = formStyles(theme);

  // For view all file and fetch that
  const [fileData, setFileData] = useState(null)
  const [fileType, setFileType] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [fileId, setFileId] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const [loadingStates, setLoadingStates] = useState(new Array(announcementData.length).fill(false))

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
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/anno-document/${documentName}`, {
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

      <ConfirmationModal
        open={deleteModalOpen}
        onConfirm={confirmDeleteAnnouncement}
        onClose={() => setDeleteModalOpen(false)}
        title='Delete Announcement'
        content='Are you sure you want to delete this announcement?'
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
          <AnnouncementModal
            editAnnoId={editAnnoId}
            announcementData={announcementData}
            open={open}
            setOpen={setOpen}
            scroll={scroll}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            addAnnouncement={addAnnouncement}
            editAnnouncement={editAnnouncement}
          />
          <TextField
            sx={{ mt: { xs: 3, sm: 0, lg: 0 }, ...styles.inputLabel, ...styles.inputField }}
            label='Search Announcement'
            variant='filled'
            size='small'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>

        <AnnouncementTable
          searchQuery={searchQuery}
          announcementData={announcementData}
          loading={loading}
          handleEdit={handleEdit}
          handleDeleteAnnouncement={handleDeleteAnnouncement}
          handleButtonClick={handleButtonClick}
        />
      </Card>
    </>
  )
}

export default Announcement
