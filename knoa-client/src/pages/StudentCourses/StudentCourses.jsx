import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import CourseCard from "../Home/components/CourseCard";
import CourseFilter from "../Courses/components/CourseFilter";
import useAxios from "../../hooks/useAxios";

const StudentCourses = () => {
  const axiosPublic = useAxios();

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosPublic.get("/courses");
      return res.data;
    },
  });

  // 1. Create states for the filters
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All Course");
  const [price, setPrice] = useState("All");

  // Loading state
  if (isLoading) {
    return <Loading></Loading>;
  }
  // 2. Simple Filter Logic
  const displayCourses = courses.filter((course) => {
    const categoryMatch =
      category === "All" || course.category === category.toLowerCase();
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
    <div className=" max-w-7xl mx-auto px-4 py-8">
      <div className="container mx-auto  py-12">
        <div className="flex flex-col items-center text-center mb-10 space-y-3">
          {/* Short Subheading / Tag */}
          <span className="text-[#0077b6] font-bold tracking-[0.2em] uppercase text-xs px-3 py-1 bg-[#39B8AD]/10 rounded-full">
            Course Catalog
          </span>

          {/* Main Section Heading */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#03045e]">
            Explore Our <span className="text-[#00b4d8]">Knowledge Base</span>
          </h2>

          {/* Short Description */}
          <p className="text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed">
            Browse through our extensive library of professional courses. Use
            the filters to find the perfect match for your skill level,
            preferred category, or specific learning goals.
          </p>

          {/* Decorative underline */}
          <div className="w-20 h-1.5 bg-[#0077b6] rounded-full mt-2"></div>
        </div>

        {/* Your Course Grid would go here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-18">
          {/* LEFT SIDE: COURSE LIST */}
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:col-span-3 gap-8">
            {displayCourses.length > 0 ? (
              displayCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <p className="text-center py-10 text-slate-500">
                No courses found matching these filters.
              </p>
            )}
          </div>

          {/* RIGHT SIDE: SIDEBAR FILTERS */}
          <div className="lg:col-span-1  space-y-10 lg:sticky lg:top-10 h-fit">
            <CourseFilter
              title="Category"
              items={[
                "All",
                "Programming",
                "Design",
                "Development",
                "data-science",
                "IT & Software",
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
      </div>
    </div>
  );
};

export default StudentCourses;
