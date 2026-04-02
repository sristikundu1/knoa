import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiMail, FiPhoneCall } from "react-icons/fi";

const ContactBanner = () => {
  return (
    <div className="w-full bg-[#39B8AD]/5 py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE: TEXT CONTENT */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-left"
        >
          {/* Tagline */}
          <span className="inline-block text-[#0077b6] font-bold tracking-[0.2em] uppercase text-xs px-4 py-1.5 bg-[#39B8AD]/10 rounded-full">
            Get In Touch
          </span>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#03045e] leading-tight">
            Connect with Our <br />
            <span className="text-[#00b4d8]">Learning Experts</span>
          </h1>

          {/* Description */}
          <p className="text-slate-500 text-lg md:text-xl max-w-xl leading-relaxed">
            Have questions about our programs or need technical support? Our
            team is here to help you navigate your educational journey and
            master industry-leading tools.
          </p>

          {/* Decorative Underline (Left Aligned) */}
          <div className="w-20 h-1.5 bg-[#7F81C8] rounded-full"></div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#03045e] text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-100 hover:bg-[#0077b6] transition-colors"
            >
              Explore Courses <FiArrowRight />
            </motion.button>
          </div>
        </motion.div>

        {/* RIGHT SIDE: IMAGE CONTENT */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Decorative Background Blob */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#7F81C8]/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#39B8AD]/10 rounded-full blur-3xl -z-10"></div>

          <div className="relative rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
              alt="Team collaboration"
              className="w-full h-[400px] object-cover"
            />
            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute bottom-6 left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-[#39B8AD] rounded-full flex items-center justify-center text-white">
                <FiMail />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                  Reply Time
                </p>
                <p className="text-[#03045e] font-bold text-sm">
                  Under 24 Hours
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactBanner;
