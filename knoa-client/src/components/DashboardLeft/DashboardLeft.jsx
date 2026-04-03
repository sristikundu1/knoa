import React, { use, useState } from "react";
import { BiSolidBookAdd } from "react-icons/bi";
import { BsChatDots } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { HiOutlineLogout } from "react-icons/hi";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiBookShelfFill } from "react-icons/ri";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import AIChat from "../AIChat/AIChat";

const DashboardLeft = () => {
  const { logOut } = use(AuthContext);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LuLayoutDashboard /> },
    {
      name: "Add Course",
      path: "/dashboard/add-course",
      icon: <BiSolidBookAdd />,
    },
    {
      name: "All Course",
      path: "/dashboard/all-courses",
      icon: <RiBookShelfFill />,
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: <CgProfile />,
    },
  ];

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("LogOut Successfully!");
      })
      .catch((error) => {
        // An error happened.
        toast.error(error);
      });
  };
  return (
    <div className="w-64 bg-white h-screen border-r border-blue-100 p-6 flex flex-col justify-between">
      {/* Top Section: Logo & Nav */}
      <div className="flex flex-col gap-6">
        <Link to="/">
          <img
            className="w-32 h-auto mb-4"
            src="https://i.ibb.co.com/1Jvhnhsz/Knoa-Logo-2-1.png"
            alt="logo"
          />
        </Link>

        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Overview
          </h3>

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-lg transition-all hover:text-[#03045e] text-lg ${
                  isActive
                    ? "bg-blue-50 text-[#00b4d8] font-medium"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Bottom Section: Chat & Logout */}
      <div className="flex flex-col gap-2 pt-6 border-t border-blue-50">
        <button
          onClick={() => setIsChatOpen(true)}
          className="flex items-center gap-4 px-4 py-3 text-slate-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-all w-full text-left"
        >
          <span className="text-xl text-blue-500">
            <BsChatDots />
          </span>
          <span className="font-medium text-lg">Chat Support</span>
        </button>

        <button
          onClick={handleLogOut}
          className="flex items-center gap-4 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-all w-full text-left"
        >
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          <span className="font-medium text-lg">Logout</span>
        </button>

        <AIChat isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      </div>
    </div>
  );
};

export default DashboardLeft;
