import React, { useState } from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { Link } from "react-router";

const Register = () => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("student");

  const handleNext = (e) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    const data = new FormData(form);

    // Check role to decide if we go to Step 2
    const role = data.get("role");
    if (role === "mentor") {
      setStep(2);
    } else {
      handleSignUp(form);
    }
  };

  const handleSignUp = (formElement) => {
    const formData = new FormData(formElement);
    const { email, password, ...restProfileData } = Object.fromEntries(
      formData.entries(),
    );
  };

  const submitToDatabase = () => {
    console.log("Final Object for MongoDB:", formData);
    alert("Registration Complete!");
  };

  return (
    <StyledWrapper>
      <div className="container">
        <div className="heading">
          {step === 1 ? "Sign Up" : "Mentor Profile"}
        </div>

        <form
          className="form"
          key={step}
          onSubmit={(e) => {
            e.preventDefault();
            step === 1 ? handleNext(e) : handleSignUp(e.target);
          }}
        >
          {step === 1 ? (
            <>
              {/* --- STEP 1 user signup --- */}
              <input
                required
                className="input"
                type="text"
                name="name"
                placeholder="Full Name"
              />
              <input
                required
                className="input"
                type="email"
                name="email"
                placeholder="E-mail"
              />
              <input
                className="input"
                type="text"
                name="phone"
                placeholder="Phone Number"
              />
              <input
                className="input"
                type="url"
                name="profileImage"
                placeholder="Profile Image URL"
              />

              <select
                required
                className="input select-input"
                name="role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="student">I am a Student</option>
                <option value="mentor">I am a Mentor</option>
              </select>

              <input
                required
                className="input"
                type="password"
                name="password"
                placeholder="Password"
              />

              <span className="login-link">
                Already have an account? <Link to={"/auth/login"}>Login</Link>
              </span>

              <input
                className="login-button"
                type="submit"
                value={
                  selectedRole === "mentor"
                    ? "Next: Professional Info"
                    : "Register Now"
                }
              />
            </>
          ) : (
            <>
              {/* --- STEP 2: ONLY MENTOR INFO --- */}
              <p className="step-info">Professional Details</p>

              <input
                required
                className="input"
                type="text"
                name="expertise"
                placeholder="Expertise (e.g., MERN, UI/UX)"
                autoComplete="off" // Tells browser: "Don't auto-fill this"
              />

              <input
                required
                className="input"
                type="number"
                name="experienceYears"
                placeholder="Years of Experience"
                autoComplete="off"
              />

              {/* Social Links */}
              <input
                className="input"
                type="url"
                name="linkedin"
                placeholder="LinkedIn URL"
                autoComplete="off"
              />
              <input
                className="input"
                type="url"
                name="git"
                placeholder="Git URL"
              />

              <textarea
                required
                className="input textarea"
                name="bio"
                placeholder="Full Details About You (Bio)"
                rows="3"
              />

              <div className="rating-input">
                <label>Initial Rating Display:</label>
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  className="input"
                />
              </div>

              <input
                className="login-button"
                type="submit"
                value="Complete Registration"
              />
              <button
                type="button"
                className="back-btn"
                onClick={() => setStep(1)}
              >
                Back to Basic Info
              </button>
            </>
          )}
        </form>

        {step === 1 && (
          <div className="social-account-container">
            <span className="title">Or Sign up with</span>
            <div className="social-accounts">
              <button
                type="button"
                className="new-google-btn"
                onClick={() => console.log("Google Auth")}
              >
                <FcGoogle size={22} />
                <span>Google</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* STYLES KEPT SAME TO MAINTAIN DESIGN */
  .container {
    max-width: 550px;
    background: linear-gradient(
      0deg,
      rgb(255, 255, 255) 0%,
      rgb(244, 247, 251) 100%
    );
    border-radius: 40px;
    padding: 25px 35px;
    border: 5px solid rgb(255, 255, 255);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;
    margin: 20px auto;
  }

  .heading {
    text-align: center;
    font-weight: 900;
    font-size: 28px;
    color: #00b4d8;
  }

  .form .input {
    width: 100%;
    background: white;
    border: none;
    padding: 12px 20px;
    border-radius: 20px;
    margin-top: 12px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    border-inline: 2px solid transparent;
    font-family: inherit;
  }

  .textarea {
    resize: none;
  }
  .step-info {
    text-align: center;
    font-size: 12px;
    color: #888;
    margin-top: 10px;
  }
  .rating-input {
    margin-top: 10px;
    font-size: 11px;
    color: #666;
    padding-left: 10px;
  }

  .select-input {
    appearance: none;
    color: rgb(170, 170, 170);
    cursor: pointer;
  }
  .form .input:focus {
    outline: none;
    border-inline: 2px solid #12b1d1;
  }

  .login-link {
    display: block;
    margin-top: 15px;
    text-align: center;
    font-size: 11px;
    color: rgb(170, 170, 170);
  }
  .login-link a {
    color: #0099ff;
    text-decoration: none;
    font-weight: bold;
  }

  .login-button {
    display: block;
    width: 100%;
    font-weight: bold;
    background: linear-gradient(45deg, #00b4d8 0%, #0077b6 100%);
    color: white;
    padding-block: 15px;
    margin: 20px auto 10px auto;
    border-radius: 20px;
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  .back-btn {
    width: 100%;
    background: none;
    border: none;
    color: #888;
    font-size: 12px;
    cursor: pointer;
    text-decoration: underline;
  }
  .social-account-container {
    margin-top: 25px;
  }
  .social-account-container .title {
    display: block;
    text-align: center;
    font-size: 10px;
    color: rgb(170, 170, 170);
    margin-bottom: 10px;
  }
  .new-google-btn {
    background: white;
    position: relative;
    padding: 8px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid #dadce0;
    border-radius: 25px;
    outline: none;
    overflow: hidden;
    color: #03045e; /* Dark grey text */
    transition: all 0.3s ease;
    width: 100%;
    z-index: 1;
  }

  .new-google-btn span {
    margin-left: 10px;
    z-index: 2;
  }

  /* The Fill Effect */
  .new-google-btn::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%; /* Center the starting point */
    width: 0;
    height: 0;
    background: rgba(66, 133, 244, 0.1); /* Google Blue with low opacity */
    border-radius: 50%;
    transform: translate(-50%, -50%); /* Center the circle */
    transition:
      width 0.6s ease-out,
      height 0.6s ease-out;
    z-index: -1;
  }

  .new-google-btn:hover {
    border-color: #4285f4; /* Changes to Google Blue on hover */
    color: #174ea6;
    box-shadow: 0 1px 3px rgba(60, 64, 67, 0.3);
  }

  /* This expands the circle to cover the whole button from the center */
  .new-google-btn:hover::before {
    width: 100%;
    height: 400px;
  }
`;

export default Register;
