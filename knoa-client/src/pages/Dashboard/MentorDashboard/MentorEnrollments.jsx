import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import Loading from "../../Loading/Loading";
import MentorCourseCard from "./MentorCourseCard";

const MentorEnrollments = () => {
  const { user } = useAuth(); // Logged in Mentor
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["mentor-unique-courses", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axiosSecure.get(`/mentor/course-stats/${user?.uid}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  // Calculate total students across all courses
  const mentorCourses = data?.courses || [];
  const totalOverallStudents = data?.totalStudents || 0;

  // Animation variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <span className="text-[#0077b6] font-bold tracking-[0.2em] uppercase text-xs px-4 py-1.5 bg-[#39B8AD]/10 rounded-full border border-[#39B8AD]/20">
            Mentor Insights
          </span>
          <h2 className="text-4xl font-extrabold text-[#03045e] mt-4">
            Student <span className="text-[#00b4d8]">Enrollment Hub</span>
          </h2>
          <div className="w-20 h-1.5 bg-[#0077b6] mt-5 rounded-full shadow-sm"></div>
        </div>

        {/* Global Stats Badge */}
        <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border-l-4 border-[#00b4d8] flex items-center gap-4">
          <div className="p-3 bg-cyan-50 rounded-full text-[#00b4d8]">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">
              Total Learners
            </p>
            <p className="text-2xl font-black text-[#03045e]">
              {totalOverallStudents}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {mentorCourses.map((course) => (
          <MentorCourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default MentorEnrollments;
