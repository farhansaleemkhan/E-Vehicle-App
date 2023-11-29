import {
  AddEmployeeForAdmin,
  AddEmployeeForCompanyOwner,
  AllEmployees,
  AllEmployeesForCompanyOwner,
  SearchEmployee,
} from "../../Screens/company/EmployeesScreen";

export const allEmployeesColumns = [
  {
    // id: 1,
    name: "Id",
    value: "Id",
    class: { width: "5rem", minWidth: "5rem" },
  },
  {
    // id: 1,
    name: "@username",
    value: "@username",
    class: { width: "10rem", minWidth: "10rem" },
  },
  {
    // id: 2,
    name: "Full Name",
    value: "Full Name",
    class: { width: "10rem", minWidth: "10rem" },
  },
  {
    // id: 2,
    name: "VehicleAssigned",
    value: "VehicleAssigned",
    class: { width: "10rem", minWidth: "10rem" },
  },
  {
    // id: 2,
    name: "Company",
    value: "Company",
    class: { width: "10rem", minWidth: "10rem" },
  },
  {
    // id: 3,
    name: "Email",
    value: "Email",
    class: { width: "5rem", minWidth: "5rem" },
  },
  {
    // id: 4,
    name: "Address",
    value: "Address",
    class: { width: "10rem", minWidth: "10rem" },
  },
  {
    // id: 5,
    name: "City",
    value: "City",
    class: { width: "7rem", minWidth: "7rem" },
  },
  {
    // id: 6,
    name: "Country",
    value: "Country",
    class: { width: "7rem", minWidth: "7rem" },
  },
];

export const employeeScreenTabsForAdmin = [
  {
    key: "1",
    label: <h4>Search Employee</h4>,
    children: <SearchEmployee />,
  },
  // {
  //   key: "2",
  //   label: <h4>Add Employee</h4>,
  //   children: <AddEmployeeForAdmin />,
  // },
  {
    key: "3",
    label: <h4>All Employees</h4>,
    children: <AllEmployees />,
  },
];

export const employeeScreenTabsForCompanyOwner = [
  {
    key: "1",
    label: <h4>Add Employee</h4>,
    children: <AddEmployeeForCompanyOwner />,
  },
  {
    key: "2",
    label: <h4>All Employees</h4>,
    children: <AllEmployeesForCompanyOwner />,
  },
];
