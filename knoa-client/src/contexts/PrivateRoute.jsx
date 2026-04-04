import React, { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./AuthContext";
import Loading from "../pages/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = use(AuthContext);

  if (loading) {
    return <Loading></Loading>;
  }

  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/auth/login"}></Navigate>;
};

export default PrivateRoute;
