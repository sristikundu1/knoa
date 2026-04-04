import React, { useState, use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiOutlineLogout, HiX } from "react-icons/hi";
import Swal from "sweetalert2";

const Navbar = () => {
  const { logOut, user } = use(AuthContext);
  const [isOpen, setIsOpen] = useState(false); // State for Mobile Menu

  const handleLogOut = () => {
    logOut()
      .then(() => Swal.fire("Logged Out!", "See you soon!", "success"))
      .catch((error) => Swal.fire("Error", error.message, "error"));
  };

  const navItems = ["Home", "Contact", "FAQ", "Dashboard"];

  const links = navItems.map((item) => (
    <li key={item} className="list-none">
      <NavLink
        to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
        onClick={() => setIsOpen(false)} // Close menu on click
        className={({ isActive }) =>
          `relative px-4 py-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 block
          ${isActive ? "text-[#03045e]" : "text-slate-500 hover:text-[#00b4d8]"}`
        }
      >
        {({ isActive }) => (
          <>
            {item}
            {isActive && (
              <motion.div
                layoutId="navbar-underline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00b4d8] mx-4 hidden lg:block"
              />
            )}
          </>
        )}
      </NavLink>
    </li>
  ));

  return (
    <div className="sticky top-0 z-50 w-full p-2 md:p-4">
      <div className="navbar max-w-7xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100 shadow-sm px-4 md:px-6">
        {/* Navbar Start: Logo & Mobile Toggle */}
        <div className="navbar-start">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-ghost lg:hidden text-[#03045e] p-2"
          >
            {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>

          <Link
            to="/"
            className="hover:opacity-80 transition-opacity ml-2 lg:ml-0"
          >
            <img
              className="w-24 md:w-28 h-auto"
              src="https://i.ibb.co.com/1Jvhnhsz/Knoa-Logo-2-1.png"
              alt="Knoa Logo"
            />
          </Link>
        </div>

        {/* Navbar Center: Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0 gap-2">{links}</ul>
        </div>

        {/* Navbar End: User Profile or Login */}
        <div className="navbar-end gap-2 md:gap-4">
          {user ? (
            <div className="flex items-center gap-2 md:gap-4 p-1 pr-2 md:pr-4 bg-slate-50 rounded-full border border-slate-100">
              <div className="relative shrink-0">
                <img
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-white ring-1 ring-[#39b8ad]/20 shadow-sm"
                  src={
                    user?.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt="Profile"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
              </div>

              {/* Hide name on very small screens to save space */}
              <div className="hidden sm:block">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter leading-none">
                  User
                </p>
                <p className="text-xs md:text-sm font-bold text-[#03045e] truncate max-w-[80px]">
                  {user?.displayName?.split(" ")[0]}
                </p>
              </div>

              <button
                onClick={handleLogOut}
                className="p-1.5 md:p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
              >
                <HiOutlineLogout
                  size={18}
                  className="md:w-[22px] md:h-[22px]"
                />
              </button>
            </div>
          ) : (
            <Link to="/auth/register">
              <button className="btn btn-sm md:btn-md bg-[#00b4d8] hover:bg-[#03045e] text-white border-none rounded-xl px-4 md:px-8 font-black uppercase text-[10px] md:text-xs tracking-widest">
                Join
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 bg-white shadow-2xl rounded-3xl p-6 border border-slate-100 lg:hidden flex flex-col gap-4 z-40"
          >
            <ul className="flex flex-col gap-4 items-center">{links}</ul>
            {!user && (
              <Link
                to="/auth/login"
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                <button className="w-full py-4 bg-slate-100 rounded-2xl font-bold text-[#03045e]">
                  Log In
                </button>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
