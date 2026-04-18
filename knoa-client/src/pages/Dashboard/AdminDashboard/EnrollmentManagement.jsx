import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const EnrollmentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { data: all = [], refetch } = useQuery({
    queryKey: ["admin-enrolls"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/enrollments");
      return res.data;
    },
  });

  const handleStatus = async (id, status) => {
    await axiosSecure.patch(`/enrollments/${id}`, { status });
    Swal.fire("Updated", `Status set to ${status}`, "success");
    refetch();
  };
  return (
    <div className="p-6 overflow-x-auto">
      <table className="table w-full border text-left">
        <thead className="bg-gray-100">
          <tr>
            <th>Course</th>
            <th>Student</th>
            <th>Mentor</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {all.map((item) => (
            <tr key={item._id} className="border-b">
              <td>{item.courseName}</td>
              <td>
                {item.studentName}
                <br />
                <span className="text-xs">{item.studentEmail}</span>
              </td>
              <td>{item.mentorName}</td>
              <td>
                {item.status === "pending" ? (
                  <button
                    onClick={() => handleStatus(item._id, "completed")}
                    className="btn btn-xs btn-primary"
                  >
                    Accept
                  </button>
                ) : (
                  <span className="text-green-600 font-bold uppercase">
                    {item.status}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnrollmentManagement;
