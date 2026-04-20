import api from "./axios";

export const loginUser = async (data) => {
  try {
    const response = await api.post("/api/auth/login", data);
    return response.data;
  } catch (error) {
    console.log(error);

    throw error.response?.data || { message: "Login Failed" };
  }
};

export const forgotPassword = async (data) => {
  try {
    const response = await api.post("/api/auth/forgot-password", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to send OTP" };
  }
};

export const verifyOtp = async (data) => {
  try {
    const response = await api.post("/api/auth/verify-otp", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "invalid otp" };
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await api.post("/api/auth/reset-password", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to reset password" };
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post("/api/auth/logout");
    return response.data;
  } catch (error) {
    console.log("Logout Error:", error);
    throw error.response?.data || { message: "Logout failed" };
  }
};

export const bulkImportApi = async (data) => {
  try {
    const response = await api.post("/api/employee/bulk-import/confirm", data);
    return response.data.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to import employees",
      }
    );
  }
};
