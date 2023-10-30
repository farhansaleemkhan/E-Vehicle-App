import { http } from "../httpService";
import { baseURL } from "../../constants/config";
import { showFailureToaster } from "../../utils/toaster";

const vehicleTypesApiEndpoint = baseURL + "vehicle-types";

async function getVehicleTypes() {
  try {
    return await http.get(vehicleTypesApiEndpoint);
  } catch (err) {
    showFailureToaster(err.data.errorMessage);
    return false;
  }
}

export const vehicleTypesService = { getVehicleTypes };
