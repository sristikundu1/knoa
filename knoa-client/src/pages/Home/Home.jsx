import React from "react";
import Banner from "./components/Banner";
import Courses from "./components/courses";
import { useLoaderData } from "react-router";
import WhyUs from "./components/WhyUs";
import MentorSection from "./components/MentorSection";

const Home = () => {
  const allCourse = useLoaderData();
  return (
    <div>
      <Banner></Banner>
      <Courses allCourse={allCourse}></Courses>
      <WhyUs></WhyUs>
      <MentorSection></MentorSection>
    </div>
  );
};

export default Home;
