/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

const ProjectFormLogic = (projectData, editProjectId) => {
  const initialFormValue = {
    projectName: "",
    clientName: "",
    clientEmail: "",
    startDate: "",
    endDate: "",
    status: "Active",
    userId: [],
    teamMembers: [],
    document: []
  }

  const [formData, setFormData] = useState(initialFormValue);
  const [errors, setErrors] = useState(initialFormValue);

  const validateField = (name, value) => {
    switch (name) {
      case "projectName":
        if (value.trim() === "") {
          return "Project name is required";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          return "Project name should contain only characters";
        }
        break;
      case "clientName":
        if (value.trim() === "") {
          return "Client name is required";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          return "Client name should contain only characters";
        }
        break;
      case "startDate":
        if (value.trim() === "") {
          return "Start date is required";
        }
        break;
      case "teamMembers":
        if (value.length === 0) {
          return "Team members are required";
        }
        break;
      case "document":
        if (value.length === 0) {
          return "Document are required";
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

  const handleTeamMembersChange = async (event, value) => {
    setFormData({
      ...formData,
      teamMembers: value,
      userId: value
    });
  }

  const handleImageChange = (files) => {
    setFormData({
      ...formData,
      document: files // Store the selected image
    });
  };

  useEffect(() => {
    const selectedProject = projectData.find((project) => project.id === editProjectId);

    if (selectedProject) {
      // Map the teamMembers array to an array of objects with name and userId properties
      const teamMembersArray = selectedProject.teamMembers.map(member => ({
        name: member,
        id: selectedProject.userId[selectedProject.teamMembers.indexOf(member)]
      }));

      // Format endDate to ISO 8601 format ('yyyy-MM-dd') for consistency
      let formattedEndDate = '';
      if (typeof selectedProject.endDate === 'string') {
        const date = new Date(selectedProject.endDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because month index starts from 0
        const day = String(date.getDate()).padStart(2, '0');
        formattedEndDate = `${year}-${month}-${day}`;
      }

      setFormData({
        ...selectedProject,
        teamMembers: teamMembersArray,
        endDate: formattedEndDate
      });
    } else {
      setFormData({
        ...initialFormValue
      });
    }
  }, [editProjectId, projectData]);

  return {
    handleImageChange,
    handleInputChange,
    formData,
    errors,
    validateForm,
    setFormData,
    handleTeamMembersChange,
    initialFormValue
  }
}

export default ProjectFormLogic;