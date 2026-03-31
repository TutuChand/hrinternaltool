import api from "./axios"


export const createEmployee = async (data) => {
  try {
    const response = await api.post("/api/employee/create", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create employee" };
  }
};


