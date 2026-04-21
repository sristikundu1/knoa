import React from "react";
import CourseCard from "./CourseCard";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";
import useAxios from "../../../hooks/useAxios";

const Courses = () => {
  const axiosPublic = useAxios();

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosPublic.get("/courses");
      return res.data;
    },
  });

  console.log(courses);

  if (isLoading) return <Loading></Loading>;
  return (
    <section className=" max-w-7xl mx-auto px-4 py-8">
      <div className="container mx-auto  py-12">
        <div className="flex flex-col items-center text-center mb-10 space-y-3">
          {/* Short Subheading / Tag */}
          <span className="text-[#0077b6] font-bold tracking-[0.2em] uppercase text-xs px-3 py-1 bg-[#39B8AD]/10 rounded-full">
            Top Rated Selection
          </span>

          {/* Main Section Heading */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#03045e]">
            Our Most Popular <span className="text-[#00b4d8]">Programs</span>
          </h2>

          {/* Short Description */}
          <p className="text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed">
            Join over 10,000 students worldwide in our highest-rated courses.
            Master industry-leading tools with expert-led instruction and
            hands-on projects.
          </p>

          {/* Decorative underline */}
          <div className="w-20 h-1.5 bg-[#0077b6] rounded-full mt-2"></div>
        </div>

        {/* Your Course Grid would go here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses

            /* 1. Sort by rating: highest to lowest */

            .sort((a, b) => b.rating - a.rating)

            /* 2. Take only the first 6 items */

            .slice(0, 6)

            /* 3. Render the cards */

            .map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
