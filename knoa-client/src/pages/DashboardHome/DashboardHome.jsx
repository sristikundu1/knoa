import React, { use, useEffect, useState } from "react";
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
import { Link } from "react-router";

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
  const [stats, setStats] = useState({ courses: 0, mentors: 0 });
  const [topMentors, setTopMentors] = useState([]);

  useEffect(() => {
    const getDashboardData = async () => {
      // Fetching your existing endpoints
      const [courseRes, mentorRes] = await Promise.all([
        fetch("http://localhost:3000/courses"),
        fetch("http://localhost:3000/mentors"),
      ]);

      const allCourses = await courseRes.json();
      const allMentors = await mentorRes.json();

      // 1. Calculate Totals
      setStats({
        courses: allCourses.length,
        mentors: allMentors.length,
      });

      // 2. Filter High Rated (e.g., Rating > 4.5)
      const highRated = allMentors
        .filter((m) => m.rating >= 4.5)
        .sort((a, b) => b.rating - a.rating) // Highest first
        .slice(0, 3); // Take top 3

      setTopMentors(highRated);
    };

    getDashboardData();
  }, []);

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
            <span className="text-[#00b4d8]">{user?.displayName}!</span>
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
            value: stats.courses,
            icon: <FaBookOpen />,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Total Mentors",
            value: stats.mentors,
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
                  cursor={{ stroke: "#00b4d8", strokeWidth: 2 }}
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
                  stroke="#00b4d8"
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
            {topMentors.length > 0 ? (
              topMentors.map((m) => (
                <Link
                  to={`/mentor/${m._id}`}
                  key={m._id}
                  className="group flex items-center gap-4 cursor-pointer"
                >
                  <div className="relative">
                    <img
                      /* Use profileImage from DB, fallback to a placeholder if empty */
                      src={m.profileImage || "https://via.placeholder.com/150"}
                      alt={m.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-4 ring-slate-50 group-hover:ring-[#39B8AD]/20 transition-all"
                    />
                    {/* Online Status Indicator */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-black text-slate-800 group-hover:text-[#39B8AD] transition-colors">
                      {m.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                        {m.expertise || m.role}
                      </p>
                      <span className="text-[10px] text-yellow-500 font-bold flex items-center">
                        ★ {m.rating || "5.0"}
                      </span>
                    </div>
                  </div>

                  <FaArrowRight
                    className="text-slate-200 group-hover:text-[#39B8AD] group-hover:translate-x-1 transition-all"
                    size={12}
                  />
                </Link>
              ))
            ) : (
              /* Skeleton or Loading State */
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="flex items-center gap-4 animate-pulse"
                  >
                    <div className="w-12 h-12 bg-slate-100 rounded-2xl"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                      <div className="h-2 bg-slate-50 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link to="/mentors" className="block w-full mt-8">
            <button
              type="button"
              className="w-full py-4 bg-[#00b4d8]  hover:bg-[#03045e] hover:text-white text-[#03045e] text-xs font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2 group"
            >
              <MdOutlineExplore
                size={18}
                className="group-hover:rotate-12 transition-transform"
              />
              Explore More
            </button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardHome;
