/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

const HolidayFormLogic = (holidayData, editHolidayId) => {
  const initialFormValue = {
    name: '',
    date: ''
  }

  const [formData, setFormData] = useState(initialFormValue)
  const [errors, setErrors] = useState(initialFormValue)

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (value.trim() === '') {
          return 'Name is required'
        }
        break
      case 'date':
        if (value.trim() === '') {
          return 'Date is required'
        }
        break
    }

    return ''
  }

  const validateForm = () => {
    const newErrors = {}
    Object.keys(initialFormValue).forEach(name => {
      const value = formData[name]
      const error = validateField(name, value)
      newErrors[name] = error
    })
    setErrors(newErrors)

    return !Object.values(newErrors).some(error => error !== '')
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })

    const error = validateField(name, value)

    setErrors({
      ...errors,
      [name]: error
    })
  }

  // Convert date from "DD MM YYYY" to "YYYY-MM-DD" for the form input
  const formatDateForInput = dateStr => {
    if (!dateStr) return ''

    const [day, month, year] = dateStr.split(' ')
    const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(
      month
    )

    // Use Date.UTC to avoid timezone shifts
    const dateObj = new Date(Date.UTC(year, monthIndex, day))

    return dateObj.toISOString().split('T')[0] // returns YYYY-MM-DD
  }

  useEffect(() => {
    const selectedHoliday = holidayData.find(holiday => holiday.id === editHolidayId)

    if (selectedHoliday) {
      setFormData({
        ...selectedHoliday,
        date: formatDateForInput(selectedHoliday.date) // Convert backend date to input format
      })
    } else {
      setFormData({
        ...initialFormValue
      })
    }
  }, [holidayData, editHolidayId])

  return {
    handleInputChange,
    formData,
    errors,
    validateForm,
    setFormData,
    initialFormValue
  }
}

export default HolidayFormLogic
