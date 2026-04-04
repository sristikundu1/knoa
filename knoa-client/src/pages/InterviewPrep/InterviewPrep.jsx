import React from "react";

const InterviewPrep = () => {
  const qas = [
    {
      q: "What is the Virtual DOM?",
      a: "A lightweight copy of the real DOM used for performance optimization.",
    },
    {
      q: "Explain Middleware in Express.",
      a: "Functions that have access to the request and response objects to execute code.",
    },
  ];
  return (
    <div className="max-w-5xl mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {qas.map((item, i) => (
        <div
          key={i}
          className="group p-8 bg-slate-50 rounded-3xl border border-transparent hover:border-[#39b8ad] transition-all"
        >
          <span className="text-[#39b8ad] font-bold text-xs uppercase">
            Question {i + 1}
          </span>
          <h4 className="text-xl font-bold text-[#03045e] mt-2 mb-4">
            {item.q}
          </h4>
          <p className="text-gray-600 leading-relaxed">{item.a}</p>
        </div>
      ))}
    </div>
  );
};

export default InterviewPrep;
