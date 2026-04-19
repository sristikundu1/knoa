import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlineShieldCheck,
  HiOutlineFingerPrint,
  HiOutlineColorSwatch,
  HiOutlineLightningBolt,
  HiOutlineBadgeCheck,
} from "react-icons/hi";
import { Link } from "react-router"; // Use 'react-router-dom' if 'react-router' doesn't work for your version
import useAuth from "../../hooks/UseAuth";
import useRole from "../../hooks/useRole";
import styled from "styled-components";
import Swal from "sweetalert2";
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";
import EditProfileModal from "./EditProfileModal";

const Profile = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Color mapping based on role for a personalized feel
  const roleStyles = {
    admin: {
      bg: "bg-rose-50",
      text: "text-rose-600",
      border: "border-rose-100",
      label: "System Administrator",
    },
    mentor: {
      bg: "bg-teal-50",
      text: "text-teal-600",
      border: "border-teal-100",
      label: "Expert Mentor",
    },
    student: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-100",
      label: "Active Learner",
    },
  };

  const currentStyle = roleStyles[role] || roleStyles.student;

  return (
    <StyledWrapper>
      <div className="min-h-screen bg-[#FDFEFF] pb-20">
        {/* 1. Pattern Header Section */}
        <div className="h-48 w-full bg-pattern relative overflow-hidden">
          {/* Animated Glow Overlay */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-[#00b4da] rounded-full blur-[120px] opacity-40 z-10"
          />

          {/* Subtle Texture Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 z-0"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6">
          {/* 2. Main Profile Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative -mt-24 bg-white rounded-[3rem] p-8 shadow-2xl shadow-blue-900/5 border border-slate-50 flex flex-col md:flex-row items-center gap-8 z-20"
          >
            <div className="relative">
              <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-8 border-white shadow-xl">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/v3687L8/default-avatar.png"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="absolute -bottom-2 -right-2 bg-white p-2 rounded-2xl shadow-lg border border-slate-100"
              >
                <HiOutlineBadgeCheck
                  className={`text-3xl ${currentStyle.text}`}
                />
              </motion.div>
            </div>

            <div className="text-center md:text-left space-y-2">
              <div
                className={`inline-flex items-center gap-2 px-4 py-1 rounded-full border ${currentStyle.bg} ${currentStyle.border} ${currentStyle.text} text-[10px] font-black uppercase tracking-widest`}
              >
                <HiOutlineLightningBolt /> {currentStyle.label}
              </div>
              <h1 className="text-4xl font-black text-[#03045e] tracking-tight">
                {user?.displayName || "Anonymous User"}
              </h1>
              <p className="text-slate-400 font-medium flex items-center justify-center md:justify-start gap-2">
                <HiOutlineMail /> {user?.email}
              </p>
            </div>
          </motion.div>

          {/* 3. Stats & Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50"
            >
              <h3 className="text-[#03045e] font-black text-lg mb-6 flex items-center gap-3">
                <HiOutlineFingerPrint className="text-[#00b4da]" />{" "}
                Identification
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                  <span className="text-slate-400 text-sm font-bold uppercase tracking-tighter">
                    User Role
                  </span>
                  <span
                    className={`font-black capitalize ${currentStyle.text}`}
                  >
                    {role}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm font-bold uppercase tracking-tighter">
                    Member Since
                  </span>
                  <span className="text-slate-600 font-mono text-xs">
                    {user?.metadata?.creationTime
                      ? new Date(user.metadata.creationTime).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          },
                        )
                      : "User since 2026"}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#03045E] p-8 rounded-[3rem] text-white flex flex-col justify-between"
            >
              <div>
                <HiOutlineColorSwatch
                  size={40}
                  className="text-[#00b4da] mb-4"
                />
                <h3 className="text-2xl font-bold">
                  Customize <br /> Your Experience
                </h3>
                <p className="text-blue-200/60 text-sm mt-2">
                  Update preferences and visibility settings.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-8 w-full py-4 bg-[#00b4da] hover:bg-white hover:text-[#03045E] text-white font-black rounded-2xl transition-all active:scale-95 shadow-lg"
              >
                Edit Account Details
              </button>
            </motion.div>
            {/* 4. Edit Modal Integration */}
            <AnimatePresence>
              {isModalOpen && (
                <EditProfileModal
                  user={user}
                  onClose={() => setIsModalOpen(false)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* 4. Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 p-8 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200 text-center"
          >
            <p className="text-slate-500 font-bold italic">
              Logged in as {currentStyle.label}
            </p>
          </motion.div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .bg-pattern {
    /* Height and width are handled by Tailwind's h-48 w-full */
    --u: 10px;
    --c1: #fbf9fe;
    --c2: #02b6e7;
    --c3: #00699b;
    --gp: 50% / calc(var(--u) * 16.8) calc(var(--u) * 12.9);
    background:
      conic-gradient(
          from 122deg at 50% 85.15%,
          var(--c2) 0 58deg,
          var(--c3) 0 116deg,
          #fff0 0 100%
        )
        var(--gp),
      conic-gradient(from 122deg at 50% 72.5%, var(--c1) 0 116deg, #fff0 0 100%)
        var(--gp),
      conic-gradient(from 58deg at 82.85% 50%, var(--c3) 0 64deg, #fff0 0 100%)
        var(--gp),
      conic-gradient(
          from 58deg at 66.87% 50%,
          var(--c1) 0 64deg,
          var(--c2) 0 130deg,
          #fff0 0 100%
        )
        var(--gp),
      conic-gradient(from 238deg at 17.15% 50%, var(--c2) 0 64deg, #fff0 0 100%)
        var(--gp),
      conic-gradient(
          from 172deg at 33.13% 50%,
          var(--c3) 0 66deg,
          var(--c1) 0 130deg,
          #fff0 0 100%
        )
        var(--gp),
      linear-gradient(98deg, var(--c3) 0 15%, #fff0 calc(15% + 1px) 100%)
        var(--gp),
      linear-gradient(-98deg, var(--c2) 0 15%, #fff0 calc(15% + 1px) 100%)
        var(--gp),
      conic-gradient(
          from -58deg at 50.25% 14.85%,
          var(--c3) 0 58deg,
          var(--c2) 0 116deg,
          #fff0 0 100%
        )
        var(--gp),
      conic-gradient(
          from -58deg at 50% 28.125%,
          var(--c1) 0 116deg,
          #fff0 0 100%
        )
        var(--gp),
      linear-gradient(90deg, var(--c2) 0 50%, var(--c3) 0 100%) var(--gp);
  }
`;

export default Profile;
