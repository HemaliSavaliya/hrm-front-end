/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const useAuth = () => {
  const [isSaving, setIsSaving] = useState(false)
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false

    // role: '',
  })

  const theme = useTheme()
  const router = useRouter()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleRadioChange = event => {
    setValues({ ...values, role: event.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // Disable the save button to prevent multiple submissions
    setIsSaving(true)

    const { email, password } = values

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/login`, {
        email,
        password
      })

      if (response.status === 200) {
        // Assuming your API returns a token upon successful login
        const { token, userId, name, id, companyId, role } = response.data.data

        if (role === 'Admin' || role === 'HR' || role === 'Employee') {
          // Display success toast upon successful login
          toast.success('Login successful!', {
            duration: 2000,
            position: 'top-right',
            style: {
              background: theme.palette.background.paper,
              color: theme.palette.text.primary,
              fontSize: '15px'
            }
          })

          // Store the token in localStorage or secure storage for future API requests
          localStorage.setItem('login-details', JSON.stringify({ token, role, email, userId, name, id, companyId }))

          if (role === 'Employee') {
            setTimeout(() => {
              router.push('/account-settings')
            }, 1000) // 1000 milliseconds = 1 seconds
          } else {
            // Redirect after 1 seconds
            setTimeout(() => {
              const returnUrl = router.query.returnUrl || '/'
              router.push(returnUrl)
            }, 1000) // 1000 milliseconds = 1 seconds
          }
        } else {
          // Display an error toast if the role is not allowed
          toast.error('Login failed. Your role is not allowed to access this system.', {
            duration: 2000,
            position: 'top-right',
            style: {
              background: theme.palette.background.paper,
              color: theme.palette.text.primary,
              fontSize: '15px'
            }
          })

          // Redirect to 401 error page
          setTimeout(() => {
            router.push('/401')
          }, 2000)
        }
      }
    } catch (error) {
      // Display error toast upon login failure
      toast.error('Login failed. Please try again.', {
        duration: 2000,
        position: 'top-right',
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })

      // Redirect to 500 error page
      setTimeout(() => {
        router.push('/500')
      }, 2000)
    } finally {
      // Ensure to re-enable the save button even if an error occurs
      setIsSaving(false)
    }
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  // // Function to set default email based on selected role
  // const setDefaultEmail = () => {
  //   if (values.role === 'Admin') {
  //     setValues({
  //       ...values,
  //       email: 'ridhamStack@gmail.com',
  //       password: 'ridham@123',
  //     });
  //   } else if (values.role === 'HR') {
  //     setValues({
  //       ...values,
  //       email: 'parthi@test.com',
  //       password: 'parthi@123',
  //     });
  //   } else if (values.role === "Employee") {
  //     setValues({
  //       ...values,
  //       email: "jenish@test.com",
  //       password: "jenish@123"
  //     })
  //   } else {
  //     setValues({
  //       ...values,
  //       email: '',
  //       password: '',
  //     });
  //   }
  // };

  // // Call setDefaultEmail when the role changes
  // useEffect(() => {
  //   setDefaultEmail();
  // }, [values.role]);

  return {
    isSaving,
    values,
    handleChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleRadioChange,
    handleSubmit,
    handleKeyDown
  }
}

export default useAuth
