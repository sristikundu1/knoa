import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form"; // Import Hook Form
import { IoEyeOutline } from "react-icons/io5";
import { VscEyeClosed } from "react-icons/vsc";
import Swal from "sweetalert2";
import styled from "styled-components";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/UseAuth";

const Login = () => {
  const { signinUser, setUser, logOut, forgetPass } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    watch, // We use watch to get the email for the "Forgot Password" function
    formState: { errors },
  } = useForm();

  // Watch the email field so we can pass it to handleForgotPassword
  const watchedEmail = watch("email");

  const onSubmit = async (data) => {
    setServerError(""); // Clear previous errors
    const { email, password } = data;

    try {
      const userCredential = await signinUser(email, password);
      const user = userCredential.user;

      Swal.fire("Welcome Back!", "Login Successful", "success");
      setUser(user);
      navigate(location.state || "/");
    } catch (err) {
      setServerError(err.message);
    }
  };

  const handleForgotPassword = () => {
    if (!watchedEmail) {
      return Swal.fire(
        "Error",
        "Please type your email address first.",
        "error",
      );
    }

    forgetPass(watchedEmail)
      .then(() => {
        Swal.fire(
          "Email Sent",
          "Check your inbox for the reset link.",
          "success",
        );
      })
      .catch((err) => Swal.fire("Error", err.message, "error"));
  };
  return (
    <StyledWrapper>
      <div className="container">
        <div className="heading">Sign In</div>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <input
            {...register("email", { required: "Email is required" })}
            placeholder="E-mail"
            type="email"
            className="input"
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}

          {/* Password Input */}
          <div className="password-wrapper" style={{ position: "relative" }}>
            <input
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              className="input"
            />
            <span
              className="eye-icon"
              style={{
                position: "absolute",
                right: "15px",
                top: "25px",
                cursor: "pointer",
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <IoEyeOutline size={20} />
              ) : (
                <VscEyeClosed size={20} />
              )}
            </span>
          </div>
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}

          <p className="forgot-password" onClick={handleForgotPassword}>
            Forgot Password?
          </p>

          {serverError && <p className="error-text">{serverError}</p>}

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <div className="social-account-container">
          <span className="title">Or Sign in with</span>

          <SocialLogin></SocialLogin>
        </div>

        <span className="agreement">
          Don't have an account? <Link to="/auth/register">Register</Link>
        </span>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;

  .container {
    max-width: 400px;
    width: 100%;
    background: #f8f9fd;
    background: linear-gradient(
      0deg,
      rgb(255, 255, 255) 0%,
      rgb(244, 247, 251) 100%
    );
    border-radius: 40px;
    padding: 25px 35px;
    border: 5px solid rgb(255, 255, 255);
    box-shadow: rgba(133, 189, 215, 0.878) 0px 30px 30px -20px;
    margin: 20px;
  }

  .heading {
    text-align: center;
    font-weight: 900;
    font-size: 30px;
    color: #1089d3;
  }

  .form {
    margin-top: 20px;
  }

  .password-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .eye-icon {
    position: absolute;
    right: 15px;
    top: 28px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.2rem;
  }

  .form .input {
    width: 100%;
    background: white;
    border: none;
    color: #1089d3;
    padding: 15px 20px;
    border-radius: 20px;
    margin-top: 15px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    border-inline: 2px solid transparent;
    font-family: inherit;
  }

  .form .input:focus {
    outline: none;
    border-inline: 2px solid #12b1d1;
  }

  .error-text {
    color: #d32f2f;
    font-size: 12px;
    text-align: center;
    margin-top: 10px;
    font-weight: 600;
  }

  .form .forgot-password {
    display: block;
    margin-top: 10px;
    margin-left: 10px;
  }

  .form .forgot-password a {
    font-size: 11px;
    color: #0099ff;
    text-decoration: none;
  }

  .form .login-button {
    display: block;
    width: 100%;
    font-weight: bold;
    background: linear-gradient(
      45deg,
      rgb(16, 137, 211) 0%,
      rgb(18, 177, 209) 100%
    );
    color: white;
    padding-block: 15px;
    margin: 20px auto;
    border-radius: 20px;
    box-shadow: rgba(133, 189, 215, 0.878) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  .form .login-button:hover {
    transform: scale(1.03);
    box-shadow: rgba(133, 189, 215, 0.878) 0px 23px 10px -20px;
  }

  .social-account-container {
    margin-top: 25px;
    text-align: center;
  }

  .social-account-container .title {
    display: block;
    font-size: 10px;
    color: #aaa;
    margin-bottom: 10px;
  }

  .agreement {
    display: block;
    text-align: center;
    margin-top: 15px;
    font-size: 12px;
    color: #777;
  }

  .agreement a {
    text-decoration: none;
    color: #0099ff;
    font-weight: bold;
  }
`;

export default Login;
