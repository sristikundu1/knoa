import React, { use } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLink,
  HiOutlineAcademicCap,
} from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { BsLinkedin } from "react-icons/bs";
import useAuth from "../../../../hooks/UseAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const UpdateProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
      profileImage: user?.photoURL || "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (mentorData) => {
      const res = await axiosSecure.post("/mentors", mentorData);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.acknowledged) {
        queryClient.invalidateQueries(["mentors"]);
        Swal.fire("Success", "Profile updated!", "success");
        reset();
      }
    },
    onError: (error) => {
      Swal.fire("Error", error.message, "error");
    },
  });

  const onSubmit = async (data) => {
    const subjectArray = data.subjects
      ? data.subjects
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s !== "")
      : [];

    const mentorData = {
      ...data,
      subjects: subjectArray,
      uid: user?.uid,
      status: "verified", // Mark as verified mentor
      updatedAt: new Date(),
    };

    // 1. Post to your mentorCollection
    await mutateAsync(mentorData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto p-6"
    >
      {/* Page Header */}
      <div className="text-center mb-10">
        <span className="text-[#0077b6] font-bold tracking-widest uppercase text-xs px-3 py-1 bg-[#39B8AD]/10 rounded-full">
          Professional Identity
        </span>
        <h2 className="text-3xl font-extrabold text-[#03045e] mt-3">
          Update Your <span className="text-[#00b4d8]">Mentor Profile</span>
        </h2>
        <div className="w-16 h-1 bg-[#0077b6] mx-auto mt-4 rounded-full"></div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-3xl border border-blue-50 shadow-sm"
      >
        {/* Basic Info Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b pb-2">
            Basic Information
          </h3>

          <div>
            <label className="label-text font-semibold ml-2">Full Name</label>
            <input
              {...register("name")}
              className="input input-bordered w-full rounded-xl focus:outline-[#00b4d8]"
            />
          </div>

          <div>
            <label className="label-text font-semibold ml-2">
              Email (Read Only)
            </label>
            <input
              {...register("email")}
              readOnly
              className="input input-bordered w-full rounded-xl bg-slate-50 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="label-text font-semibold ml-2">
              Profile Image URL
            </label>
            <input
              {...register("profileImage")}
              className="input input-bordered w-full rounded-xl"
            />
          </div>
        </div>

        {/* Professional Stats Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b pb-2">
            Professional Stats
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-text font-semibold ml-1 text-xs">
                Years of Exp.
              </label>
              <input
                type="number"
                {...register("experience", { required: true })}
                className="input input-bordered w-full rounded-xl"
                placeholder="e.g. 5"
              />
            </div>
            <div>
              <label className="label-text font-semibold ml-1 text-xs">
                Expert Subjects
              </label>
              <input
                {...register("subjects", { required: true })}
                className="input input-bordered w-full rounded-xl"
                placeholder="React, Node.js, Tailwind, MongoDB"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-text font-semibold ml-1 text-xs">
                Certificates Count
              </label>
              <input
                type="number"
                {...register("certCount")}
                className="input input-bordered w-full rounded-xl"
              />
            </div>
            <div>
              <label className="label-text font-semibold ml-1 text-xs">
                Students Mentored
              </label>
              <input
                type="number"
                {...register("studentsCount")}
                className="input input-bordered w-full rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b pb-2">
              Web Presence
            </h3>
            <div className="flex items-center gap-2">
              <SiGithub className="text-xl text-slate-700" />
              <input
                {...register("github")}
                placeholder="Github Profile Link"
                className="input input-bordered w-full rounded-xl"
              />
            </div>
            <div className="flex items-center gap-2">
              <BsLinkedin className="text-xl text-[#0077b6]" />
              <input
                {...register("linkedin")}
                placeholder="LinkedIn Profile Link"
                className="input input-bordered w-full rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b pb-2">
              About You
            </h3>
            <textarea
              {...register("bio", { required: true })}
              className="textarea textarea-bordered w-full h-28 rounded-2xl focus:outline-[#00b4d8]"
              placeholder="Tell students about your teaching style and journey..."
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 bg-[#00b4d8] text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:bg-[#0077b6] transition-all"
          >
            Update Professional Profile
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default UpdateProfile;
