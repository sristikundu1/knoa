import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaGithub,
  FaStar,
  FaBriefcase,
  FaGraduationCap,
} from "react-icons/fa";

const MentorCard = ({ mentor }) => {
  const {
    profileImage,
    name,
    expertise,
    bio,
    linkedin,
    git,
    rating,
    experienceYears,
  } = mentor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto my-20 bg-white group"
    >
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* LEFT SIDE: CUSTOM IMAGE CONTAINER WITH L-BORDER */}
        <div className="lg:w-2/5 w-full">
          <div className="relative inline-block pb-5 pl-5 w-full">
            {/* The L-Shaped Border (using ::before logic in Tailwind) */}
            <div className="absolute bottom-0 left-0 w-[90%] h-[90%] border-l-[22px] border-b-[22px] border-[#0077b6] rounded-bl-[22px] z-0" />

            {/* The Image */}
            <div className="relative z-10 overflow-hidden rounded-md shadow-2xl">
              <img
                src={profileImage}
                alt={name}
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Social Overlay: Hidden by default, slides up on hover */}
              <div className="absolute inset-0  bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8 gap-5">
                {linkedin && (
                  <motion.a
                    whileHover={{ y: -5 }}
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 bg-white hover:bg-[#0077b5] hover:text-white rounded-full transition-all shadow-xl text-[#0077b5]"
                  >
                    <FaLinkedin size={24} />
                  </motion.a>
                )}
                {git && (
                  <motion.a
                    whileHover={{ y: -5 }}
                    href={git}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 bg-white hover:bg-black hover:text-white rounded-full transition-all shadow-xl text-black"
                  >
                    <FaGithub size={24} />
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: CONTENT */}
        <div className="lg:w-3/5 p-4 flex flex-col justify-center space-y-6">
          {/* Experience & Rating */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-[#0077b6] font-semibold text-sm">
              <FaBriefcase />
              <span>{experienceYears}+ Years Exp.</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-full text-yellow-700 font-semibold text-sm">
              <FaStar className="text-yellow-500" />
              <span>{rating}.0 Rating</span>
            </div>
          </div>

          {/* Name & Expertise */}
          <div>
            <h2 className="text-5xl font-black text-[#03045e] mb-3">{name}</h2>
            <p className="text-2xl font-medium text-[#00b4d8] flex items-center gap-3">
              <FaGraduationCap /> {expertise}
            </p>
          </div>

          {/* Bio */}
          <p className="text-gray-500 leading-relaxed text-xl italic max-w-2xl">
            "{bio}"
          </p>

          {/* Statistics CountUp */}
          <div className="grid grid-cols-3 gap-8 pt-10 border-t border-gray-100">
            <div className="text-left">
              <p className="text-4xl font-black text-[#03045e]">
                <CountUp end={Number(experienceYears)} duration={3} />+
              </p>
              <p className="text-sm uppercase tracking-widest text-gray-400 font-bold mt-1">
                Years
              </p>
            </div>
            <div className="text-left">
              <p className="text-4xl font-black text-[#03045e]">
                <CountUp end={85} duration={4} />+
              </p>
              <p className="text-sm uppercase tracking-widest text-gray-400 font-bold mt-1">
                Projects
              </p>
            </div>
            <div className="text-left">
              <p className="text-4xl font-black text-[#03045e]">
                <CountUp end={120} duration={4} />+
              </p>
              <p className="text-sm uppercase tracking-widest text-gray-400 font-bold mt-1">
                Students
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MentorCard;
