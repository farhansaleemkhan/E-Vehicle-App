import React, { useEffect, useState } from "react";

const sidebarItems = [
  { id: 1, name: "All Companies", link: "/all-companies" },
  { id: 1, name: "My Company", link: "/company" },
  { id: 2, name: "Departments", link: "/register-company" },
  { id: 3, name: "Employees", link: "/book" },
  { id: 4, name: "Vehicles", link: "/home" },
  { id: 5, name: "Parking Areas", link: "/company" },
];

const Sidebar = () => {
  // return <div className="sidebar"></div>;
  return (
    <div className="sidebar">
      <ul className="">
        {sidebarItems.map((item) => {
          return (
            <li className="nav-item" key={item.id}>
              <a className="nav-link active" href={item.link}>
                {item.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
