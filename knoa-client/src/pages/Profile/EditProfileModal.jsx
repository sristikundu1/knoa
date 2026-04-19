import React from "react";
import { motion } from "framer-motion";
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const EditProfileModal = ({ user, onClose }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 4. Update MongoDB/Database

  const { mutateAsync } = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(`/users/${user.email}`, updatedData);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["users"]);

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your Changes have been saved .",
        showConfirmButton: false,
        timer: 1500,
      });
      // Refreshes the UI to show new data
      onClose();
    },
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      // 1. Update Firebase Profile
      //   await updateProfile(user, { displayName: name, photoURL: photo });

      // 2. Update Firebase Email
      //   if (email !== user.email) await updateEmail(user, email);

      // 3. Update Firebase Password
      //   if (password) await updatePassword(user, password);

      await mutateAsync({
        name,
        profileImage: photo,
        email,
      });
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl"
      >
        <h2 className="text-3xl font-black text-[#03045e] mb-6">
          Edit Profile
        </h2>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                Display Name
              </label>
              <input
                name="name"
                defaultValue={user?.displayName}
                className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#00b4da]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                Photo URL
              </label>
              <input
                name="photo"
                defaultValue={user?.photoURL}
                className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#00b4da]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
              Email Address
            </label>
            <input
              name="email"
              defaultValue={user?.email}
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#00b4da]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">
              New Password (Optional)
            </label>
            <input
              name="password"
              type="password"
              placeholder="Leave blank to keep current"
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#00b4da]"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 font-bold text-slate-400 hover:text-rose-500 transition-all uppercase tracking-widest text-xs"
            >
              Discard
            </button>
            <button
              type="submit"
              className="flex-[2] py-4 bg-[#03045E] text-white font-black rounded-2xl shadow-xl hover:bg-[#00b4da] transition-all active:scale-95"
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditProfileModal;
