import { motion } from "framer-motion";

const MentorCourseCard = ({ course }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="flex flex-col md:flex-row bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden group"
    >
      {/* Left: Course Image */}
      <div className="md:w-56 h-48 md:h-auto relative overflow-hidden">
        <img
          src={course.courseImage}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt={course.courseName}
        />
        <div className="absolute inset-0 bg-[#03045e]/10 group-hover:bg-transparent transition-colors" />
      </div>

      {/* Right: Detailed Info */}
      <div className="p-8 flex-1">
        <div className="text-left">
          <span className="text-[#0077b6] font-bold tracking-[0.2em] uppercase text-[10px] px-3 py-1 bg-[#39B8AD]/10 rounded-full">
            Course Statistics
          </span>
          <h4 className="text-2xl font-extrabold text-[#03045e] mt-3 line-clamp-1">
            {course.courseName}
          </h4>
          <div className="w-12 h-1 bg-[#00b4d8] mt-3 rounded-full shadow-sm"></div>
        </div>

        <div className="mt-8 flex items-center gap-6">
          {/* Student Count Box */}
          <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100 group-hover:bg-[#00b4d8]/5 transition-colors">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
              Total Students
            </p>
            <p className="text-3xl font-black text-[#03045e]">
              {course.totalStudents}
            </p>
          </div>

          {/* Price Box */}
          <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
              Price Each
            </p>
            <p className="text-3xl font-black text-[#0077b6]">
              ${course.price}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MentorCourseCard;
