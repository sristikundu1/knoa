import React from "react";
import Banner from "./components/Banner";
import Courses from "./components/courses";
import { useLoaderData } from "react-router";
import WhyUs from "./components/WhyUs";

const Home = () => {
  const allCourse = useLoaderData();
  return (
    <div>
      <Banner></Banner>
      <Courses allCourse={allCourse}></Courses>
      <WhyUs></WhyUs>
    </div>
  );
};

export default Home;
