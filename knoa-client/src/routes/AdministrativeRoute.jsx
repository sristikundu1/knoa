import React from "react";
import Loading from "../pages/Loading/Loading";
import Forbidden from "../components/Forbodden/Forbidden";

const AdministrativeRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default AdministrativeRoute;
