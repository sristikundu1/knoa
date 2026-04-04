import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router";

const RelatedMentors = ({ mentor }) => {
  const [relatedMentors, setRelatedMentors] = useState([]);
  const { _id, name, expertise, profileImage, experienceYears, rating } =
    mentor;

  useEffect(() => {
    // Only fetch if we have expertise data
    if (mentor?.expertise) {
      fetch(
        `https://knoa-server.vercel.app/related-mentors?expertise=${mentor.expertise}&excludeId=${mentor._id}`,
      )
        .then((res) => res.json())
        .then((data) => setRelatedMentors(data))
        .catch((err) => console.error("Error fetching related mentors:", err));
    }

    // Auto-scroll to top when moving between mentors
    window.scrollTo(0, 0);
  }, [mentor]);
  return (
    <section className="max-w-7xl mx-auto py-20 px-4">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-3xl font-black text-[#03045e]">
            Related Experts
          </h3>
          <p className="text-gray-500 font-medium mt-1">
            Other mentors specializing in {mentor.expertise}
          </p>
          <div className="w-20 h-1.5 bg-[#0077b6] rounded-full mt-2"></div>
        </div>
      </div>

      {relatedMentors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedMentors.map((m) => (
            /* Reuse the hover-effect card you built earlier */

            <motion.div
              key={m._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <StyledWrapper>
                <div className="card">
                  <div className="infos">
                    {/* Using the mentor's actual image */}
                    <div
                      className="image"
                      style={{
                        backgroundImage: `url(${profileImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <div className="info">
                      <div>
                        <p className="name">{name}</p>
                        <p className="function">{expertise}</p>
                      </div>
                      <div className="stats">
                        <p className="flex-stat">
                          Experience
                          <span className="state-value">
                            {experienceYears} Yrs
                          </span>
                        </p>
                        <p className="flex-stat">
                          Rating
                          <span className="state-value">{rating}.0 ⭐</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link to={`/mentor/${_id}`}>
                    <button className="request" type="button">
                      View Details
                    </button>
                  </Link>
                </div>
              </StyledWrapper>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-10 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400">Searching for similar experts...</p>
        </div>
      )}
    </section>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 100%;
    max-width: 350px;
    border-radius: 1rem;
    background-color: #00b4d8; /* Matching your theme dark blue */
    padding: 1.2rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }

  .infos {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 1rem;
  }

  .image {
    height: 7rem;
    width: 7rem;
    border-radius: 0.5rem;
    background-color: #39b8ad;
  }

  .info {
    height: 7rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .name {
    font-size: 1.1rem;
    line-height: 1.5rem;
    font-weight: 700;
    color: #03045e;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .function {
    font-size: 0.75rem;
    line-height: 1rem;
    color: #fff;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .stats {
    width: 100%;
    border-radius: 0.5rem;
    background-color: #eff6ff;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.7rem;
    color: #000000;
  }

  .flex-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }

  .state-value {
    font-weight: 700;
    color: #0077b6;
  }

  .request {
    margin-top: 1.5rem;
    width: 100%;
    border: 2px solid #0077b6;
    border-radius: 0.5rem;
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: #ffffff;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .request:hover {
    background-color: #03045e;
    color: #ffffff;
    transform: scale(1.02);
  }
`;

export default RelatedMentors;
