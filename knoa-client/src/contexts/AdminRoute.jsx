import React from "react";
import Loading from "../pages/Loading/Loading";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/UseAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "admin") {
    return;
  }

  return children;
};

export default AdminRoute;
