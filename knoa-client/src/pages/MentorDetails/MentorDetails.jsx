import React from "react";
import { Link, useLoaderData, useParams } from "react-router";
import MentorBanner from "./MentorBanner";
import MentorCard from "./MentorCard";
import RelatedMentors from "./Relatedmentors";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";

const MentorDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["mentor-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/mentor-details/${id}`);

      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  // Destructure for easy use in your JSX
  const { mentor, courses, relatedMentors } = data;
  return (
    <div className="bg-[#FDFEFF] min-h-screen pb-20">
      <MentorBanner />

      <div className="max-w-7xl mx-auto px-6">
        {/* Existing Mentor Card */}
        <MentorCard mentor={mentor} />

        {/* --- NEW: Interactive Course Section --- */}
        <section className="mt-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div className="space-y-2">
              <span className=" text-[10px] font-black uppercase tracking-[0.2em] text-[#0077b6] bg-[#39B8AD]/10 px-3 py-1 rounded-md mb-2 ">
                Learning Paths
              </span>
              <h2 className="text-4xl font-black text-[#03045e]">
                Courses by
                <span className="text-[#0077b6] ml-2">{mentor?.name}</span>
              </h2>
            </div>
            <p className="text-slate-400 max-w-sm text-sm font-medium">
              Explore professional-grade curriculum designed and delivered by
              this expert.
            </p>
          </div>

          {courses?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="group bg-white rounded-[2.5rem] p-5 border border-slate-100 hover:border-[#39B8AD]/30 shadow-sm hover:shadow-2xl hover:shadow-teal-900/5 transition-all duration-500"
                >
                  <div className="relative h-52 rounded-[2rem] overflow-hidden mb-5">
                    <img
                      src={course.thumbnail}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt=""
                    />
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-[#03045e] uppercase">
                      {course.category}
                    </div>
                  </div>
                  <h4 className="text-xl font-black text-[#03045e] mb-3 line-clamp-1 group-hover:text-[#0077b6] transition-colors">
                    {course.courseName}
                  </h4>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                      {course.isFree ? (
                        <span className="card__price text-[#00b4d8] font-bold">
                          Free
                        </span>
                      ) : (
                        <span className="text-2xl font-black text-[#39B8AD]">
                          ${course.price}
                        </span>
                      )}
                    </div>
                    <Link to={`/course/${course._id}`}>
                      <button className="h-10 w-10 bg-[#03045e] text-white rounded-full flex items-center justify-center group-hover:bg-[#0077b6] transition-all">
                        →
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-bold italic">
                No active courses found for this mentor.
              </p>
            </div>
          )}
        </section>

        {/* Related Mentors Section */}
        <RelatedMentors mentor={relatedMentors} />
      </div>
    </div>
  );
};

export default MentorDetails;
