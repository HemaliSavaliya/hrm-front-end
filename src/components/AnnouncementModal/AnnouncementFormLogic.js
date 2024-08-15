/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";

const AnnouncementFormLogic = (announcementData, editAnnoId) => {
  const initialFormValue = {
    announcementTitle: "",
    announcementDetails: "",
    selectDepartment: "",
    document: []
  }

  const [formData, setFormData] = useState(initialFormValue);
  const [errors, setErrors] = useState(initialFormValue);
  const [departmentData, setDepartmentData] = useState([]);
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;

  const validateField = (name, value) => {
    switch (name) {
      case "announcementTitle":
        if (value.trim() === "") {
          return "Announcement title is required";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          return "Announcement title should contain only characters";
        }
        break;
      case "announcementDetails":
        if (value.trim() === "") {
          return "Announcement Detail is required";
        }
        break;
      case "selectDepartment":
        if (value === "") {
          return "Department is required";
        }
        break;
      case "document":
        if (value.length === 0) {
          return "Document is required";
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

  const handleImageChange = (files) => {
    setFormData({
      ...formData,
      document: files // Store the selected image
    });
  };

  // Fetch department data
  const fetchDepartment = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/department-list`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`,
        },
      });

      const filterData = response.data.filter(data => data.status === "Active");

      setDepartmentData(filterData);
    } catch (error) {
      console.error("Error fetching department:", error);
    }
  }

  useEffect(() => {
    const selectedAnnouncement = announcementData.find((anno) => anno.id === editAnnoId);

    if (selectedAnnouncement) {
      setFormData(selectedAnnouncement);
    } else {
      setFormData({
        ...initialFormValue
      });
    }
  }, [editAnnoId, announcementData]);

  return {
    handleInputChange,
    handleImageChange,
    formData,
    errors,
    validateForm,
    setFormData,
    initialFormValue,
    fetchDepartment,
    departmentData
  }
}

export default AnnouncementFormLogic;