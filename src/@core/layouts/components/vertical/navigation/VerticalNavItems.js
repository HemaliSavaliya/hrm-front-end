import React, { useEffect, useState } from 'react'
import useUserPermissions from 'src/hooks/useUserPermissions'
import VerticalNavLink from './VerticalNavLink'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'
import navigation from 'src/navigation/vertical'

const resolveNavItemComponent = item => {
  if (item.sectionTitle) return VerticalNavSectionTitle
  return VerticalNavLink
}

const VerticalNavItems = props => {
  const [authToken, setAuthToken] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const userPermissions = useUserPermissions(authToken, userRole) || []

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loginDetails = JSON.parse(localStorage.getItem('login-details'))
      if (loginDetails) {
        setAuthToken(loginDetails.token)
        setUserRole(loginDetails.role)
      }
    }
  }, [])

  const verticalNavItems = navigation()
  const hasDashboardPermission = userPermissions.includes('Dashboard')

  const filteredNavItems = verticalNavItems.filter(item => {
    if (userRole === 'Admin') {
      return true // Admin sees all items including section titles
    } else {
      if (item.sectionTitle) {
        return hasDashboardPermission // Non-admin roles see section titles only if they have Dashboard permission
      }
      return userPermissions.includes(item.title)
    }
  })

  const RenderMenuItems = filteredNavItems.map((item, index) => {
    const TagName = resolveNavItemComponent(item)

    return <TagName {...props} key={index} item={item} />
  })

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
