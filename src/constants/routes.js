import LandingScreen from "../Screens/LandingScreen";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "/./Screens/RegisterScreen";
import CompanyRegScreen from "/./Screens/CompanyRegScreen";
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
  {
    path: "/",
    component: LandingScreen,
    permissions: [],
    others: { exact: true },
  },
  {
    path: "/login",
    component: LoginScreen,
    permissions: [],
  },
  {
    path: "/register",
    component: RegisterScreen,
    permissions: [],
  },
  {
    path: "/home",
    component: HomeScreen,
    permissions: [],
  },
  {
    path: "/book",
    component: BookingScreen,
    permissions: [],
  },
  {
    path: "/companyregister",
    component: CompanyRegScreen,
    permissions: [],
  },
  {
    path: "/companyadmin",
    component: CompanyAdminScreen,
    permissions: [],
  },
  {
    path: "*",
    component: LandingScreen,
    permissions: [""],
  },
];
