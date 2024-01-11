import React, { useState } from "react";
import eye from "../assets/eye.svg";
import eyeclose from '../assets/eye-off.svg';
import eri from "../assets/elea-pic.png";
import mail from "../assets/mail.svg";
import check from "../assets/check.svg";
import lock from '../assets/lock.svg';
import './css/animation.css';
import dog from '../assets/dog-running.gif';

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <div className="bg-pink-300 p-2 rounded shadow-md w-full h-screen md:h-auto md:w-1/4 font-['Consolas'] overflow-hidden">
        <div className="flex justify-center items-center">
          <img src={eri} alt="" className="rounded-xl md:w-40 md:h-40" />
        </div>
        <form onSubmit={handleSubmit} className="mx-4 mt-4">
          <div className="flex gap-2 border border-b-2 border-pink-500 border-t-0 border-l-0 border-r-0 mb-4 py-1">
            <img src={mail} alt="" className="w-8" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter Your Username"
              className="text-pink-700 w-full text-base bg-transparent focus:outline-none focus:border-transparent"
            />
            <span className="">
              <img src={check} alt="" className="w-8" />
            </span>
          </div>
          <div className="flex gap-2 border border-b-2 border-pink-500 border-t-0 border-l-0 border-r-0 mb-4 py-1">
            <img src={lock} alt="" className="w-8" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter Your Password"
              className="text-pink-700 w-full text-base bg-transparent focus:outline-none focus:border-transparent"
            />
            <span className="" onClick={togglePasswordVisibility}>
              <img src={showPassword ? eyeclose : eye} alt="" className="w-8 cursor-pointer" />
            </span>
          </div>
          <button
            type="submit"
            className="bg-slate-100 hover:bg-white w-full rounded-lg py-2 text-xl border-4 border-pink-500 my-2 font-bold"
          >
            Log in
          </button>
          <button
            className="bg-slate-100 hover:bg-white w-full rounded-lg py-2 text-xl border-4 border-pink-500 my-2 font-bold"
          >
            Sign up
          </button>
        </form>
        <div className="walker-container md:hidden">
            <div className="walker"><img src={dog} alt="" className="w-24" /></div>
        </div>
      </div>
    </>
  );
};

export default Login;
