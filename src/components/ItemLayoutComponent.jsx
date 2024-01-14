import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
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
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolling down or up
      setIsFadingOut(currentScrollY > prevScrollY);

      // Update scroll position
      setPrevScrollY(currentScrollY);
    };

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  useEffect(() => {
    // Save the scroll position to localStorage when component unmounts or changes
    return () => {
      localStorage.setItem("scrollPosition", prevScrollY);
    };
  }, [prevScrollY]);

  useEffect(() => {
    // Retrieve the saved scroll position when the component mounts
    const savedScrollPosition = localStorage.getItem("scrollPosition");

    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
      setPrevScrollY(parseInt(savedScrollPosition, 10));
    }
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
          <ul className="flex gap-4 text-white text-xl uppercase p-2">
            <Link to="/home" className="p-1 hover:bg-pink-200 rounded-md hover:text-black transition ease-in-out duration-300">Home</Link>
            <Link to="/search" className="p-1 hover:bg-pink-200 rounded-md hover:text-black transition ease-in-out duration-300">Seach</Link>
            <Link to="/add" className="p-1 hover:bg-pink-200 rounded-md hover:text-black transition ease-in-out duration-300">Add</Link>
            <Link to="/account" className="p-1 hover:bg-pink-200 rounded-md hover:text-black transition ease-in-out duration-300">Account</Link>
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
        <div className="bg-pink-200 w-full h-auto">
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
