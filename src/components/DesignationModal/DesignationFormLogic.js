import React, { useState } from 'react'

const DesignationFormLogic = (designationData, editDesignationId) => {
  const initialFormValue = {
    designationName: '',
    status: 'Active'
  }

  const [formData, setFormData] = useState(initialFormValue)
  const [errors, setErrors] = useState(initialFormValue)

  const validateField = (name, value) => {
    switch (name) {
      case 'designationName':
        if (value.trim() === '') {
          return 'Designation name is required'
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          return 'Designation name should contain only characters'
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

  return {
    handleInputChange,
    formData,
    errors,
    validateForm,
    setFormData,
    initialFormValue
  }
}

export default DesignationFormLogic
