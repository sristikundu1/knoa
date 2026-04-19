import React from "react";
import { Link, Outlet } from "react-router";
import DashboardNav from "../components/Dashboard/DashboardNav";
import useRole from "../hooks/useRole";
import { RiBookShelfFill, RiMailUnreadLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import { BiSolidBookAdd } from "react-icons/bi";
import useAuth from "../hooks/UseAuth";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserCog, FaUserGraduate } from "react-icons/fa";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { FaBookOpenReader } from "react-icons/fa6";

const Dashboard = () => {
  const { role } = useRole();
  const { user, logOut } = useAuth();

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
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content mx-8">
        {/* Navbar */}

        <DashboardNav></DashboardNav>

        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible z-40">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="flex min-h-full flex-col items-start bg-white border-r border-slate-100 shadow-sm transition-all duration-300 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar Content */}
          <ul className="menu w-full grow px-2 gap-1">
            {/* Overview Label (Hidden when closed) */}

            <li>
              <Link
                to={"/"}
                className="flex items-center gap-3 py-2 px-3 rounded-lg text-[#03045e] hover:bg-blue-50 hover:text-[#00b4d8] transition-all is-drawer-close:justify-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                <img
                  className="h-8 w-auto is-drawer-close:h-6 transition-all"
                  src="https://i.ibb.co.com/60gfp7ft/Knoa-Fav-1.png"
                  alt="logo"
                />
                <span className="text-lg font-bold  is-drawer-close:hidden">
                  KNOA
                </span>
              </Link>
            </li>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 my-2 is-drawer-close:hidden">
              Overview
            </p>

            {/* List items:  */}
            {role === "student" && (
              <>
                <li>
                  <Link
                    to={"/dashboard/my-enrollments"}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-[#03045e] hover:bg-blue-50 hover:text-[#00b4d8] transition-all is-drawer-close:justify-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip=" My-Enrollments"
                  >
                    <HiOutlineCheckBadge size={20} />
                    <span className="text-sm font-medium is-drawer-close:hidden">
                      My Enrollments
                    </span>
                  </Link>
                </li>
              </>
            )}

            {role === "admin" && (
              <>
                <li>
                  <Link
                    to={"/dashboard/manage-user"}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-[#03045e] hover:bg-blue-50 hover:text-[#00b4d8] transition-all is-drawer-close:justify-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage User"
                  >
                    <LuUsers size={20} />
                    <span className="text-sm font-medium is-drawer-close:hidden">
                      Manage User
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/manage-enrollment"}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-[#03045e] hover:bg-blue-50 hover:text-[#00b4d8] transition-all is-drawer-close:justify-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Enrollment"
                  >
                    <FaUserGraduate size={20} />
                    <span className="text-sm font-medium is-drawer-close:hidden">
                      Manage Enrollment
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/subscribers"}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-[#03045e] hover:bg-blue-50 hover:text-[#00b4d8] transition-all is-drawer-close:justify-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Subscribers"
                  >
                    <RiMailUnreadLine size={20} />
                    <span className="text-sm font-medium is-drawer-close:hidden">
                      Subscribers
                    </span>
                  </Link>
                </li>
              </>
            )}

            {(role === "admin" || role === "mentor") && (
              <>
                <li>
                  <Link
                    to={"/dashboard/all-courses"}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-[#03045e] hover:bg-blue-50 hover:text-[#00b4d8] transition-all is-drawer-close:justify-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip=" All-Course"
                  >
                    <RiBookShelfFill size={20} />
                    <span className="text-sm font-medium is-drawer-close:hidden">
                      All Course
                    </span>
                  </Link>
                </li>
              </>
            )}

            {role === "mentor" && (
              <>
                <li>
                  <Link
                    to={"/dashboard/update-profile"}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-[#03045e] hover:bg-blue-50 hover:text-[#00b4d8] transition-all is-drawer-close:justify-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Update Profile"
                  >
                    <FaUserCog size={20} />
                    <span className="text-sm font-medium is-drawer-close:hidden">
                      Update Profile
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/dashboard/add-course"}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-[#03045e] hover:bg-blue-50 hover:text-[#00b4d8] transition-all is-drawer-close:justify-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add Course"
                  >
                    <BiSolidBookAdd size={20} />
                    <span className="text-sm font-medium is-drawer-close:hidden">
                      Add Course
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/enrolled-students"}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-[#03045e] hover:bg-blue-50 hover:text-[#00b4d8] transition-all is-drawer-close:justify-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Enrolled Students"
                  >
                    <FaBookOpenReader size={20} />
                    <span className="text-sm font-medium is-drawer-close:hidden">
                      Enrolled Students
                    </span>
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Bottom Section (Matching DashboardLeft style) */}
          <div className="w-full p-2 border-t border-slate-50">
            <li>
              <button
                onClick={handleLogOut}
                className="flex items-center gap-3 py-2 px-3 rounded-lg text-red-400 hover:bg-red-50 transition-all w-full is-drawer-close:justify-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Logout"
              >
                <HiOutlineLogout size={20} />
                <span className="text-sm font-medium is-drawer-close:hidden">
                  Logout
                </span>
              </button>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
