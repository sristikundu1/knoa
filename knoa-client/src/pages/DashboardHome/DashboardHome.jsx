import React, { use } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
// Import React Icons
import {
  FaBookOpen,
  FaUsers,
  FaClock,
  FaChartLine,
  FaArrowRight,
} from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { AuthContext } from "./../../contexts/AuthContext";

const data = [
  { name: "Mon", activity: 40 },
  { name: "Tue", activity: 30 },
  { name: "Wed", activity: 65 },
  { name: "Thu", activity: 45 },
  { name: "Fri", activity: 90 },
  { name: "Sat", activity: 70 },
  { name: "Sun", activity: 85 },
];

const DashboardHome = () => {
  const { user } = use(AuthContext);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#03045e]">
            Welcome back,{" "}
            <span className="text-[#39B8AD]">{user?.displayName}!</span>
          </h2>
          <p className="text-gray-500 mt-1 font-medium">
            Monitoring your platform activity and progress.
          </p>
        </div>
        <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-blue-50 flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">
            System Live
          </span>
        </div>
      </section>

      {/* Stats Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Active Courses",
            value: "12",
            icon: <FaBookOpen />,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Total Mentors",
            value: "48",
            icon: <FaUsers />,
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
          {
            label: "Study Hours",
            value: "124h",
            icon: <FaClock />,
            color: "text-orange-600",
            bg: "bg-orange-50",
          },
          {
            label: "Performance",
            value: "92%",
            icon: <FaChartLine />,
            color: "text-green-600",
            bg: "bg-green-50",
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4 relative overflow-hidden"
          >
            <div
              className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-black text-slate-800 tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Graph Section */}
        <motion.div
          variants={cardVariants}
          className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-[#03045e] text-lg flex items-center gap-2">
              Platform Engagement
            </h3>
            <select className="text-xs font-bold bg-slate-50 border-none rounded-lg p-2 text-slate-500 focus:ring-0">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient
                    id="colorActivity"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#39B8AD" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#39B8AD" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
                  dy={15}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ stroke: "#39B8AD", strokeWidth: 2 }}
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
                    padding: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="activity"
                  stroke="#39B8AD"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorActivity)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Mentor List Section */}
        <motion.div
          variants={cardVariants}
          className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col"
        >
          <h3 className="font-black text-[#03045e] text-lg mb-6">
            Top Mentors
          </h3>
          <div className="space-y-6 flex-1">
            {[
              {
                name: "Dr. Sarah Jonas",
                role: "UI/UX Designer",
                img: "https://i.pravatar.cc/150?u=11",
              },
              {
                name: "Mark Wilson",
                role: "MERN Expert",
                img: "https://i.pravatar.cc/150?u=12",
              },
              {
                name: "Elena Rose",
                role: "Cloud Architect",
                img: "https://i.pravatar.cc/150?u=13",
              },
            ].map((m, i) => (
              <div
                key={i}
                className="group flex items-center gap-4 cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={m.img}
                    alt=""
                    className="w-12 h-12 rounded-2xl object-cover ring-4 ring-slate-50 group-hover:ring-[#39B8AD]/20 transition-all"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-slate-800 group-hover:text-[#39B8AD] transition-colors">
                    {m.name}
                  </p>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                    {m.role}
                  </p>
                </div>
                <FaArrowRight
                  className="text-slate-200 group-hover:text-[#39B8AD] group-hover:translate-x-1 transition-all"
                  size={12}
                />
              </div>
            ))}
          </div>

          <button className="w-full py-4 mt-8 bg-slate-50 hover:bg-[#03045e] hover:text-white text-[#03045e] text-xs font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2">
            <MdOutlineExplore size={18} />
            Explore More
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardHome;
