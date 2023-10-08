import React from "react";
import { Link } from "react-router-dom";
import { getLocalStorageItem } from "../utils/localStorage";

const Sidebar = () => {
  let sidebarItems = null;
  const userType = getLocalStorageItem("userType");

  if (userType === "admin") {
    sidebarItems = [
      { id: 1, name: "Companies", link: "/companies" },
      { id: 2, name: "Departments", link: "/departments" },
      { id: 3, name: "Employees", link: "/employees" },
      { id: 4, name: "Vehicles", link: "/vehicles" },
      { id: 5, name: "Parking Areas", link: "/parkings" },
      { id: 2, name: "X=Departments=X", link: "/register-company" },
      { id: 3, name: "X=Employees=X", link: "/book" },
      { id: 4, name: "X=Vehicles=X", link: "/home" },
      { id: 5, name: "X=Parking Areas=X", link: "/company" },
    ];
  } else if (userType === "company") {
    sidebarItems = [
      { id: 1, name: "Company", link: "/company/details" },
      { id: 2, name: "Departments", link: "/departments" },
      { id: 3, name: "Employees", link: "/employees" },
      { id: 4, name: "Vehicles", link: "/vehicles" },
      { id: 5, name: "Parking Areas", link: "/parkings" },
    ];
  } else if (userType === "employee") {
    sidebarItems = [
      { id: 1, name: "Vehicles", link: "/vehicles" },
      { id: 2, name: "Parking Areas", link: "/parkings" },
    ];
  }

  // return <div className="sidebar"></div>;
  return (
    <div className="sidebar">
      <ul className="">
        {sidebarItems.map((item) => {
          return (
            <li className="nav-item" key={item.id}>
              <Link className="nav-link active" to={item.link}>
                {item.name}
              </Link>
              {/* <a className="nav-link active" href={item.link}>
                {item.name}
              </a> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
