import api from "./axios";

export const loginUser = async (data) => {
  try {
    const response = await api.post("/api/auth/login", data);
    return response.data;
  } catch (error) {
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
