import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineBookOpen,
  HiOutlineMail,
} from "react-icons/hi";
import { HiOutlineUserGroup } from "react-icons/hi2";

const EnrollmentManagement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: all = [], refetch } = useQuery({
    queryKey: ["admin-enrolls"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/enrollments");
      return res.data;
    },
  });

  const handleStatus = async (id, status) => {
    try {
      await axiosSecure.patch(`/enrollments/${id}`, { status });
      Swal.fire({
        title: "Success!",
        text: `Enrollment marked as ${status}`,
        icon: "success",
        confirmButtonColor: "#0077b6",
      });
      refetch();
    } catch (error) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 bg-gray-50 min-h-screen"
    >
      {/* Dynamic Header Section */}
      <div className="flex flex-col items-center text-center mb-10 space-y-3">
        <span className="text-[#0077b6] font-bold tracking-[0.2em] uppercase text-xs px-3 py-1 bg-[#39B8AD]/10 rounded-full border border-[#39B8AD]/20">
          Academic Oversight
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#03045e]">
          Course <span className="text-[#00b4d8]">Enrollment Requests</span>
        </h2>
        <p className="text-gray-500 text-base max-w-2xl leading-relaxed">
          Review and verify student payment and enrollment status. Ensure all
          learners are properly placed within their chosen mentors' programs.
        </p>
        <div className="w-20 h-1.5 bg-[#0077b6] rounded-full mt-2 shadow-sm"></div>
      </div>

      {/* Stats Summary */}
      <div className="flex justify-start mb-8">
        <div className="bg-white border border-blue-50 px-6 py-4 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl">
            <HiOutlineUserGroup className="text-2xl text-[#00b4d8]" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Total Enrollments
            </p>
            <p className="text-[#03045e] font-black text-2xl leading-none">
              {all.length}
            </p>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto bg-white rounded-[2.5rem] border border-blue-50 shadow-xl shadow-blue-900/5">
        <table className="table w-full border-collapse">
          {/* Table Head */}
          <thead className="bg-slate-50/80 text-slate-500 uppercase text-[11px] tracking-widest">
            <tr>
              <th className="py-6 px-8">Course Details</th>
              <th>Student Information</th>
              <th>Assigned Mentor</th>
              <th className="text-center">Verification Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {all.map((item, index) => (
              <motion.tr
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                key={item._id}
                className="hover:bg-blue-50/30 transition-colors border-b border-slate-50 last:border-none"
              >
                {/* Course Details */}
                <td className="py-5 px-8">
                  <div className="flex items-center gap-4">
                    <div className="mask mask-squircle w-14 h-14 shadow-md">
                      <img
                        src={item.courseImage}
                        alt={item.courseName}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <div className="font-black text-[#03045e] text-sm md:text-base">
                        {item.courseName}
                      </div>
                      <div className="text-[10px] font-bold text-[#39B8AD] flex items-center gap-1 uppercase tracking-tighter">
                        Price: ${item.price}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Student Info */}
                <td>
                  <div>
                    <div className="font-bold text-[#03045e] text-sm">
                      {item.studentName}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <HiOutlineMail className="text-[#00b4d8]" />{" "}
                      {item.studentEmail}
                    </div>
                  </div>
                </td>

                {/* Mentor Info */}
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#00b4d8]"></div>
                    <span className="text-sm font-semibold text-slate-600">
                      {item.mentorName}
                    </span>
                  </div>
                </td>

                {/* Actions/Status */}
                <td className="text-center">
                  {item.status === "pending" ? (
                    <button
                      onClick={() => handleStatus(item._id, "completed")}
                      className="group flex items-center gap-2 mx-auto px-5 py-2 bg-[#0077b6] hover:bg-[#03045e] text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-200"
                    >
                      <HiOutlineClock className="text-base animate-pulse" />
                      Approve Enrollment
                    </button>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-600 rounded-full border border-green-100">
                      <HiOutlineCheckCircle className="text-lg" />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {item.status}
                      </span>
                    </div>
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

export default EnrollmentManagement;
