/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const DepartmentFormLogic = (departmentData, editDepartId) => {
  const initialFormValue = {
    departmentName: "",
    departmentHead: "",
    departmentEmail: "",
    teamMembers: [],
    status: "Active"
  }

  const [formData, setFormData] = useState(initialFormValue);
  const [errors, setErrors] = useState(initialFormValue);

  const validateField = (name, value) => {
    switch (name) {
      case "departmentName":
        if (value.trim() === "") {
          return "Department name is required";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          return "Department name should contain only characters";
        }
        break;
      case "departmentHead":
        if (value.trim() === "") {
          return "Department head is required";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          return "Department head should contain only characters";
        }
        break;
      case "departmentEmail":
        if (value.trim() === "") {
          return "Department email address is required";
        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/.test(value)) {
          return "Invalid email address";
        }
        break;
    }

    return "";
  }

  const validateForm = () => {
    const newErrors = {};
    Object.keys(initialFormValue).forEach((name) => {
      const value = formData[name];
      const error = validateField(name, value);
      newErrors[name] = error;
    });

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const error = validateField(name, value);

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleTeamMembersChange = (event, value) => {
    setFormData({
      ...formData,
      teamMembers: value
    });
  }

  useEffect(() => {
    const selectedDepartment = departmentData.find((depart) => depart.id === editDepartId);

    if (selectedDepartment) {
      setFormData(selectedDepartment);
    } else {
      setFormData({
        ...initialFormValue
      });
    }
  }, [editDepartId, departmentData]);

  return {
    handleInputChange,
    formData,
    errors,
    validateForm,
    setFormData,
    handleTeamMembersChange,
    initialFormValue
  }
}

export default DepartmentFormLogic;