import React from "react";
import styled from "styled-components";
import {
  HiOutlineLightBulb,
  HiOutlineGlobeAlt,
  HiOutlineTrendingUp,
} from "react-icons/hi";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { CiGlobe } from "react-icons/ci";
import { IoIosTrendingUp } from "react-icons/io";

const WhyUs = () => {
  const pillars = [
    {
      icon: <HiOutlineAcademicCap size={80} />,
      title: "Expert-Led",
      desc: "Learn from industry veterans with real-world experience in modern tech.",
    },
    {
      icon: <CiGlobe size={80} />,
      title: "Flexible Learning",
      desc: "Access lessons anytime, anywhere, on any device. Your schedule, your rules.”",
    },
    {
      icon: <HiOutlineLightBulb size={80} />,
      title: "Practical Projects",
      desc: "Build a professional portfolio with hands-on projects that prove your skills.",
    },
    {
      icon: <IoIosTrendingUp size={80} />,
      title: "Career Growth",
      desc: "Gain the certifications and job-ready skills needed to land your dream role.",
    },
  ];
  const StyledWrapper = styled.div`
    .card {
      width: 280px;
      height: 250px;
      background: #f0f9ff;
      border-radius: 10px;
      padding: 50px 30px;
      position: relative;
      overflow: hidden;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 10px #4445;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
    }

    .icon,
    .heading,
    .content {
      position: relative;
      z-index: 5;
      transition: all 0.5s;
    }

    .icon {
      width: 80px;
      fill: rgb(139, 92, 246);
      margin-bottom: 20px;
    }

    .heading {
      font-size: 20px;
      font-weight: 800;
      margin-bottom: 20px;
    }

    .number {
      position: absolute;
      top: -90px;
      right: -85px;
      padding: 80px 100px 30px 30px;
      background: #0077b6;
      border-radius: 100%;
      z-index: 5;
    }

    .number .text {
      font-size: 28px;
      font-weight: 600;
      color: #fff;
    }

    .text {
      margin-top: 20px;
    }

    .number::after {
      content: "";
      width: 50px;
      height: 50px;
      background: #00b4d8;
      position: absolute;
      border-radius: 100%;
      top: 50%;
      right: 50%;
      transition: all 0.5s;
      transform: translateX(50%) translateY(-50%);
      z-index: -1;
    }

    .card:hover {
      scale: 1.02;
      box-shadow: 0 5px 20px #444e;
    }

    .card:hover .number::after {
      width: 900px;
      height: 900px;
    }

    .card:hover .icon,
    .card:hover .heading,
    .card:hover .content {
      color: #f5f5f5;
      fill: #f5f5f5;
    }

    .image-container {
      position: relative;
      display: inline-block;
      padding: 0 0 20px 20px; /* Space for the border */
      width: 100%;
    }

    .image-container::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 90%;
      height: 90%;
      border-left: 22px solid #0077b6; /* Your brand color */
      border-bottom: 22px solid #0077b6;
      border-bottom-left-radius: 22px;
      z-index: 0;
    }

    .image-container img {
      position: relative;
      z-index: 1;
      border-radius: 6px;
      width: 100%;
      object-fit: cover;
      box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.1);
    }
  `;
  return (
    <section className="container mx-auto  py-12">
      <div className="flex flex-col items-center text-center mb-10 space-y-3">
        {/* Short Subheading / Tag */}
        <span className="text-[#0077b6] font-bold tracking-[0.2em] uppercase text-xs px-3 py-1 bg-[#39B8AD]/10 rounded-full">
          BEYOND THE CLASSROOM
        </span>

        {/* Main Section Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#03045e]">
          Why Choose Our
          <span className="text-[#00b4d8]">Learning Experience?</span>
        </h2>

        {/* Short Description */}
        <p className="text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed">
          We don’t just provide courses; we build career paths. Our platform
          combines industry-expert instruction with a flexible, high-tech
          environment designed to help you master the skills that matter in
          today's market.
        </p>

        {/* Decorative underline */}
        <div className="w-20 h-1.5 bg-[#0077b6] rounded-full mt-2"></div>
      </div>

      <StyledWrapper>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* The Image Part */}
          <div className="flex-1">
            <div className="image-container">
              <img
                src="https://i.ibb.co.com/dwR90wFR/student-online-young-cute-girl-glasses-orange-sweater-studying-computer-with-headphones.jpg"
                alt="Learning"
              />
            </div>
          </div>

          {/* The Cards Part */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar, index) => (
              <div className="card" key={index}>
                <div className="number">
                  <p className="text"></p>
                </div>
                <div className="icon">{pillar.icon}</div>
                <p className="heading">{pillar.title}</p>
                <p className="content">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </StyledWrapper>
    </section>
  );
};

export default WhyUs;
