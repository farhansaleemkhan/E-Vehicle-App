import Joi from "joi";
import { http } from "../httpService";
import { baseURL } from "../../constants/config";
import { showFailureToaster, showSuccessToaster } from "../../utils/toaster";
import { setLocalStorageItem } from "../../utils/localStorage";
import { auth } from "../authService";

const companyApiEndpoint = baseURL + "companies";

const companySchema = Joi.object({
  // profilePicture: Joi.string().required(),
  type: Joi.string().valid("employee", "company").required(),
  username: Joi.string().min(2).max(50).required(),
  fullName: Joi.string().min(2).max(50).required(),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string().min(4).max(1024).required(),
  phone: Joi.string().min(4).max(128).required(),
  address: Joi.string().min(5).max(1024).required(),
  country: Joi.string().min(2).max(128).required(),
  city: Joi.string().min(2).max(128).required(),
});

async function addNewCompany(company) {
  try {
    const response = await http.post(companyApiEndpoint, { ...company });
    setLocalStorageItem("token", response.headers["x-auth-token"]);
    showSuccessToaster("Successfuly created new company!");

    return true;
  } catch (err) {
    showFailureToaster(err.data.errorMessage);
    return false;
  }
}

// async function getMyConpanyDetails() {
//   try {
//     http.setJwt(auth.getJwt());
//     return await http.get(companyApiEndpoint + "/me");
//   } catch (err) {
//     showFailureToaster(err.data.errorMessage);
//     return false;
//   }
// }

// async function companyDetails(id) {
//   try {
//     const response = await http.get(companyApiEndpoint + "/details/" + id);
//     return response;
//   } catch (err) {
//     showFailureToaster(err.data.errorMessage);
//     return false;
//   }
// }

async function getAllCompanies() {
  try {
    return await http.get(companyApiEndpoint);
  } catch (err) {
    showFailureToaster(err.data.errorMessage);
    return false;
  }
}

export const companyService = {
  companySchema,
  addNewCompany,
  //  getMyConpanyDetails,
  getAllCompanies,
  //  companyDetails,
};
