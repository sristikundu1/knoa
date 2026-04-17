import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* --- ANIMATED ILLUSTRATION (Pure CSS/SVG) --- */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 mb-12">
        {/* Floating Book Icon */}
        <motion.div
          animate={{
            y: [0, -25, 0],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-10 w-full h-full flex items-center justify-center"
        >
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full drop-shadow-2xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Stylized Book Shape */}
            <path
              d="M40 160V40C40 34.4772 44.4772 30 50 30H160V150H50C44.4772 150 40 154.477 40 160Z"
              fill="#03045e"
            />
            <path
              d="M160 150H50C44.4772 150 40 154.477 40 160C40 165.523 44.4772 170 50 170H160V150Z"
              fill="#0077b6"
            />
            <rect
              x="60"
              y="50"
              width="70"
              height="8"
              rx="4"
              fill="#39b8ad"
              fillOpacity="0.6"
            />
            <rect
              x="60"
              y="70"
              width="50"
              height="8"
              rx="4"
              fill="#39b8ad"
              fillOpacity="0.4"
            />
            {/* The "404" on the book cover */}
            <text
              x="75"
              y="120"
              fill="white"
              fontSize="30"
              fontWeight="900"
              fontFamily="sans-serif"
            >
              404
            </text>
          </svg>
        </motion.div>

        {/* Animated Background Pulse Rings */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-[#39b8ad]/20 rounded-full blur-3xl -z-0"
        />
      </div>

      {/* --- TEXT CONTENT --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="space-y-2">
          <h1 className="text-5xl md:text-7xl font-black text-[#03045e] tracking-tight">
            Lost in <span className="text-[#00b4d8]">Transit?</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
            This lesson path is currently missing from our curriculum. Don't
            worry, even top mentors take a wrong turn sometimes!
          </p>
        </div>

        {/* --- EYE-CATCHY BUTTON --- */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="pt-4"
        >
          <Link
            to="/"
            className="relative inline-flex items-center gap-3 px-12 py-5 bg-[#03045e] text-white font-bold text-lg rounded-2xl overflow-hidden group shadow-2xl transition-all hover:bg-[#0077b6]"
          >
            {/* Glowing background effect on hover */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#39b8ad] to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />

            <span>Return to Classroom</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-2 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </motion.div>

      {/* Background Decorative Particles */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, Math.random() * -100, 0],
              x: [0, Math.random() * 50, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 2,
            }}
            className="absolute w-2 h-2 bg-[#39b8ad] rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ErrorPage;
