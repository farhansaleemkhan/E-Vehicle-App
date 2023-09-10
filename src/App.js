import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookingScreen from "./Screens/BookingScreen";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import LandingScreen from "./Screens/LandingScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import CompanyRegScreen from "./Screens/CompanyRegScreen";
import HomeScreen from "./Screens/HomeScreen";
import CompanyAdminScreen from "./Screens/CompanyAdminScreen";

const App = () => {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<LoginScreen />}></Route>
          <Route path="/register" element={<RegisterScreen />} />
          <Route exact path="/" element={<LandingScreen />}></Route>
          <Route path="/home" element={<HomeScreen />} />
          <Route exact path="/book/:roomid/:fromDate/:toDate" element={<BookingScreen />}></Route>
          <Route path="/companyregister" element={<CompanyRegScreen />}></Route>
          <Route path="/companyadmin" element={<CompanyAdminScreen />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default App;
