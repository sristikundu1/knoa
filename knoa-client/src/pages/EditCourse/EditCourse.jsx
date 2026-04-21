import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiTrash, FiVideo, FiImage, FiBookOpen } from "react-icons/fi";
import { IoPricetagsOutline } from "react-icons/io5";
import { GiClassicalKnowledge } from "react-icons/gi";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/UseAuth";
import { useForm, Watch } from "react-hook-form";

const EditCourse = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { course } = useLoaderData();
  const { _id, fullDescription, isFree: initialIsFree } = course || {};
  const navigate = useNavigate();
  const [isFree, setIsFree] = useState(initialIsFree || false);
  const [description, setDescription] = useState(fullDescription || "");

  // 1. Initialize React Hook Form with default values from loaderData
  const { register, handleSubmit, reset } = useForm();

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

  const { data: mentors = [] } = useQuery({
    queryKey: ["mentor-data"],
    queryFn: async () => {
      const res = await axiosSecure.get("/mentors");
      return res.data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(`/course/${_id}`, updatedData);
      return res.data;
    },

    onSuccess: (data) => {
      if (data.modifiedCount) {
        queryClient.invalidateQueries(["course"]);
        Swal.fire("Updated!", "Course updated successfully", "success");
        navigate("/dashboard/all-courses");
      } else {
        Swal.fire("Info", "No changes made", "info");
      }
    },
  });

  useEffect(() => {
    if (course) {
      reset(course);

      setDescription(course.fullDescription || "");
      setIsFree(course.isFree || false);
    }
  }, [course, reset]);
  // console.log("loaderData:", loaderData);
  // const isChanged = JSON.stringify(loaderData) !== JSON.stringify(Watch());

  // handle publish course button
  // React Hook Form Submit Handler
  const onSubmit = async (data) => {
    // Logic to find selected mentor
    const selectedMentor = mentors.find((m) => m.uid === data.mentorUid);

    const courseData = {
      ...data,
      mentorName: selectedMentor?.name || data.mentorName,
      fullDescription: description,
      isFree: isFree,
      price: isFree ? 0 : parseFloat(data.price || 0),
    };

    await mutateAsync(courseData);
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
        <h1 className="text-2xl font-bold text-slate-800">
          Update the course.
        </h1>
        <p className="text-slate-500 text-sm">
          Make changes and keep your course content up to date.
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
                <label className="label">
                  <span className="label-text font-medium text-slate-600">
                    Course Name
                  </span>
                </label>
                <input
                  {...register("courseName")}
                  type="text"
                  className="input input-bordered bg-slate-50"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-slate-600">
                    Category
                  </span>
                </label>
                <select
                  {...register("category")}
                  className="select select-bordered bg-slate-50"
                >
                  <option value="development">Development</option>
                  <option value="data-science">Data Science</option>
                  <option value="design">Design</option>
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
                  {...register("difficulty")}
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
                    Duration
                  </span>
                </label>
                <input
                  {...register("duration")}
                  type="text"
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
                  {...register("rating")}
                  type="text"
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
                  {...register("mentorUid")}
                  className="select select-bordered bg-slate-50"
                >
                  {mentors.map((mentor) => (
                    <option key={mentor._id} value={mentor.uid}>
                      {mentor.name} {mentor.uid === user?.uid ? "(Me)" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium text-slate-600">
                    Short Description
                  </span>
                </label>
                <textarea
                  {...register("shortDescription")}
                  className="textarea textarea-bordered bg-slate-50 h-32 w-full"
                ></textarea>
              </div>

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
              <GiClassicalKnowledge className="text-[#0077b6]" /> What they'll
              learn & Requirements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-slate-600">
                    Tags
                  </span>
                </label>
                <input
                  {...register("tag")}
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
                  {...register("language")}
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
                checked={isFree}
                onChange={(e) => setIsFree(e.target.checked)}
              />
            </div>
            <div className="form-control">
              <label className="label font-medium text-slate-600">
                Price ($)
              </label>
              <input
                {...register("price")}
                type="number"
                disabled={isFree}
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
            <div className="form-control">
              <label className="label font-medium text-slate-600">
                Thumbnail URL
              </label>
              <input
                {...register("thumbnail")}
                className="input input-bordered bg-slate-50 text-xs"
              />
            </div>
            <div className="form-control">
              <label className="label font-medium text-slate-600">
                Intro Video URL
              </label>
              <div className="relative">
                <FiVideo className="absolute left-3 top-4 text-slate-400" />
                <input
                  {...register("video")}
                  className="input input-bordered bg-slate-50 pl-10 text-xs w-full"
                />
              </div>
            </div>
          </motion.div>

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
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />
              <span className="relative z-10 flex items-center justify-center gap-2 tracking-wide">
                Update Course
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  🚀
                </motion.span>
              </span>
            </motion.button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default EditCourse;
