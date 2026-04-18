import React from "react";
import Banner from "./components/Banner";
import Courses from "./components/courses";
import { useLoaderData } from "react-router";
import WhyUs from "./components/WhyUs";
import MentorSection from "./components/MentorSection";
import Statistics from "./components/Statistics";
import NewsletterSection from "./components/NewsletterSection";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <WhyUs></WhyUs>
      <Statistics></Statistics>
      <Courses></Courses>
      <MentorSection></MentorSection>
      <NewsletterSection></NewsletterSection>
    </div>
  );
};

export default Home;
