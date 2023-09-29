import React, { useEffect, useState } from "react";
import { userService } from "../services/userService";
import { auth } from "../services/authService";

const Navbar = () => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    if (!userDetails.name) fetchUserDetails();
  }, []);

  const logout = () => {
    auth.logout();
  };

  // const fetchUserDetails = async () => {
  //   const response = await userService.getMyDetails();
  //   console.log("resss ", response);
  //   if (response?.status === 200) {
  //     const { name, type } = response.data;
  //     setUserDetails({ name, type });
  //   }
  // };

  const fetchUserDetails = async () => {
    const user = await auth.getCurrentUserDetails();
    if (user) setUserDetails(user);
  };

  return (
    <nav className="navbar sticky-top navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand text-white text-uppercase fw-bold fs-2" href="/">
          <i className="fas fa-car" />
          &nbsp; Vehicle Hub
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i className="fa-solid fa-bars" style={{ color: "white" }}></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* <li className="nav-item">
              <a className="nav-link text-white fw-bolder fs-4" href="/register-company">
                Register Company
              </a>
            </li> */}
            {userDetails.username && (
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle px-5 buttonDarker"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-user"></i> {userDetails.username}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  {/* <a className="dropdown-item" href="/profile">
                    Profile
                  </a> */}
                  <li>
                    <a className="dropdown-item" href="#" onClick={logout}>
                      Log Out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
