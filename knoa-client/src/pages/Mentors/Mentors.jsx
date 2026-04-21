import React from "react";
import { Link, useLoaderData } from "react-router";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

const Mentors = () => {
  const axiosPublic = useAxios();

  const { data: mentors = [], isLoading } = useQuery({
    queryKey: ["mentors"],
    queryFn: async () => {
      const res = await axiosPublic.get("/mentors");
      return res.data;
    },
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay between each card (0.1s)
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // const allMentors = useLoaderData();
  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {mentors.map((mentor) => (
          /* 2. Change the card to motion.div and add the item variants */
          <motion.div
            key={mentor._id}
            variants={cardVariants}
            className="group relative w-full h-96 overflow-hidden rounded-2xl bg-gray-200 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
          >
            {/* Full Card Background Image */}
            <img
              src={mentor.profileImage}
              alt={mentor.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Card Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 translate-y-8 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
              <h2 className="text-2xl font-bold leading-tight">
                {mentor.name}
              </h2>

              <p className="mt-2 text-sm font-medium text-blue-300">
                {mentor.expertise}
              </p>

              <p className="mt-2 text-xs line-clamp-2 text-gray-300">
                {mentor.bio}
              </p>

              <Link to={`/mentor/${mentor._id}`} className="mt-4">
                <button className="w-full rounded-lg bg-[#00b4d8] hover:bg-[#03045e] text-white py-2.5 text-sm font-semibold tracking-wide transition-colors active:scale-95">
                  View Details
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Mentors;
