import { Box } from '@mui/material'
import React from 'react'
import AdminDashboard from 'src/views/dashboard/Admin/AdminDashboard'
import EmployeeDashboard from 'src/views/dashboard/Employee/EmployeeDashboard'
import HRDashboard from 'src/views/dashboard/HR/HRDashboard'

const Dashboard = () => {
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const role = authToken?.role

  return (
    <Box>
      {role === 'Admin' && <AdminDashboard />}
      {role === 'HR' && <HRDashboard />}
      {role === 'Employee' && <EmployeeDashboard />}
    </Box>
  )
}

export default Dashboard

  // < div >
  // <ul>
  //   <li>Total employee</li>
  //   <li>Total Project</li>
  //   <li>Today leave employee number</li>
  //   <li>Total apply leave employee</li>
  //   <li>Applicant list (interview date)</li>
  //   <li>If any announcement</li>
  //   <li>If any awards goes to any employee</li>
  //   <li>Today birth date employee</li>
  // </ul>
  //     </div >
  // {/* reminder */ }
  // < div >
  // <ul>
  //   <li>salary reminder</li>
  //   <li>contract reminder</li>
  //   <li>admin plan reminder</li>
  //   <li>birthdate reminder</li>
  //   <li>holiday reminder</li>
  // </ul>
  //     </div >