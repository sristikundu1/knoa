import React from "react";
import {
  FaArrowAltCircleRight,
  FaClock,
  FaSignal,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router";

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
    <div>
      <div
        key={course._id}
        className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-md transition-shadow"
      >
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
            <div className="flex justify-between items-start mb-2">
              <span className="text-[#0077b6] font-bold tracking-[0.2em] uppercase text-xs px-3 py-1 bg-[#39B8AD]/10 rounded-full">
                {category}
              </span>
              <span className="text-xl font-black text-slate-800">
                {course.isFree || course.price === 0
                  ? "FREE"
                  : `$${course.price}`}
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
          </div>

          <div className="flex gap-4">
            <Link
              to={`/dashboard/course/${course._id}`}
              className="mt-4 flex items-center gap-2  text-sm hover:text-[#03045e] transition-colors text-white font-bold   px-3 py-1  rounded-full bg-[#00b4d8]  border-none  text-[0.8rem]  cursor-pointer "
            >
              View Course <FaArrowAltCircleRight />
            </Link>

            <Link
              to={`/dashboard/edit-course/${course._id}`}
              className="mt-4 flex items-center gap-2  text-sm hover:text-[#00b4d8] transition-colors text-white font-bold   px-3 py-1  rounded-full bg-[#03045e]  border-none  text-[0.8rem]  cursor-pointer"
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
