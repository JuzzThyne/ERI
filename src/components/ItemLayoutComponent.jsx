import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logoutAsync } from '../redux/authSlice';

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
            window.location.reload();
        }catch(error){

        }
    }
  return (
    <div>
        ItemLayoutComponent
        <button className='bg-red-400 mx-auto py-4 px-2' onClick={handleLogoutClick}>Logout</button>
        <Outlet/>
    </div>
  )
}

export default ItemLayoutComponent