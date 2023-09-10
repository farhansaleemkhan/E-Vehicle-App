import React from "react";
import { auth } from "../services/authService";
import Login from "../Screens/LoginScreen";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Register from "../Screens/RegisterScreen";

export function PrivateRoutes({ permissions, children }) {
  if (hasPermission(permissions)) {
    return (
      <>
        <Navbar />
        {children}
        <Footer />
      </>
    );
  }

  /* Permission not available, you cannot acces this page, you can also log out the user */
  if (window.location.pathname === "/register") return <Register />;
  else return <Login />;
}

function hasPermission(permissions) {
  const user = auth.getCurrentUserDetails();
  if (user && permissions.includes(user.userType)) return true;

  return false;
}
