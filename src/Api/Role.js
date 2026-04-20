import api from "./axios";

export const fetchRoles = async () => {
  try {
    const response = await api.get("/api/designation");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Failed to get roles & designation " }
    );
  }
};
