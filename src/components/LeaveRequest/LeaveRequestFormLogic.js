import { useState } from 'react'

const LeaveRequestFormLogic = () => {
  const initialFormValue = {
    leaveName: '',
    startDate: '',
    endDate: '',
    leaveType: '',
    description: ''
  }

  const [formData, setFormData] = useState(initialFormValue)
  const [errors, setErrors] = useState(initialFormValue)

  const validateField = (name, value) => {
    switch (name) {
      case 'leaveName':
        if (value.trim() === '') {
          return 'Leave Type is required'
        }
        break
      case 'startDate':
        if (value.trim() === '') {
          return 'Starting date is required'
        }
        break

      // case "endDate":
      //   if (value.trim() === "") {
      //     return "Ending date is required";
      //   }
      //   break;
      case 'leaveType':
        if (value.trim() === '') {
          return 'Total Days is required'
        }
        break
      case 'description':
        if (value.trim() === '') {
          return 'Description is required'
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

  // useEffect(() => {
  //   const selectedDepartment = departmentData.find((depart) => depart.id === editDepartId);

  //   if (selectedDepartment) {
  //     setFormData(selectedDepartment);
  //   } else {
  //     setFormData({
  //       ...initialFormValue
  //     });
  //   }
  // }, [editDepartId, departmentData]);

  return {
    handleInputChange,
    formData,
    errors,
    validateForm,
    setFormData,
    initialFormValue
  }
}

export default LeaveRequestFormLogic
