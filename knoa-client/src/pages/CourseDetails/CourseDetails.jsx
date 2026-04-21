import React, { use, useEffect, useState } from "react";
import { useLoaderData, Link, useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiClock,
  FiVideo,
  FiPlus,
  FiMinus,
} from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { HiOutlineCheckCircle } from "react-icons/hi";
import useAxios from "../../hooks/useAxios";

const CourseDetails = () => {
  const axiosPublic = useAxios();
  const navigate = useNavigate();
  const { user } = use(AuthContext);
  const { id } = useParams();
  const [isEnrolling, setIsEnrolling] = useState(false);

  // fetch data from backend
  const { data, isLoading } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/course/${id}`);
      return res.data;
    },
  });

  // Destructure for easier use
  const { course = {}, relatedCourses = [] } = data || {};

  if (isLoading) return <Loading></Loading>;

  // --- Enrollment Logic ---
  const handleEnroll = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please log in to enroll in this course",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/auth/login"); // redirect to login page
        }
      });
      return;
    }
    setIsEnrolling(true);

    const enrollmentData = {
      courseId: course._id,
      courseName: course.courseName,
      instructorId: course.mentorUid,
      price: course.price,
      studentEmail: user?.email,
      studentName: user?.displayName,
      enrollDate: new Date().toISOString(),
    };

    const res = await axiosSecure.post(
      "/create-checkout-session",
      enrollmentData,
    );
    window.location.href = res.data.url;
  };

  // Animation variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVars}
      className=" min-h-screen bg-white pb-20"
    >
      {/* Main Wrapper Grid */}
      <div className="max-w-7xl mx-auto px-4 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* LEFT COLUMN: Header Info + Course Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Info */}
            <div className="space-y-6">
              <motion.h1
                variants={itemVars}
                className="text-4xl lg:text-5xl font-black text-[#03045e] leading-tight"
              >
                {course?.courseName}
              </motion.h1>

              <motion.p
                variants={itemVars}
                className="text-slate-600 font-medium text-lg"
              >
                {course.shortDescription}
              </motion.p>
            </div>

            {/* COURSE CONTENT - Now directly below the description */}
            <motion.section variants={itemVars} className="pt-4">
              <h2 className="text-3xl font-black text-[#03045e] mb-8">
                Course Content
              </h2>
              <div className="space-y-4">
                <Accordion html={course.fullDescription} />
              </div>
            </motion.section>
          </div>

          {/* RIGHT COLUMN: Sidebar (Floating Card + Other Courses) */}
          <div className="space-y-8 top-0 sticky">
            {/* 2. Floating Sidebar Card */}
            <motion.div
              variants={itemVars}
              className="lg:mt-[-80px] z-20 sticky top-32"
            >
              <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100 overflow-hidden border border-slate-100 p-3">
                <div className="relative group overflow-hidden rounded-2xl h-52">
                  <img
                    src={course.thumbnail}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt=""
                  />
                </div>

                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-[#03045e]">
                      {course.isFree ? "FREE" : `$${course.price}`}
                    </span>
                    <span className="text-amber-500 font-bold bg-amber-50 px-3 py-1 rounded-full text-sm">
                      ⭐ {course.rating || "4.8"}
                    </span>
                  </div>

                  <button
                    onClick={handleEnroll}
                    disabled={isEnrolling}
                    className={`w-full py-4 text-white rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 group ${
                      isEnrolling
                        ? "bg-slate-400 cursor-not-allowed"
                        : "bg-[#00b4d8] hover:bg-[#03045e] shadow-blue-200"
                    }`}
                  >
                    {isEnrolling ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      "Enroll Course"
                    )}
                  </button>

                  <div className="space-y-4 pt-4 border-t border-slate-50">
                    <StatRow
                      icon={<FaChalkboardTeacher />}
                      label="mentor"
                      value={course.mentorName}
                    />
                    <StatRow
                      icon={<FiClock />}
                      label="Duration"
                      value={course.duration}
                    />
                    <StatRow
                      icon={<FiVideo />}
                      label="Lessons"
                      value="12 Videos"
                    />
                    <StatRow
                      icon={<FiCheckCircle />}
                      label="Level"
                      value={course.difficulty}
                    />
                  </div>
                </div>
              </div>

              {/* Other Courses - Now inside the sidebar stack */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm mt-8">
                <h4 className="text-xl font-black text-[#03045e] mb-6">
                  Other Courses
                </h4>
                <div className="space-y-6">
                  {relatedCourses.map((cat) => (
                    <RelatedItem
                      key={cat._id}
                      id={cat._id}
                      image={cat.thumbnail}
                      title={cat.courseName}
                      price={cat.isFree ? "FREE" : `$${cat.price}`}
                    ></RelatedItem>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Reusable Small Components
const StatRow = ({ icon, label, value }) => (
  <div className="flex justify-between items-center text-sm">
    <div className="flex items-center gap-2 text-slate-400 font-medium">
      <span className="text-[#00b4d8] text-lg">{icon}</span> {label}
    </div>
    <span className="text-[#03045e] font-bold">{value}</span>
  </div>
);

const Accordion = ({ html }) => {
  const [openIndex, setOpenIndex] = useState(null);

  //  Parse HTML into structured data
  const parseContent = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    const sections = [];
    let currentSection = null;
    let currentLesson = null;

    doc.body.childNodes.forEach((node) => {
      if (node.nodeName === "H1") {
        currentSection = {
          title: node.textContent,
          lessons: [],
        };
        sections.push(currentSection);
      } else if (node.nodeName === "H2") {
        currentLesson = {
          title: node.textContent,
          content: "",
          image: "",
        };
        currentSection?.lessons.push(currentLesson);
      } else if (node.nodeName === "P") {
        if (currentLesson) {
          const text = node.textContent.trim();

          // If it starts with http, treat as image
          if (text.startsWith("http")) {
            currentLesson.image = text;
          } else {
            // Normal paragraph text
            if (currentLesson.content) currentLesson.content += "\n"; // separate paragraphs
            currentLesson.content += text;
          }
        }
      } else if (node.nodeName === "IMG") {
        if (currentLesson) {
          currentLesson.image = node.src;
        }
      }
    });

    return sections;
  };

  const sections = parseContent(html);

  return (
    <div className="space-y-4">
      {sections.map((section, secIndex) => (
        <div key={secIndex}>
          {/* Section Title */}
          <h3 className="text-2xl font-bold text-[#03045e] mb-2">
            {section.title}
          </h3>

          {/* Lessons */}
          <div className="border border-2 border-[#00b4d8] rounded-lg p-4">
            {section.lessons.map((lesson, i) => {
              const index = `${secIndex}-${i}`;
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="border border-slate-200 rounded-2xl bg-white overflow-hidden mb-2"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full p-4 flex justify-between items-center hover:bg-slate-50"
                  >
                    <span className="font-semibold text-[#03045e] text-sm">
                      {lesson.title}
                    </span>
                    {isOpen ? (
                      <FiMinus className="text-[#00b4d8]" />
                    ) : (
                      <FiPlus className="text-[#00b4d8]" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden px-5 pb-4 bg-slate-50"
                      >
                        {lesson.content && (
                          <p className="text-sm text-slate-600 py-2 whitespace-pre-wrap break-words">
                            {lesson.content}
                          </p>
                        )}

                        {lesson.image && (
                          <img
                            src={lesson.image}
                            alt={lesson.title}
                            className="rounded-xl mt-2 max-h-64 object-cover w-full  max-w-full "
                          />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const RelatedItem = ({ id, image, title, price }) => (
  <Link to={`/dashboard/course/${id}`}>
    <div className="flex gap-4 group cursor-pointer border-b border-slate-50 pb-4 last:border-0">
      <div className="w-20 h-16 bg-slate-200 rounded-xl flex-shrink-0">
        <img className="w-full h-full rounded-lg" src={image} alt="" />
      </div>
      <div>
        <h5 className="font-bold text-sm text-[#03045e] leading-tight group-hover:text-[#00b4d8] transition-colors">
          {title}
        </h5>
        <p className="text-[#00b4d8] font-black text-sm mt-1">{price}</p>
      </div>
    </div>
  </Link>
);

export default CourseDetails;
