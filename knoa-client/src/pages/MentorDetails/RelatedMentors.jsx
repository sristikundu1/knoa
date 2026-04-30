import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router";

const RelatedMentors = ({ mentor: relatedMentors }) => {
  // 2. Check the array length correctly
  if (!relatedMentors || relatedMentors.length === 0) {
    return (
      <div className="py-10 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 mx-auto max-w-7xl">
        <p className="text-gray-400">Searching for similar experts...</p>
      </div>
    );
  }
  return (
    <section className="max-w-7xl mx-auto py-20 px-4">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-3xl font-black text-[#03045e]">
            Related Experts
          </h3>
          <p className="text-gray-500 font-medium mt-1">
            Other mentors specializing in
            {relatedMentors[0]?.subjects?.join(", ")}
          </p>
          <div className="w-20 h-1.5 bg-[#0077b6] rounded-full mt-2"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {relatedMentors.map((m, index) => (
          <motion.div
            key={m._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <StyledWrapper>
              <div className="mentor-card-minimal">
                {/* Top Section: Avatar & Level */}
                <div className="card-top">
                  <div className="avatar-wrapper">
                    <img src={m.profileImage} alt={m.name} />
                  </div>
                  <span className="exp-badge">{m.experience} Yrs Exp</span>
                </div>

                {/* Content Section */}
                <div className="card-body">
                  <h4 className="mentor-name">{m.name}</h4>
                  <div className="subjects-tags">
                    {m.subjects?.slice(0, 2).map((sub) => (
                      <span key={sub} className="tag">
                        {sub}
                      </span>
                    ))}
                  </div>
                  <p className="mentor-bio-short">
                    {m.bio?.substring(0, 60)}...
                  </p>
                </div>

                {/* Action Footer */}
                <div className="card-footer">
                  <Link to={`/mentor/${m._id}`} className="details-btn">
                    <span>View Expert Profile</span>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </StyledWrapper>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const StyledWrapper = styled.div`
  .mentor-card-minimal {
    background: #e5f7fb;
    border: 1px solid #f1f5f9;
    border-radius: 2rem;
    padding: 1.5rem;
    position: relative;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    overflow: hidden;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px -1px rgba(0, 0, 0, 0.01);
  }

  .mentor-card-minimal:hover {
    transform: translateY(-10px);
    border-color: #39b8ad;
    box-shadow: 0 20px 40px -15px rgba(3, 4, 94, 0.1);
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.25rem;
  }

  .avatar-wrapper {
    width: 80px;
    height: 80px;
    border-radius: 1.5rem;
    overflow: hidden;
    border: 3px solid #eff6ff;
  }

  .avatar-wrapper img {
    width: 100%;
    height: 100%;
    object-cover: cover;
  }

  .exp-badge {
    background: #eff6ff;
    color: #0077b6;
    font-size: 0.65rem;
    font-weight: 800;
    text-transform: uppercase;
    padding: 0.4rem 0.8rem;
    border-radius: 0.75rem;
    letter-spacing: 0.05em;
  }

  .mentor-name {
    color: #03045e;
    font-size: 1.25rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
  }

  .subjects-tags {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .tag {
    font-size: 0.6rem;
    color: #39b8ad;
    background: rgba(57, 184, 173, 0.1);
    padding: 0.2rem 0.6rem;
    border-radius: 0.5rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .mentor-bio-short {
    font-size: 0.85rem;
    color: #64748b;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }

  .details-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.85rem;
    background: #00b4d8;
    color: #03045e;
    border-radius: 1.25rem;
    font-size: 0.85rem;
    font-weight: 700;
    transition: all 0.3s ease;
    text-decoration: none;
  }

  .mentor-card-minimal:hover .details-btn {
    background: #03045e;
    color: #ffffff;
  }

  .details-btn svg {
    width: 18px;
    height: 18px;
    transition: transform 0.3s ease;
  }

  .details-btn:hover svg {
    transform: translateX(4px);
  }
`;

export default RelatedMentors;
