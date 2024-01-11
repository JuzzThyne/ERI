import React from 'react'
import { Outlet } from 'react-router-dom'

const UserLayoutComponent = () => {
  return (
    <>
    <div>
        UserLayoutComponent
        <Outlet/>
    </div>
    </>
    
  )
}

export default UserLayoutComponent