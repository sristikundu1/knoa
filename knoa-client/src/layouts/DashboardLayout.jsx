import React, { useState } from "react";
import { Link, Outlet } from "react-router";
import DashboardNav from "../components/Dashboard/DashboardNav";
import useRole from "../hooks/useRole";
import { RiBookShelfFill, RiMailUnreadLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import { BiSolidBookAdd } from "react-icons/bi";
import useAuth from "../hooks/UseAuth";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserCog, FaUserGraduate } from "react-icons/fa";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { FaBookOpenReader } from "react-icons/fa6";
import { TfiBookmarkAlt } from "react-icons/tfi";
import { BsChatDots } from "react-icons/bs";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const axiosSecure = useAxiosSecure();
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Hi! I'm your Knoa Guide. How can I help you learn today? ✨",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const quickTags = ["How to enroll?", "Payment methods", "Suggest a course"];

  const handleSend = async (textToSend) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    const userMsg = { role: "user", text: messageText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Changed from fetch to axios
      const { data } = await axiosSecure.post("/chat", {
        message: messageText,
        history: messages.map((m) => ({
          role: m.role,
          parts: [{ text: m.text }],
        })),
      });

      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
    } catch (err) {
      console.error("Chat Error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Service busy. Try again! 🛠️" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full">
      {/* 1. THE TRIGGER BUTTON */}
      <li onClick={() => setIsOpen(!isOpen)}>
        <button className="flex w-full items-center gap-3  rounded-lg text-[#03045e] bg-blue-50/50 hover:bg-blue-100 transition-all is-drawer-close:justify-center">
          <BsChatDots size={20} className="text-[#00b4d8]" />
          <span className="text-sm font-bold is-drawer-close:hidden">
            Knoa AI Guide
          </span>
        </button>
      </li>
      {/* 2. THE CHAT WINDOW (Positioned relative to the button) */}
      {isOpen && (
        <div className="absolute left-full bottom-0 ml-4 w-72 sm:w-80 h-[450px] bg-white shadow-2xl rounded-2xl flex flex-col border border-blue-100 z-[100] animate-in fade-in slide-in-from-left-5">
          {/* Header */}
          <div className="p-4 bg-[#03045e] text-white rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-bold">Knoa AI</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`${m.role === "user" ? "text-right" : "text-left"}`}
              >
                <span
                  className={`inline-block p-3 rounded-2xl text-sm shadow-sm ${m.role === "user" ? "bg-[#00b4d8] text-white rounded-tr-none" : "bg-white text-slate-700 rounded-tl-none border border-slate-100"}`}
                >
                  {m.text}
                </span>
              </div>
            ))}
            {loading && (
              <div className="text-xs text-slate-400 animate-pulse text-left">
                Knoa is typing...
              </div>
            )}
          </div>

          {/* Footer / Input */}
          <div className="p-3 bg-white border-t rounded-b-2xl">
            <div className="flex flex-wrap gap-1 mb-2">
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleSend(tag)}
                  className="text-[10px] bg-blue-50 text-[#03045e] px-2 py-1 rounded-full border border-blue-100 hover:bg-blue-100"
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                placeholder="Ask me..."
              />
              <button
                onClick={() => handleSend()}
                className="bg-[#03045e] text-white px-3 py-2 rounded-xl text-xs font-bold"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const Dashboard = () => {
  const { role } = useRole();
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "Logged Out!",
          icon: "success",
        });
      })

      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content mx-8">
        {/* Navbar */}

        <DashboardNav></DashboardNav>

        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible z-40">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="flex min-h-full flex-col items-start bg-white border-r border-slate-100 shadow-sm transition-all duration-300 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar Content */}
          <ul className="menu w-full grow px-2 gap-1">
            {/* Overview Label (Hidden when closed) */}

            <li>
              <Link
                to={"/"}
                className="flex items-center gap-3 py-2 px-3 rounded-lg text-[#03045e] hover:bg-blue-50 hover:text-[#00b4d8] transition-all is-drawer-close:justify-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                <img
                  className="h-8 w-auto is-drawer-close:h-6 transition-all"
                  src="https://i.ibb.co.com/60gfp7ft/Knoa-Fav-1.png"
                  alt="logo"
                />
                <span className="text-lg font-bold  is-drawer-close:hidden">
                  KNOA
                </span>
              </Link>
            </li>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 my-2 is-drawer-close:hidden">
              Overview
            </p>

            {/* List items:  */}
            {role === "student" && (
              <>
                <li>
                  <Link
                    to={"/dashboard/my-enrollments"}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-[#03045e] hover:bg-blue-50 hover:text-[#00b4d8] transition-all is-drawer-close:justify-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip=" My-Enrollments"
                  >
                    <HiOutlineCheckBadge size={20} />
                    <span className="text-sm font-medium is-drawer-close:hidden">
                      My Enrollments
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/fav-courses"}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-[#03045e] hover:bg-blue-50 hover:text-[#00b4d8] transition-all is-drawer-close:justify-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip=" Fav Courses"
                  >
                    <TfiBookmarkAlt size={20} />
                    <span className="text-sm font-medium is-drawer-close:hidden">
                      Favorite Courses
                    </span>
                  </Link>
                </li>
              </>
            )}

            {role === "admin" && (
              <>
                <li>
                  <Link
                    to={"/dashboard/manage-user"}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-[#03045e] hover:bg-blue-50 hover:text-[#00b4d8] transition-all is-drawer-close:justify-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage User"
                  >
                    <LuUsers size={20} />
                    <span className="text-sm font-medium is-drawer-close:hidden">
                      Manage User
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/manage-enrollment"}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-[#03045e] hover:bg-blue-50 hover:text-[#00b4d8] transition-all is-drawer-close:justify-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Enrollment"
                  >
                    <FaUserGraduate size={20} />
                    <span className="text-sm font-medium is-drawer-close:hidden">
                      Manage Enrollment
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/subscribers"}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-[#03045e] hover:bg-blue-50 hover:text-[#00b4d8] transition-all is-drawer-close:justify-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Subscribers"
                  >
                    <RiMailUnreadLine size={20} />
                    <span className="text-sm font-medium is-drawer-close:hidden">
                      Subscribers
                    </span>
                  </Link>
                </li>
              </>
            )}

            {(role === "admin" || role === "mentor") && (
              <>
                <li>
                  <Link
                    to={"/dashboard/all-courses"}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-[#03045e] hover:bg-blue-50 hover:text-[#00b4d8] transition-all is-drawer-close:justify-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip=" All-Course"
                  >
                    <RiBookShelfFill size={20} />
                    <span className="text-sm font-medium is-drawer-close:hidden">
                      All Course
                    </span>
                  </Link>
                </li>
              </>
            )}

            {role === "mentor" && (
              <>
                <li>
                  <Link
                    to={"/dashboard/update-profile"}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-[#03045e] hover:bg-blue-50 hover:text-[#00b4d8] transition-all is-drawer-close:justify-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Update Profile"
                  >
                    <FaUserCog size={20} />
                    <span className="text-sm font-medium is-drawer-close:hidden">
                      Update Profile
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/dashboard/add-course"}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-[#03045e] hover:bg-blue-50 hover:text-[#00b4d8] transition-all is-drawer-close:justify-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add Course"
                  >
                    <BiSolidBookAdd size={20} />
                    <span className="text-sm font-medium is-drawer-close:hidden">
                      Add Course
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/enrolled-students"}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-[#03045e] hover:bg-blue-50 hover:text-[#00b4d8] transition-all is-drawer-close:justify-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Enrolled Students"
                  >
                    <FaBookOpenReader size={20} />
                    <span className="text-sm font-medium is-drawer-close:hidden">
                      Enrolled Students
                    </span>
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Bottom Section (Matching DashboardLeft style) */}
          <div className="w-full p-2 border-t border-slate-100">
            {role === "student" && <ChatBot />}

            <li>
              <button
                onClick={handleLogOut}
                className="flex items-center gap-3 py-2 px-3 rounded-lg text-red-400 hover:bg-red-50 transition-all is-drawer-close:justify-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Logout"
              >
                <HiOutlineLogout size={25} />
                <span className="text-sm font-medium is-drawer-close:hidden">
                  Logout
                </span>
              </button>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
