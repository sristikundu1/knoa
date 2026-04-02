import React from "react";
import {
  FaArrowAltCircleRight,
  FaClock,
  FaSignal,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router";
import { FiX } from "react-icons/fi";
const CourseCard = ({ course }) => {
  const {
    thumbnail,
    title,
    difficulty,
    category,
    price,
    courseName,
    duration,
    rating,
  } = course;
  return (
    <div className="relative">
      <div
        key={course._id}
        className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-md transition-shadow relative"
      >
        <button
          onClick={() => handleDelete(course._id)}
          className="absolute top-3 right-3 bg-white hover:bg-red-50 text-[#03045e] hover:text-[#03045e] p-2 rounded-full shadow-sm transition"
        >
          <FiX size={18} />
        </button>

        {/* Course Image */}
        <div className="w-full md:w-64 h-44 overflow-hidden rounded-md">
          <img
            src={thumbnail || "https://via.placeholder.com/300x200"}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Course Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="mb-2">
              <span className="text-[#0077b6] font-bold tracking-[0.2em] uppercase text-xs px-3 py-1 bg-[#39B8AD]/10 rounded-full">
                {category}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-800 leading-tight mb-4">
              {courseName}
            </h3>

            <div className="flex flex-wrap items-center gap-6 text-sm text-[#00b4d8] font-medium">
              <span className="flex items-center gap-1 text-slate-500">
                <FaSignal className="text-[#0077b6]" />
                {difficulty}
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <FaClock className="text-[#0077b6]" />
                {duration}
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <FaStar className="text-[#0077b6]" /> {rating}
              </span>
            </div>

            <div className="mt-3">
              <span className="text-xl font-black text-slate-800">
                {course.isFree || course.price === 0
                  ? "FREE"
                  : `$${course.price}`}
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              to={`/dashboard/course/${course._id}`}
              className="mt-4 flex items-center gap-2 text-white font-bold px-3 py-1 rounded-full bg-[#00b4d8] text-[0.8rem]"
            >
              View Course <FaArrowAltCircleRight />
            </Link>

            <Link
              to={`/dashboard/edit-course/${course._id}`}
              className="mt-4 flex items-center gap-2 text-white font-bold px-3 py-1 rounded-full bg-[#03045e] text-[0.8rem]"
            >
              Edit Course <FaArrowAltCircleRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
