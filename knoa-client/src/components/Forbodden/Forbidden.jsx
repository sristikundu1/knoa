import React from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { HiOutlineShieldCheck, HiOutlineArrowLeft } from "react-icons/hi";
import forbiddenAnim from "../../assets/Cybersecurity.json";
const Forbidden = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl shadow-blue-900/10 p-10 text-center border border-blue-50 relative overflow-hidden"
      >
        {/* Decorative Background Accent */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#39B8AD]/5 rounded-full blur-3xl"></div>

        {/* Lottie Animation */}
        <div className="w-64 h-64 mx-auto mb-6">
          <Lottie animationData={forbiddenAnim} loop={true} />
        </div>

        {/* Content */}
        <div className="space-y-4 relative z-10">
          <div className="flex justify-center mb-2">
            <span className="flex items-center gap-2 px-4 py-1.5 bg-red-50 text-red-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-red-100">
              <HiOutlineShieldCheck className="text-sm" /> Access Denied
            </span>
          </div>

          <h1 className="text-3xl font-black text-[#03045e]">
            Restricted <span className="text-[#00b4d8]">Area</span>
          </h1>

          <p className="text-slate-500 text-sm leading-relaxed">
            It looks like you don't have the necessary permissions to view this
            page. Please contact your administrator if you believe this is a
            mistake.
          </p>

          {/* Action Button */}
          <div className="pt-6">
            <Link to="/">
              <button className="group flex items-center justify-center gap-3 w-full py-4 bg-[#03045e] hover:bg-[#0077b6] text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-900/20 active:scale-95">
                <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Back to Safety
              </button>
            </Link>
          </div>

          <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest pt-4">
            Error Code: 403 Forbidden
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Forbidden;
