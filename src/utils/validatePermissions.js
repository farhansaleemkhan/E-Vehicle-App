import React from "react";
import { useNavigate } from "react-router-dom";

import Login from "../Screens/LoginScreen";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Register from "../Screens/RegisterScreen";
import { auth } from "../services/authService";
import Sidebar from "../Components/Sidebar";

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
  else {
    if (window.location.pathname !== "/") navigate("/");

    return <Login />;
  }
}

function hasPermission(permissions) {
  const user = auth.getCurrentUserDetails();
  if (user && permissions.includes(user.type)) return true;

  return false;
}
