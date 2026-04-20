import React from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  HiOutlineUsers,
  HiOutlineMailOpen,
  HiOutlineShieldCheck,
  HiOutlineClock,
} from "react-icons/hi";
import StatCard from "../StatCard";

const AdminDashboard = ({ allUsers, subscribers, pendingPayments }) => {
  const userStats = [
    {
      name: "Students",
      value: allUsers?.filter((u) => u.role === "student").length || 10,
    },
    {
      name: "Mentors",
      value: allUsers?.filter((u) => u.role === "mentor").length || 5,
    },
  ];
  const COLORS = ["#03045e", "#39B8AD"];

  return (
    <div className="p-8 space-y-10 bg-[#FDFEFF]">
      <div>
        <h1 className="text-4xl font-black text-[#03045e]">
          System <span className="text-[#00b4d8]">Control</span>
        </h1>
        <p className="text-slate-400 font-medium">
          Platform overview and management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={<HiOutlineUsers />}
          label="Total Users"
          value={allUsers?.length || 0}
          color="#03045e"
        />
        <StatCard
          icon={<HiOutlineMailOpen />}
          label="Subscribers"
          value={subscribers?.length || 0}
          color="#39B8AD"
        />
        <StatCard
          icon={<HiOutlineClock />}
          label="Pending"
          value={pendingPayments || 0}
          color="#7F81C8"
        />
        <StatCard
          icon={<HiOutlineShieldCheck />}
          label="Verified"
          value="8"
          color="#00b4d8"
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
                {allUsers?.slice(0, 4).map((user, i) => (
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

export default AdminDashboard;
