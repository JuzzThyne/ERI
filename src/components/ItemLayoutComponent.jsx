import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAsync } from "../redux/authSlice";
import power from "../assets/power.svg";
import elea from "../assets/elea-pic.png";
import BottomNavbar from "../reusable-components/BottomNavbar";

const ItemLayoutComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleLogoutClick = async () => {
    try {
      await dispatch(logoutAsync(token));
      localStorage.removeItem("activeLink");
      window.location.reload();
    } catch (error) {}
  };
  return (
    <>
      <header className="bg-pink-500 w-full h-16 flex items-center justify-between font-consolas shadow-md px-4">
        <div className="flex items-center">
          <img src={elea} alt="" className="w-12 h-12 rounded-full mr-2" />
          <h1 className="text-xl text-white">Elea Random Items</h1>
        </div>
        <nav className="hidden md:flex items-center">
          <ul className="flex gap-4 text-white">
            <li>Home</li>
            <li>Search</li>
            <li>Add</li>
            <li>Account</li>
          </ul>
        </nav>
        <button
          className="bg-pink-400 text-white px-4 py-2 rounded-full"
          onClick={handleLogoutClick}
        >
          <img src={power} alt="" className="w-8 h-8" />
        </button>
      </header>

      <main className="font-consolas">
        <div className="bg-pink-200 w-full h-screen">
          <Outlet />
          <BottomNavbar />
        </div>
      </main>
    </>
  );
};

export default ItemLayoutComponent;
