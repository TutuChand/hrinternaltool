import api from "./axios";

export const HiringList = async (params) => {
  try {
    const response = await api.get("/api/candidate", {
      params, 
    });
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to get hiring list" };
  }
};