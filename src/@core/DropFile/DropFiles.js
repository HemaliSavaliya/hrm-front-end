/* eslint-disable react/no-unescaped-entities */
import { Typography } from '@mui/material'
import { CloseOctagonOutline } from 'mdi-material-ui'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 15,
  marginRight: 15,
  width: 90,
  height: 90,
  padding: 4,
  boxSizing: 'border-box',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative'
}

const closeIcon = {
  position: 'absolute',
  top: '-12px',
  right: '-12px',
  cursor: 'pointer',
  background: 'white',
  height: '24px'
}

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
  flexDirection: 'column',
  alignItems: 'center'
}

const img = {
  display: 'block',
  height: '50px',
  width: '50px',
  filter: 'opacity(0.5)'
}

const messageStyle = {
  margin: 0,
  textTransform: 'uppercase',
  fontSize: '12px',
  color: '#ec5858',
  fontWeight: 600
}

export const DropFiles = ({ handleImageChange }) => {
  const [files, setFiles] = useState([])
  const [message, setMessage] = useState('')

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.pdf', '.docx', '.doc', '.ppt', '.pptx', '.xls', '.xlsx']
    },
    onDrop: acceptedFiles => {
      let duplicateDetected = false

      const filteredFiles = acceptedFiles.filter(file => {
        const isDuplicate = files.some(existingFile => existingFile.name === file.name)

        if (isDuplicate) {
          duplicateDetected = true
        }

        return !isDuplicate
      })

      const newFiles = filteredFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )

      const updatedFiles = [...files, ...newFiles]
      setFiles(updatedFiles)
      handleImageChange(updatedFiles) // Pass selected files to parent component

      if (duplicateDetected) {
        setMessage('Some files were not added because they already exist.')
      } else {
        setMessage('')
      }
    }
  })

  const getFileIcon = fileName => {
    if (!fileName) {
      return null
    }

    const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase()

    switch (fileExtension) {
      case 'pdf':
        return (
          <>
            <img src='/images/document/pdf.png' alt={fileName} style={img} />
            <Typography variant='subtitle2' pt={2} fontWeight={600} fontSize={11} style={{ whiteSpace: 'nowrap' }}>
              {fileName}
            </Typography>
          </>
        )
      case 'doc':
      case 'docx':
        return (
          <>
            <img src='/images/document/word.png' alt={fileName} style={img} />
            <Typography variant='subtitle2' pt={2} fontWeight={600} fontSize={11} style={{ whiteSpace: 'nowrap' }}>
              {fileName}
            </Typography>
          </>
        )
      case 'ppt':
      case 'pptx':
        return (
          <>
            <img src='/images/document/powerpoint.png' alt={fileName} style={img} />
            <Typography variant='subtitle2' pt={2} fontWeight={600} fontSize={11} style={{ whiteSpace: 'nowrap' }}>
              {fileName}
            </Typography>
          </>
        )
      case 'xls':
      case 'xlsx':
        return (
          <>
            <img src='/images/document/excel.png' alt={fileName} style={img} />
            <Typography variant='subtitle2' pt={2} fontWeight={600} fontSize={11} style={{ whiteSpace: 'nowrap' }}>
              {fileName}
            </Typography>
          </>
        )
      default:
        return (
          <>
            <img src='/images/document/image.png' alt={fileName} style={img} />
            <Typography variant='subtitle2' pt={2} fontWeight={600} fontSize={11} style={{ whiteSpace: 'nowrap' }}>
              {fileName}
            </Typography>
          </>
        )
    }
  }

  const removeFile = fileName => {
    const newFiles = files.filter(file => file.name !== fileName)
    setFiles(newFiles)
    handleImageChange(newFiles)
  }

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>{getFileIcon(file.name)}</div>
      <div style={closeIcon} onClick={() => removeFile(file.name)}>
        <CloseOctagonOutline sx={{ fill: 'rgba(58, 53, 65, 0.3)' }} />
      </div>
    </div>
  ))

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  return (
    <section className='container'>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p className='text-center' style={{ cursor: 'pointer' }}>
          Drag 'n' drop some files here, or click to select files
        </p>
      </div>
      <aside>{thumbs}</aside>
      {message && (
        <p className='text-center' style={messageStyle}>
          {message}
        </p>
      )}
    </section>
  )
}
