import Joi from "joi";
import { http } from "../httpService";
import { baseURL } from "../../constants/config";
import { showFailureToaster, showSuccessToaster } from "../../utils/toaster";
import { setLocalStorageItem } from "../../utils/localStorage";
import { auth } from "../authService";

const guardApiEndpoint = baseURL + "guards";

const guardSchema = Joi.object({
  companyId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
//   departmentId: Joi.string()
//     .regex(/^[0-9a-fA-F]{24}$/)
//     .required(),
  assignedParkingId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),

  // this will be used to create User first, and then this userId will be assigned to employee automatically
  username: Joi.string().min(2).max(50).required(),
  fullName: Joi.string().min(2).max(50).required(),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string().min(4).max(255).required(),
  phone: Joi.string().min(4).max(128).required(),
  address: Joi.string().min(5).max(1024).required(),
  country: Joi.string().min(2).max(128).required(),
  city: Joi.string().min(2).max(128).required(),
  type: Joi.string().valid("employee", "company").required(),
});

const parkingAssignSchema = Joi.object({
  parkingId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  guardId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  assign: Joi.boolean(),
});

async function addGuard(user) {
  try {
    await http.post(guardApiEndpoint, { ...user });
    showSuccessToaster("Successfuly created new guard!");
    return true;
  } catch (err) {
    showFailureToaster(err.data.errorMessage);
    return false;
  }
}

// employeeId and companyId are acting as query strign params, it will be automatically applied if provided
async function getGuard(guardId, parkingId) {
  try {
    let endpoint = guardApiEndpoint;
    if (guardId || parkingId) endpoint += "?";
    if (guardId) endpoint += "_id=" + guardId;
    if (parkingId) endpoint += "companyId=" + parkingId;

    return await http.get(endpoint);
  } catch (err) {
    showFailureToaster(err.data.errorMessage);
    return false;
  }
}

async function getGuard1(queryParams = "") {
  try {
    return await http.get(guardApiEndpoint + queryParams);
  } catch (err) {
    showFailureToaster(err.data.errorMessage);
    return false;
  }
}

async function assignParking(data = {}) {
  try {
    await http.post(guardApiEndpoint + "/assign-parking", data);
    showSuccessToaster("Successfuly assigned parking!");
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

export const guardService = {
  guardSchema,
  parkingAssignSchema,
  addGuard,
  getGuard,
  getGuard1,
  assignParking,
  // getMyDetails,
  // getAllArtists,
  // employeeDetails,
};
