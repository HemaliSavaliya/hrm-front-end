import React, { useState } from 'react'
import {
  Card,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Button,
  Typography
} from '@mui/material'
import PropTypes from 'prop-types'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import { visuallyHidden } from '@mui/utils'
import useAnnouncementData from 'src/hooks/useAnnouncementData'
import AnnouncementModal from 'src/components/AnnouncementModal/AnnouncementModal'
import { motion } from 'framer-motion'
import axios from 'axios'
import DocumentModal from 'src/common/DocumentModal'
import { Toaster } from 'react-hot-toast'
import ConfirmationModal from 'src/common/ConfirmationModal'
import { useTheme } from '@mui/material/styles'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }

    return a[1] - b[1]
  })

  return stabilizedThis.map(el => el[0])
}

const headCells = [
  { id: 'action', label: 'Action' },
  { id: 'no', label: 'No' },
  { id: 'title', label: 'Announcement Title' },
  { id: 'detail', label: 'Announcement Details' },
  { id: 'department', label: 'Select Department' },
  { id: 'document', label: 'Document' }
]

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props

  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align='left'
            padding='normal'
            sortDirection={orderBy === headCell.id ? order : false}
            sx={
              headCell.id === 'action'
                ? {
                    position: 'sticky',
                    left: 0,
                    zIndex: 6
                  }
                : null
            }
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired
}

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
    handleDeleteAnnouncement
  } = useAnnouncementData()

  // for table
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - announcementData.length) : 0

  const visibleRows = stableSort(announcementData, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  // For view all file and fetch that
  const [fileData, setFileData] = useState(null)
  const [fileType, setFileType] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [fileId, setFileId] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const [loadingStates, setLoadingStates] = useState(new Array(announcementData.length).fill(false))
  const theme = useTheme()

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

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exist={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        <Card sx={{ mt: 3 }}>
          <Box sx={{ width: '100%' }}>
            {visibleRows && visibleRows.length === 0 ? (
              <Typography
                textTransform={'uppercase'}
                letterSpacing={1}
                fontSize={15}
                my={6}
                textAlign={'center'}
                fontWeight={600}
              >
                No Data Available Yet!
              </Typography>
            ) : (
              <>
                <TableContainer sx={{ height: '390px' }}>
                  <Table stickyHeader sx={{ minWidth: 1200 }} aria-labelledby='tableTitle'>
                    <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                    <TableBody>
                      {visibleRows.map((row, index) => {
                        const loadingIndex = announcementData.findIndex(anno => anno.id === row.id) // Find the index in the employeeData array

                        return (
                          <TableRow hover role='checkbox' tabIndex={-1} key={row.id} sx={{ cursor: 'pointer' }}>
                            <TableCell
                              sx={{
                                position: 'sticky',
                                left: 0,
                                background: theme.palette.background.paper,
                                zIndex: 1
                              }}
                            >
                              {authToken?.role === 'Employee' ? null : (
                                <>
                                  <PencilOutline onClick={() => handleEdit(row.id)} sx={{ mr: 2, color: '#9155FD' }} />
                                  <DeleteOutline
                                    onClick={() => handleDeleteAnnouncement(row.id)}
                                    sx={{ color: '#9155FD' }}
                                  />
                                </>
                              )}
                            </TableCell>
                            <TableCell align='left'>{index + 1 + page * rowsPerPage}</TableCell>
                            <TableCell align='left'>{row.announcementTitle}</TableCell>
                            <TableCell align='left'>{row.announcementDetails}</TableCell>
                            <TableCell align='left'>{row.selectDepartment}</TableCell>
                            <TableCell align='left'>
                              {loadingStates[loadingIndex] ? ( // Use the correct loading state based on the index in the data array
                                'Loading...'
                              ) : row.document?.length === 0 ? (
                                <span>No documents available</span>
                              ) : (
                                row.document?.map((document, index) => (
                                  <React.Fragment key={index}>
                                    <Button
                                      sx={{
                                        mt: 1,
                                        mb: 1,
                                        mr: 2,
                                        fontSize: 14,
                                        textTransform: 'none !important',
                                        borderRadius: 0
                                      }}
                                      variant='outlined'
                                      size='small'
                                      onClick={() => handleButtonClick(document, row.id, loadingIndex)} // Pass the correct loading index
                                    >
                                      {document}
                                    </Button>
                                    {index % 2 === 1 && <br />}
                                  </React.Fragment>
                                ))
                              )}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={headCells.length} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component='div'
                  count={announcementData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            )}
          </Box>
        </Card>
      </motion.div>
    </>
  )
}

export default Announcement
