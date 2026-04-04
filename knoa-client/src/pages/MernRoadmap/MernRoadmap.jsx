import React from "react";
import { motion } from "framer-motion";

const MernRoadmap = () => {
  const steps = [
    {
      title: "Frontend Foundation",
      desc: "HTML5, CSS3, Modern JS (ES6+)",
      color: "#00b4d8",
    },
    {
      title: "React Mastery",
      desc: "Hooks, Context API, React Router",
      color: "#39b8ad",
    },
    {
      title: "Backend Core",
      desc: "Node.js, Express, Middleware",
      color: "#0077b6",
    },
    {
      title: "Database Design",
      desc: "MongoDB, Mongoose, Aggregation",
      color: "#03045e",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-black text-[#03045e] mb-12 text-center">
        MERN Path 2026
      </h2>
      <div className="space-y-8">
        {steps.map((step, index) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            key={index}
            className="flex gap-6 items-start"
          >
            <div className="flex flex-col items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: step.color }}
              >
                {index + 1}
              </div>
              {index !== steps.length - 1 && (
                <div className="w-1 h-20 bg-gray-100"></div>
              )}
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1">
              <h3 className="font-bold text-xl text-gray-800">{step.title}</h3>
              <p className="text-gray-500 mt-2">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default MernRoadmap;
