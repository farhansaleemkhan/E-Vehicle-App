import { auth } from "../services/authService";
import { getLocalStorageItem } from "./localStorage";

export const redirect = () => {
  const user = auth.getCurrentUserDetails();
  const companyId = getLocalStorageItem("companyId");

  if (user) {
    return (window.location = "/parkings");
    // if (user.type === "admin") return (window.location = "/parkings");
    // else if (user.type === "company") return (window.location = `/company/details?id=${companyId}`);
    // else if (user.type === "employee") return (window.location = "/vehicles");
  }

  return (window.location = "/login");
};
