import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineTrash,
  HiOutlineAcademicCap,
  HiOutlineHeart,
} from "react-icons/hi";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { getFavCourse, removeCourse } from "../../../utils/localStorage";
import Loading from "../../Loading/Loading";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/UseAuth";

const FavoriteCourse = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [wishlistIds, setWishlistIds] = useState(getFavCourse());

  // 1. Fetch ALL courses from your database
  const { data: allCourses = [], isLoading } = useQuery({
    queryKey: ["all-courses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/courses");
      return res.data;
    },
  });

  // 2. Filter courses that are in the wishlist
  const favoriteCourses = allCourses.filter((course) =>
    wishlistIds.includes(course._id),
  );

  console.log(favoriteCourses);

  // 3. Listen for changes in localStorage (Wishlist updates)
  useEffect(() => {
    const handleUpdate = () => {
      setWishlistIds(getFavCourse());
    };
    window.addEventListener("wishlistUpdated", handleUpdate);
    return () => window.removeEventListener("wishlistUpdated", handleUpdate);
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeCourse(id);
        // The event listener above will automatically update the UI
      }
    });
  };

  const handleEnroll = async (course) => {
    const enrollmentData = {
      courseId: course._id,
      courseName: course.courseName,
      instructorId: course.mentorUid,
      price: course.price,
      studentEmail: user?.email,
      studentName: user?.displayName,
      enrollDate: new Date().toISOString(),
    };

    const res = await axiosSecure.post(
      "/create-checkout-session",
      enrollmentData,
    );
    window.location.href = res.data.url;
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-50 min-h-screen"
    >
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-10 space-y-3">
        <span className="text-[#0077b6] font-bold tracking-[0.2em] uppercase text-xs px-3 py-1 bg-[#39B8AD]/10 rounded-full">
          Personal Collection
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#03045e]">
          My <span className="text-[#00b4d8]">Saved Wishlist</span>
        </h2>
        <p className="text-gray-500 text-base max-w-2xl leading-relaxed">
          Your curated list of future learning goals. Enroll now to start your
          journey or manage your collection by removing courses you've outgrown.
        </p>
        <div className="w-20 h-1.5 bg-[#0077b6] rounded-full mt-2"></div>
      </div>

      {/* Stats Summary */}
      <div className="flex justify-start mb-6">
        <div className="bg-white border border-blue-50 px-6 py-3 rounded-2xl shadow-sm flex items-center gap-3">
          <HiOutlineHeart className="text-2xl text-[#39B8AD]" />
          <span className="text-slate-600 font-medium">Saved Courses: </span>
          <span className="text-[#03045e] font-bold text-xl">
            {favoriteCourses.length}
          </span>
        </div>
      </div>

      {/* Wishlist Table */}
      <div className="overflow-x-auto bg-white rounded-[2rem] border border-blue-50 shadow-sm">
        <table className="table w-full">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] tracking-wider">
            <tr>
              <th className="py-5 px-8">Course Info</th>
              <th>Mentor</th>
              <th>Price</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {favoriteCourses.map((course, index) => (
              <motion.tr
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                key={course._id}
                className="hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-none"
              >
                <td className="py-4 px-8">
                  <div className="flex items-center gap-4">
                    <div className="mask mask-squircle w-14 h-14 shadow-sm">
                      <img
                        src={course.thumbnail}
                        alt={course.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-[#03045e] text-base leading-tight">
                        {course.name || course.courseName}
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                        Level: {course.difficulty}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="text-slate-600 font-medium text-sm">
                  {course.mentorName}
                </td>

                <td className="text-[#00b4d8] font-bold">${course.price}</td>

                <td className="text-center">
                  <div className="flex items-center justify-center gap-3">
                    {/* Enroll Button */}
                    <button
                      onClick={() => handleEnroll(course)}
                      className="btn btn-sm bg-[#03045e] hover:bg-[#0077b6] text-white border-none rounded-xl px-4 text-[10px] font-black uppercase tracking-wider transition-all"
                    >
                      Enroll Now
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="btn btn-ghost btn-sm text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl"
                      title="Remove from wishlist"
                    >
                      <HiOutlineTrash size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {favoriteCourses.length === 0 && (
          <div className="py-24 text-center">
            <HiOutlineBookOpen className="text-5xl text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-bold">
              Your wishlist is currently empty.
            </p>
            <Link
              to="/courses"
              className="text-[#00b4d8] text-sm font-bold hover:underline mt-2 inline-block"
            >
              Browse Courses →
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FavoriteCourse;
