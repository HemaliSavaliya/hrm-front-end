/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useTheme } from '@mui/material/styles';

const useAuth = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,

    // role: '',
  });

  const theme = useTheme();
  const router = useRouter();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRadioChange = (event) => {
    setValues({ ...values, role: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = values;

    try {
      const response = await axios.post('http://localhost:9000/api/login', {
        email,
        password,
      });

      if (response.status === 200) {
        // Assuming your API returns a token upon successful login
        const { token, userId, name, id, companyId, role } = response.data.data;

        if (role === 'Admin' || role === 'HR' || role === 'Employee') {
          // Display success toast upon successful login
          toast.success('Login successful!', {
            duration: 2000,
            position: 'top-right',
            style: {
              background: theme.palette.background.paper,
              color: theme.palette.text.primary,
              fontSize: "15px",
            },
          });

          // Store the token in localStorage or secure storage for future API requests
          localStorage.setItem("login-details", JSON.stringify({ token, role, email, userId, name, id, companyId }));

          if (role === "Employee") {
            setTimeout(() => {
              router.push("/account-settings");
            }, 1000); // 1000 milliseconds = 1 seconds
          } else {
            // Redirect after 1 seconds
            const returnUrl = router.query.returnUrl || '/';
            setTimeout(() => {
              router.push(returnUrl);
            }, 1000); // 1000 milliseconds = 1 seconds
          }
        } else {
          // Display an error toast if the role is not allowed
          toast.error('Login failed. Your role is not allowed to access this system.', {
            duration: 2000,
            position: 'top-right',
            style: {
              background: theme.palette.background.paper,
              color: theme.palette.text.primary,
              fontSize: "15px",
            },
          });

          // Redirect to 401 error page
          router.push("/401");
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
          fontSize: "15px",
        },
      });

      // Redirect to 500 error page
      router.push("/500");
    }
  };

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
    values,
    handleChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleRadioChange,
    handleSubmit,
  };
};

export default useAuth;