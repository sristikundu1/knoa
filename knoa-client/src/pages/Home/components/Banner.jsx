import React from "react";
import { HiArrowRight } from "react-icons/hi";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-4 md:py-8">
      {/* 1. Height: h-[450px] for mobile, h-[500px] for tablet, h-[600px] for desktop
          2. Rounded: 2xl for a softer look 
      */}
      <div className="relative w-full h-[450px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl">
        {/* Background Image - Optimized object position */}
        <img
          src="https://i.ibb.co.com/gL20tjtr/vitaly-gariev-JPnza-M60-Z3-A-unsplash.jpg"
          alt="Learning Platform Banner"
          className="absolute inset-0 w-full h-full object-cover object-center md:object-right-top"
        />

        {/* Dark Overlay - Slightly darker on mobile for better text contrast 
            since the image might crowd the text on smaller screens.
        */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/20"></div>

        {/* Content Container: 
            - Centered text on mobile (items-center text-center)
            - Left aligned on tablet/desktop (md:items-start md:text-left)
        */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center md:items-start md:text-left px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl space-y-4 md:space-y-6"
          >
            {/* Subheading */}
            <span className="text-[#00b4d8] font-black tracking-[0.2em] uppercase text-[10px] md:text-sm bg-white/10 backdrop-blur-md px-3 py-1 rounded-full inline-block">
              Empower Your Future
            </span>

            {/* Main Heading - Resized for Mobile */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1]">
              Master New Skills <br />
              <span className="text-[#00b4d8] inline-block mt-1">
                <Typewriter
                  options={{
                    strings: [
                      "Anytime Anywhere",
                      "In Your Style",
                      "With Experts",
                    ],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 50,
                  }}
                />
              </span>
            </h1>

            {/* Description - Hidden or smaller on very small screens */}
            <p className="text-gray-200 text-sm md:text-lg lg:text-xl max-w-md leading-relaxed">
              Access world-class education from the comfort of your home. Join
              thousands of students and start your journey today.
            </p>

            {/* CTA Button - Full width on tiny screens, auto on larger */}
            <div className="pt-2 w-full md:w-auto">
              <button className="w-full md:w-auto group btn border-none bg-[#00b4d8] hover:bg-[#03045e] text-white px-8 py-4 h-auto rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-blue-400/20">
                <span className="font-black uppercase tracking-widest text-xs">
                  Explore Courses
                </span>
                <HiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
