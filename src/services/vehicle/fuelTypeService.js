import { http } from "../httpService";
import { baseURL } from "../../constants/config";
import { showFailureToaster } from "../../utils/toaster";

const fuelTypesApiEndpoint = baseURL + "fuel-types";

async function getFuelTypes() {
  try {
    return await http.get(fuelTypesApiEndpoint);
  } catch (err) {
    showFailureToaster(err.data.errorMessage);
    return false;
  }
}

export const fuelTypesService = { getFuelTypes };
