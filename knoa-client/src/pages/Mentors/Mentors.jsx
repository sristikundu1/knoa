import React from "react";
import { Link, useLoaderData } from "react-router";

const Mentors = () => {
  const allMentors = useLoaderData();
  return (
    <div>
      <h2>all mentors</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allMentors.map((mentor) => (
          <div key={mentor._id} className="card bg-white shadow-xl p-4">
            <img
              src={mentor.profileImage}
              alt={mentor.name}
              className="w-24 h-24 rounded-full mx-auto"
            />
            <h2 className="text-center font-bold text-lg mt-2">
              {mentor.name}
            </h2>
            <p className="text-center text-sm text-blue-500">
              {mentor.expertise}
            </p>

            {/* Link to details page using the MongoDB _id */}
            <Link to={`/mentor/${mentor._id}`}>
              <button className="btn btn-primary w-full mt-4">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentors;
