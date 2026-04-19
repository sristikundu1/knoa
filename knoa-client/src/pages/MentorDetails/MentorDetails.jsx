import React from "react";
import { useLoaderData, useParams } from "react-router";
import MentorBanner from "./MentorBanner";
import MentorCard from "./MentorCard";
import RelatedMentors from "./Relatedmentors";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";

const MentorDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["mentor-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/mentor-details/${id}`);

      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  // Destructure for easy use in your JSX
  const { mentor, relatedMentors } = data;
  return (
    <div>
      <MentorBanner></MentorBanner>
      <MentorCard mentor={mentor}></MentorCard>
      <RelatedMentors mentor={relatedMentors}></RelatedMentors>
    </div>
  );
};

export default MentorDetails;
