import { http } from "./httpService";

export const uploadImage = async (url, payload) => {
  try {
    const response = await http.postWithoutToken(url, payload);
    return response.secure_url;
  } catch (error) {
    throw error;
  }
};
