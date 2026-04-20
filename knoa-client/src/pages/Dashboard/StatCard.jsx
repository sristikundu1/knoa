// src/components/StatCard.jsx
import React from "react";
import { motion } from "framer-motion";

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

export default StatCard;
