import { AllCompanies, SearchCompany } from "../../Screens/company/CompanyScreen";
import { CompanyDetails } from "../../Screens/company/CompanyDetailsScreen";

export const allCompaniesColumns = [
  {
    // id: 1,
    name: "Id",
    value: "Id",
    class: { width: "13rem", minWidth: "13rem" },
  },
  {
    // id: 1,
    name: "@Name",
    value: "@Name",
    class: { width: "7rem", minWidth: "7rem" },
  },
  {
    // id: 2,
    name: "Full Name",
    value: "Full Name",
    class: { width: "10rem", minWidth: "10rem" },
  },
  {
    // id: 3,
    name: "Email",
    value: "Email",
    class: { width: "10rem", minWidth: "10rem" },
  },
  {
    // id: 4,
    name: "Address",
    value: "Address",
    class: { width: "7rem", minWidth: "7rem" },
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
    class: { width: "5rem", minWidth: "5rem" },
  },
];

export const companyScreenTabsForAdmin = [
  {
    key: "1",
    label: <h4>Search Company</h4>,
    children: <SearchCompany />,
  },
  {
    key: "2",
    label: <h4>All Companies</h4>,
    children: <AllCompanies />,
  },
];

export const companyDetailsScreenTabsForAdmin = [
  {
    key: "1",
    label: <h4>Company Details</h4>,
    children: <CompanyDetails />,
  },
];

export const companyScreenTabsForCompanyOwner = [
  {
    key: "1",
    label: <h4>Search Company</h4>,
    children: <SearchCompany />,
  },
];

export const companyDetailsScreenTabsForCompanyOwner = [
  {
    key: "1",
    label: <h4>Company Details</h4>,
    children: <CompanyDetails />,
  },
];
