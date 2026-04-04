import React, { use, useState } from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { motion } from "framer-motion";

const Register = () => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("student");
  const [isAdminAttempt, setIsAdminAttempt] = useState(false);

  // FIXED: Added state to store Step 1 data so Step 2 can access it
  const [step1Data, setStep1Data] = useState({});
  const [password, setPassword] = useState("");

  const { signupUser, updateUser } = use(AuthContext);

  const validatePassword = (value) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!regex.test(value)) {
      Swal.fire(
        "Error",
        "Password must be 8+ chars, include uppercase, lowercase, number, and special character.",
        "error",
      );
      return false;
    }

    return true;
  };

  const handleNext = (e) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    const data = new FormData(form);
    const dataObj = Object.fromEntries(data.entries());

    // ✅ include password
    setStep1Data(dataObj);

    if (dataObj.role === "mentor") {
      setStep(2);
    } else {
      handleSignUp(form);
    }
  };

  const handleSignUp = (formElement) => {
    const formData = new FormData(formElement);
    const dataObj = Object.fromEntries(formData.entries());

    const {
      email,
      password,
      name,
      profileImage,
      adminCode,
      ...restProfileData
    } = dataObj;

    let finalRole = selectedRole;
    if (isAdminAttempt && adminCode === "KnoaAdmin2026") {
      finalRole = "admin";
    }

    signupUser(email, password)
      .then((result) => {
        const user = result.user;

        // Send verification email
        return sendEmailVerification(user).then(() => {
          Swal.fire(
            "Verify Your Email",
            "A verification email has been sent. Please check your inbox.",
            "info",
          );
          return result;
        });
      })
      .then((result) => {
        //  Update profile
        return updateUser({
          displayName: name,
          photoURL: profileImage,
        }).then(() => result);
      })
      .then((result) => {
        const userInfo = {
          email,
          name,
          profileImage,
          ...restProfileData,
          role: finalRole,
          rating: restProfileData.rating || (finalRole === "mentor" ? 5 : 0),
          creationTime: result.user?.metadata.creationTime,
          uid: result.user?.uid,
          emailVerified: false, // 🔥 optional but recommended
        };

        return fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        });
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire(
            "Account Created",
            "Please verify your email before logging in.",
            "success",
          );

          setStep(1);
          formElement.reset();
          setStep1Data({});
          setIsAdminAttempt(false);
        }
      })
      .catch((error) => {
        console.error("Signup Error:", error);
        Swal.fire("Error", error.message, "error");
      });
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

              {/* --- Admin Toggle Section --- */}
              <div className="flex flex-col gap-2 p-3 mt-4 rounded-2xl bg-[#39b8ad]/5 border border-dashed border-[#39b8ad]/30">
                <label className="flex items-center gap-2 cursor-pointer transition-all hover:opacity-80">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-xs checkbox-primary"
                    onChange={(e) => setIsAdminAttempt(e.target.checked)}
                  />
                  <span className="text-[11px] font-bold text-[#03045e] uppercase tracking-wider">
                    Apply as Administrator?
                  </span>
                </label>

                {/* Only show this if checkbox is checked */}
                {isAdminAttempt && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="overflow-hidden"
                  >
                    <input
                      className="input !mt-2 !border-[#39b8ad] !shadow-none"
                      type="password"
                      name="adminCode"
                      placeholder="Enter Secret Admin Key"
                    />
                    <p className="text-[9px] text-slate-400 mt-1 ml-2 italic">
                      *Verification code required for administrative privileges.
                    </p>
                  </motion.div>
                )}
              </div>

              <input
                required
                className="input"
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {password && !validatePassword(password) && (
                <p style={{ color: "red", fontSize: "12px" }}>Weak password</p>
              )}
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
              {/* HIDDEN INPUTS: These carry Step 1 data into the final form submission */}
              <input type="hidden" name="name" value={step1Data.name || ""} />
              <input type="hidden" name="email" value={step1Data.email || ""} />
              <input
                type="hidden"
                name="password"
                value={step1Data.password || ""}
              />
              <input type="hidden" name="role" value={selectedRole} />
              <input type="hidden" name="phone" value={step1Data.phone || ""} />
              <input
                type="hidden"
                name="profileImage"
                value={step1Data.profileImage || ""}
              />

              <p className="step-info">Professional Details</p>

              <input
                required
                className="input"
                type="text"
                name="expertise"
                placeholder="Expertise (e.g., MERN, UI/UX)"
              />
              <input
                required
                className="input"
                type="number"
                name="experienceYears"
                placeholder="Years of Experience"
              />
              <input
                className="input"
                type="url"
                name="linkedin"
                placeholder="LinkedIn URL"
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
                <label>Initial Rating Display (1-5):</label>
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  defaultValue="5"
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
  .container {
    max-width: 450px; /* Adjusted for better form fit */
    background: linear-gradient(0deg, #fff 0%, #f4f7fb 100%);
    border-radius: 40px;
    padding: 25px 35px;
    border: 5px solid #fff;
    box-shadow: rgba(133, 189, 215, 0.87) 0px 30px 30px -20px;
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
    margin-top: 15px;
    font-size: 12px;
    color: #666;
    padding-left: 10px;
  }

  .select-input {
    appearance: none;
    color: #888;
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
    color: #aaa;
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
    box-shadow: rgba(133, 189, 215, 0.87) 0px 20px 10px -15px;
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
    margin-top: 5px;
  }

  .social-account-container {
    margin-top: 25px;
  }
  .social-account-container .title {
    display: block;
    text-align: center;
    font-size: 10px;
    color: #aaa;
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
    color: #03045e;
    transition: all 0.3s ease;
    width: 100%;
    z-index: 1;
  }

  .new-google-btn span {
    margin-left: 10px;
    z-index: 2;
  }

  .new-google-btn::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(66, 133, 244, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition:
      width 0.6s ease-out,
      height 0.6s ease-out;
    z-index: -1;
  }

  .new-google-btn:hover {
    border-color: #4285f4;
    color: #174ea6;
    box-shadow: 0 1px 3px rgba(60, 64, 67, 0.3);
  }

  .new-google-btn:hover::before {
    width: 150%;
    height: 400px;
  }
`;

export default Register;
