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
import { Link } from "react-router";
import useAuth from "../../../hooks/UseAuth";
import useRole from "../../../hooks/useRole";
import Loading from "../../Loading/Loading";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import MentorDashboard from "../MentorDashboard/MentorDashboard";
import StudentDashboard from "../StudentDashBoard/StudentDashboard";

// const data = [
//   { name: "Mon", activity: 40 },
//   { name: "Tue", activity: 30 },
//   { name: "Wed", activity: 65 },
//   { name: "Thu", activity: 45 },
//   { name: "Fri", activity: 90 },
//   { name: "Sat", activity: 70 },
//   { name: "Sun", activity: 85 },
// ];

const DashboardHome = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading></Loading>;
  }
  // const [stats, setStats] = useState({ courses: 0, mentors: 0 });
  // const [topMentors, setTopMentors] = useState([]);

  // useEffect(() => {
  //   const getDashboardData = async () => {
  //     // Fetching your existing endpoints
  //     const [courseRes, mentorRes] = await Promise.all([
  //       fetch("https://knoa-server.vercel.app/courses"),
  //       fetch("https://knoa-server.vercel.app/mentors"),
  //     ]);

  //     const allCourses = await courseRes.json();
  //     const allMentors = await mentorRes.json();

  //     // 1. Calculate Totals
  //     setStats({
  //       courses: allCourses.length,
  //       mentors: allMentors.length,
  //     });

  //     // 2. Filter High Rated (e.g., Rating > 4.5)
  //     const highRated = allMentors
  //       .filter((m) => m.rating >= 4.5)
  //       .sort((a, b) => b.rating - a.rating) // Highest first
  //       .slice(0, 3); // Take top 3

  //     setTopMentors(highRated);
  //   };

  //   getDashboardData();
  // }, []);

  // const containerVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: { duration: 0.6, staggerChildren: 0.1 },
  //   },
  // };

  // const cardVariants = {
  //   hidden: { opacity: 0, scale: 0.95 },
  //   visible: { opacity: 1, scale: 1 },
  // };

  return (
    <div>
      {role === "admin" && <AdminDashboard></AdminDashboard>}{" "}
      {role === "admin" && <MentorDashboard></MentorDashboard>}{" "}
      {role === "student" && <StudentDashboard></StudentDashboard>}
    </div>
  );
};

export default DashboardHome;
