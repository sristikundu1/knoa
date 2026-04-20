import React, { useEffect, useState } from "react";
import {
  HiOutlineCash,
  HiOutlinePlus,
  HiOutlineAcademicCap,
  HiOutlinePresentationChartLine,
  HiOutlineChatAlt2,
  HiOutlineLightningBolt,
  HiOutlineClock,
} from "react-icons/hi";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";
import styled from "styled-components";

// Reusable Stat Component
const StatCard = ({ icon, label, value, color }) => (
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

const MentorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: mentorData, isLoading } = useQuery({
    queryKey: ["mentorStats", user?.uid],
    enabled: !!user?.uid, // Only fetch if user.uid exists
    queryFn: async () => {
      const res = await axiosSecure.get(`/mentor-stats/${user?.uid}`);
      return res.data;
    },
  });

  const [time, setTime] = useState(new Date());
  const [quote] = useState(
    [
      "Code is like humor. When you have to explain it, it’s bad.",
      "First, solve the problem. Then, write the code.",
      "Clean code always looks like it was written by someone who cares.",
      "Your output is only as good as your input.",
    ][Math.floor(Math.random() * 4)],
  );

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="p-8 space-y-8 bg-[#FDFEFF]">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-[#03045e]">
            Instructor <span className="text-[#02aedf]">Studio</span>
          </h1>
          <p className="text-slate-400">
            Tracking data for {user?.displayName || "Instructor"}
          </p>
        </div>
        <button className="bg-[#03045e] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#0077b6] transition-all shadow-xl">
          <HiOutlinePlus size={20} /> Create New Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard
          icon={<HiOutlineCash />}
          label="Total Revenue"
          value={`$${mentorData?.stats?.totalRevenue || 0}`}
          color="#02aedf"
        />
        <StatCard
          icon={<HiOutlineAcademicCap />}
          label="Active Students"
          value={mentorData?.stats?.totalStudents || 0}
          color="#0077b6"
        />
        <StatCard
          icon={<HiOutlinePresentationChartLine />}
          label="Courses"
          value={mentorData?.stats?.totalCourses || 0}
          color="#03045e"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Support/Meeting Card for Mentors */}
        <div className="bg-[#03045e] p-8 rounded-[3rem] text-white shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Mentor Support Hub</h3>
            <p className="opacity-70 text-sm mb-6">
              Open your room for students waiting for doubt clearance.
            </p>
          </div>
          <button className="bg-[#02aedf] text-white font-bold py-4 rounded-2xl hover:bg-white hover:text-[#03045e] transition-all">
            Start Support Meeting
          </button>
        </div>

        {/* Dynamic List */}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-50 shadow-sm overflow-hidden">
          <h3 className="text-xl font-black text-[#03045e] mb-6">
            Course Inventory
          </h3>

          <div className="flex flex-col">
            {mentorData?.courses?.map((course, i) => (
              <div key={i} className="group">
                <div className="flex items-center justify-between py-5">
                  <div className="flex items-center gap-5">
                    <img
                      src={course.thumbnail}
                      className="w-16 h-16 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-all"
                      alt=""
                    />
                    <div>
                      <h5 className="font-bold text-[#03045e] text-base group-hover:text-[#02aedf] transition-colors">
                        {course.title || course.courseName}
                      </h5>
                      <p className="text-sm font-black text-[#0077b6] mt-1">
                        {course.isFree ? (
                          <span className=" font-bold">Free</span>
                        ) : (
                          <span className=" font-bold">${course.price}</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <Link to={`/course/${course._id}`}>
                    <button className="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest bg-slate-50 text-slate-400 hover:bg-[#03045e] hover:text-white transition-all shadow-sm">
                      Details
                    </button>
                  </Link>
                </div>

                {/* Professional Divider */}
                {i !== mentorData.courses.length - 1 && (
                  <div className="h-[1px] w-full bg-slate-100 opacity-60" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {/* 1. Discord Community Card */}
        <InteractiveCardNew color="#5865F2">
          <div className="flex flex-col h-full justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#5865F2]10 rounded-2xl text-[#5865F2]">
                <HiOutlineChatAlt2 size={24} />
              </div>
              <h4 className="font-black text-[#03045e]">Discord Community</h4>
            </div>
            <p className="text-xs text-slate-400 my-4 leading-relaxed">
              Connect with 500+ students in your private mentor group for live
              Q&A.
            </p>
            <button
              onClick={() => window.open("https://discord.com", "_blank")}
              className="w-full py-3 bg-[#5865F2] text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:shadow-lg transition-all"
            >
              Launch Server
            </button>
          </div>
        </InteractiveCardNew>

        {/* 2. Random Quote Card */}
        <InteractiveCardNew color="#02aedf">
          <div className="flex flex-col h-full">
            <HiOutlineLightningBolt size={24} className="text-[#02aedf] mb-4" />
            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2">
              Daily Inspiration
            </h4>
            <p className="text-sm font-bold text-[#03045e] italic leading-relaxed">
              "{quote}"
            </p>
            <div className="mt-auto pt-4 border-t border-slate-50">
              <span className="text-[9px] font-bold text-[#02aedf]">
                DEV_INSIGHTS 2.0
              </span>
            </div>
          </div>
        </InteractiveCardNew>

        {/* 3. Live Neumorphic Clock Card */}
        <StyledWrapper>
          <InteractiveCard color="#02aedf">
            {/* The Animated Rain Pattern Container */}
            <div className="rain-container" />

            {/* The Content Layer */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
              <HiOutlineClock size={20} className="text-blue-300/60 mb-2" />

              <h2 className="text-4xl font-black text-white tracking-tighter font-mono drop-shadow-md">
                {time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </h2>

              <p className="text-[10px] font-black text-blue-100/70 uppercase mt-2 tracking-widest">
                {time.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </p>

              <div className="flex items-center gap-2 mt-5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-[#02aedf] animate-ping" />
                <span className="text-[8px] font-black text-white uppercase tracking-tighter">
                  Live Sync
                </span>
              </div>
            </div>
          </InteractiveCard>
        </StyledWrapper>
      </div>
    </div>
  );
};

// --- STYLED COMPONENTS (The Rain Logic) ---
const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;

  .rain-container {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    --c: #02aedf; /* Matches your brand cyan */
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
    animation: rain-anim 20s linear infinite; /* Increased speed slightly for energy */
    opacity: 0.6; /* Softens the pattern to keep text readable */
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

// --- INTERACTIVE WRAPPER ---
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
      whileHover={{ y: -8 }}
      className="relative group bg-[#03045e] p-8 h-full min-h-[250px] rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden"
    >
      {/* Mouse Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[3rem] opacity-0 group-hover:opacity-100 transition duration-300 z-20"
        style={{
          background: `radial-gradient(300px circle at ${mouseX}px ${mouseY}px, ${color}20, transparent 80%)`,
        }}
      />
      {children}
    </motion.div>
  );
};
// --- INTERACTIVE WRAPPER COMPONENT ---
// This handles the mouse animation and framer motion effects
const InteractiveCardNew = ({ children, color }) => {
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
      whileHover={{ y: -8 }}
      className="relative group bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden"
    >
      {/* Mouse Follow Glow Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[3rem] opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${color}15, transparent 80%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};
export default MentorDashboard;
