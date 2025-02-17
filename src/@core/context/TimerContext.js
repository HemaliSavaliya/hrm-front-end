/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'

const TimerContext = createContext()

export function TimerProvider({ children }) {
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timeElapsedInSeconds, setTimeElapsedInSeconds] = useState(0)
  const [projectName, setProjectName] = useState('')
  const [description, setDescription] = useState('')
  const [roleWiseData, setRoleWiseData] = useState('')
  const [empRoleWiseData, setEmpRoleWiseData] = useState('')
  const [savedProjects, setSavedProjects] = useState([]) // To store saved project data
  const [showConfirm, setShowConfirm] = useState(false) // State to control the confirmation popup
  const [startTime, setStartTime] = useState(null)
  const [resumeTime, setResumeTime] = useState(null)
  const [pauseTime, setPauseTime] = useState(null)
  const [stopTime, setStopTime] = useState(null)
  const [userIP, setUserIP] = useState('')
  const [loading, setLoading] = useState(true)
  const theme = useTheme()
  const SECONDS_IN_AN_HOUR = 3600

  // Fetch data for login credential which role are login
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const role = authToken?.role

  const fetchTimer = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`http://localhost:9000/api/timer-list`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      // Filter projects to only include those less than one month old
      // const oneMonthAgo = new Date();
      // oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      // const filteredProjects = response.data.filter(project => new Date(project.date) > oneMonthAgo);

      setSavedProjects(response.data)
    } catch (error) {
      console.error('Error fetching Timer', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTimer()
  }, [authToken?.token])

  // Effect to handle timer updates
  useEffect(() => {
    let timeInterval

    if (isTimerRunning) {
      timeInterval = setInterval(() => {
        setTimeElapsedInSeconds(prevTime => prevTime + 1)
      }, 1000)
    } else {
      clearInterval(timeInterval)
    }

    return () => {
      clearInterval(timeInterval)
    }
  }, [isTimerRunning])

  // Function to render time in HH:MM:SS format
  const renderTime = () => {
    const hours = Math.floor(timeElapsedInSeconds / SECONDS_IN_AN_HOUR)
    const minutes = Math.floor((timeElapsedInSeconds % SECONDS_IN_AN_HOUR) / 60)
    const seconds = Math.floor(timeElapsedInSeconds % 60)

    const paddedHours = hours < 10 ? `0${hours}` : hours
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`
  }

  const time = renderTime()

  // Function to handle canceling the confirmation
  const onCancelConfirm = () => {
    setShowConfirm(false)
    setProjectName('') // Clear the project name
    setDescription('')
  }

  // Function to resume the timer
  const onResumeTimer = () => {
    setIsTimerRunning(true)
    setResumeTime(new Date())
  }

  // Function to start the timer
  const onStartTimer = () => {
    if (!isTimerRunning) {
      setShowConfirm(true)
    }

    // setShowProjectInput(true); // Show the project name input field
    if (projectName === '' || description === '') {
      setIsTimerRunning(false)
    } else {
      if (isTimerRunning) {
        onResumeTimer()
      } else {
        setIsTimerRunning(true)
        setShowConfirm(false)
      }
    }
    setStartTime(new Date())
    setRoleWiseData(role)
    setEmpRoleWiseData(role)
  }

  // Function to pause the timer
  const onPauseTimer = () => {
    setIsTimerRunning(false)
    setPauseTime(new Date())
  }

  // Function to handle stopping the timer
  const onStopTimer = () => {
    if (isTimerRunning) {
      setShowConfirm(true)
    }
    setStopTime(new Date())
  }

  // Function to save the project and timer data
  const onSaveProject = async () => {
    if (description && timeElapsedInSeconds > 0) {
      const currentDate = new Date().toISOString().split('T')[0] // Get the current date in YYYY-MM-DD format

      const hours = Math.floor(timeElapsedInSeconds / 3600)
      const minutes = Math.floor((timeElapsedInSeconds % 3600) / 60)
      const seconds = Math.floor(timeElapsedInSeconds % 60)

      const newProject = {
        date: currentDate,
        projectName: projectName,
        description: description,
        role: role === 'HR' ? roleWiseData : empRoleWiseData,
        startTime: startTime ? startTime.toLocaleTimeString() : '',
        resumeTime: resumeTime ? resumeTime.toLocaleTimeString() : '',
        pauseTime: pauseTime ? pauseTime.toLocaleTimeString() : '',
        stopTime: stopTime.toLocaleTimeString(),
        hours: hours,
        minutes: minutes,
        seconds: seconds
      }

      try {
        // Make the API call to save the project and timer data
        const response = await axios.post(`http://localhost:9000/api/add-timer`, newProject, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken?.token}`
          }
        })

        toast.success('Timer Data Added Successful!', {
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
          // Since the response is an object, directly set it to savedProjects
          setSavedProjects(prevProjects => [...prevProjects, response.data])
          fetchTimer()
        }, 1000) // 1000 milliseconds = 1 seconds

        setProjectName('')
        setDescription('')
        setTimeElapsedInSeconds(0)
        setShowConfirm(false)
        setIsTimerRunning(false)
        setStartTime(null)
        setResumeTime(null)
        setPauseTime(null)
        setStopTime(null)
      } catch (error) {
        console.error('Error saving timer data', error)
        toast.error('Error Adding Timer Data. Please try again.', {
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
  }

  // For getting the IP address of user PC
  useEffect(() => {
    // Function to fetch user's public IP address using ipify
    const fetchUserIP = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json')
        const ipAddress = response.data.ip
        setUserIP(ipAddress)
        localStorage.setItem('userIP', ipAddress)
      } catch (error) {
        console.error('Error fetching IP address:', error)
      }
    }

    // Call the function to fetch the IP address when the component mounts
    fetchUserIP()
  }, [])

  return (
    <TimerContext.Provider
      value={{
        loading,
        isTimerRunning,
        setIsTimerRunning,
        onCancelConfirm,
        onStartTimer,
        onPauseTimer,
        pauseTime,
        onResumeTimer,
        onStopTimer,
        onSaveProject,
        showConfirm,
        time,
        savedProjects,
        projectName,
        setProjectName,
        description,
        setDescription,
        setShowConfirm,
        userIP,
        role
      }}
    >
      {children}
    </TimerContext.Provider>
  )
}

export function useTimer() {
  return useContext(TimerContext)
}
