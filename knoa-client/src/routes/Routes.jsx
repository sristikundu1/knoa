import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "./../pages/Login/Login";
import Register from "./../pages/Register/Register";
import DashboardLayout from "./../layouts/DashboardLayout";
import DashboardHome from "./../pages/DashboardHome/DashboardHome";
import AddCourse from "../pages/AddCourse/AddCourse";
import Profile from "../pages/Profile/Profile";
import Mentors from "../pages/Mentors/Mentors";
import MentorDetails from "../pages/MentorDetails/MentorDetails";
import Courses from "../pages/Courses/Courses";
import CourseDetails from "../pages/CourseDetails/CourseDetails";
import EditCourse from "../pages/EditCourse/EditCourse";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home></Home>,
        loader: () => fetch("http://localhost:3000/courses"),
      },
      {
        path: "mentors",
        element: <Mentors></Mentors>,
        loader: () => fetch("http://localhost:3000/mentors"),
      },
      {
        path: "mentor/:id",
        element: <MentorDetails></MentorDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/users/mentor/${params.id}`),
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "/dashboard/add-course",
        element: <AddCourse></AddCourse>,
      },
      {
        path: "/dashboard/all-courses",
        element: <Courses></Courses>,
        loader: () => fetch("http://localhost:3000/courses"),
      },
      {
        path: "course/:id",
        element: <CourseDetails></CourseDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/course/${params.id}`),
      },
      {
        path: "edit-course/:id",
        element: <EditCourse></EditCourse>,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/course/${params.id}`),
      },
      {
        path: "/dashboard/profile",
        element: <Profile></Profile>,
      },
    ],
  },
]);

export default Routes;
