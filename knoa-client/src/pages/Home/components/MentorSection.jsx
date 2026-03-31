import React from "react";
import { motion } from "framer-motion";
import { HiStatusOnline } from "react-icons/hi";
import { AiOutlineLaptop } from "react-icons/ai";
import { GiNotebook } from "react-icons/gi";
import { RiVideoOnAiFill } from "react-icons/ri";

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
    /* 1. Main Section: This defines the TOTAL height including the image overlap */
    /* overflow-x-hidden stops horizontal scroll, overflow-y-visible allows the 3D look */
    <section className="relative w-full overflow-x-hidden overflow-y-visible py-14 md:py-16">
      {/* 2. The "Fixed Height" Background Strip */}
      {/* This sits BEHIND the content and has a set height (e.g., 400px) */}
      <div className="absolute top-1/2 left-0 w-full h-[350px] md:h-[450px] bg-[#03045e] -translate-y-1/2 z-0">
        {/* Animated Background Icons go inside this strip */}
        <div className="relative w-full h-full overflow-hidden">
          <motion.div
            variants={iconVariants}
            animate="animate"
            className="absolute top-[15%] left-[5%] text-[#e6ff55] opacity-20 text-5xl"
          >
            <AiOutlineLaptop />
          </motion.div>
          <motion.div
            variants={iconVariants}
            animate="animate"
            className="absolute top-[50%] left-[45%] text-[#e6ff55] opacity-20 text-6xl"
          >
            <HiStatusOnline />
          </motion.div>

          <motion.div
            variants={iconVariants}
            animate="animate"
            className="absolute bottom-[10%] right-[3%] text-[#e6ff55] opacity-20 text-6xl"
          >
            <GiNotebook />
          </motion.div>

          <motion.div
            variants={iconVariants}
            animate="animate"
            className="absolute top-[10%] right-[3%] text-[#e6ff55] opacity-20 text-6xl"
          >
            <RiVideoOnAiFill />
          </motion.div>
        </div>
      </div>

      {/* 3. The Content Layer */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side: Text */}
        <div className="text-white">
          <span className="text-[#0077b6] font-bold tracking-[0.2em] uppercase text-xs px-3 py-1 bg-[#39B8AD]/10 rounded-full">
            Our Experts
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-6 text-white">
            Guided by the Best <br />
            <span className="text-[#00b4d8]">Industry Mentors</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg leading-relaxed">
            Gain exclusive insights into industry workflows and the latest tech
            stacks used by global leaders. Beyond just technical skills, our
            mentors provide personalized career coaching and mock interviews to
            ensure you are job-ready from day one.
          </p>
          <button className="bg-[#00b4d8]  text-white  px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-[#03045e] transition-all">
            Meet Our Mentors
          </button>
        </div>

        {/* Right Side: 2x2 Grid */}
        {/* Since the BG strip is "fixed" at 450px and the images are h-80, 
            they will naturally poke out the top and bottom of the strip */}
        <div className="grid grid-cols-2 gap-4">
          <motion.img
            custom="top"
            initial="hidden"
            whileInView="visible"
            variants={photoVariants}
            viewport={{ once: true }}
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400"
            className="w-full h-64 md:h-80 object-cover rounded-tl-[100px] shadow-2xl"
          />
          <motion.img
            custom="right"
            initial="hidden"
            whileInView="visible"
            variants={photoVariants}
            viewport={{ once: true }}
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400"
            className="w-full h-64 md:h-80 object-cover rounded-lg shadow-2xl mt-12"
          />
          <motion.img
            custom="left"
            initial="hidden"
            whileInView="visible"
            variants={photoVariants}
            viewport={{ once: true }}
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400"
            className="w-full h-64 md:h-80 object-cover rounded-lg shadow-2xl -mt-8"
          />
          <motion.img
            custom="bottom"
            initial="hidden"
            whileInView="visible"
            variants={photoVariants}
            viewport={{ once: true }}
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400"
            className="w-full h-64 md:h-80 object-cover rounded-br-[100px] shadow-2xl mt-4"
          />
        </div>
      </div>
    </section>
  );
};

export default MentorSection;
