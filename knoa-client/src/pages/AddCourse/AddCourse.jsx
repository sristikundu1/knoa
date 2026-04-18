import React, { useEffect, useState, use } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FiPlus, FiTrash, FiVideo, FiImage, FiBookOpen } from "react-icons/fi";
import { IoPricetagsOutline } from "react-icons/io5";
import { GiClassicalKnowledge } from "react-icons/gi";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Swal from "sweetalert2";
import useAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AddCourse = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isFree, setIsFree] = useState(false);
  const [description, setDescription] = useState("");
  // const [mentors, setMentors] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // Toolbar configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  // fetch mentor data
  const { data: mentors = [] } = useQuery({
    queryKey: ["mentor-data"],
    queryFn: async () => {
      const res = await axiosSecure.get("/mentors");
      return res.data;
    },
  });

  const onSubmit = (data) => {
    // 1. Find the selected mentor's details to store both Name and UID
    const selectedMentor = mentors.find((m) => m.uid === data.mentorUid);

    const courseData = {
      ...data,
      mentorName: selectedMentor?.name,
      mentorUid: data.mentorUid, // Storing UID is vital for your enrollment tracking
      fullDescription: description,
      isFree: isFree,
      price: isFree ? 0 : parseFloat(data.price || 0),
      createdAt: new Date(),
      enrolledCount: 0, // Initialize enrollment count
    };

    const res = axiosSecure.post("/courses", courseData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Masterpiece Published!",
          text: "Your course is now live for students.",
          confirmButtonColor: "#00b4d8",
        });
        reset();
        setDescription("");
      }
    });
  };

  // Animation Variants (Keep your existing ones)
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-800">Create New Course</h1>
        <p className="text-slate-500 text-sm">
          Fill in the details below to publish your new masterpiece.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            variants={itemVariants}
            className="bg-white p-8 rounded-2xl border border-blue-50 shadow-[3px_4px_0px_1px_#eff6ff] space-y-6"
          >
            <h3 className="text-lg font-semibold text-[#03045e] flex items-center gap-2">
              <FiBookOpen className="text-[#0077b6]" /> Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label-text font-medium text-slate-600 mb-2 ml-1">
                  Course Name
                </label>
                <input
                  {...register("courseName", { required: true })}
                  placeholder="e.g. Advanced React Patterns"
                  className="input input-bordered bg-slate-50 focus:border-blue-400"
                />
              </div>

              <div className="form-control">
                <label className="label-text font-medium text-slate-600 mb-2  ml-1">
                  Category
                </label>
                <select
                  {...register("category", { required: true })}
                  className="select select-bordered bg-slate-50"
                >
                  <option value="">Select Category</option>
                  <option value="development">Development</option>
                  <option value="data-science">Data Science</option>
                  <option value="design">Design</option>
                  <option value="programming">Programming</option>
                  <option value="IT-and-Software">IT & Software</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label-text font-medium text-slate-600 mb-2 ">
                  Difficulty
                </label>
                <select
                  {...register("difficulty")}
                  className="select select-bordered bg-slate-50"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label-text font-medium text-slate-600 mb-2 ml-1">
                  Duration
                </label>
                <input
                  {...register("duration")}
                  placeholder="25h"
                  className="input input-bordered bg-slate-50"
                />
              </div>

              <div className="form-control">
                <label className="label-text font-medium text-slate-600 mb-2">
                  Rating
                </label>
                <input
                  {...register("rating")}
                  className="input input-bordered bg-slate-50"
                  placeholder="e.g. 4.8"
                />
              </div>

              <div className="form-control">
                <label className="label-text font-medium text-slate-600 mb-2 ml-1">
                  Mentor
                </label>
                <select
                  {...register("mentorUid", { required: true })}
                  className="select select-bordered bg-slate-50"
                >
                  <option value="">Select a Mentor</option>
                  {mentors.map((mentor) => (
                    <option key={mentor._id} value={mentor.uid}>
                      {mentor.name} {mentor.uid === user?.uid ? "(Me)" : ""}
                    </option>
                  ))}
                </select>
                {errors.mentorUid && (
                  <span className="text-red-400 text-xs mt-1">
                    Please select a mentor
                  </span>
                )}
              </div>

              <div className="form-control md:col-span-2">
                <label className="label-text font-medium text-slate-600 mb-2">
                  Short Description
                </label>
                <textarea
                  {...register("shortDescription")}
                  className="textarea textarea-bordered bg-slate-50 h-24 w-full"
                  placeholder="What people can learn..."
                ></textarea>
              </div>

              <div className="form-control md:col-span-2">
                <label className="label-text font-medium text-slate-600 mb-2 ml-1">
                  Full Description
                </label>
                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                    modules={modules}
                    className="bg-white min-h-[200px]"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-8 rounded-2xl border border-blue-50 shadow-[3px_4px_0px_1px_#eff6ff] space-y-6"
          >
            <h3 className="text-lg font-semibold text-[#03045e] flex items-center gap-2">
              <GiClassicalKnowledge className="text-[#0077b6]" /> Additional
              Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label-text font-medium text-slate-600 mb-2 ml-1">
                  Tags (Comma separated)
                </label>
                <input
                  {...register("tag")}
                  placeholder="JavaScript, React"
                  className="input input-bordered bg-slate-50"
                />
              </div>
              <div className="form-control">
                <label className="label-text font-medium text-slate-600 mb-2 ml-1">
                  Language
                </label>
                <input
                  {...register("language")}
                  placeholder="English"
                  className="input input-bordered bg-slate-50"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div
            variants={itemVariants}
            className="bg-white p-8 rounded-2xl border border-blue-50 shadow-[3px_4px_0px_1px_#eff6ff] space-y-4"
          >
            <h3 className="text-lg font-semibold text-[#03045e] flex items-center gap-2">
              <IoPricetagsOutline className="text-[#0077b6]" /> Pricing
            </h3>
            <div className="flex items-center justify-between bg-blue-50 p-3 rounded-xl mb-4">
              <span className="text-sm font-medium text-[#0077b6]">
                Is this a free course?
              </span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                onChange={(e) => setIsFree(e.target.checked)}
              />
            </div>
            <div className="form-control">
              <input
                {...register("price")}
                type="number"
                disabled={isFree}
                placeholder={isFree ? "0" : "Price ($)"}
                className="input input-bordered bg-slate-50 font-bold text-[#0077b6]"
              />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-8 rounded-2xl border border-blue-50 shadow-[3px_4px_0px_1px_#eff6ff] space-y-6"
          >
            <h3 className="text-lg font-semibold text-[#03045e] flex items-center gap-2">
              <FiImage className="text-[#0077b6]" /> Media
            </h3>
            <input
              {...register("thumbnail")}
              placeholder="Thumbnail URL"
              className="input input-bordered bg-slate-50 text-xs w-full mb-4"
            />
            <div className="relative">
              <FiVideo className="absolute left-3 top-4 text-slate-400" />
              <input
                {...register("video")}
                placeholder="Intro Video URL"
                className="input input-bordered bg-slate-50 pl-10 text-xs w-full"
              />
            </div>
          </motion.div>

          {/* Action Button (Keep your exact animation logic here) */}
          <div className="relative overflow-hidden rounded-2xl">
            <motion.button
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 20px 30px rgba(0, 180, 216, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="relative group btn btn-primary w-full h-14 rounded-2xl text-lg border-none bg-[#00b4d8] hover:bg-[#03045e] transition-colors duration-500 overflow-hidden"
            >
              <motion.div
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Publish Course 🚀
              </span>
            </motion.button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default AddCourse;
