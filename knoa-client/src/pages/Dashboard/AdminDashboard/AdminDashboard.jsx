import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  HiOutlineUsers,
  HiOutlineMailOpen,
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiOutlineUserGroup,
  HiOutlineBadgeCheck,
} from "react-icons/hi";
import StatCard from "../StatCard";
import Loading from "../../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import styled from "styled-components";

// Reusable Small Stat Item
const StatItem = ({ label, value, icon, color }) => (
  <div className="bg-white p-5 rounded-[2rem] border border-slate-50 shadow-sm flex items-center gap-4">
    <div
      className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
      style={{ backgroundColor: `${color}10`, color: color }}
    >
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">
        {label}
      </p>
      <h4 className="text-xl font-black text-[#03045e]">{value}</h4>
    </div>
  </div>
);

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: analytics, isLoading } = useQuery({
    queryKey: ["adminAnalytics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-analytics");
      return res.data;
    },
  });

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (isLoading) return <Loading></Loading>;

  const userStats = [
    { name: "Mentors", value: analytics?.totalMentors || 0 },
    { name: "Students", value: analytics?.regularUsers || 0 },
  ];
  // Using your brand colors: Cyan and Dark Navy
  const COLORS = ["#02aedf", "#03045e"];

  return (
    <div className="p-8 space-y-10 bg-[#FDFEFF]">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 py-10">
        {/* LEFT SIDE: BIG REVENUE */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-3 block">
            Global Analytics Overview
          </span>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85]">
            <span className="text-[#03045e]">Total</span>
            <br />
            <span className="bg-gradient-to-r from-[#03045e] via-[#02aedf] to-[#39B8AD] bg-clip-text text-transparent">
              Revenue
            </span>
          </h1>

          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-[#02aedf] text-4xl md:text-5xl font-black">
              $
            </span>
            <span className="text-5xl md:text-7xl font-black text-[#03045e]">
              {analytics?.totalRevenue?.toLocaleString() || "0"}
            </span>
          </div>

          <div className="h-1.5 w-32 bg-gradient-to-r from-[#02aedf] to-transparent rounded-full mt-8" />
        </motion.div>

        {/* RIGHT SIDE: RAIN CLOCK */}
        <div className="w-full lg:w-[400px] h-[280px]">
          <StyledWrapper>
            <InteractiveCard color="#02aedf">
              {/* The Animated Rain Pattern Container */}
              <div className="rain-container" />

              {/* The Content Layer */}
              <div className="relative z-30 flex flex-col items-center justify-center h-full text-center">
                <HiOutlineClock size={24} className="text-blue-300/40 mb-3" />

                <h2 className="text-5xl font-black text-white tracking-tighter font-mono drop-shadow-2xl">
                  {time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </h2>

                <p className="text-[11px] font-black text-blue-100/60 uppercase mt-3 tracking-[0.2em]">
                  {time.toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </p>

                <div className="flex items-center gap-2 mt-6 px-4 py-1.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-[#02aedf] animate-ping" />
                  <span className="text-[9px] font-black text-white uppercase tracking-widest">
                    Live System Sync
                  </span>
                </div>
              </div>
            </InteractiveCard>
          </StyledWrapper>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Users */}
        <StatItem
          label="Total Users"
          value={analytics?.totalUsers || 0}
          icon={<HiOutlineUserGroup />}
          color="#03045e"
        />

        {/* Total Mentors */}
        <StatItem
          label="Mentors"
          value={analytics?.totalMentors || 0}
          icon={<HiOutlineBadgeCheck />}
          color="#02aedf"
        />

        {/* Pending Approvals */}
        <StatItem
          label="Pending"
          value={analytics?.pendingApprovals || 0}
          icon={<HiOutlineClock />}
          color="#f59e0b"
        />

        {/* Subscribers */}
        <StatItem
          label="Subscribers"
          value={analytics?.totalSubscribers || 0}
          icon={<HiOutlineMailOpen />}
          color="#7F81C8"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Distribution Pie */}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-50 shadow-sm flex flex-col items-center">
          <h3 className="text-xl font-black text-[#03045e] mb-4 w-full">
            User Ratio
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={userStats}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userStats.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 text-[10px] font-black uppercase">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#03045e]" /> Students
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#39B8AD]" /> Mentors
            </span>
          </div>
        </div>

        {/* Static Log System */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-slate-50 shadow-sm">
          <h3 className="text-xl font-black text-[#03045e] mb-6">
            Recent Activity
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                  <th className="pb-4">User</th>
                  <th className="pb-4">Action</th>
                  <th className="pb-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {analytics?.users?.map((user, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="py-4 font-bold text-[#03045e]">
                      {user.email}
                    </td>
                    <td className="py-4">
                      <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-[10px] font-black uppercase">
                        Registered
                      </span>
                    </td>
                    <td className="py-4 text-slate-400">
                      {new Date(user.creationTime).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- STYLED COMPONENTS ---
const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  .rain-container {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    --c: #02aedf;
    background-color: #000;
    background-image:
      radial-gradient(4px 100px at 0px 235px, var(--c), #0000),
      radial-gradient(4px 100px at 300px 235px, var(--c), #0000),
      radial-gradient(1.5px 1.5px at 150px 117.5px, var(--c) 100%, #0000 150%),
      radial-gradient(4px 100px at 0px 252px, var(--c), #0000),
      radial-gradient(4px 100px at 300px 252px, var(--c), #0000),
      radial-gradient(1.5px 1.5px at 150px 126px, var(--c) 100%, #0000 150%),
      radial-gradient(4px 100px at 0px 150px, var(--c), #0000),
      radial-gradient(4px 100px at 300px 150px, var(--c), #0000),
      radial-gradient(1.5px 1.5px at 150px 75px, var(--c) 100%, #0000 150%),
      radial-gradient(4px 100px at 0px 253px, var(--c), #0000),
      radial-gradient(4px 100px at 300px 253px, var(--c), #0000),
      radial-gradient(1.5px 1.5px at 150px 126.5px, var(--c) 100%, #0000 150%);
    background-size:
      300px 235px,
      300px 235px,
      300px 235px,
      300px 252px,
      300px 252px,
      300px 252px,
      300px 150px,
      300px 150px,
      300px 150px,
      300px 253px,
      300px 253px,
      300px 253px;
    animation: rain-anim 25s linear infinite;
    opacity: 0.5;
  }

  .rain-container::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    background-image: radial-gradient(
      ellipse 1.5px 2px at 1.5px 50%,
      #0000 0,
      #0000 90%,
      #000 100%
    );
    background-size: 25px 8px;
  }

  @keyframes rain-anim {
    0% {
      background-position:
        0px 220px,
        3px 220px,
        151.5px 337.5px,
        25px 24px,
        28px 24px,
        176.5px 150px,
        50px 16px,
        53px 16px,
        201.5px 91px,
        75px 224px,
        78px 224px,
        226.5px 350.5px;
    }
    to {
      background-position:
        0px 5000px,
        3px 5000px,
        151.5px 5117.5px,
        25px 5000px,
        28px 5000px,
        176.5px 5150px,
        50px 5000px,
        53px 5000px,
        201.5px 5091px,
        75px 5000px,
        78px 5000px,
        226.5px 5126.5px;
    }
  }
`;

const InteractiveCard = ({ children, color }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={{ y: -8, scale: 1.01 }}
      className="relative group bg-[#03045e] p-8 h-full rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[3rem] opacity-0 group-hover:opacity-100 transition duration-300 z-20"
        style={{
          background: `radial-gradient(350px circle at ${mouseX}px ${mouseY}px, ${color}30, transparent 80%)`,
        }}
      />
      {children}
    </motion.div>
  );
};

export default AdminDashboard;
