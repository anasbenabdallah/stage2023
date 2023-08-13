import { lazy } from "react";

// ==============================|| PROJECT IMPORT ||============================== //

import Loadable from "../Components/PageLoading/Loadable";
import MinimalLayout from "../Layouts/MinimalLayout";

// ==============================|| AUTH Pages ||============================== //

const Register = Loadable(
  lazy(() => import("../Pages/Authentification/Register"))
);
const Login = Loadable(lazy(() => import("../Pages/Authentification/Login")));

const LandingPage = Loadable(
  lazy(() => import("../Pages/LandingPage/LandingPage"))
);
// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      index: true,
      path: "/",
      element: <LandingPage />,
    },
 
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "login",
      element: <Login />,
    },
  ],
};

export default LoginRoutes;
