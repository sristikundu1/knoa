import React from "react";
import { useLoaderData } from "react-router";
import MentorBanner from "./MentorBanner";
import MentorCard from "./MentorCard";
import RelatedMentors from "./Relatedmentors";

const MentorDetails = () => {
  const mentor = useLoaderData();
  console.log(mentor);
  return (
    <div>
      <MentorBanner mentor={mentor}></MentorBanner>
      <MentorCard mentor={mentor}></MentorCard>
      <RelatedMentors mentor={mentor}></RelatedMentors>
    </div>
  );
};

export default MentorDetails;
