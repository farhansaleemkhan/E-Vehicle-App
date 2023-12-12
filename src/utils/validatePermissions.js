import React from "react";
import { useNavigate } from "react-router-dom";

import Login from "../Screens/LoginScreen";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Register from "../Screens/RegisterScreen";
import { auth } from "../services/authService";
import Sidebar from "../Components/Sidebar";
import LandingScreen from "../Screens/LandingScreen";

export function PrivateRoutes({ permissions, children }) {
  const navigate = useNavigate();

  if (hasPermission(permissions)) {
    return (
      <>
        <Navbar />
        <div className="screen">
          <Sidebar />
          <div className="children">{children}</div>
        </div>
        <Footer />
      </>
    );
  }

  /* Permission not available, you cannot acces this page, you can also log out the user */
  if (window.location.pathname === "/register") return <Register />;
  if (window.location.pathname === "/login") return <Login />;
  // if (window.location.pathname !== "/")
  return (
    <>
      <Navbar />
      <div className="screen">
        <LandingScreen />
      </div>
      <Footer />
    </>
  );
}

function hasPermission(permissions) {
  const user = auth.getCurrentUserDetails();
  if (user && permissions.includes(user.type)) return true;

  return false;
}
