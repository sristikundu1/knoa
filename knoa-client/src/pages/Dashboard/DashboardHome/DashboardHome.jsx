import React from "react";
import useAuth from "../../../hooks/UseAuth";
import useRole from "../../../hooks/useRole";
import Loading from "../../Loading/Loading";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import MentorDashboard from "../MentorDashboard/MentorDashboard";
import StudentDashboard from "../StudentDashBoard/StudentDashboard";

const DashboardHome = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      {role === "admin" && <AdminDashboard></AdminDashboard>}{" "}
      {role === "mentor" && <MentorDashboard></MentorDashboard>}{" "}
      {role === "student" && <StudentDashboard></StudentDashboard>}
    </div>
  );
};

export default DashboardHome;
