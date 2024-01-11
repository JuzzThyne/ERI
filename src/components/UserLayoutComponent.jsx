import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const UserLayoutComponent = () => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);
  return (
    <>
    <div className='w-full h-screen bg-pink-200 flex justify-center items-center'>
        <Outlet/>
    </div>
    </>
    
  )
}

export default UserLayoutComponent