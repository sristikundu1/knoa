import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { IoEyeOutline } from "react-icons/io5";
import { VscEyeClosed } from "react-icons/vsc";
import Swal from "sweetalert2";
import styled from "styled-components";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { signinUser, setUser, signinWithGoogle, logOut, forgetPass } =
    use(AuthContext);

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signinUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Check email verification
        if (!user.emailVerified) {
          Swal.fire({
            title: "Email Not Verified",
            text: "Please verify your email.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Resend Email",
          }).then((result) => {
            if (result.isConfirmed) {
              sendEmailVerification(user);
            }
          });

          //  force logout
          logOut();

          return;
        }
        Swal.fire("Good job!", "User login successfully!", "success");
        navigate(`${location.state ? location.state : "/"}`);
        e.target.reset();
        setUser(user);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleGoogleLogin = () => {
    signinWithGoogle()
      .then((result) => {
        Swal.fire("Success", "Logged in with Google", "success");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleForgotPassword = (email) => {
    if (!email) {
      return Swal.fire("Error", "Please enter your email first", "error");
    }

    forgetPass(email)
      .then(() => {
        Swal.fire(
          "Check Your Email",
          "Password reset link has been sent.",
          "success",
        );
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

  return (
    <StyledWrapper>
      <div className="container">
        <div className="heading">Sign In</div>
        <form className="form" onSubmit={handleLogin}>
          <input
            placeholder="E-mail"
            name="email"
            type="email"
            className="input"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password-wrapper">
            <input
              placeholder="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="input"
              required
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOutline /> : <VscEyeClosed />}
            </span>
          </div>

          <p
            className="forgot-password"
            style={{ cursor: "pointer" }}
            onClick={() => handleForgotPassword(email)}
          >
            Forgot Password ?
          </p>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <div className="social-account-container">
          <span className="title">Or Sign in with</span>
          <div className="social-accounts">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="social-button google"
            >
              <svg
                viewBox="0 0 488 512"
                height="1.2em"
                xmlns="http://www.w3.org/2000/svg"
                className="svg"
              >
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg>
            </button>
          </div>
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
  }

  .social-account-container .title {
    display: block;
    text-align: center;
    font-size: 10px;
    color: rgb(170, 170, 170);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .social-account-container .social-accounts {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 10px;
  }

  .social-account-container .social-accounts .social-button {
    background: white;
    border: 2px solid #f1f1f1;
    padding: 10px;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    display: grid;
    place-content: center;
    box-shadow: rgba(133, 189, 215, 0.3) 0px 12px 10px -8px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  .social-button.google .svg {
    fill: #4285f4;
  }

  .social-account-container .social-accounts .social-button:hover {
    transform: scale(1.1);
    background: #f8f9fd;
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
