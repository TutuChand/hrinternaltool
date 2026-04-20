import api from "./axios";

export const fetchBirthdays = async () => {
  try {
    const response = await api.get("/api/employee/birthdays");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Failed to get employee birthdays" }
    );
  }
};
