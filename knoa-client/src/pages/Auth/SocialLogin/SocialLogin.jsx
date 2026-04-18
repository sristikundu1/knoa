import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import styled from "styled-components";
import useAuth from "../../../hooks/UseAuth";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SocialLogin = () => {
  const { signinWithGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    try {
      const result = await signinWithGoogle();
      const user = result.user;

      // 1. Prepare user info from Google result
      const userInfo = {
        name: user.displayName,
        email: user.email,
        profileImage: user.photoURL,
        creationTime: user.metadata.creationTime,
      };

      // 2. Send to backend
      const res = await axiosSecure.post("/users", userInfo);

      // 3. Navigate and notify
      Swal.fire("Success", "Logged in with Google", "success");
      navigate(location.state || "/");
    } catch (err) {
      console.error("Google Login Error:", err);
      setError(err.message);
      Swal.fire("Error", "Google login failed", "error");
    }
  };

  return (
    <StyledWrapper>
      <button
        onClick={handleGoogleLogin}
        type="button"
        className="new-google-btn"
      >
        <FcGoogle size={22} />
        <span>Google</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .new-google-btn {
    width: 100%;
    background: white;
    padding: 8px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    border: 1px solid #dadce0;
    border-radius: 25px;
    color: #03045e;
    cursor: pointer;
  }
`;

export default SocialLogin;
