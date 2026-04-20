import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  PieChart,
  Pie,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";
import {
  HiOutlinePlay,
  HiOutlinePause,
  HiOutlineRefresh,
  HiOutlineVideoCamera,
  HiOutlineHeart,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineChartBar,
} from "react-icons/hi";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getFavCourse } from "../../../utils/localStorage";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/UseAuth";
import Loading from "../../Loading/Loading";
import { Link } from "react-router";

// Internal Helper for Stats
const StatItem = ({ icon, label, value, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5"
  >
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
      style={{ backgroundColor: `${color}15`, color: color }}
    >
      {icon}
    </div>
    <div>
      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
        {label}
      </p>
      <h4 className="text-2xl font-black text-[#03045e]">{value}</h4>
    </div>
  </motion.div>
);

const StudentDashboard = () => {
  const [wishCourse, setWishCourse] = useState(getFavCourse());
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // 1. Fetching Data with TanStack Query
  const {
    data: dashboardData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["studentDashboardData"],
    queryFn: async () => {
      // Replace with your actual API endpoint
      const res = await axiosSecure.get(`/student-stats/${user.email}`);
      return res.data;
    },
  });

  // Destructure dynamic data from server
  //   const { enrollments = [], pendingApprovalCount = 0 } = serverData || {};

  // 1. Time Tracker Logic (Dummy Countdown/Timer)
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  if (isLoading) return <Loading></Loading>;

  const COLORS = ["#03045e", "#02aedf", "#0077b6"];
  const circleData = [
    { name: "Completed", value: 65 },
    { name: "Ongoing", value: 25 },
    { name: "Pending", value: 10 },
  ];

  // Mock data for the chart
  const dummyChartData = [
    { name: "Mon", intensity: 45 },
    { name: "Tue", intensity: 52 },
    { name: "Wed", intensity: 38 },
    { name: "Thu", intensity: 65 },
    { name: "Fri", intensity: 48 },
    { name: "Sat", intensity: 30 },
    { name: "Sun", intensity: 20 },
  ];

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen space-y-8 font-sans">
      {/* Top Section: Support Card & Timer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-gradient-to-br from-[#03045e] to-[#0077b6] p-8 rounded-[2.5rem] text-white flex flex-col justify-between shadow-xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <h1 className="text-3xl font-black mb-2">Need Support?</h1>
            <p className="text-blue-100 opacity-80 mb-6 max-w-md">
              Connect with your mentor instantly via 1-on-1 video call for doubt
              clearing.
            </p>
            <button
              onClick={() => window.open("https://meet.google.com", "_blank")}
              className="bg-[#02aedf] px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-white hover:text-[#03045e] transition-all shadow-lg w-fit"
            >
              <HiOutlineVideoCamera className="text-xl" /> Join Meeting
            </button>
          </div>
          <HiOutlineVideoCamera className="absolute right-[-5%] bottom-[-10%] text-[18rem] opacity-10 rotate-12" />
        </motion.div>

        {/* Timer Card */}
        <div className="bg-[#02aedd]/20 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">
            Study Session
          </p>
          <h2 className="text-5xl font-mono font-black text-[#03045e] mb-6 tracking-tighter">
            {formatTime(seconds)}
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => setIsActive(!isActive)}
              className={`p-4 rounded-2xl transition-all ${isActive ? "bg-amber-50 text-amber-500" : "bg-teal-50 text-[#39B8AD]"}`}
            >
              {isActive ? (
                <HiOutlinePause size={24} />
              ) : (
                <HiOutlinePlay size={24} />
              )}
            </button>
            <button
              onClick={() => {
                setSeconds(0);
                setIsActive(false);
              }}
              className="p-4 bg-slate-50 rounded-2xl text-red-400 hover:bg-red-500 hover:text-white transition-all"
            >
              <HiOutlineRefresh size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatItem
          icon={<HiOutlineHeart />}
          label=" My Wishlist"
          value={wishCourse.length}
          color="#7F81C8"
        />
        <StatItem
          icon={<HiOutlineCheckCircle />}
          label="Paid & Done"
          value={dashboardData?.stats?.paidAndDone || 0}
          color="#39B8AD"
        />
        <StatItem
          icon={<HiOutlineClock />}
          label="Pending"
          value={dashboardData?.stats?.pendingApproval || 0}
          color="#00b4d8"
        />
        <StatItem
          icon={<HiOutlineChartBar />}
          label="Mentors"
          value={dashboardData?.stats?.totalMentors || 0}
          color="#03045e"
        />
      </div>

      {/* Middle Row: Progress Chart & Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] shadow-sm border border-slate-50">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-[#03045e]">
              Learning Intensity
            </h3>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-[#02aedf]"></div> Activity
              Level
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dummyChartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  dy={10}
                />
                <Tooltip
                  cursor={{ fill: "#F8FAFC" }}
                  contentStyle={{
                    borderRadius: "20px",
                    border: "none",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                  }}
                />
                <Bar dataKey="intensity" radius={[10, 10, 10, 10]} barSize={40}>
                  {dummyChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="bg-white p-6 rounded-[3rem] shadow-sm border border-slate-50 overflow-hidden">
          <h3 className="text-lg font-black text-[#03045e] mb-4 px-2">
            Academic Calendar
          </h3>
          <Calendar
            className="w-full border-none font-sans text-sm"
            tileClassName="rounded-xl transition-all hover:bg-slate-50"
          />
        </div>
      </div>

      {/* Bottom Section: Mentor List (Static Design / Dynamic Ready) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COL 1: Mentor List */}
        {/* COL 1: Mentor List */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm flex flex-col">
          <h3 className="text-xl font-black text-[#03045e] mb-6">
            Expert Mentors
          </h3>

          <div className="flex flex-col">
            {dashboardData?.mentors?.map((mentor, i) => (
              <div key={i} className="group">
                <div className="flex items-center justify-between py-4 group cursor-pointer">
                  {/* Left: Avatar & Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        mentor.profileImage ||
                        `https://i.pravatar.cc/150?u=${i}`
                      }
                      className="w-12 h-12 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform duration-300"
                      alt={mentor.name}
                    />
                    <div>
                      <h5 className="font-bold text-[#03045e] text-sm group-hover:text-[#02aedf] transition-colors">
                        {mentor.name}
                      </h5>

                      <p className="w-full flex gap-2 text-sm text-gray-500">
                        {mentor.experience} year experienced
                      </p>
                    </div>
                  </div>

                  {/* Right: View Button */}
                  <button
                    onClick={() =>
                      (window.location.href = `/mentor/${mentor._id}`)
                    }
                    className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-slate-50 text-slate-400 group-hover:bg-[#02aedf] group-hover:text-white transition-all duration-300 shadow-sm"
                  >
                    Details
                  </button>
                </div>

                {/* Divider: Hidden for the last item to keep it clean */}
                {i !== dashboardData.mentors.length - 1 && (
                  <div className="h-[1px] w-full bg-slate-100 opacity-50" />
                )}
              </div>
            ))}
          </div>

          {/* Optional: Show All Link */}
          <Link to={"/mentors"}>
            <button className="mt-6 text-[11px] font-bold text-[#0077b6] hover:underline text-left">
              View all team members →
            </button>
          </Link>
        </div>
        {/* COL 2: Activity Chart (Circle) */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm flex flex-col items-center">
          <h3 className="text-xl font-black text-[#03045e] mb-2 w-full text-left">
            Activity Split
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={circleData}
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {circleData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4">
            {circleData.map((d, i) => (
              <div key={i} className="flex items-center gap-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: COLORS[i] }}
                />
                <span className="text-[9px] font-black uppercase text-slate-400">
                  {d.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* COL 3: Enrolled Courses */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm">
          <h3 className="text-xl font-black text-[#03045e] mb-6">
            Course Status
          </h3>
          <div className="space-y-4 max-h-[400px] overflow-y-auto no-scrollbar">
            {dashboardData?.enrollments?.map((course, i) => (
              <div
                key={i}
                className="p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100"
              >
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={course.courseImage}
                    className="w-10 h-10 rounded-xl object-cover"
                    alt=""
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-[#03045e] text-sm truncate">
                      {course.courseName}
                    </h5>
                    <p className="text-[10px] text-slate-400">
                      Enrolled:
                      {new Date(course.enrollDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${course.status === "completed" ? "bg-teal-100 text-teal-600" : "bg-amber-100 text-amber-600"}`}
                  >
                    {course.status === "completed" ? "Approved" : "Pending"}
                  </span>
                  <span className="text-sm font-black text-[#03045e]">
                    ${course.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
