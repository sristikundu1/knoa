import React from "react";
import { motion } from "framer-motion";
import { HiStatusOnline } from "react-icons/hi";
import { AiOutlineLaptop } from "react-icons/ai";
import { GiNotebook } from "react-icons/gi";
import { RiVideoOnAiFill } from "react-icons/ri";
import { Link } from "react-router";

const MentorSection = () => {
  const iconVariants = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 5, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const photoVariants = {
    hidden: (direction) => ({
      x: direction === "left" ? -100 : 100,
      y: direction === "top" ? -100 : 100,
      opacity: 0,
    }),
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    /* overflow-y-visible is crucial for the 3D overlap effect on all screens */
    <section className="relative w-full overflow-x-hidden overflow-y-visible py-10 md:py-16 lg:py-24">
      {/* 2. Background Strip: Height adjusts for mobile (600px to cover stacked content) vs desktop */}
      <div className="absolute top-1/2 left-0 w-full h-[650px] sm:h-[750px] lg:h-[450px] bg-[#03045e] -translate-y-1/2 z-0">
        <div className="relative w-full h-full overflow-hidden">
          <motion.div
            variants={iconVariants}
            animate="animate"
            className="absolute top-[15%] left-[5%] text-[#e6ff55] opacity-20 text-4xl md:text-5xl"
          >
            <AiOutlineLaptop />
          </motion.div>
          <motion.div
            variants={iconVariants}
            animate="animate"
            className="absolute top-[50%] left-[45%] text-[#e6ff55] opacity-20 text-5xl md:text-6xl"
          >
            <HiStatusOnline />
          </motion.div>
          <motion.div
            variants={iconVariants}
            animate="animate"
            className="absolute bottom-[10%] right-[3%] text-[#e6ff55] opacity-20 text-5xl md:text-6xl"
          >
            <GiNotebook />
          </motion.div>
          <motion.div
            variants={iconVariants}
            animate="animate"
            className="absolute top-[10%] right-[3%] text-[#e6ff55] opacity-20 text-5xl md:text-6xl"
          >
            <RiVideoOnAiFill />
          </motion.div>
        </div>
      </div>

      {/* 3. The Content Layer */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center relative z-10">
        {/* Left Side: Text - Centered on mobile, left-aligned on desktop */}
        <div className="text-center lg:text-left text-white">
          <span className="text-[#0077b6] font-bold tracking-[0.2em] uppercase text-xs px-3 py-1 bg-[#39B8AD]/10 rounded-full">
            Our Experts
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mt-4 mb-6 text-white">
            Guided by the Best <br />
            <span className="text-[#00b4d8]">Industry Mentors</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Gain exclusive insights into industry workflows and the latest tech
            stacks used by global leaders. Beyond just technical skills, our
            mentors provide personalized career coaching and mock interviews to
            ensure you are job-ready from day one.
          </p>
          <Link to={"/mentors"}>
            <button className="bg-[#00b4d8] text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-[#03045e] transition-all w-full sm:w-auto">
              Meet Our Mentors
            </button>
          </Link>
        </div>

        {/* Right Side: 2x2 Grid - Adjusted margins for mobile/tablet overlap */}
        <div className="grid grid-cols-2 gap-3 md:gap-6">
          <motion.img
            custom="top"
            initial="hidden"
            whileInView="visible"
            variants={photoVariants}
            viewport={{ once: true }}
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-tl-[60px] md:rounded-tl-[100px] shadow-2xl"
          />
          <motion.img
            custom="right"
            initial="hidden"
            whileInView="visible"
            variants={photoVariants}
            viewport={{ once: true }}
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg shadow-2xl mt-8 md:mt-12"
          />
          <motion.img
            custom="left"
            initial="hidden"
            whileInView="visible"
            variants={photoVariants}
            viewport={{ once: true }}
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg shadow-2xl -mt-4 md:-mt-8"
          />
          <motion.img
            custom="bottom"
            initial="hidden"
            whileInView="visible"
            variants={photoVariants}
            viewport={{ once: true }}
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-br-[60px] md:rounded-br-[100px] shadow-2xl mt-2 md:mt-4"
          />
        </div>
      </div>
    </section>
  );
};

export default MentorSection;
