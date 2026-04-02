import React, { useState } from "react";
import { Link, useRouteLoaderData } from "react-router";
import { HiOutlineTrash, HiOutlineEye } from "react-icons/hi";
import Swal from "sweetalert2";

const FavCourses = () => {
  // Access the data fetched by the loader in Routes.jsx
  const favorites = useRouteLoaderData("dashboard-data");
  const [wishCourse, setWishCourse] = useState(favorites);

  const handlewishlistDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove the course from your wishlist!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#39b8ad", // Your Mint Seafoam color
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/wishlist/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Course has been deleted.",
                icon: "success",
              });

              // Use functional update to ensure you have the latest state
              setWishCourse((prevWish) =>
                prevWish.filter((wish) => wish._id !== _id),
              );
            }
          })
          .catch((error) => {
            console.error("Delete Error:", error);
            Swal.fire("Error", "Something went wrong on the server.", "error");
          });
      }
    });
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">My Wishlist</h1>
        <p className="text-slate-500 text-sm">
          Courses you've saved for later.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-blue-50 shadow-sm overflow-hidden">
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-[#eff6ff] text-[#03045e]">
            <tr>
              <th className="py-4">Course</th>
              <th>Category</th>
              <th>Price</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {wishCourse.length > 0 ? (
              wishCourse.map((course) => (
                <tr
                  key={course._id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={course.thumbnail} alt={course.courseName} />
                        </div>
                      </div>
                      <div className="font-bold text-slate-700">
                        {course.courseName}
                      </div>
                    </div>
                  </td>
                  <td className="text-slate-500">{course.category}</td>
                  <td className="font-bold text-[#00b4d8]">
                    {course.isFree ? "Free" : `$${course.price}`}
                  </td>
                  <td>
                    <div className="flex justify-center gap-2">
                      <Link to={`/dashboard/course/${course._id}`}>
                        <button className="btn btn-ghost btn-sm text-[#03045e]">
                          <HiOutlineEye size={18} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handlewishlistDelete(course._id)}
                        className="btn btn-ghost btn-sm text-red-400 hover:text-red-600"
                      >
                        <HiOutlineTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-10 text-slate-400">
                  Your wishlist is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FavCourses;
