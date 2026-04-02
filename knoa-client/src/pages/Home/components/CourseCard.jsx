import React from "react";
import styled from "styled-components";
import {
  HiOutlineHeart,
  HiOutlineClock,
  HiOutlineBookOpen,
  HiChartBar,
} from "react-icons/hi";
import { FaHeart, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";

const CourseCard = ({ course }) => {
  const {
    isFree,
    thumbnail,
    courseName,
    category,
    price,
    difficulty,
    duration,
    rating,
  } = course;

  const { _id, ...courseWithoutId } = course;
  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents the card click if you have one

    fetch("http://localhost:3000/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseWithoutId),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Added to Wishlist!",
            text: `${courseName} is now in your favorites.`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            // Using your theme colors for the icon
            iconColor: "#39b8ad",
          });
        }
      })
      .catch((err) => {
        console.error("Error adding to wishlist:", err);
        Swal.fire("Error", "Could not add to wishlist", "error");
      });
  };
  return (
    <StyledWrapper>
      <div className="card">
        {/* Animated Gradient Border (Shows only on hover) */}
        <div className="card__border_animated" />

        <div className="card__content">
          {/* Row 1: Wishlist Icon (Hidden by default, slides in on hover) */}
          <div className="card__wishlist" onClick={handleWishlist}>
            <HiOutlineHeart className="wishlist default" size={18} />
            <FaHeart className="wishlist hover" size={18} />
          </div>

          {/* Row 2: Image Only */}
          <div className="card__image_container">
            <div className="card__image">
              <img src={thumbnail} alt={courseName} className="course-img" />
            </div>
          </div>

          {/* Row 3: Category & Price (Same Row) */}
          <div className="card__row_between">
            <span className="category_tag">
              <HiOutlineBookOpen /> {category}
            </span>
            {isFree ? (
              <span className="card__price text-green-600 font-bold">Free</span>
            ) : (
              <span className="card__price text-[#03045e] font-bold">
                ${price}
              </span>
            )}
          </div>

          {/* Row 4: Difficulty, Duration, Rating (Same Row) */}
          <div className="card__meta_row">
            <span className="meta_item">
              <HiChartBar size={18} className="icon" /> {difficulty}
            </span>
            <span className="meta_item">
              <HiOutlineClock size={18} className="icon" /> {duration}
            </span>
            <span className="meta_item">
              <FaStar size={18} className=" icon" /> {rating}
            </span>
          </div>

          {/* Row 5: Course Name */}
          <div className="card__text">
            <p className="card__title">{courseName}</p>
          </div>

          {/* View Course Button (Slides up from bottom) */}
          <button className="view_course_btn">View Course</button>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    --card-bg: #eff6ff;
    --card-accent: #00b4d8;
    --grad-1: #39b8ad;
    --grad-2: #7f81c8;

    width: auto;
    height: 400px;
    background: var(--card-bg);
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  }

  /* The Border Layer */
  .card__border_animated {
    position: absolute;
    inset: -2px; /* Pulls it slightly outside the card edges */
    /* Use a linear gradient for the "static" state */
    background: linear-gradient(45deg, var(--grad-1), var(--grad-2));
    border-radius: 22px;
    z-index: 0;
    /* Show the border by default (low opacity or full) */
    opacity: 0.4;
    transition: opacity 0.4s ease;
  }

  /* The Hover State for the Border */
  .card:hover .card__border_animated {
    opacity: 1; /* Make it bright */
    /* Switch to conic-gradient for the rotation effect */
    background: conic-gradient(
      from 0deg,
      var(--grad-1),
      var(--grad-2),
      var(--grad-1)
    );
    animation: rotate 3s linear infinite;
  }

  /* The Card Content (This covers the middle of the gradient) */
  .card__content {
    position: absolute;
    inset: 2px; /* This defines the thickness of your border (2px) */
    background: var(--card-bg);
    border-radius: 18px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    z-index: 1;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* Wishlist Icon - Hidden by default, appears on hover */
  .card__wishlist {
    position: absolute;
    top: 12px;
    right: -40px; /* Start outside the card */
    background: white;
    color: #0077b6;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
    z-index: 10;
    opacity: 0;
  }

  .card:hover .card__wishlist {
    right: 12px; /* Slide into view */
    opacity: 1;
  }

  /* Icons stacked */
  .wishlist {
    position: absolute;
    transition: all 0.3s ease;
  }

  /* Default icon visible */
  .wishlist.default {
    opacity: 1;
    transform: scale(1);
  }

  /* Hover icon hidden */
  .wishlist.hover {
    opacity: 0;
    transform: scale(0.5);
    color: #b30000;
  }

  /* When hovering wishlist → swap */
  .card__wishlist:hover .default {
    opacity: 0;
    transform: scale(0.5);
  }

  .card__wishlist:hover .hover {
    opacity: 1;
    transform: scale(1.1);
  }

  .card__image_container {
    position: relative;
    margin-bottom: 12px;
    width: 100%;
    /* This ensures nothing pushes outside the image area */
    overflow: hidden;
    border-radius: 12px;
  }

  .card__image {
    width: 100%;
    height: 180px; /* Keep this height consistent */
    background: #f0f9ff; /* Fallback color */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .course-img {
    width: 100%;
    height: 100%;
    /* This is the magic line: it crops the image to fill the 180px 
       without stretching or changing the card's height */
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }

  /* Optional: Zoom effect on hover */
  .card:hover .course-img {
    transform: scale(1.1);
  }

  /* Row 3: Category & Price */
  .card__row_between {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .category_tag {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--card-accent);
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .card__price {
    font-weight: 800;
    color: #1e293b;
    font-size: 1rem;
  }

  /* Row 4: Meta Info Row */
  .card__meta_row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.05rem;
    color: #64748b;
    margin-bottom: 10px;
    background: rgba(255, 255, 255, 0.5);
    padding: 4px 8px;
    border-radius: 8px;
  }

  .meta_item {
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .icon {
    color: #0077b6;
  }

  .card__title {
    color: #1e293b;
    font-size: 1.39rem;
    font-weight: 700;
    line-height: 1.3;
    margin: 0;
  }

  .view_course_btn {
    position: absolute;
    bottom: -60px;
    left: 50%;
    transform: translateX(-50%);
    background: #00b4d8;
    color: white;
    border: none;
    padding: 8px 20px;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    white-space: nowrap;
    opacity: 0;
  }

  .card:hover .view_course_btn {
    bottom: 15px;
    opacity: 1;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default CourseCard;
