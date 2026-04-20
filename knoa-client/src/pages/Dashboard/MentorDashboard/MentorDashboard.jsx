import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  HiOutlineUserGroup,
  HiOutlineVideoCamera,
  HiOutlineCash,
  HiOutlineLightningBolt,
} from "react-icons/hi";

const MentorDashboard = ({ mentorCourses, totalStudents }) => {
  const revenueData = [
    { name: "React", val: 4000 },
    { name: "Node", val: 3000 },
    { name: "Design", val: 2000 },
  ];

  const StatCard = ({ icon, label, value, color }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-[2.5rem] border border-slate-50 shadow-sm flex items-center gap-5"
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
        style={{ backgroundColor: `${color}15`, color: color }}
      >
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.1em]">
          {label}
        </p>
        <h4 className="text-2xl font-black text-[#03045e]">{value}</h4>
      </div>
    </motion.div>
  );

  return (
    <div className="p-8 space-y-8 bg-[#FDFEFF]">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-[#03045e]">
            Instructor <span className="text-[#7F81C8]">Studio</span>
          </h1>
          <p className="text-slate-400 font-medium">
            Analyze your course performance.
          </p>
        </div>
        <button className="px-8 py-4 bg-[#03045e] text-white rounded-2xl font-black text-sm shadow-xl hover:bg-[#39B8AD] transition-all">
          Create New Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard
          icon={<HiOutlineUserGroup />}
          label="Total Students"
          value={totalStudents || 0}
          color="#39B8AD"
        />
        <StatCard
          icon={<HiOutlineVideoCamera />}
          label="Active Courses"
          value={mentorCourses?.length || 0}
          color="#7F81C8"
        />
        <StatCard
          icon={<HiOutlineCash />}
          label="Total Revenue"
          value={`$${(totalStudents || 0) * 49}`}
          color="#00b4d8"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue by Course */}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-50 shadow-sm">
          <h3 className="text-xl font-black text-[#03045e] mb-6">
            Revenue distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{ borderRadius: "20px", border: "none" }}
                />
                <Bar dataKey="val" radius={[10, 10, 10, 10]} barSize={40}>
                  {revenueData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "#03045e" : "#39B8AD"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic Course List Preview */}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-50 shadow-sm overflow-hidden">
          <h3 className="text-xl font-black text-[#03045e] mb-6">
            Recent Courses
          </h3>
          <div className="space-y-4">
            {mentorCourses?.slice(0, 3).map((course, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={course.thumbnail}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <h5 className="font-bold text-[#03045e] text-sm">
                    {course.courseName}
                  </h5>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-[#39B8AD] transition-all">
                    <HiOutlineLightningBolt />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
