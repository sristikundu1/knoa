import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "./../pages/Login/Login";
import Register from "./../pages/Register/Register";
import DashboardLayout from "./../layouts/DashboardLayout";
import DashboardHome from "./../pages/DashboardHome/DashboardHome";

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
    ],
  },
]);

export default Routes;
