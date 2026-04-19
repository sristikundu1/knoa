import React from "react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlineUserGroup,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";

const Subscribers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = new QueryClient();

  const {
    data: subscribers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/subscribers");
      return res.data;
    },
  });

  //   delete subscriber
  const { mutateAsync: deleteSubscriber } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/subscribers/${id}`);
      return res.data;
    },

    onSuccess: (data) => {
      if (data.deletedCount) {
        queryClient.invalidateQueries(["subscribers"]);
        Swal.fire("Deleted!", "subscriber removed successfully", "success");
        refetch();
      } else {
        Swal.fire("Error", "subscriber not found", "error");
      }
    },

    onError: () => {
      Swal.fire("Error", "Delete failed", "error");
    },
  });

  const handelDeleteSubscriber = async (id) => {
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
      await deleteSubscriber(id);
    }
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-50 min-h-screen"
    >
      {/* Dynamic Header Section */}
      <div className="flex flex-col items-center text-center mb-10 space-y-3">
        <span className="text-[#0077b6] font-bold tracking-[0.2em] uppercase text-xs px-3 py-1 bg-[#39B8AD]/10 rounded-full">
          Marketing Outreach
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#03045e]">
          Newsletter <span className="text-[#00b4d8]">Subscribers</span>
        </h2>
        <p className="text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed">
          Manage your growing community of learners. Monitor subscription trends
          and maintain your audience list for future course announcements.
        </p>
        <div className="w-20 h-1.5 bg-[#0077b6] rounded-full mt-2"></div>
      </div>

      {/* Stats Summary Card */}
      <div className="flex justify-start mb-6">
        <div className="bg-white border border-blue-50 px-6 py-4 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-[#39B8AD]/10 rounded-xl">
            <HiOutlineUserGroup className="text-2xl text-[#39B8AD]" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Total Audience
            </p>
            <p className="text-[#03045e] font-black text-2xl leading-none">
              {subscribers.length}
            </p>
          </div>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="overflow-x-auto bg-white rounded-[2rem] border border-blue-50 shadow-sm">
        <table className="table w-full border-collapse">
          {/* Table Head */}
          <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] tracking-wider">
            <tr>
              <th className="py-5 px-8">Subscriber Detail</th>
              <th>Subscription Date</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {subscribers.map((sub, index) => (
              <motion.tr
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                key={sub._id}
                className="hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-none"
              >
                <td className="py-4 px-8">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 rounded-full">
                      <HiOutlineMail className="text-[#00b4d8] text-lg" />
                    </div>
                    <div>
                      <div className="font-bold text-[#03045e] text-base">
                        {sub.email}
                      </div>
                      <div className="text-[10px] font-bold text-[#39B8AD] uppercase tracking-widest">
                        Verified Member
                      </div>
                    </div>
                  </div>
                </td>

                <td className="text-slate-500 text-sm">
                  <div className="flex items-center gap-2">
                    <HiOutlineCalendar className="text-[#00b4d8]" />
                    {sub.subscribedAt
                      ? new Date(sub.subscribedAt).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )
                      : "N/A"}
                  </div>
                </td>

                <td className="text-center">
                  <button
                    onClick={() => deleteSubscriber(sub._id)}
                    className="btn btn-ghost btn-sm text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    title="Remove Subscriber"
                  >
                    <HiOutlineTrash size={20} />
                    <span className="ml-1 text-[10px] font-bold uppercase">
                      Remove
                    </span>
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {subscribers.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 font-medium italic">
              No subscribers found yet.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Subscribers;
