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
async function getParkings(parkingId) {
  try {
    let endpoint = parkingsApiEndpoint;
    if (parkingId) endpoint += "?";
    if (parkingId) endpoint += "_id=" + parkingId;

    return await http.get(endpoint);
  } catch (err) {
    showFailureToaster(err.data.errorMessage);
    return false;
  }
}

export const parkingService = {
  parkingSchema,
  addParking,
  getParkings,
};
