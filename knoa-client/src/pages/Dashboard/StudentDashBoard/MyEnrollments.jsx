import React from "react";
import useAuth from "./../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlineBookOpen,
  HiOutlineCheckCircle,
  HiOutlineClock,
} from "react-icons/hi";
import { Link } from "react-router";

const MyEnrollments = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myCourses = [], isLoading } = useQuery({
    queryKey: ["my-enrollments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-enrollments/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="p-10 text-center font-bold text-[#03045e]">
        Loading Dashboard...
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-50 min-h-screen"
    >
      {/* Dynamic Header Section */}
      <div className="flex flex-col items-center text-center mb-10 space-y-3">
        <span className="text-[#0077b6] font-bold tracking-[0.2em] uppercase text-xs px-3 py-1 bg-[#39B8AD]/10 rounded-full">
          Student Portal
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#03045e]">
          My <span className="text-[#00b4d8]">Enrolled Courses</span>
        </h2>
        <p className="text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed">
          Access your learning materials and track your progress. Once your
          enrollment is approved by the admin, you can begin your journey with
          your mentor.
        </p>
        <div className="w-20 h-1.5 bg-[#0077b6] rounded-full mt-2"></div>
      </div>

      {/* Stats Summary */}
      <div className="flex justify-start mb-6">
        <div className="bg-white border border-blue-50 px-6 py-3 rounded-2xl shadow-sm flex items-center gap-3">
          <HiOutlineBookOpen className="text-2xl text-[#00b4d8]" />
          <span className="text-slate-600 font-medium">
            Active Enrollments:{" "}
          </span>
          <span className="text-[#03045e] font-bold text-xl">
            {myCourses.length}
          </span>
        </div>
      </div>

      {/* Enrollments Table */}
      <div className="overflow-x-auto bg-white rounded-3xl border border-blue-50 shadow-sm">
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] tracking-wider">
            <tr>
              <th className="py-5 px-6">Course & Mentor</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {myCourses.map((course, index) => (
              <motion.tr
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                key={course._id}
                className="hover:bg-slate-50/50 transition-colors border-b border-slate-50"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12 shadow-sm border border-gray-100">
                        <img src={course.courseImage} alt={course.courseName} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-[#03045e]">
                        {course.courseName}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1">
                        Mentor: {course.mentorName}
                      </div>
                    </div>
                  </div>
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-fit ${
                      course.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    {course.status === "completed" ? (
                      <>
                        {" "}
                        <HiOutlineCheckCircle /> Enrolled{" "}
                      </>
                    ) : (
                      <>
                        {" "}
                        <HiOutlineClock /> Pending{" "}
                      </>
                    )}
                  </span>
                </td>

                <td className="text-center">
                  {course.status === "pending" ? (
                    // If pending, show the disabled button (not a link)
                    <button
                      disabled
                      className="btn btn-sm rounded-xl px-5 border-none text-xs font-bold bg-slate-100 text-slate-400 cursor-not-allowed"
                    >
                      Awaiting Approval
                    </button>
                  ) : (
                    // 2. If completed, wrap the button in a Link
                    <Link to={`/course/${course.courseId}`}>
                      <button className="btn btn-sm rounded-xl px-5 border-none text-xs font-bold transition-all bg-[#03045e] text-white hover:bg-[#0077b6] shadow-md shadow-blue-100">
                        Continue Learning
                      </button>
                    </Link>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default MyEnrollments;
