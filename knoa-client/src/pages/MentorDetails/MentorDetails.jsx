import React from "react";
import { useLoaderData } from "react-router";

const MentorDetails = () => {
  const mentor = useLoaderData();
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-2xl mt-10">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <img
          src={mentor.profileImage}
          className="w-48 h-48 rounded-2xl shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-black text-[#03045e]">{mentor.name}</h1>
          <p className="text-[#00b4d8] font-bold text-xl">{mentor.expertise}</p>
          <p className="mt-4 text-slate-600">{mentor.bio}</p>
          <div className="mt-6 flex gap-4">
            <a href={mentor.linkedin} className="btn btn-outline">
              LinkedIn
            </a>
            <a href={mentor.git} className="btn btn-outline">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDetails;
