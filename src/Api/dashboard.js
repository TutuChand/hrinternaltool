import api from "./axios";

export const getDashboardStats = async () => {
  try {
    const response = await api.get("/api/dashboard/stats"); 
    return response.data;
  } catch (error) {
    console.error("Dashboard fetch failed:", error.response || error);
    throw error.response?.data || { message: "Failed to load dashboard data" };
  }
};