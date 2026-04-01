import React, { use, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiUnlock } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { IoEyeOutline } from "react-icons/io5";
import { VscEyeClosed } from "react-icons/vsc";
import Swal from "sweetalert2";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { signinUser, setUser, signinWithGoogle } = use(AuthContext);

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signinUser(email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // show alert
        Swal.fire("Good job!", "User login successfully!", "success");

        navigate(`${location.state ? location.state : "/"}`);
        // reset form
        e.target.reset();

        setUser(user);
      })
      .catch((error) => {
        setError(error);
      });
  };

  //   google login
  const handleGoogleLogin = () => {
    signinWithGoogle()
      .then((result) => {
        result.user;

        navigate(`${location.state ? location.state : "/"}`);

        // show alert
        toast.success("Thank you, You successfully Login", {
          icon: "🎉",
          style: {
            borderRadius: "10px",
            background: "#034e3b",
            color: "#fff",
          },
        });
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  return (
    <div className="max-w-10/12 mx-auto">
      <div className=" text-center my-10">
        <h2 className="font-bold text-4xl text-primary mb-4">Login</h2>
        <p className="font-medium text-lg text-secondary ">
          Log in to your account to manage your plants and explore more
          features.
        </p>
      </div>

      <div>
        <div className="shrink-0  flex flex-col justify-center items-center pb-10">
          <form onSubmit={handleLogin} className="fieldset gap-5">
            {/* email  */}
            <label className="input validator w-96 md:w-[450px]">
              <MdOutlineEmail />
              <input type="email" name="email" required placeholder="Email" />
            </label>

            {/* Password  */}
            <label className="input validator  w-96  md:w-[450px]">
              <FiUnlock />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="password"
              />

              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <IoEyeOutline /> : <VscEyeClosed />}
              </span>
            </label>

            <button type="submit" className="btn btn-primary mt-4">
              Login
            </button>
          </form>

          <div className="flex flex-col gap-6 md:flex-row justify-between items-center md:gap-14 mt-4">
            <p className="font-medium text-sm text-secondary ">
              Don't have an account?
              <Link to={"/auth/register"}>
                <span className="hover:text-primary pl-2">Register</span>
              </Link>
            </p>

            <p className="font-medium text-sm text-secondary ">
              Forgot your Password?
            </p>
          </div>

          {/* show error  */}
          <div className="text-center mt-4">
            {error && (
              <p className="text-red-800 font-semibold text-sm">{error}</p>
            )}
          </div>

          <div className="divider my-10 w-1/2 mx-auto">OR</div>

          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            className="btn bg-transparent border-2 text-primary border-primary"
          >
            <FcGoogle className="text-xl" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
