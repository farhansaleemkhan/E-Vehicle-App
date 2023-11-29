import Joi from "joi";
import jwtDecode from "jwt-decode";

import { http } from "./httpService";
import { baseURL } from "../constants/config";
import { showFailureToaster, showSuccessToaster } from "../utils/toaster";
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from "../utils/localStorage";
import { redirect } from "../utils/redirect";
import { companyService } from "./company/companyService";
import { employeeService } from "./company/employeeService";

const loginApiEndpoint = baseURL + "auth";
const tokenKey = "token";

const loginSchema = Joi.object({
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string().min(4).max(1024).required(),
});

http.setJwt(getJwt());

async function login(user) {
  try {
    const response = await http.post(loginApiEndpoint, { ...user });
    setLocalStorageItem(tokenKey, response.data.jwt);

    const userDetails = await auth.getCurrentUserDetails();
    setLocalStorageItem("userType", userDetails.type);

    if (userDetails.type === "company") {
      const companyDetails = await companyService.getCompanies("", userDetails._id);
      setLocalStorageItem("companyId", companyDetails.data[0]._id);
    }

    if (userDetails.type === "employee") {
      const companyDetails = await employeeService.getEmployees1(`?userId=${userDetails._id}`);
      setLocalStorageItem("employeeId", companyDetails.data[0]._id);
    }

    showSuccessToaster("Successfuly Logged In!");

    setTimeout(() => {
      return redirect();
    }, 1000);
    // return true;
  } catch (err) {
    showFailureToaster(err.data.message);
    return false;
  }
}

function logout() {
  // removeLocalStorageItem(tokenKey);
  localStorage.clear();
  window.location = "/login";
  return;
}

function getCurrentUserDetails() {
  try {
    const jwt = getLocalStorageItem(tokenKey);
    if (jwt) {
      return jwtDecode(jwt);
    }
    return null;
  } catch (error) {
    return null;
  }
}

function getJwt() {
  return getLocalStorageItem(tokenKey);
}

export const auth = {
  loginSchema,
  login,
  logout,
  getCurrentUserDetails,
  getJwt,
};
