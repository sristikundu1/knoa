import React, { use, useState } from "react";
import { BiSolidBookAdd } from "react-icons/bi";
import { BsChatDots } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { HiOutlineLogout, HiMenuAlt2 } from "react-icons/hi"; // Added Menu icon
import {
  LuLayoutDashboard,
  LuUsers,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import { RiBookShelfFill } from "react-icons/ri";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import AIChat from "../AIChat/AIChat";
import useRole from "../../hooks/useRole";
import Swal from "sweetalert2";

const DashboardLeft = () => {
  const { logOut } = use(AuthContext);
  const { role } = useRole();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LuLayoutDashboard /> },
  ];

  if (role === "mentor" || role === "admin") {
    menuItems.push({
      name: "Add Course",
      path: "/dashboard/add-course",
      icon: <BiSolidBookAdd />,
    });
  }

  menuItems.push({
    name: "All Course",
    path: "/dashboard/all-courses",
    icon: <RiBookShelfFill />,
  });

  if (role === "admin") {
    menuItems.push({
      name: "Manage User",
      path: "/dashboard/manage-user",
      icon: <LuUsers />,
    });
  }

  menuItems.push({
    name: "Profile",
    path: "/dashboard/profile",
    icon: <CgProfile />,
  });

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "Logged Out!",
          icon: "success",
        });
      })

      .catch((err) => toast.error(err.message));
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md text-[#00b4d8]"
      >
        <HiMenuAlt2 size={24} />
      </button>

      {/* Sidebar Container */}
      <div
        className={`
        fixed lg:static z-40 h-screen bg-white border-r border-blue-100 p-4 flex flex-col justify-between transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-20" : "w-64"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex flex-col gap-6">
          {/* Header Area */}
          <div
            className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} mb-4`}
          >
            {!isCollapsed && (
              <Link to="/" className="transition-opacity duration-200">
                <img
                  className="w-24 h-auto"
                  src="https://i.ibb.co.com/1Jvhnhsz/Knoa-Logo-2-1.png"
                  alt="logo"
                />
              </Link>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-blue-50 rounded-full text-slate-400 hover:text-[#00b4d8] transition-colors"
            >
              {isCollapsed ? (
                <LuChevronRight size={20} />
              ) : (
                <LuChevronLeft size={20} />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2">
            {!isCollapsed && (
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">
                Overview
              </h3>
            )}

            {menuItems.map((item) => (
              <div
                key={item.path}
                className="tooltip tooltip-right"
                data-tip={isCollapsed ? item.name : ""}
              >
                <NavLink
                  to={item.path}
                  end={item.path === "/dashboard"}
                  className={({ isActive }) => `
                    flex items-center gap-4 p-3 rounded-xl transition-all group
                    ${isCollapsed ? "justify-center" : "px-4"}
                    ${isActive ? "bg-blue-50 text-[#00b4d8]" : "text-slate-600 hover:bg-slate-50"}
                  `}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <span className="font-medium whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </NavLink>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col gap-2 pt-4 border-t border-blue-50">
          <div
            className="tooltip tooltip-right"
            data-tip={isCollapsed ? "Chat Support" : ""}
          >
            <button
              onClick={() => setIsChatOpen(true)}
              className={`flex items-center gap-4 p-3 text-slate-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all w-full ${isCollapsed ? "justify-center" : "px-4"}`}
            >
              <BsChatDots className="text-xl text-blue-500" />
              {!isCollapsed && (
                <span className="font-medium whitespace-nowrap">
                  Chat Support
                </span>
              )}
            </button>
          </div>

          <div
            className="tooltip tooltip-right"
            data-tip={isCollapsed ? "Logout" : ""}
          >
            <button
              onClick={handleLogOut}
              className={`flex items-center gap-4 p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all w-full ${isCollapsed ? "justify-center" : "px-4"}`}
            >
              <HiOutlineLogout className="text-xl" />
              {!isCollapsed && (
                <span className="font-medium whitespace-nowrap">Logout</span>
              )}
            </button>
          </div>
          <AIChat isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default DashboardLeft;
