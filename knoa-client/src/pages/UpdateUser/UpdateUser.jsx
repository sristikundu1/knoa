import React, { use, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";

const UpdateProfile = () => {
  const { user, updateUser } = use(AuthContext);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData.entries());

    // 1. Update Firebase Auth (Name and Photo)
    updateUser({
      displayName: updatedData.name,
      photoURL: updatedData.profileImage,
    })
      .then(() => {
        // 2. Update MongoDB
        return fetch(`http://localhost:3000/users/${user.email}`, {
          method: "PATCH", // Or PUT
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        });
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0 || data.upsertedId || data.ok) {
          Swal.fire("Success!", "Profile updated successfully", "success");
          navigate("dashboard/profile");
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Could not update profile", "error");
      });
  };

  return (
    <StyledWrapper>
      <div className="container">
        <div className="heading">Update Profile</div>
        <form className="form" onSubmit={handleUpdate}>
          {step === 1 ? (
            <>
              <p className="step-info">Basic Information</p>
              <input
                className="input"
                name="name"
                defaultValue={user?.displayName}
                placeholder="Full Name"
              />
              <input
                className="input"
                name="profileImage"
                defaultValue={user?.photoURL}
                placeholder="Profile Image URL"
              />
              <input
                className="input"
                name="phone"
                defaultValue={user?.phone}
                placeholder="Phone Number"
              />

              {user?.role === "mentor" ? (
                <button
                  type="button"
                  className="login-button"
                  onClick={() => setStep(2)}
                >
                  Next: Professional Info
                </button>
              ) : (
                <input
                  className="login-button"
                  type="submit"
                  value="Save Changes"
                />
              )}
            </>
          ) : (
            <>
              {/* Carry over step 1 values as hidden to ensure they are in the final formData */}
              <input
                type="hidden"
                name="name"
                defaultValue={user?.displayName}
              />
              <input
                type="hidden"
                name="profileImage"
                defaultValue={user?.photoURL}
              />

              <p className="step-info">Professional Details</p>
              <input
                className="input"
                name="expertise"
                defaultValue={user?.expertise}
                placeholder="Expertise"
              />
              <textarea
                className="input textarea"
                name="bio"
                defaultValue={user?.bio}
                placeholder="Bio"
                rows="3"
              />
              <input
                className="login-button"
                type="submit"
                value="Save All Changes"
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
export default UpdateProfile;
