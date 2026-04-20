import api from "./axios";

export const getAttendance = async () => {
  try {
    const response = await api.get("/api/attendance");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Failed to get attendance details" }
    );
  }
};