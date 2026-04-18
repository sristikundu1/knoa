import React from "react";
import useAuth from "./../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyEnrollments = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: myCourses = [] } = useQuery({
    queryKey: ["my-enrollments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-enrollments/${user?.email}`);
      return res.data;
    },
  });
  return (
    <div className="p-5">
      {myCourses.map((course) => (
        <div
          key={course._id}
          className="flex justify-between border p-4 mb-2 rounded shadow-sm"
        >
          <div>
            <h3 className="font-bold">{course.courseName}</h3>
            <p className="text-sm">Mentor: {course.mentorName}</p>
          </div>
          <span
            className={`p-2 rounded ${course.status === "completed" ? "bg-green-100" : "bg-yellow-100"}`}
          >
            {course.status === "pending" ? "In Progress" : "Enrolled"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MyEnrollments;
