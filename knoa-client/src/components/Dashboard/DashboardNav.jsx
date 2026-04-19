import React, { use, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowForward, IoIosNotifications } from "react-icons/io";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, useRouteLoaderData } from "react-router";

const DashboardNav = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const wishCourses = useRouteLoaderData("dashboard-data");

  return (
    <div className="navbar bg-white rounded-2xl shadow-sm border border-blue-50 px-6 h-20">
      <label
        htmlFor="my-drawer-4"
        aria-label="open sidebar"
        className="btn btn-square btn-ghost"
      >
        {/* Sidebar toggle icon */}
        <IoIosArrowForward size={20} />
      </label>
      {/* 1. Search Section (Remains the same) */}
      <div className="flex-1">
        <div className="relative max-w-md w-full">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-xl">
            <CiSearch />
          </span>
          <input
            type="search"
            placeholder="Search Your Course..."
            className="w-full bg-slate-50 border-none pl-11 pr-4 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 transition-all outline-none text-slate-600 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* 2. Actions Section */}
      <div className="flex-none flex items-center gap-6">
        {/* Notifications */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle text-2xl text-slate-500 hover:text-[#03045e] transition-colors"
          >
            <div className="indicator">
              <IoIosNotifications />
              {wishCourses ? (
                <span className="badge badge-sm bg-[#0077b6] text-white rounded-full indicator-item border-none text-[10px]">
                  {wishCourses.length}
                </span>
              ) : (
                <span className="badge badge-sm bg-[#0077b6] text-white rounded-full indicator-item border-none text-[10px]">
                  0
                </span>
              )}
            </div>
          </div>
          {/* Notification dropdown content remains the same */}
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-white z-20 mt-3 w-64 shadow-xl border border-blue-50"
          >
            <div className="card-body">
              <h3 className="text-lg font-bold text-slate-800">
                Notifications
              </h3>
              <p className="text-slate-500 text-sm italic">
                {wishCourses.length > 0
                  ? `You have ${wishCourses.length} course${wishCourses.length !== 1 ? "s" : ""} in wishlist.`
                  : "Your wishlist is empty."}
              </p>
              <div className="card-actions mt-2">
                <button
                  onClick={() => navigate("/dashboard/wishlist")}
                  className="btn bg-[#00b4d8] text-white  font-bold hover:bg-[#03045e] btn-sm btn-block normal-case"
                >
                  View All
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Info (No Dropdown) */}
        {user ? (
          <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[#03045e] leading-none">
                {user?.displayName}
              </p>
              <p className="text-[11px] font-medium text-[#00b4d8] mt-1 uppercase tracking-wider">
                {user?.role || "User"}
              </p>
            </div>

            <div className="avatar">
              <div className="w-10 h-10 rounded-full ring ring-blue-50 ring-offset-2">
                <img
                  alt="User Profile"
                  src={
                    user?.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[#03045e] leading-none">
                John Doe
              </p>
              <p className="text-[11px] font-medium text-[#00b4d8] mt-1 uppercase tracking-wider">
                Student
              </p>
            </div>

            <div className="avatar">
              <div className="w-10 h-10 rounded-full ring ring-blue-50 ring-offset-2">
                <img
                  alt="User Profile"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardNav;
