import React from 'react'
import { Outlet } from 'react-router-dom'

const UserLayoutComponent = () => {
  return (
    <>
    <div className='w-full h-screen bg-pink-200 flex justify-center items-center'>
        <Outlet/>
    </div>
    </>
    
  )
}

export default UserLayoutComponent