import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "./../layouts/DashboardLayout";
import AddCourse from "../pages/AddCourse/AddCourse";
import Profile from "../pages/Profile/Profile";
import Mentors from "../pages/Mentors/Mentors";
import MentorDetails from "../pages/MentorDetails/MentorDetails";
import Courses from "../pages/Courses/AllCourses";
import CourseDetails from "../pages/CourseDetails/CourseDetails";
import EditCourse from "../pages/EditCourse/EditCourse";
import Contact from "../pages/Contact/Contact";
import FAQ from "../pages/FAQ/FAQ";
import FavCourses from "./../pages/FavCourses/FavCourses";
import PrivateRoute from "./PrivateRoute";
import Polices from "./../pages/Polices/Polices";
import MernRoadmap from "./../pages/MernRoadmap/MernRoadmap";
import InterviewPrep from "../pages/InterviewPrep/InterviewPrep";
import CertificateVerify from "../pages/Home/CertificateVerify/CertificateVerify";
import DigitalLibrary from "../pages/Home/DigitalLibrary/DigitalLibrary";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import ManageUser from "../pages/Dashboard/AdminDashboard/ManageUser/ManageUser";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import UpdateProfile from "../pages/Dashboard/MentorDashboard/UpdateProfile/UpdateProfile";
import AllCourses from "../pages/Courses/AllCourses";
import StudentCourses from "../pages/StudentCourses/StudentCourses";
import MyEnrollments from "../pages/Dashboard/StudentDashBoard/MyEnrollments";
import PaymentSuccess from "../pages/Dashboard/StudentDashBoard/PaymentSuccess";
import EnrollmentManagement from "../pages/Dashboard/AdminDashboard/EnrollmentManagement";
import MentorEnrollments from "../pages/Dashboard/MentorDashboard/MentorEnrollments";
import Subscribers from "../pages/Dashboard/AdminDashboard/Subscribers";
import FavoriteCourse from "../pages/Dashboard/StudentDashBoard/FavoriteCourse";
import AdministrativeRoute from "./AdministrativeRoute";
import PaymentCancel from "../pages/Dashboard/StudentDashBoard/PaymentCancel";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "mentors",
        element: <Mentors></Mentors>,
      },
      {
        path: "mentor/:id",
        element: <MentorDetails></MentorDetails>,
        // loader: ({ params }) =>
        // fetch(`https://knoa-server.vercel.app/users/mentor/${params.id}`),
      },
      {
        path: "/courses",
        element: <StudentCourses></StudentCourses>,
      },
      {
        path: "course/:id",
        element: <CourseDetails></CourseDetails>,
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
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    id: "dashboard-data",
    loader: () => fetch("https://knoa-server.vercel.app/wishlist"),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "manage-user",
        element: <ManageUser></ManageUser>,
      },
      {
        path: "update-profile",
        element: <UpdateProfile></UpdateProfile>,
      },
      {
        path: "/dashboard/add-course",
        element: (
          <AdministrativeRoute allowedRoles={["mentor"]}>
            <AddCourse></AddCourse>
          </AdministrativeRoute>
        ),
      },
      {
        path: "/dashboard/enrolled-students",
        element: (
          <AdministrativeRoute allowedRoles={["mentor"]}>
            <MentorEnrollments></MentorEnrollments>
          </AdministrativeRoute>
        ),
      },
      {
        path: "/dashboard/update-profile",
        element: (
          <AdministrativeRoute allowedRoles={["mentor"]}>
            <UpdateProfile></UpdateProfile>
          </AdministrativeRoute>
        ),
      },
      {
        path: "/dashboard/all-courses",
        element: (
          <AdministrativeRoute allowedRoles={["mentor", "admin"]}>
            <AllCourses></AllCourses>
          </AdministrativeRoute>
        ),
      },

      {
        path: "edit-course/:id",
        element: (
          <AdministrativeRoute allowedRoles={["mentor", "admin"]}>
            <EditCourse></EditCourse>{" "}
          </AdministrativeRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://knoa-server.vercel.app/course/${params.id}`),
      },

      {
        path: "/dashboard/manage-enrollment",
        element: (
          <AdministrativeRoute allowedRoles={["admin"]}>
            <EnrollmentManagement></EnrollmentManagement>
          </AdministrativeRoute>
        ),
      },
      {
        path: "/dashboard/subscribers",
        element: (
          <AdministrativeRoute allowedRoles={["admin"]}>
            <Subscribers></Subscribers>
          </AdministrativeRoute>
        ),
      },
      {
        path: "/dashboard/my-enrollments",
        element: <MyEnrollments></MyEnrollments>,
      },
      {
        path: "/dashboard/payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "/dashboard/payment-cancel",
        element: <PaymentCancel></PaymentCancel>,
      },

      {
        path: "/dashboard/fav-courses",
        element: <FavoriteCourse></FavoriteCourse>,
      },
      // {
      //   path: "/dashboard/profile",
      //   element: <Profile></Profile>,
      // },
    ],
  },
]);

export default Routes;
