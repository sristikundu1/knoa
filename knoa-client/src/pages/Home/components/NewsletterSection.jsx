import React, { useState } from "react";
import { motion } from "framer-motion"; // Add 'npm install framer-motion'
import { MdAddCircle, MdNotificationsActive } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import Swal from "sweetalert2"; // You are already using this!

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setLoading(true);

    // Dynamic data to send to MongoDB
    const subscriberData = {
      email: email,
      subscribedAt: new Date().toISOString(),
      source: "HomePage Section", // Or 'Dashboard Bottom'
      status: "active",
    };

    // --- Dynamic Backend Integration ---
    fetch("http://localhost:3000/subscribers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscriberData),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.insertedId) {
          Swal.fire({
            title: "Added Successfully!",
            text: "You will now receive our creative updates.",
            icon: "success",
            timer: 2500,
            showConfirmButton: false,
            // Customizing SweetAlert for an "eye-soothing" look
            iconColor: "#00b4d8", // Your custom teal/green theme
            background: "#ffffff",
          });
          setEmail(""); // Clear the input
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error("Subscription Error:", err);
        Swal.fire({
          icon: "error",
          title: "Failed to Subscribe",
          text: "Something went wrong. Please try again.",
        });
      });
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className=" max-w-7xl mx-auto px-4 py-8 relative bg-slate-50 py-24 px-6 overflow-hidden mt-16 rounded-[2rem] border border-slate-100 shadow-inner"
    >
      {/* 1. Creative Decorative Background Elements (Fixed) */}
      <div className="absolute top-1/2 left-20 transform -translate-y-1/2 -translate-x-10 z-0">
        <MdAddCircle className="text-purple-300 w-6 h-6 animate-pulse opacity-50" />
      </div>
      <div className="absolute top-1/4 left-32 transform -translate-y-1/2 z-0">
        <FiCheckCircle className="text-[#00b4d8] w-5 h-5 animate-bounce opacity-40" />
      </div>
      <div className="absolute bottom-1/4 left-16 transform -translate-y-1/2 z-0">
        <MdNotificationsActive className="text-amber-300 w-5 h-5 rotate-12 opacity-50" />
      </div>

      {/* 2. Target/Bullseye Graphic from image (Top Right) */}
      <div className="absolute -top-16 -right-16 z-0 transform rotate-12">
        <div className="w-80 h-80 rounded-full border-[1.2rem] border-[#00b4d8]/20 flex items-center justify-center">
          <div className="w-60 h-60 rounded-full border-[1.2rem] border-[#00b4d8]/30 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full bg-[#00b4d8]/10"></div>
          </div>
        </div>
      </div>

      {/* 3. Main Content Wrapper */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
          viewport={{ once: true }}
          className="text-4xl lg:text-5xl font-black text-[#03045e] tracking-tight mb-6"
        >
          Ready to get started?
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          viewport={{ once: true }}
          className="text-slate-600 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Join our creative community. Recieve the latest MERN stack insights,
          eye-soothing designs, and dynamic tutorials directly in your inbox.
        </motion.p>

        {/* 4. Subscribtion Form */}
        <motion.form
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
          viewport={{ once: true }}
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-white p-3 rounded-full max-w-xl mx-auto shadow-2xl shadow-blue-100/50 border border-slate-100"
        >
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-grow w-full px-6 py-4 bg-transparent text-slate-700 font-semibold placeholder:text-slate-300 placeholder:font-bold focus:outline-none focus:ring-2 focus:ring-[#39b8ad]/30 rounded-full text-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 group ${loading ? "bg-slate-400" : "bg-[#00b4d8] hover:bg-[#03045e]"} text-white font-black text-xs uppercase tracking-[0.2em] px-10 py-5 rounded-full transition-all duration-300 shadow-lg shadow-[#39b8ad]/20 group`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                Sign Up
                <span className="transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </>
            )}
          </button>
        </motion.form>
      </div>
    </motion.section>
  );
};

export default NewsletterSection;
