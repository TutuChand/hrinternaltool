import api from "./axios";

export const fetchAnnouncements = async () => {
  try {
    const response = await api.get("/api/announcement");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to get Announcements" };
  }
};
