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
import {
  HiBadgeCheck,
  HiOutlineMail,
  HiOutlineClipboardCheck,
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
} from "react-icons/hi";

const MentorCard = ({ mentor }) => {
  const {
    name,
    profileImage,
    subjects,
    bio,
    status,
    email,
    linkedin,
    github,
    certCount,
    experience,
    studentsCount,
    averageRating = 1,
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
            <div className="overflow-hidden rounded-md shadow-2xl">
              <img
                src={profileImage}
                alt={name}
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: CONTENT */}
        <div className="lg:w-3/5 p-4 flex flex-col justify-center space-y-8">
          {/* 1. Expertise Tags */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-wrap gap-2"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0077b6] bg-[#39B8AD]/10 px-3 py-1 rounded-md mb-2 block">
              Expert In
            </span>
            <div className="w-full flex gap-2">
              {subjects?.map((sub, i) => (
                <span
                  key={i}
                  className="px-4 py-1.5 bg-slate-50 border border-slate-100 text-slate-600 rounded-lg text-xs font-bold shadow-sm"
                >
                  {sub}
                </span>
              ))}
            </div>
          </motion.div>

          {/* 2. Name & Verified Badge */}
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <h2 className="text-5xl font-black text-[#03045e] capitalize">
                {name}
              </h2>
              {status === "verified" && (
                <div className="group relative">
                  <HiBadgeCheck className="text-[#00b4d8] text-4xl" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#03045e] text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Verified Expert
                  </span>
                </div>
              )}
            </motion.div>

            {/* Contact Quick-Links */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-slate-400 hover:text-[#00b4d8] transition-colors text-sm font-medium"
              >
                <HiOutlineMail className="text-lg" /> {email}
              </a>
              <div className="h-4 w-[1px] bg-slate-200"></div>
              <div className="flex gap-3">
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-[#0077b5]"
                  >
                    <FaLinkedin size={18} />
                  </a>
                )}
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-black"
                  >
                    <FaGithub size={18} />
                  </a>
                )}
              </div>
              <div className="h-4 w-[1px] bg-slate-200"></div>
              {/* DISPLAY RATING  */}
              <div className="flex items-center gap-3 ">
                <div className="flex text-yellow-400 text-xl">
                  {"★".repeat(Math.round(mentor?.averageRating || 1))}
                  {"☆".repeat(5 - Math.round(mentor?.averageRating || 1))}
                </div>
                <span className="text-sm text-slate-400 font-medium">
                  {(mentor?.averageRating || 1).toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* 3. Bio Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#39B8AD] to-transparent rounded-full opacity-30"></div>
            <p className="text-slate-500 leading-relaxed text-lg font-medium italic pl-4">
              "{bio}"
            </p>
          </motion.div>

          {/* 4. Statistics Grid with Icons */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-100">
            {/* Certificates */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#39B8AD]">
                <HiOutlineClipboardCheck size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Certificates
                </span>
              </div>
              <p className="text-4xl font-black text-[#03045e]">
                <CountUp end={Number(certCount)} duration={3} />
              </p>
              <p className="text-xs text-slate-400 font-medium">
                Professional Assets
              </p>
            </div>

            {/* Experience - Represented as Workshops/Years */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#00b4d8]">
                <HiOutlineAcademicCap size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Experience
                </span>
              </div>
              <p className="text-4xl font-black text-[#03045e]">
                <CountUp end={Number(experience)} duration={3} />+
              </p>
              <p className="text-xs text-slate-400 font-medium">
                Years in Industry
              </p>
            </div>

            {/* Students */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#03045e]">
                <HiOutlineUserGroup size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Community
                </span>
              </div>
              <p className="text-4xl font-black text-[#03045e]">
                <CountUp end={Number(studentsCount)} duration={4} />
              </p>
              <p className="text-xs text-slate-400 font-medium">
                Active Students
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MentorCard;
