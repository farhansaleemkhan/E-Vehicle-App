import Joi from "joi";
import { http } from "../httpService";
import { baseURL } from "../../constants/config";
import { showFailureToaster, showSuccessToaster } from "../../utils/toaster";
import { setLocalStorageItem } from "../../utils/localStorage";
import { auth } from "../authService";

const departmentApiEndpoint = baseURL + "departments";

const departmentSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  companyId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

async function addNewDepartment(department) {
  try {
    await http.post(departmentApiEndpoint, { ...department });
    showSuccessToaster("Successfuly created new department!");
    return true;
  } catch (err) {
    showFailureToaster(err.data.errorMessage);
    return false;
  }
}

async function getDepartmentDetails(id) {
  try {
    return await http.get(departmentApiEndpoint + `/${id}`);
  } catch (err) {
    showFailureToaster(err.data.errorMessage);
    return false;
  }
}

// async function companyDetails(id) {
//   try {
//     const response = await http.get(companyApiEndpoint + "/details/" + id);
//     return response;
//   } catch (err) {
//     showFailureToaster(err.data.errorMessage);
//     return false;
//   }
// }

// departmentId and companyId are acting as query strign params, it will automatically apply it as well
async function getAllDepartments(departmentId, comapnyId) {
  try {
    let endpoint = departmentApiEndpoint;
    if (departmentId || comapnyId) endpoint += "?";
    if (departmentId) endpoint += "departmentId=" + departmentId;
    if (comapnyId) endpoint += "companyId=" + comapnyId;

    return await http.get(endpoint);
  } catch (err) {
    showFailureToaster(err.data.errorMessage);
    return false;
  }
}

// async function getAllDepartmentsForCompany(companyId) {
//   try {
//     return await http.get(departmentApiEndpoint + `/${companyId}`);
//   } catch (err) {
//     showFailureToaster(err.data.errorMessage);
//     return false;
//   }
// }

export const departmentService = {
  departmentSchema,
  addNewDepartment,
  getDepartmentDetails,
  //  getMyConpanyDetails,
  getAllDepartments,
  //   getAllDepartmentsForCompany,
  //  companyDetails,
};
