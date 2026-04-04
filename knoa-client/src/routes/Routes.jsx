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
import Contact from "../pages/Contact/Contact";
import FAQ from "../pages/FAQ/FAQ";
import FavCourses from "./../pages/FavCourses/FavCourses";
import UpdateProfile from "../pages/UpdateUser/UpdateUser";
import PrivateRoute from "./../contexts/PrivateRoute";
import AdminRoute from "../contexts/AdminRoute";
import Polices from "./../pages/Polices/Polices";
import MernRoadmap from "./../pages/MernRoadmap/MernRoadmap";
import InterviewPrep from "../pages/InterviewPrep/InterviewPrep";
import CertificateVerify from "../pages/Home/CertificateVerify/CertificateVerify";
import DigitalLibrary from "../pages/Home/DigitalLibrary/DigitalLibrary";

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
      {
        path: "contact",
        element: <Contact></Contact>,
      },
      {
        path: "faq",
        element: <FAQ></FAQ>,
      },
      {
        path: "/policies",
        element: <Polices></Polices>,
      },
      {
        path: "/resources/roadmap",
        element: <MernRoadmap></MernRoadmap>,
      },
      {
        path: "resources/interview-prep",
        element: <InterviewPrep></InterviewPrep>,
      },
      {
        path: "resources/verify",
        element: <CertificateVerify></CertificateVerify>,
      },
      {
        path: "resources/community",
        element: <DigitalLibrary></DigitalLibrary>,
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
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    id: "dashboard-data",
    loader: () => fetch("http://localhost:3000/wishlist"),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "/dashboard/add-course",
        element: (
          <AdminRoute>
            <AddCourse></AddCourse>
          </AdminRoute>
        ),
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
        path: "wishlist",
        element: <FavCourses></FavCourses>,
      },
      {
        path: "/dashboard/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/update-profile",
        element: <UpdateProfile></UpdateProfile>,
      },
    ],
  },
]);

export default Routes;
