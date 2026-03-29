import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-lg font-bold text-[#03045e] drop-shadow-md transition-all duration-200 
          ${isActive ? "underline decoration-[#03045e] decoration-2 underline-offset-4" : "hover:text-[#00b4d8]"}`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            `text-lg font-bold text-[#03045e] drop-shadow-md transition-all duration-200 
          ${isActive ? "underline decoration-[#03045e]  decoration-2 underline-offset-4" : "hover:text-[#00b4d8]"}`
          }
        >
          Courses
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `text-lg font-bold text-[#03045e] drop-shadow-md transition-all duration-200 
          ${isActive ? "underline decoration-[#03045e]  decoration-2 underline-offset-4" : "hover:text-[#00b4d8]"}`
          }
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="">
      <div className="navbar bg-base-100 top-0 sticky">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a href="/">
            <img
              className="w-34 h-auto "
              src="https://i.ibb.co.com/1Jvhnhsz/Knoa-Logo-2-1.png"
              alt="logo"
            />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn bg-[#00b4d8] text-[#03045e] px-10 font-bold text-lg py-6 ">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
