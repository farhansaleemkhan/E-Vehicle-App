import Joi from "joi";
import { http } from "../httpService";
import { baseURL } from "../../constants/config";
import { showFailureToaster, showSuccessToaster } from "../../utils/toaster";

const vehicleApiEndpoint = baseURL + "vehicles";

const vehicleSchema = Joi.object({
  companyId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  manufacturer: Joi.string().min(0).max(30).required(),
  model: Joi.string().min(0).max(30).required(),
  licensePlateNumber: Joi.string().min(0).max(20).required(),
  chassisNumber: Joi.string().min(5).max(255).required(),
  // isParked: Joi.boolean(),
  isAssigned: Joi.boolean(),
  // isWorkingFine: Joi.boolean(),
  vehicleType: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  fuelType: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  fuelGiven: Joi.number().min(0).max(255).required(),
  fuelConsumed: Joi.number().min(0).max(255),
});

async function addVehicle(vehicle) {
  try {
    await http.post(vehicleApiEndpoint, { ...vehicle });
    showSuccessToaster("Successfuly created new vehicle!");
    return true;
  } catch (err) {
    showFailureToaster(err.data.errorMessage);
    return false;
  }
}

// vehicleId is acting as query strign params, it will be automatically applied if provided
async function getVehicles(queryString) {
  try {
    let endpoint = vehicleApiEndpoint;
    if (queryString) endpoint = endpoint + "?" + queryString;

    return await http.get(endpoint);
  } catch (err) {
    showFailureToaster(err.data.errorMessage);
    return false;
  }
}

export const vehicleService = {
  vehicleSchema,
  addVehicle,
  getVehicles,
};
