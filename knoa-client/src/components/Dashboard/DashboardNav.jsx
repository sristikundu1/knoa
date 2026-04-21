import React, { use, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowForward, IoIosNotifications } from "react-icons/io";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/UseAuth";
import useRole from "../../hooks/useRole";
import { HiH2 } from "react-icons/hi2";
import { getFavCourse } from "../../utils/localStorage";
import { useQuery } from "@tanstack/react-query";

const DashboardNav = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { role } = useRole();
  const [wishCourse, setWishCourse] = useState(getFavCourse());

  // 2. Enrollment Stats Query (For Mentors)
  const { data, isLoading } = useQuery({
    queryKey: ["mentor-unique-courses", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiosSecure.get(`/mentor/course-stats/${user?.uid}`);
      return res.data;
    },
  });
  const mentorCourses = data?.courses || [];
  const totalOverallStudents = data?.totalStudents || 0;

  // 3. Admin Payment Query (For Admin)
  const { data: allPayments = [], refetch } = useQuery({
    queryKey: ["admin-enrolls"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/enrollments");
      return res.data;
    },
  });

  // --- Logic to determine Badge Count and Message ---
  let badgeCount = 0;
  let title = "Notifications";
  let description = "";
  let link = "/dashboard";

  if (role === "student") {
    badgeCount = wishCourse.length;
    description =
      badgeCount > 0
        ? `You have ${badgeCount} course${badgeCount.length !== 1 ? "s" : ""} in wishlist.`
        : "Wishlist is empty.";
    link = "/dashboard/fav-courses";
  } else if (role === "mentor") {
    // Total students across all courses
    badgeCount = totalOverallStudents;
    title = "Student Enrollments";
    description = `Total ${badgeCount} student${badgeCount.length !== 1 ? "s" : ""} enrolled in your courses.`;
    link = "/dashboard/enrolled-students";
  } else if (role === "admin") {
    badgeCount = allPayments.length;
    title = "Payment Alerts";
    description = `${badgeCount} successful enrollments processed.`;
    link = "/dashboard/manage-enrollment";
  }

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
        {/* <div className="relative max-w-md w-full">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-xl">
            <CiSearch />
          </span>
          <input
            type="search"
            placeholder="Search Your Course..."
            className="w-full bg-slate-50 border-none pl-11 pr-4 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 transition-all outline-none text-slate-600 placeholder:text-slate-400"
          />
        </div> */}
        {user && (
          <h2 className="font-bold text-[#02aedd] text-xl">
            Dashboard {user.role}
          </h2>
        )}
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
              {badgeCount > 0 && (
                <span className="badge badge-sm bg-[#0077b6] text-white rounded-full indicator-item border-none text-[10px] scale-90">
                  {badgeCount}
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
              <h3 className="text-lg font-bold text-slate-800">{title}</h3>
              <p className="text-slate-500 text-sm italic">{description}</p>
              <div className="card-actions mt-2">
                <button
                  onClick={() => navigate(link)}
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
                {role || "Student"}
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
