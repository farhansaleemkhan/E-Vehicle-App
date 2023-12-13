import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getLocalStorageItem } from "../utils/localStorage";

const Sidebar = () => {
  let sidebarItems = null;
  const userType = getLocalStorageItem("userType");
  const companyId = getLocalStorageItem("companyId");
  const employeeId = getLocalStorageItem("employeeId");
  const guardId = getLocalStorageItem("guardId");
  const location = useLocation();

  if (userType === "admin") {
    sidebarItems = [
      { id: 5, name: "Parking", link: "/parkings" },
      { id: 4, name: "Vehicles", link: "/vehicles" },
      { id: 1, name: "Companies", link: "/companies" },
      { id: 2, name: "Departments", link: "/departments" },
      { id: 3, name: "Employees", link: "/employees" },
      { id: 3, name: "Guards", link: "/guards" },
    ];
  } else if (userType === "company") {
    sidebarItems = [
      { id: 5, name: "Parking", link: "/parkings" },
      { id: 4, name: "Vehicles", link: "/vehicles" },
      { id: 1, name: "Company", link: `/company/details?id=${companyId}` },
      { id: 2, name: "Departments", link: "/departments" },
      { id: 3, name: "Employees", link: "/employees" },
      { id: 3, name: "Guards", link: "/guards" },
    ];
  } else if (userType === "employee") {
    sidebarItems = [
      { id: 1, name: "Parking", link: "/parkings" },
      { id: 2, name: "Vehicle", link: "/vehicles" },
    ];
  } else if (userType === "guard") {
    sidebarItems = [
      { id: 1, name: "Parking", link: "/parkings" },
    ];
  }

  return (
    <div className="sidebar">
      <ul>
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.link;

          return (
            <li key={item.id}>
              <Link className={`nav-link ${isActive ? "active" : ""}`} to={item.link}>
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
