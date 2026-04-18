import React from "react";
import useAuth from "./UseAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading: roleLoading, data: role = "student" } = useQuery({
    queryKey: ["user-role"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data?.role || "student";
    },
  });

  return { role, roleLoading };
};

export default useRole;
