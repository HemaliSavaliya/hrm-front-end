/* eslint-disable react-hooks/exhaustive-deps */
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
import useEmployeeData from 'src/hooks/useEmployeeData'
import PropTypes from 'prop-types'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import { visuallyHidden } from '@mui/utils'
import EmployeeModal from 'src/components/EmployeeModal/EmployeeModal'
import { motion } from 'framer-motion'
import { PencilOutline } from 'mdi-material-ui'
import axios from 'axios'
import DocumentModal from 'src/common/DocumentModal'
import { Toaster } from 'react-hot-toast'
import ConfirmationModal from 'src/common/ConfirmationModal'

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
  { id: 'employee name', label: 'Employee Name' },
  { id: 'designation', label: 'Designation' },
  { id: 'department', label: 'Department' },
  { id: 'email', label: 'Email' },
  { id: 'address', label: 'Address' },
  { id: 'mobile', label: 'Mobile No' },
  { id: 'alt', label: 'Alt. No' },
  { id: 'birth', label: 'Birth Date' },
  { id: 'joining', label: 'Joining Date' },
  { id: 'blood', label: 'Blood Group' },
  { id: 'role', label: 'Role' },
  { id: 'salary', label: 'Salary' },
  { id: 'holder', label: 'Bank Account Holder Name' },
  { id: 'account', label: 'Bank Account Number' },
  { id: 'bankName', label: 'Bank Name' },
  { id: 'ifsc', label: 'Bank IFSC Code' },
  { id: 'location', label: 'Bank Branch Location' },
  { id: 'document', label: 'Gov. Document' }
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

const Employee = () => {
  const {
    loading,
    addEmployee,
    editEmployee,
    editEmployeeId,
    employeeData,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    handleEdit,
    deleteDocumentData,
    deleteModalOpen,
    setDeleteModalOpen,
    confirmDeleteEmployee,
    handleDeleteEmployee
  } = useEmployeeData()
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null

  const [searchQuery, setSearchQuery] = useState('')

  // For Search data
  const handleSearch = event => {
    setSearchQuery(event.target.value.toLowerCase())
  }

  // Filter data based on search query
  const filteredData = employeeData.filter(row => {
    const lowerCaseQuery = searchQuery?.toLowerCase()

    return (
      row.name?.toLowerCase().includes(lowerCaseQuery) ||
      row.email?.toLowerCase().includes(lowerCaseQuery) ||
      row.designation?.toLowerCase().includes(lowerCaseQuery) ||
      row.role?.toLowerCase().includes(lowerCaseQuery)
    )
  })

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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employeeData.length) : 0

  const visibleRows = stableSort(filteredData, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  // For view all file and fetch that
  const [fileData, setFileData] = useState(null)
  const [fileType, setFileType] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [fileId, setFileId] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [loadingStates, setLoadingStates] = useState(new Array(employeeData.length).fill(false))

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
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/employee-document/${documentName}`, {
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
    return <div>Loading...</div>
  }

  return (
    <>
      <Toaster />

      <EmployeeModal
        editEmployeeId={editEmployeeId}
        employeeData={employeeData}
        open={open}
        setOpen={setOpen}
        scroll={scroll}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        handleSearch={handleSearch}
        addEmployee={addEmployee}
        editEmployee={editEmployee}
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

      {/* Confirmation Modal for Deleting Employee */}
      <ConfirmationModal
        open={deleteModalOpen}
        onConfirm={confirmDeleteEmployee}
        onClose={() => setDeleteModalOpen(false)}
        title='Delete Employee'
        content='Are you sure you want to delete this employee?'
      />

      {/* Confirmation Modal for Deleting Document */}
      {/* <ConfirmationModal
        open={deleteDocumentModalOpen}
        onClose={() => setDeleteDocumentModalOpen(false)}
        onConfirm={confirmDeleteDocument}
        title='Delete Document'
        content='Are you sure you want to delete this document?'
      /> */}

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
                  <Table stickyHeader sx={{ minWidth: 4000 }} aria-labelledby='tableTitle'>
                    <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                    <TableBody>
                      {visibleRows.map((row, index) => {
                        // let isRowInFilteredData = false

                        // if (searchQuery.trim() !== '') {
                        //   isRowInFilteredData = filteredData.some(filteredRow => filteredRow.id === row.id)
                        // }

                        const loadingIndex = employeeData.findIndex(employee => employee.id === row.id) // Find the index in the employeeData array

                        return (
                          <TableRow hover role='checkbox' tabIndex={-1} key={row.id} sx={{ cursor: 'pointer' }}>
                            <TableCell
                              align='left'
                              sx={{
                                position: 'sticky',
                                left: 0,
                                background: 'white',
                                zIndex: 1
                              }}
                            >
                              <PencilOutline onClick={() => handleEdit(row.id)} sx={{ mr: 2, color: '#9155FD' }} />
                              <DeleteOutline onClick={() => handleDeleteEmployee(row.id)} sx={{ color: '#9155FD' }} />
                            </TableCell>
                            <TableCell align='left'>{index + 1 + page * rowsPerPage}</TableCell>
                            {/* <TableCell align='left'>{row.id}</TableCell> */}
                            <TableCell align='left'>{row.name}</TableCell>
                            <TableCell align='left'>{row.designation}</TableCell>
                            <TableCell align='left'>{row.department}</TableCell>
                            <TableCell align='left'>{row.email}</TableCell>
                            <TableCell align='left'>{row.address}</TableCell>
                            <TableCell align='left'>{row.mobileNo}</TableCell>
                            <TableCell align='left'>{row.alternateNumber || '-'}</TableCell>
                            <TableCell align='left'>{row.birthDate}</TableCell>
                            <TableCell align='left'>{row.joiningDate}</TableCell>
                            <TableCell align='left'>{row.bloodGroup}</TableCell>
                            <TableCell align='left'>{row.role}</TableCell>
                            <TableCell align='left'>{row.salary}</TableCell>
                            <TableCell align='left'>{row.bankAccountHolderName}</TableCell>
                            <TableCell align='left'>{row.bankAccountNumber}</TableCell>
                            <TableCell align='left'>{row.bankName}</TableCell>
                            <TableCell align='left'>{row.bankIFSCCode}</TableCell>
                            <TableCell align='left'>{row.bankBranchLocation}</TableCell>
                            <TableCell align='left'>
                              {loadingStates[loadingIndex] ? ( // Use the correct loading state based on the index in the data array
                                'Loading...'
                              ) : row.governmentDocument?.length === 0 ? (
                                <span>No documents available</span>
                              ) : (
                                row.governmentDocument?.map((document, index) => (
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
                  count={employeeData.length}
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

export default Employee
