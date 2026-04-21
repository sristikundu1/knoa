import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";
import CourseCard from "./components/CourseCard";
import CourseFilter from "./components/CourseFilter";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loading/Loading";

const AllCourses = () => {
  const axiosSecure = useAxiosSecure();

  // 1. Create states for the filters
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All Course");
  const [price, setPrice] = useState("All");

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/courses");
      return res.data;
    },
  });

  // Loading state
  if (isLoading) {
    return <Loading></Loading>;
  }

  // 2. Simple Filter Logic
  const displayCourses = courses.filter((course) => {
    const categoryMatch =
      category === "All" ||
      course.category.toLowerCase() === category.toLowerCase();
    const levelMatch = level === "All Course" || course.difficulty === level;

    let priceMatch = false;
    if (price === "All") {
      priceMatch = true;
    } else if (price === "Free") {
      priceMatch = course.isFree === true || course.price === 0;
    } else if (price === "Paid") {
      priceMatch = course.isFree === false && course.price > 0;
    }

    return categoryMatch && levelMatch && priceMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
      {/* LEFT SIDE: COURSE LIST */}
      <div className="flex-1 space-y-6">
        {displayCourses.length > 0 ? (
          displayCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        ) : (
          <p className="text-center py-10 text-slate-500">
            No courses found matching these filters.
          </p>
        )}
      </div>

      {/* RIGHT SIDE: SIDEBAR FILTERS */}
      <div className="w-full lg:w-72 space-y-10 lg:sticky lg:top-10 h-fit">
        <CourseFilter
          title="Category"
          items={[
            "All",
            "Programming",
            "Design",
            "Development",
            "data-science",
            "IT-and-Software",
          ]}
          activeItem={category}
          onSelect={setCategory}
        ></CourseFilter>

        <CourseFilter
          title="Level"
          items={["All Course", "Beginner", "Intermediate", "Advanced"]}
          activeItem={level}
          onSelect={setLevel}
        ></CourseFilter>

        <CourseFilter
          title="Price"
          items={["All", "Free", "Paid"]}
          activeItem={price}
          onSelect={setPrice}
        ></CourseFilter>
      </div>
    </div>
  );
};

export default AllCourses;
