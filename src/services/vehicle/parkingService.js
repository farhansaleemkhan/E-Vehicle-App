import Joi from "joi";
import { http } from "../httpService";
import { baseURL } from "../../constants/config";
import { showFailureToaster, showSuccessToaster } from "../../utils/toaster";

const parkingsApiEndpoint = baseURL + "parkings";

const parkingSchema = Joi.object({
  vehicleId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  parkingAreaId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const customMessage = "Please select start and end time.";

const findParkingsSchema = Joi.object({
  // companyId: Joi.string()
  //   .regex(/^[0-9a-fA-F]{24}$/)
  //   .required(),
  startTime: Joi.number().min(100000).max(9999999999999).required().messages({
    "number.base": customMessage,
    "number.min": customMessage,
    "number.max": customMessage,
    "any.required": customMessage,
  }),

  endTime: Joi.number().min(100000).max(9999999999999).required().messages({
    "number.base": customMessage,
    "number.min": customMessage,
    "number.max": customMessage,
    "any.required": customMessage,
  }),
});

const addParkingSchema = Joi.object({
  employeeId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  parkingAreaId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  startTime: Joi.number().min(100000).max(9999999999999).required(),
  endTime: Joi.number().min(100000).max(9999999999999).required(),
});

async function addParking(parking) {
  try {
    await http.post(parkingsApiEndpoint, { ...parking });
    showSuccessToaster("Successfuly created new parking!");
    return true;
  } catch (err) {
    showFailureToaster(err.data.errorMessage);
    return false;
  }
}

// parkingId is acting as query strign params, it will be automatically applied if provided
async function getParkings(queryParams = "") {
  try {
    return await http.get(parkingsApiEndpoint + queryParams);
  } catch (err) {
    showFailureToaster(err.data.errorMessage);
    return false;
  }
}

async function deleteParking(id) {
  try {
    await http.delete(parkingsApiEndpoint + `/${id}`);
    showSuccessToaster("Successfuly deleted!");
    return true;
  } catch (err) {
    showFailureToaster(err.data.errorMessage);
    return false;
  }
}

async function findParkings(payload) {
  try {
    const response = await http.post(parkingsApiEndpoint + "/find-parkings", { ...payload });
    return response.data;
  } catch (err) {
    showFailureToaster(err.data.errorMessage);
    return false;
  }
}

export const parkingService = {
  parkingSchema,
  findParkingsSchema,
  addParkingSchema,
  addParking,
  getParkings,
  deleteParking,
  findParkings,
};
