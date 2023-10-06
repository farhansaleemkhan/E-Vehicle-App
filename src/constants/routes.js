import CompanyScreen from "../Screens/company/CompanyScreen";
import ComapnyDetailsScreen from "../Screens/company/CompanyDetailsScreen";
import DepartmentsScreen from "../Screens/company/DepartmentsScreen";
import EmployeesScreen from "../Screens/company/EmployeesScreen";
import VehiclesScreen from "../Screens/vehicle/VehiclesScreen";
import ParkingsScreen from "../Screens/vehicle/ParkingsScreen";
import LandingScreen from "../Screens/LandingScreen";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import CompanyRegScreen from "../Screens/CompanyRegScreen";
import HomeScreen from "../Screens/HomeScreen";
import CompanyAdminScreen from "../Screens/CompanyAdminScreen";
import BookingScreen from "../Screens/BookingScreen";

export const navbarItems = [
  //   {
  //     name: "Home",
  //     path: "/",
  //     permissions: ["buyer", "seller"],
  //   },
];

export const links = [
  // {
  //   path: "/",
  //   component: LandingScreen,
  //   permissions: ["employee", "company", "admin"],
  //   others: { exact: true },
  // },

  {
    path: "/companies",
    component: CompanyScreen,
    permissions: ["company", "admin"],
  },
  {
    path: "/company/details",
    component: ComapnyDetailsScreen,
    permissions: ["company", "admin"],
  },
  {
    path: "/departments",
    component: DepartmentsScreen,
    permissions: ["employee", "company", "admin"],
  },
  {
    path: "/employees",
    component: EmployeesScreen,
    permissions: ["employee", "company", "admin"],
  },
  {
    path: "/vehicles",
    component: VehiclesScreen,
    permissions: ["employee", "company", "admin"],
  },
  {
    path: "/parkings",
    component: ParkingsScreen,
    permissions: ["employee", "company", "admin"],
  },
  //
  {
    path: "/home",
    component: HomeScreen,
    permissions: ["employee", "company", "admin"],
  },

  {
    path: "/register-company",
    component: CompanyRegScreen,
    permissions: ["employee", "company", "admin"],
  },
  // {
  //   path: "/company",
  //   component: CompanyAdminScreen,
  //   permissions: ["employee", "company", "admin"],
  // },

  {
    path: "/company",
    component: CompanyAdminScreen,
    permissions: ["employee", "company", "admin"],
  },

  {
    path: "*",
    component: LandingScreen,
    permissions: ["employee", "company", "admin"],
  },
  {
    path: "/login",
    component: LoginScreen,
    permissions: ["employee", "company", "admin"],
  },
  {
    path: "/register",
    component: RegisterScreen,
    permissions: ["employee", "company", "admin"],
  },
  {
    path: "/book",
    component: BookingScreen,
    permissions: ["employee", "company", "admin"],
  },
];
