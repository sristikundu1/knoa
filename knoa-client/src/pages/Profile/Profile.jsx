import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { Link } from "react-router"; // Use 'react-router-dom' if 'react-router' doesn't work for your version

const Profile = () => {
  const { user, loading: authLoading } = use(AuthContext);
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      const endpoint =
        user?.role === "mentor"
          ? `http://localhost:3000/courses-by-mentor?email=${user.email}`
          : `http://localhost:3000/my-enrolled-courses?email=${user.email}`;

      fetch(endpoint)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch courses");
          return res.json();
        })
        .then((data) => {
          setMyCourses(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error:", err);
          setLoading(false);
        });
    }
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-[#39B8AD] rounded-full animate-spin"></div>
        <p className="text-slate-400 font-medium animate-pulse">
          Loading profile data...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-8 pb-10 pt-10"
    >
      {/* --- Profile Header Card --- */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="h-40 bg-[#03045e] relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

        <div className="px-8 pb-10">
          <div className="relative -top-16 flex flex-col md:flex-row items-end gap-6">
            <img
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-40 h-40 rounded-3xl border-[6px] border-white shadow-xl object-cover bg-slate-50"
            />
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-black text-slate-800 tracking-tight">
                  {user?.displayName}
                </h1>
                {user?.role === "mentor" ? (
                  <span className="bg-purple-100 text-purple-600 p-1.5 rounded-lg text-sm">
                    <FaChalkboardTeacher />
                  </span>
                ) : (
                  <span className="bg-blue-100 text-blue-600 p-1.5 rounded-lg text-sm">
                    <FaUserGraduate />
                  </span>
                )}
              </div>
              <p className="text-[#39B8AD] font-bold uppercase text-xs tracking-[0.2em] mt-1">
                Official {user?.role || "Member"}
              </p>
            </div>
            <Link
              to="/dashboard/update-profile"
              className="mb-4 px-8 py-3 bg-[#03045e] text-white rounded-2xl font-bold text-sm hover:bg-[#00b4d8] transition-all shadow-lg shadow-blue-900/10 inline-block"
            >
              Edit Details
            </Link>
          </div>

          {/* --- Information Grid --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-2">
            <div className="group p-6 rounded-2xl bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
              <FaEnvelope
                className="text-slate-300 group-hover:text-[#00b4d8] mb-3 transition-colors"
                size={20}
              />
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                Email
              </p>
              <p className="text-slate-700 font-bold break-all">
                {user?.email}
              </p>
            </div>

            <div className="group p-6 rounded-2xl bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
              <FaPhone
                className="text-slate-300 group-hover:text-[#00b4d8] mb-3 transition-colors"
                size={20}
              />
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                Phone
              </p>
              <p className="text-slate-700 font-bold">
                {user?.phone || "Not Provided"}
              </p>
            </div>

            <div className="group p-6 rounded-2xl bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
              <FaMapMarkerAlt
                className="text-slate-300 group-hover:text-[#00b4d8] mb-3 transition-colors"
                size={20}
              />
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                Location
              </p>
              <p className="text-slate-700 font-bold">Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Course Section --- */}
      <div className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black text-[#03045e]">
            {user?.role === "mentor"
              ? "Your Published Courses"
              : "Your Learning Path"}
          </h3>
          <span className="px-4 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500">
            {myCourses.length} Total
          </span>
        </div>

        {myCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myCourses.map((course) => (
              <motion.div
                whileHover={{ y: -5 }}
                key={course._id}
                className="bg-white rounded-3xl border border-slate-100 p-2 shadow-sm hover:shadow-md transition-all"
              >
                {/* Fixed: Use course.courseImage and course.courseName to match your Enrollment object */}
                <img
                  src={course.courseImage || course.image || course.thumbnail}
                  alt=""
                  className="w-full h-40 rounded-[1.5rem] object-cover"
                />
                <div className="p-4">
                  <h4 className="font-bold text-slate-800 leading-tight h-10 line-clamp-2">
                    {course.courseName || course.name}
                  </h4>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-black text-[#00b4d8]">
                      ${course.price}
                    </span>
                    <Link
                      to={`/dashboard/course/${course.courseId}`}
                      className="p-2 bg-slate-50 text-slate-400 hover:text-[#03045e] hover:bg-blue-50 rounded-xl transition-all"
                    >
                      <FaExternalLinkAlt size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center rounded-[2rem] border-2 border-dashed border-slate-100">
            <p className="text-slate-300 font-medium italic">
              No course activity found yet.
            </p>
            <Link
              to="/dashboard/all-courses"
              className="mt-4 inline-block text-sm font-bold text-[#39B8AD] hover:underline"
            >
              Browse Library
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Profile;
