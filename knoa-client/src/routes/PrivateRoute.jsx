import React from "react";
import { Navigate, useLocation } from "react-router";
import Loading from "../pages/Loading/Loading";
import useAuth from "../hooks/UseAuth";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading></Loading>;
  }

  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/auth/login"}></Navigate>;
};

export default PrivateRoute;
