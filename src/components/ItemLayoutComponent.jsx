import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logoutAsync } from '../redux/authSlice';
import BottomNavbar from '../reusable-components/BottomNavbar';

const ItemLayoutComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    const handleLogoutClick = async() => {
        try{
            await dispatch(logoutAsync(token));
            localStorage.removeItem('activeLink')
            window.location.reload();
        }catch(error){

        }
    }
  return (
    <>
    <header className='bg-pink-600 w-full h-12 flex items-center font-consolas'>
    <div className='flex gap-2 items-center'>
    <img src="" alt="" className='w-12 h-12'/>
    <h1 className='text-xl'>Elea Random Items</h1>
    </div>
    
    </header>
    <main>
    <div className='bg-pink-200 w-full h-screen'>
    ItemLayoutComponent
    <button className='bg-red-400 mx-auto py-4 px-2' onClick={handleLogoutClick}>Logout</button>
    <Outlet/>
    <BottomNavbar/>
    </div>
    </main>
   
    </>
    
  )
}

export default ItemLayoutComponent