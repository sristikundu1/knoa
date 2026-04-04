import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiTrash, FiVideo, FiImage, FiBookOpen } from "react-icons/fi";
import { IoPricetagsOutline } from "react-icons/io5";
import { GiClassicalKnowledge } from "react-icons/gi";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Swal from "sweetalert2";

const AddCourse = () => {
  const [isFree, setIsFree] = useState(false);
  const [description, setDescription] = useState("");
  const [mentors, setMentors] = useState([]);

  // Toolbar configuration to keep the UI clean
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  // Fetch mentors from database on component mount
  useEffect(() => {
    fetch("https://knoa-server.vercel.app/mentors")
      .then((res) => res.json())
      .then((data) => setMentors(data))
      .catch((err) => console.error("Error fetching mentors:", err));
  }, []);

  // handle publish course button
  const handleAddCourse = (e) => {
    e.preventDefault();

    const form = e.target;

    const formData = new FormData(form);
    const courseData = Object.fromEntries(formData.entries()); //get from input value

    // formData.get('free') will be "on" if checked, and null if unchecked
    courseData.isFree = formData.get("free") === "on";
    courseData.price = courseData.isFree
      ? 0
      : parseFloat(courseData.price || 0);
    delete courseData.free;

    // console.log(courseData);

    fetch("https://knoa-server.vercel.app/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.insertedId) {
          Swal.fire("successfully created the course!");

          form.reset();
        }
      });
  };
  // Animation Variants
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
      // Add this to make it float forever
      className="space-y-8"
    >
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-800">Create New Course</h1>
        <p className="text-slate-500 text-sm">
          Fill in the details below to publish your new masterpiece.
        </p>
      </div>

      <form
        onSubmit={handleAddCourse}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left Column: Basic & Detailed Info */}
        <div className="lg:col-span-2 space-y-6 ">
          {/* Section 1: Basic Information */}
          <motion.div
            variants={itemVariants}
            className="bg-white p-8 rounded-2xl border border-blue-50 shadow-[3px_4px_0px_1px_#eff6ff] space-y-6"
          >
            <h3 className="text-lg font-semibold text-[#03045e] flex items-center gap-2">
              <FiBookOpen className="text-[#0077b6]" /> Basic Information
            </h3>

            {/* Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-slate-600">
                    Course Name
                  </span>
                </label>
                <input
                  type="text"
                  name="courseName"
                  placeholder="e.g. Advanced React Patterns"
                  className="input input-bordered bg-slate-50 focus:border-blue-400 "
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-slate-600">
                    Category
                  </span>
                </label>
                <select
                  name="category"
                  defaultValue=""
                  className="select select-bordered bg-slate-50"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="development">Development</option>
                  <option value="data-science">Data Science</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="business">Business</option>
                  <option value="programming">Programming</option>
                  <option value="IT-and-Software">IT & Software</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-slate-600">
                    Difficulty
                  </span>
                </label>
                <select
                  name="difficulty"
                  className="select select-bordered bg-slate-50"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-slate-600">
                    Duration (e.g. 25h)
                  </span>
                </label>
                <input
                  type="text"
                  name="duration"
                  placeholder="25h"
                  className="input input-bordered bg-slate-50"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-slate-600">
                    Rating
                  </span>
                </label>
                <input
                  type="text"
                  name="rating"
                  placeholder="rating"
                  className="input input-bordered bg-slate-50"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-slate-600">
                    Mentor
                  </span>
                </label>
                <select
                  name="mentorName"
                  required
                  className="select select-bordered bg-slate-50"
                >
                  <option value="" disabled selected>
                    Select a Mentor
                  </option>

                  {/* Map through the mentors from database */}
                  {mentors.map((mentor) => (
                    <option key={mentor._id} value={mentor.name}>
                      {mentor.name} ({mentor.expertise})
                    </option>
                  ))}
                </select>
              </div>

              {/* Short Description: Now spans 2 columns */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium text-slate-600">
                    Short Description
                  </span>
                </label>

                <textarea
                  name="shortDescription"
                  className="textarea textarea-bordered bg-slate-50 h-32 w-full"
                  placeholder="What people can learn..."
                ></textarea>
              </div>

              {/* Full Description: Now spans 2 columns */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium text-slate-600">
                    Full Description
                  </span>
                </label>

                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                    modules={modules}
                    placeholder="Detailed course curriculum and overview..."
                    className="bg-white min-h-[200px]"
                  />
                </div>

                {/* CRITICAL: This hidden input sends the data to handleAddCourse */}
                <input
                  type="hidden"
                  name="fullDescription"
                  value={description}
                />
              </div>
            </div>
          </motion.div>

          {/* Section 2: Learning Outcomes & Requirements */}
          <motion.div
            variants={itemVariants}
            className="bg-white p-8 rounded-2xl border border-blue-50 shadow-[3px_4px_0px_1px_#eff6ff] space-y-6"
          >
            <h3 className="text-lg font-semibold text-[#03045e] flex items-center gap-2">
              <GiClassicalKnowledge className="text-[#0077b6]" /> What they'll
              learn & Requirements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-slate-600">
                    Tags (Comma separated)
                  </span>
                </label>
                <input
                  type="text"
                  name="tag"
                  placeholder="JavaScript, React, Web Dev"
                  className="input input-bordered bg-slate-50"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-slate-600">
                    Language
                  </span>
                </label>
                <input
                  type="text"
                  name="language"
                  placeholder="English"
                  className="input input-bordered bg-slate-50"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Media & Pricing */}
        <div className="space-y-6">
          {/* Pricing Card */}
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
                name="free"
                type="checkbox"
                className="toggle toggle-primary"
                onChange={(e) => setIsFree(e.target.checked)}
              />
            </div>
            <div className="form-control">
              <label className="label font-medium text-slate-600">
                Price ($)
              </label>
              <input
                key={isFree ? "free" : "paid"}
                type="number"
                name="price"
                disabled={isFree}
                defaultValue={isFree ? 0 : ""}
                placeholder="0"
                className="input input-bordered bg-slate-50 font-bold text-[#0077b6]"
              />
            </div>
          </motion.div>

          {/* Media Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white p-8 rounded-2xl border border-blue-50 shadow-[3px_4px_0px_1px_#eff6ff] space-y-6"
          >
            <h3 className="text-lg font-semibold text-[#03045e] flex items-center gap-2">
              <FiImage className="text-[#0077b6]" /> Media
            </h3>

            <div className="form-control">
              <label className="label font-medium text-slate-600">
                Thumbnail URL
              </label>
              <input
                type="text"
                name="thumbnail"
                placeholder="https://image-url.com"
                className="input input-bordered bg-slate-50 text-xs"
              />
            </div>

            <div className="form-control">
              <label className="label font-medium text-slate-600">
                Intro Video URL (YouTube/Vimeo)
              </label>
              <div className="relative">
                <FiVideo className="absolute left-3 top-4 text-slate-400" />
                <input
                  type="text"
                  name="video"
                  placeholder="Video Link"
                  className="input input-bordered bg-slate-50 pl-10 text-xs w-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Submit Action */}
          <div className="relative overflow-hidden rounded-2xl">
            <motion.button
              // 1. Continuous Floating Animation (Idle)
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              // 2. Interaction States
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 20px 30px rgba(0, 180, 216, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="relative group btn btn-primary w-full h-14 rounded-2xl text-lg border-none bg-[#00b4d8] hover:bg-[#03045e] transition-colors duration-500 overflow-hidden"
            >
              {/* 3. The "Shine" Sweep Effect */}
              <motion.div
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />

              {/* Button Content */}
              <span className="relative z-10 flex items-center justify-center gap-2 tracking-wide">
                Publish Course
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  🚀
                </motion.span>
              </span>

              {/* 4. Background Pulse Effect on Hover */}
              <motion.div
                className="absolute inset-0 bg-[#48cae4] opacity-0 group-hover:opacity-20 transition-opacity"
                initial={false}
              />
            </motion.button>

            {/* 5. Subtle Shadow Pulse underneath */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-[#00b4d8] blur-xl rounded-full -z-10"
            />
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default AddCourse;
