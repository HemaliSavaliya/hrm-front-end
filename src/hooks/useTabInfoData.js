import { useTheme } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const useTabInfoData = () => {
  const [date, setDate] = useState(null)
  const [dateJon, setDateJon] = useState(null)
  const [imgSrc, setImgSrc] = useState(null)
  const [authToken, setAuthToken] = useState(null)
  const [loadingImage, setLoadingImage] = useState(false) // Add loading state
  const theme = useTheme()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authToken = JSON.parse(localStorage.getItem('login-details'))
      if (authToken) {
        setAuthToken(authToken)
      }
    }
  }, [])

  const [userData, setUserData] = useState({
    id: '',
    name: '',
    email: '',
    mobileNo: '',
    address: '',
    department: '',
    designation: '',
    salary: '',
    bankAccountHolderName: '',
    bankAccountNumber: '',
    bankName: '',
    bankIFSCCode: '',
    bankBranchLocation: '',
    birthDate: '',
    joiningDate: '',
    profileImage: null
  })

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/profile/${authToken.id}`, {
          headers: {
            Authorization: `Bearer ${authToken?.token}`
          }
        })
        setUserData(response.data)
        setDate(new Date(response.data.birthDate))
        setDateJon(new Date(response.data.joiningDate))
        setImgSrc(response.data.profileImage)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [authToken?.id, authToken?.token])

  const handleChange = e => {
    const { name, value } = e.target
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  // Function for update user data
  const updateUserData = async updatedUserData => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_URL}/update-emp/${authToken?.id}`, updatedUserData, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })
    } catch (error) {
      console.error('Error updating user data:', error)
    }
  }

  // Function to update user profile image
  const updateProfileImage = async profileImage => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/add-profile-image`,
        {
          profileImage: profileImage,
          id: authToken?.id,
          role: authToken?.role
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      toast.success('Profile Added Successful!', {
        duration: 2000,
        position: 'top-center',

        // Styling
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })
    } catch (error) {
      console.error('Error updating profile image:', error)
      toast.error('Error Adding Profile. Please try again.', {
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

  // Handle the save button click event
  const handleSaveChanges = async () => {
    if (authToken?.role !== 'Admin') {
      // Update user profile image if it has changed
      if (imgSrc) {
        const profileImageFile = document.getElementById('account-settings-upload-image').files[0]
        if (profileImageFile) {
          await updateProfileImage(profileImageFile)
        }
      }

      // Update user data if any fields have changed
      await updateUserData(userData)
    } else {
      // Update user profile image if it has changed
      if (imgSrc) {
        const profileImageFile = document.getElementById('account-settings-upload-image').files[0]
        if (profileImageFile) {
          await updateProfileImage(profileImageFile)
        }
      }
    }
  }

  // Handle the reset image
  const resetProfileImage = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_URL}/reset-profile-image`, {
        profileImage: null,
        id: authToken?.id,
        role: authToken?.role
      })

      toast.success('Profile Reset Successful!', {
        duration: 2000,
        position: 'top-center',

        // Styling
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })

      setImgSrc(null)
    } catch (error) {
      console.error('Error resting profile image', error)
      toast.error('Error Resting Profile. Please try again.', {
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

  // Function to fetch the profile image data from the server
  const fetchProfileImage = async () => {
    setLoadingImage(true) // Start loading
    try {
      // Make a request to the backend endpoint to fetch the profile image data
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/get-profile-image/${authToken.id}/${authToken.role}`,
        {
          responseType: 'arraybuffer'
        }
      )

      // Convert the image data (array buffer) to a data URL
      const imageData = new Uint8Array(response.data)
      const blob = new Blob([imageData], { type: 'image/png' })
      const dataURL = URL.createObjectURL(blob)

      // Update the state with the data URL
      setImgSrc(dataURL)
    } catch (error) {
      console.error('Error fetching profile image:', error)
    } finally {
      setLoadingImage(false) // Stop loading
    }
  }

  return {
    loadingImage,
    date,
    dateJon,
    setDateJon,
    onChange,
    imgSrc,
    authToken,
    handleChange,
    handleSaveChanges,
    resetProfileImage,
    fetchProfileImage,
    userData
  }
}

export default useTabInfoData
