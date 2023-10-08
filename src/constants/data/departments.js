import {
  AddDepartmentsForAdmin,
  AddDepartmentsForCompanyOwner,
  AllDepartments,
  AllDepartmentsForCompanyOwner,
  SearchDepartment,
} from "../../Screens/company/DepartmentsScreen";

export const allDepartmentsColumns = [
  {
    id: 1,
    name: "Deaprtment",
    value: "Deaprtment",
    class: { width: "5rem", minWidth: "5rem" },
  },
  {
    id: 1,
    name: "Belongs To Company",
    value: "Belongs To Company",
    class: { width: "5rem", minWidth: "5rem" },
  },
];

export const departmentScreenTabsForAdmin = [
  {
    key: "1",
    label: <h4>Search Department</h4>,
    children: <SearchDepartment />,
  },
  {
    key: "2",
    label: <h4>Add Department</h4>,
    children: <AddDepartmentsForAdmin />,
  },
  {
    key: "3",
    label: <h4>All Departments</h4>,
    children: <AllDepartments />,
  },
];

export const departmentScreenTabsForCompanyOwner = [
  {
    key: "1",
    label: <h4>Add Department</h4>,
    children: <AddDepartmentsForCompanyOwner />,
  },
  {
    key: "2",
    label: <h4>All Departments</h4>,
    children: <AllDepartmentsForCompanyOwner />,
  },
];
