import React, { use } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, useLocation } from "react-router";
import Loading from "../pages/Loading/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading></Loading>;
  }

  if (user && user.role === "Admin") {
    return children;
  }
  return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export default AdminRoute;
