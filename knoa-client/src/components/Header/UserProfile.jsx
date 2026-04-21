import React from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { Link } from "react-router";

const UserProfile = ({ user, handleLogOut, role }) => {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="flex items-center gap-2 p-1 pr-2 bg-slate-50 rounded-full border border-slate-100 hover:bg-slate-100 transition-all"
      >
        <div className="relative shrink-0">
          <img
            className="w-10 h-10 rounded-full object-cover border-2 border-white ring-1 ring-[#39b8ad]/20"
            src={
              user?.photoURL ||
              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            }
            alt="Profile"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-52 mt-4 border border-slate-100"
      >
        <div className="px-4 py-3 border-b border-slate-50 mb-2">
          <p className="text-sm font-bold text-[#03045e] truncate">
            {user?.displayName?.split(" ")[0]}
          </p>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
            {role || "Student"}
          </p>
        </div>
        <li>
          <Link to="/dashboard" className="py-2">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/dashboard/profile" className="py-2">
            Profile
          </Link>
        </li>
        <div className="divider my-0"></div>
        <li>
          <button
            onClick={handleLogOut}
            className="text-red-500 hover:bg-red-50 py-3"
          >
            <HiOutlineLogout size={18} /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
