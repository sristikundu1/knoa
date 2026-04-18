import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/UseAuth";
import { IoEyeOutline } from "react-icons/io5";
import { VscEyeClosed } from "react-icons/vsc";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";

const Register = () => {
  const { signupUser, updateUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const axisSecure = useAxiosSecure();

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // 1. Get the image file from the input
    const imageFile = data.profileImage[0];
    const { email, password, name } = data;

    try {
      // 2. Upload image to ImgBB first
      const formData = new FormData();
      formData.append("image", imageFile);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageHost}`;

      // We await this so we actually have the URL before saving to Firebase/MongoDB
      const imgRes = await axios.post(image_API_URL, formData);
      const photoURL = imgRes.data.data.url;

      if (imgRes.data.success) {
        // 3. Create User in Firebase
        const result = await signupUser(email, password);

        // 4. Update Firebase Profile with the NEW photoURL
        await updateUser({
          displayName: name,
          photoURL: photoURL,
        });

        // 5. Prepare data for MongoDB
        const userInfo = {
          name,
          email,
          profileImage: photoURL, // Save the URL, not the file!
          creationTime: result.user?.metadata.creationTime,
        };

        // 6. Save to Backend using your secure axios instance
        const res = await axisSecure.post("/users", userInfo);

        if (res.data.insertedId) {
          Swal.fire("Success", "Account created successfully!", "success");
          reset();
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Signup Error:", error);
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <StyledWrapper>
      <div className="container">
        <div className="heading">Create Account</div>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <input
            {...register("name", { required: "Name is required" })}
            className="input"
            placeholder="Full Name"
          />
          {errors.name && <p className="error-text">{errors.name.message}</p>}

          {/* Email Field */}
          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
            className="input"
            type="email"
            placeholder="E-mail"
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}

          {/* Profile Image Field */}
          <input
            {...register("profileImage", { required: "Image is required" })}
            className=" input
             "
            type="file"
            placeholder="choose Profile Image"
          />
          {errors.profileImage && (
            <p className="error-text text-red-500 text-xs mt-1 ml-2">
              {errors.profileImage.message}
            </p>
          )}

          {/* Password Field */}
          <div className="relative w-full">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/,
                  message:
                    "Must include uppercase, lowercase, number, and special character",
                },
              })}
              className="input w-full pr-10"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />

            <span
              className="absolute right-4 top-1/2  cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOutline /> : <VscEyeClosed />}
            </span>

            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}
          </div>

          <span className="login-link">
            Already have an account? <Link to="/auth/login">Login</Link>
          </span>

          <button className="login-button" type="submit">
            Register Now
          </button>
        </form>

        <div className="social-account-container">
          <span className="title">Or Sign up with</span>
          {/* <button type="button" className="new-google-btn">
            <FcGoogle size={22} />
            <span>Google</span>
          </button> */}
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    max-width: 400px;
    background: linear-gradient(0deg, #fff 0%, #f4f7fb 100%);
    border-radius: 40px;
    padding: 25px 35px;
    border: 5px solid #fff;
    box-shadow: rgba(133, 189, 215, 0.87) 0px 30px 30px -20px;
    margin: 40px auto;
  }

  .heading {
    text-align: center;
    font-weight: 900;
    font-size: 28px;
    color: #00b4d8;
    margin-bottom: 10px;
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
  }

  .error-text {
    color: #ff4d4d;
    font-size: 11px;
    margin: 5px 0 0 10px;
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
    cursor: pointer;
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

export default Register;
