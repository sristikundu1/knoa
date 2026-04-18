import React, { useState, use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiOutlineLogout, HiX } from "react-icons/hi";
import Swal from "sweetalert2";
import UserProfile from "./UserProfile";
import useRole from "./../../hooks/useRole";

const Navbar = () => {
  const { logOut, user } = use(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { role } = useRole();

  const handleLogOut = () => {
    logOut()
      .then(() => Swal.fire("Logged Out!", "See you soon!", "success"))
      .catch((err) => Swal.fire("Error", err.message, "error"));
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses", roles: ["student"] },
    { name: "Mentors", path: "/mentors", roles: ["student"] },
  ];

  // Reusable Link Component
  const NavLinks = ({ mobile = false }) => {
    // Filter: Show link if it has no role restrictions, OR if user's role matches
    const filteredLinks = navLinks.filter(
      (link) => !link.roles || link.roles.includes(role),
    );

    return (
      <>
        {filteredLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `
              relative px-4 py-2 text-sm font-bold uppercase tracking-widest transition-all
              ${isActive ? "text-[#03045e]" : "text-slate-500 hover:text-[#00b4d8]"}
              ${mobile ? "w-full text-center py-4 text-lg" : ""}
            `}
          >
            {link.name}
            {!mobile && (
              <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#00b4d8] scale-x-0 transition-transform duration-300 hover:scale-x-100" />
            )}
          </NavLink>
        ))}
      </>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full p-2 md:p-4">
      <div className="navbar max-w-7xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100 shadow-sm px-4 md:px-6">
        {/* Start: Mobile Toggle & Logo */}
        <div className="navbar-start">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-ghost lg:hidden text-[#03045e]"
          >
            {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
          <Link to="/" className="ml-2 lg:ml-0">
            <img
              className="w-24 md:w-28"
              src="https://i.ibb.co.com/1Jvhnhsz/Knoa-Logo-2-1.png"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-2">
            <NavLinks />
          </ul>
        </div>

        {/* End: Auth Actions */}
        <div className="navbar-end gap-4">
          {user ? (
<<<<<<< HEAD
            <div className="dropdown dropdown-end">
              {/* The Trigger: This is what you click to open the menu */}
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-2 p-1 pr-2 bg-slate-50 rounded-full border border-slate-100 hover:bg-slate-100 transition-all"
              >
                <div className="relative shrink-0">
                  <img
                    className="w-10 h-10 rounded-full object-cover border-2 border-white ring-1 ring-[#39b8ad]/20 shadow-sm"
                    src={
                      user?.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    alt="Profile"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
              </div>

              {/* The Content: This shows up when the image is clicked */}
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-52 mt-4 border border-slate-100"
              >
                <div className="px-4 py-3 border-b border-slate-50 mb-2">
                  <p className="text-sm font-bold text-[#03045e] truncate">
                    {user?.displayName?.split(" ")[0]}
                  </p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                    {user?.role || "Student"}
                  </p>
                </div>
                <li>
                  <a className="py-2">Profile Settings</a>
                </li>
                <div className="divider my-0"></div>{" "}
                {/* Simple DaisyUI divider line */}
                <li>
                  <button
                    onClick={handleLogOut}
                    className="text-red-500 hover:bg-red-50 flex items-center gap-2 py-3"
                  >
                    <HiOutlineLogout size={18} />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
=======
            <UserProfile user={user} handleLogOut={handleLogOut} />
>>>>>>> b1749bc (implement payment system for studnets)
          ) : (
            <Link
              to="/auth/register"
              className="btn btn-sm md:btn-md bg-[#00b4d8] hover:bg-[#03045e] text-white border-none rounded-xl px-6 md:px-8 font-black uppercase text-[10px] tracking-widest"
            >
              Join
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
            className="absolute top-24 left-4 right-4 bg-white shadow-2xl rounded-3xl p-6 border border-slate-100 lg:hidden flex flex-col items-center z-40"
          >
            <NavLinks mobile />
            {!user && (
              <Link
                to="/auth/login"
                onClick={() => setIsOpen(false)}
                className="w-full mt-4"
              >
                <button className="w-full py-4 bg-slate-100 rounded-2xl font-bold text-[#03045e]">
                  Log In
                </button>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
