import React from "react";
import Banner from "./components/Banner";
import Courses from "./components/courses";
import { useLoaderData } from "react-router";

const Home = () => {
  const allCourse = useLoaderData();
  return (
    <div>
      <Banner></Banner>
      <Courses allCourse={allCourse}></Courses>
    </div>
  );
};

export default Home;
