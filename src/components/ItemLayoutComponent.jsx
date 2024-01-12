import React, { useEffect, useState } from "react";
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
  const [isFadingOut, setIsFadingOut] = useState(false);

  // State to track scroll position
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolling down
      setIsFadingOut(currentScrollY > scrollY);

      // Update scroll position
      setScrollY(currentScrollY);
    };

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
            <div className="p-4">
                <Outlet />
            </div>
           <BottomNavbar isFadingOut={isFadingOut} />
        </div>
      </main>
    </>
  );
};

export default ItemLayoutComponent;
