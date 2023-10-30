import Joi from "joi";
import { http } from "./httpService";
import { baseURL } from "../constants/config";
import { showFailureToaster, showSuccessToaster } from "../utils/toaster";
import { setLocalStorageItem } from "../utils/localStorage";
import { auth } from "./authService";

const userApiEndpoint = baseURL + "users";

const newUserSchema = Joi.object({
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
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .required()
    .messages({
      "string.pattern.base": "Password must be atleast 8 characters long and alphanumeic",
    }),
  phone: Joi.string().min(4).max(128).required(),
  address: Joi.string().min(5).max(1024).required(),
  country: Joi.string().min(2).max(128).required(),
  city: Joi.string().min(2).max(128).required(),
});

async function addNewUser(user) {
  try {
    const response = await http.post(userApiEndpoint, { ...user });
    setLocalStorageItem("token", response.headers["x-auth-token"]);
    showSuccessToaster("Successfuly created new account!");
    return true;
  } catch (err) {
    showFailureToaster(err.data.errorMessage);
    return false;
  }
}

async function getMyDetails() {
  try {
    http.setJwt(auth.getJwt());
    return await http.get(userApiEndpoint + "/me");
  } catch (err) {
    showFailureToaster(err.data.message);
    return false;
  }
}

async function userDetails(id) {
  try {
    const response = await http.get(userApiEndpoint + "/details/" + id);
    console.log("response in userdetails ", response);
    return response;
  } catch (err) {
    showFailureToaster(err.data.errorMessage);
    return false;
  }
}

async function getAllArtists() {
  try {
    return await http.get(userApiEndpoint + "/artists");
  } catch (err) {
    showFailureToaster(err.data.errorMessage);
    return false;
  }
}

export const userService = {
  newUserSchema,
  addNewUser,
  getMyDetails,
  getAllArtists,
  userDetails,
};
