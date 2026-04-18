import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import {
  HiOutlineMail,
  HiOutlineUserGroup,
  HiOutlinePencilAlt,
} from "react-icons/hi";
import Loading from "../../../Loading/Loading";
import { TiUserDeleteOutline } from "react-icons/ti";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  //   load user data from database
  const { isLoading, data: users = [] } = useQuery({
    queryKey: ["AllUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Mutation for updating user role
  const { mutateAsync: updateUserRole } = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosSecure.patch(`/users/role/${id}`, { role });
      return res.data;
    },

    onSuccess: (data) => {
      if (data.modifiedCount) {
        queryClient.invalidateQueries(["AllUsers"]);
        Swal.fire("Success", "Role updated!", "success");
      } else {
        Swal.fire("Info", "No changes made", "info");
      }
    },
  });

  const handleRoleUpdate = (id, role) => {
    updateUserRole({ id, role });
  };

  //   delete user from database
  const { mutateAsync: deleteUser } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/users/${id}`);
      return res.data;
    },

    onSuccess: (data) => {
      if (data.deletedCount) {
        queryClient.invalidateQueries(["AllUsers"]);
        Swal.fire("Deleted!", "User removed successfully", "success");
      } else {
        Swal.fire("Error", "User not found", "error");
      }
    },

    onError: () => {
      Swal.fire("Error", "Delete failed", "error");
    },
  });

  const handelDeleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await deleteUser(id);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      {/* Dynamic Header Section */}
      <div className="flex flex-col items-center text-center mb-10 space-y-3">
        <span className="text-[#0077b6] font-bold tracking-[0.2em] uppercase text-xs px-3 py-1 bg-[#39B8AD]/10 rounded-full">
          Admin Control Center
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#03045e]">
          Manage Platform <span className="text-[#00b4d8]">Users & Roles</span>
        </h2>
        <p className="text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed">
          Maintain the community integrity by managing user permissions.
          Efficiently promote students to mentors or admins to scale the
          learning ecosystem.
        </p>
        <div className="w-20 h-1.5 bg-[#0077b6] rounded-full mt-2"></div>
      </div>

      {/* Stats Summary */}
      <div className="flex justify-start mb-6">
        <div className="bg-white border border-blue-50 px-6 py-3 rounded-2xl shadow-sm flex items-center gap-3">
          <HiOutlineUserGroup className="text-2xl text-[#00b4d8]" />
          <span className="text-slate-600 font-medium">Total Users: </span>
          <span className="text-[#03045e] font-bold text-xl">
            {users.length}
          </span>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded-3xl border border-blue-50 shadow-sm">
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] tracking-wider">
            <tr>
              <th className="py-5 px-6">User Details</th>
              <th>Registered Date</th>
              <th>Current Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {users.map((user, index) => (
              <motion.tr
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                key={user._id}
                className="hover:bg-slate-50/50 transition-colors border-b border-slate-50"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user.profileImage} alt={user.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-[#03045e]">
                        {user.name}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1">
                        <HiOutlineMail /> {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-slate-500 text-sm">
                  {user.creationTime
                    ? new Date(user.creationTime).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-600"
                        : user.role === "mentor"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    {/* Role Update Dropdown */}
                    <div className="dropdown dropdown-left lg:dropdown-bottom">
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-sm text-[#00b4d8] hover:bg-blue-50"
                      >
                        <HiOutlinePencilAlt size={18} /> Modify
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow-xl bg-white border border-slate-100 rounded-2xl w-52"
                      >
                        <li className="menu-title text-slate-400 text-[10px] uppercase">
                          Assign New Role
                        </li>
                        <li>
                          <button
                            onClick={() => handleRoleUpdate(user._id, "admin")}
                            className="hover:text-purple-600"
                          >
                            Make Admin
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleRoleUpdate(user._id, "mentor")}
                            className="hover:text-blue-600"
                          >
                            Make Mentor
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() =>
                              handleRoleUpdate(user._id, "student")
                            }
                            className="hover:text-green-600"
                          >
                            Demote to Student
                          </button>
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={() => handelDeleteUser(user._id)}
                      className="btn btn-ghost btn-sm text-[#00b4d8] hover:bg-blue-50"
                    >
                      <TiUserDeleteOutline size={18} /> Remove
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ManageUser;
