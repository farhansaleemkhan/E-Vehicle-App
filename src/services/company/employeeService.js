import Joi from "joi";
import { http } from "../httpService";
import { baseURL } from "../../constants/config";
import { showFailureToaster, showSuccessToaster } from "../../utils/toaster";
import { setLocalStorageItem } from "../../utils/localStorage";
import { auth } from "../authService";

const employeeApiEndpoint = baseURL + "employees";

const employeeSchema = Joi.object({
  // profilePicture: Joi.string().required(),
  type: Joi.string().valid("employee", "company").required(),
  username: Joi.string().min(2).max(50).required(),
  fullName: Joi.string().min(2).max(50).required(),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string()
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8}$/)
    .required()
    .messages({
      "string.pattern.base": "Password must be atleast 8 characters long and alphanumeic",
    }),
  phone: Joi.string().min(4).max(128).required(),
  address: Joi.string().min(5).max(1024).required(),
  country: Joi.string().min(2).max(128).required(),
  city: Joi.string().min(2).max(128).required(),
});

async function addNewEmployee(user) {
  try {
    const response = await http.post(employeeApiEndpoint, { ...user });
    setLocalStorageItem("token", response.headers["x-auth-token"]);
    showSuccessToaster("Successfuly created new account!");
    return true;
  } catch (err) {
    showFailureToaster(err.data.errorMessage);
    return false;
  }
}

// employeeId is acting as query strign params, it will be automatically applied if provided
async function getEmployees(employeeId) {
  try {
    let endpoint = employeeApiEndpoint;
    if (employeeId) endpoint += "?";
    if (employeeId) endpoint += "_id=" + employeeId;

    return await http.get(endpoint);
  } catch (err) {
    showFailureToaster(err.data.errorMessage);
    return false;
  }
}

///////////////////

// async function getMyDetails() {
//   try {
//     http.setJwt(auth.getJwt());
//     return await http.get(employeeApiEndpoint + "/me");
//   } catch (err) {
//     showFailureToaster(err.data.errorMessage);
//     return false;
//   }
// }

// async function employeeDetails(id) {
//   try {
//     const response = await http.get(employeeApiEndpoint + "/details/" + id);
//     console.log("response in userdetails ", response);
//     return response;
//   } catch (err) {
//     showFailureToaster(err.data.errorMessage);
//     return false;
//   }
// }

// async function getAllArtists() {
//   try {
//     return await http.get(employeeApiEndpoint + "/artists");
//   } catch (err) {
//     showFailureToaster(err.data.errorMessage);
//     return false;
//   }
// }

export const employeeService = {
  employeeSchema,
  addNewEmployee,
  getEmployees,
  // getMyDetails,
  // getAllArtists,
  // employeeDetails,
};
