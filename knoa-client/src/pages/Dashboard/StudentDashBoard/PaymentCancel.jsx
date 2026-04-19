import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  HiOutlineXCircle,
  HiOutlineArrowLeft,
  HiOutlineSupport,
} from "react-icons/hi";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-lg w-full bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 p-12 text-center border border-blue-50 relative overflow-hidden"
      >
        {/* Decorative subtle background gradient */}
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-red-50 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-[#39B8AD]/5 rounded-full blur-3xl opacity-70"></div>

        {/* Big Cancel Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          className="relative z-10 flex justify-center mb-8"
        >
          <div className="p-5 bg-red-50 rounded-full border border-red-100 shadow-inner">
            <HiOutlineXCircle className="w-16 h-16 text-red-500" />
          </div>
        </motion.div>

        {/* Content */}
        <div className="space-y-4 relative z-10">
          <motion.h1
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-black text-[#03045e]"
          >
            Payment <span className="text-red-500">Cancelled</span>
          </motion.h1>

          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-500 text-base leading-relaxed"
          >
            Your transaction was not completed. No charges were made to your
            account. Feel free to try again when you're ready, or continue
            browsing other courses.
          </motion.p>

          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-16 h-1 bg-red-100 rounded-full mx-auto mt-6"
          ></motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-10 space-y-4 relative z-10"
        >
          <Link to="/courses">
            <button className="group flex items-center justify-center gap-3 w-full py-4 bg-[#03045e] hover:bg-[#0077b6] text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-900/10 active:scale-95">
              <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Return to My Courses
            </button>
          </Link>

          {/* Secondary Support Link */}
          <Link
            to="/support"
            className="inline-flex items-center gap-2 text-sm text-slate-400 font-semibold hover:text-[#00b4d8] transition-colors mt-2"
          >
            <HiOutlineSupport className="text-lg" />
            Need help with your payment?
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentCancel;
