import React from "react";
import { motion } from "framer-motion";
import { FiHelpCircle, FiArrowRight } from "react-icons/fi";

const MentorBanner = () => {
  return (
    <div className="w-full bg-[#39B8AD]/5 py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE: TEXT CONTENT */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start text-left space-y-6"
        >
          {/* Short Subheading / Tag */}
          <span className="text-[#0077b6] font-bold tracking-[0.2em] uppercase text-xs px-4 py-1.5 bg-[#39B8AD]/10 rounded-full">
            Expert Insights
          </span>

          {/* Main Section Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#03045e] leading-tight">
            Meet Your Next <br />
            <span className="text-[#00b4d8]">Industry Guide</span>
          </h2>

          {/* Short Description */}
          <p className="text-gray-500 text-lg md:text-xl max-w-xl leading-relaxed">
            Discover the journey, skills, and professional background of our
            world-class mentors. Get ready to level up your career with 1-on-1
            guidance.
          </p>

          {/* Decorative underline */}
          <div className="w-20 h-1.5 bg-[#0077b6] rounded-full mt-2"></div>
        </motion.div>

        {/* RIGHT SIDE: IMAGE */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Decorative Floating Circle */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#39B8AD]/20 rounded-full blur-3xl animate-pulse"></div>

          <div className="relative z-10 rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl shadow-blue-100/50 transform rotate-1">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
              alt="Professional Workspace"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MentorBanner;
