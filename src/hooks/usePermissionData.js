import axios from 'axios'
import { useEffect, useState } from 'react'

const usePermissionData = () => {
  const [roles, setRoles] = useState([])
  const [rolePermissions, setRolePermissions] = useState({})
  const [loading, setLoading] = useState(true)
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/get-role-name`, {
          headers: {
            Authorization: `Bearer ${authToken?.token}`
          }
        })

        if (response.data.success) {
          setRoles(response.data.roles)
          fetchPermissions(response.data.roles)
        }
      } catch (error) {
        console.error('Error fetching roles:', error)
      } finally {
        setLoading(false)
      }
    }

    const fetchPermissions = async roles => {
      setLoading(true)
      try {
        const promise = roles.map(role =>
          axios.get(`${process.env.NEXT_PUBLIC_URL}/get-permission`, {
            params: { role },
            headers: {
              Authorization: `Bearer ${authToken?.token}`
            }
          })
        )

        const responses = await Promise.all(promise)

        const permissions = responses.reduce((acc, response, index) => {
          if (response.data.success) {
            acc[roles[index]] = response.data.permission
          }

          return acc
        }, {})

        setRolePermissions(permissions)
      } catch (error) {
        console.error(`Error fetching ${roles} permissions:`, error)
      } finally {
        setLoading(false)
      }
    }

    if (authToken?.token) {
      fetchRoles()
    }
  }, [authToken?.token])

  const handleToggleChange = async (menuItemTitle, role) => {
    const currentPermissions = rolePermissions[role] || [] // Ensure it's an array

    const updatedPermissions = currentPermissions.includes(menuItemTitle)
      ? currentPermissions.filter(item => item !== menuItemTitle)
      : [...currentPermissions, menuItemTitle]

    setRolePermissions(prev => ({ ...prev, [role]: updatedPermissions }))

    try {
      const action = currentPermissions.includes(menuItemTitle) ? 'delete' : 'add'

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/${action}-permission`,
        {
          role,
          option_name: menuItemTitle,
          status: action === 'add' ? 'Yes' : 'No'
        },
        {
          headers: {
            Authorization: `Bearer ${authToken?.token}`
          }
        }
      )

      if (!response.data.success) {
        console.error(`Error ${action}ing option`)
      }
    } catch (error) {
      console.error(`Error Deleting option:`, error)
    }
  }

  return {
    loading,
    roles,
    handleToggleChange,
    rolePermissions
  }
}

export default usePermissionData
