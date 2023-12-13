import {
    AddGuardForAdmin,
    AddGuardForCompanyOwner,
    AllGuards,
    AllGuardsForCompanyOwner,
    SearchGuard,
  } from "../../Screens/company/GuardsScreen";
  
  export const allGuardsColumns = [
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
      name: "ParkingAssigned",
      value: "ParkingAssigned",
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
  
  export const guardScreenTabsForAdmin = [
    {
      key: "1",
      label: <h4>Search Guard</h4>,
      children: <SearchGuard />,
    },
    // {
    //   key: "2",
    //   label: <h4>Add Employee</h4>,
    //   children: <AddEmployeeForAdmin />,
    // },
    {
      key: "3",
      label: <h4>All Employees</h4>,
      children: <AllGuards />,
    },
  ];
  
  export const guardScreenTabsForCompanyOwner = [
    {
      key: "1",
      label: <h4>Add Guard</h4>,
      children: <AddGuardForCompanyOwner />,
    },
    {
      key: "2",
      label: <h4>All Guards</h4>,
      children: <AllGuardsForCompanyOwner />,
    },
  ];
  