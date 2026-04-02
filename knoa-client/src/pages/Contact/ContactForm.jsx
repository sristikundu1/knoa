import React from "react";
import { motion } from "framer-motion";
import {
  FiSend,
  FiUser,
  FiMail,
  FiPhone,
  FiBookOpen,
  FiMessageSquare,
} from "react-icons/fi";

const ContactForm = () => {
  return (
    <section className="relative min-h-[800px] flex items-center justify-center py-20 px-4">
      {/* 1. FULL BACKGROUND WITH OVERLAY */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-fixed bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        {/* Navy Overlay to make text readable - matching your #03045e */}
        <div className="absolute inset-0 bg-[#03045e]/80 backdrop-blur-sm"></div>
      </div>

      {/* 2. FORM CONTAINER */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-5"
      >
        {/* Left Side: Decorative Branding */}
        <div className="hidden md:flex md:col-span-2 bg-[#00b4d8] p-12 flex-col justify-between text-white">
          <div>
            <h3 className="text-3xl font-black mb-4">Let's Talk!</h3>
            <p className="text-white/80 font-medium">
              Fill out the form and our expert consultants will get back to you
              within 24 hours.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-1 bg-white/30 rounded-full"></div>
            <p className="text-xs uppercase tracking-[0.2em] font-bold">
              Expert Guidance
            </p>
          </div>
        </div>

        {/* Right Side: The Actual Form */}
        <div className="md:col-span-3 p-8 lg:p-12">
          <h2 className="text-3xl font-black text-[#03045e] mb-8">
            Get a Free <span className="text-[#00b4d8]">Consultation</span>
          </h2>

          <form className="space-y-5">
            {/* Name & Email Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#00b4d8] focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-1">
                  Email
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#00b4d8] focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Phone & Course Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-1">
                  Phone
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    placeholder="+1 234..."
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#00b4d8] focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-1">
                  Select Course
                </label>
                <div className="relative">
                  <FiBookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#00b4d8] focus:bg-white outline-none appearance-none transition-all text-slate-500">
                    <option value="development">Development</option>
                    <option value="data-science">Data Science</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="business">Business</option>
                    <option value="programming">Programming</option>
                    <option value="IT-and-Software">IT & Software</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 ml-1">
                Your Message
              </label>
              <div className="relative">
                <FiMessageSquare className="absolute left-4 top-5 text-slate-400" />
                <textarea
                  rows="4"
                  placeholder="How can we help you?"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#00b4d8] focus:bg-white outline-none transition-all resize-none"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 bg-[#03045e] text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-900/20 hover:bg-[#00b4d8] transition-all flex items-center justify-center gap-3"
            >
              Get Consultation <FiSend />
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactForm;
