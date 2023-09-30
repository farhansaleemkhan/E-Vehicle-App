import React from "react";

const sidebarItems = [
  { id: 2, name: "Departments", link: "/departments" },
  { id: 3, name: "Employees", link: "/book" },
  { id: 4, name: "Vehicles", link: "/home" },
  { id: 5, name: "Parking Areas", link: "/company" },
  { id: 2, name: "X=Departments=X", link: "/register-company" },
];

const userType = "employee";

userType === "employee"
  ? sidebarItems.unshift({ id: 1, name: "Companies", link: "/companies" })
  : sidebarItems.unshift({ id: 1, name: "Company", link: "/companies" });

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
