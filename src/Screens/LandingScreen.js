import React from "react";
import { Link } from "react-router-dom";

const LandingScreen = () => {
  return (
    <div className="landingScreen">
      <div className="col-md-8 my-auto text-center" style={{ borderRight: "5px solid black" }}>
        <h1 className="fw-bold" style={{ fontSize: "70px", marginBottom: "50px" }}>
          E-Vehicle
        </h1>
        <h2 className="fs-2">
          "Park and Track your vehicle. From Parking to allocating, all in one Place with Vehicle Hub.
          Now, you can manage and park your vehicle very easily.
        </h2>

        <div
          style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "1rem 0" }}
        >
          <h2 className="fs-2" style={{ paddingRight: "1rem" }}>
            Already have account?
          </h2>
          <button className="btn btn-primary m-3 link1" style={{ outline: "none", border: "none" }}>
            <Link to="/login" className="" style={{ color: "white", textDecoration: "none" }}>
              Login
            </Link>
          </button>
        </div>

        <div
          style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "1rem 0" }}
        >
          <h2 className="fs-2" style={{ paddingRight: "2rem" }}>
            Do you want to join?
          </h2>
          <button className="btn btn-primary m-3 link1" style={{ outline: "none", border: "none" }}>
            <Link to="/register" className="" style={{ color: "white", textDecoration: "none" }}>
              Register
            </Link>
          </button>
        </div>
      </div>
      <div className="col-md-4">
        <img src="/parking.jpg" alt="parking" style={{ maxWidth: "35rem" }} />
      </div>
    </div>
  );
};

export default LandingScreen;
