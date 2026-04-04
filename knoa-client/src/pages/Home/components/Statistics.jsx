import React from "react";
import CountUp from "react-countup";

const Statistics = () => {
  const stats = [
    {
      number: 1200,
      suffix: "+",
      text: "Hours of industry-vetted curriculum designed by experts",
    },
    {
      number: 5000,
      suffix: "+",
      text: "Global learners who have accelerated their career paths",
    },
    {
      number: 90,
      suffix: "%",
      text: "Project-to-theory ratio focusing on hands-on deployment",
    },
    {
      number: 65,
      suffix: "+",
      text: "Recognized industry certifications awarded this year",
    },
  ];
  return (
    <section className="bg-blue-50 py-16 my-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex flex-col text-center md:text-left lg:px-8
  ${index !== stats.length - 1 ? "lg:border-r border-blue-200" : ""}
  ${index % 2 === 0 ? "md:border-r border-blue-200" : ""}
`}
            >
              {/* Row 1: Animated Number */}
              <div className="text-4xl font-extrabold text-[#03045e] mb-2">
                <CountUp end={stat.number} duration={4}></CountUp>
                {stat.suffix}
              </div>

              {/* Row 2: Descriptive Text */}
              <div className="text-gray-600 text-sm leading-relaxed">
                {stat.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
