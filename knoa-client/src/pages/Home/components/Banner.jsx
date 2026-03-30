import React from "react";
import { HiArrowRight } from "react-icons/hi";
import Typewriter from "typewriter-effect";

const Banner = () => {
  return (
    <section className="relative w-full h-[600px] overflow-hidden rounded-lg">
      {/* Background Image */}
      <img
        src="https://i.ibb.co.com/gL20tjtr/vitaly-gariev-JPnza-M60-Z3-A-unsplash.jpg"
        alt="Learning Platform Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-16 h-full flex flex-col justify-center items-start text-left">
        <div className="max-w-2xl space-y-5">
          {/* Short Subheading */}
          <span className="text-[#00b4d8] font-semibold tracking-wider uppercase text-sm">
            Empower Your Future
          </span>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Master New Skills <br />
            <span className="text-[#0077b6] inline-block">
              <Typewriter
                options={{
                  strings: ["Anytime Anywhere"],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                }}
              />
            </span>
          </h1>

          {/* Short Description */}
          <p className="text-gray-200 text-lg md:text-xl max-w-lg">
            Access world-class education from the comfort of your home. Join
            thousands of students and start your journey today.
          </p>

          {/* CTA Button */}
          <button className="btn border-none bg-[#00b4d8] hover:bg-[#03045e] text-white px-8 rounded-lg flex items-center gap-2">
            Explore Courses
            <HiArrowRight className="text-lg" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
