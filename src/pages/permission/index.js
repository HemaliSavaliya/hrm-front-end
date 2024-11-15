import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import navigation from 'src/navigation/vertical'
import usePermissionData from 'src/hooks/usePermissionData'

const Permission = () => {
  const { loading, roles, handleToggleChange, rolePermissions } = usePermissionData()

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh'
        }}
      >
        <img src='/images/loader.svg' alt='loader' />
      </div>
    )
  }

  return (
    <Grid container spacing={5}>
      {roles.length === 0 ? (
        <Typography
          textTransform={'uppercase'}
          letterSpacing={1}
          fontSize={15}
          pl={4}
          pt={4}
          textAlign={'center'}
          fontWeight={600}
        >
          No Roles For Permission
        </Typography>
      ) : (
        roles.map(role => (
          <Grid item key={role}>
            <Typography
              fontSize={14}
              textTransform={'uppercase'}
              color={'#9155f2'}
              fontWeight={700}
              mb={3}
              sx={{ textDecoration: 'underline' }}
            >
              {role} Permissions
            </Typography>
            {navigation().map(menuItem => {
              if (menuItem.sectionTitle) return null // skip rendering if sectionTitle exists

              return (
                <div className='switch-holder' key={menuItem.title}>
                  <div className='switch-label'>
                    <Box sx={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '13px' }}>{menuItem.title}</Box>
                  </div>
                  <div className='switch-toggle'>
                    <input
                      type='checkbox'
                      id={`${role}-${menuItem.title}`}
                      checked={rolePermissions[role]?.includes(menuItem.title)}
                      onChange={() => handleToggleChange(menuItem.title, role)}
                    />
                    <label htmlFor={`${role}-${menuItem.title}`}></label>
                  </div>
                </div>
              )
            })}
          </Grid>
        ))
      )}
    </Grid>
  )
}

export default Permission
