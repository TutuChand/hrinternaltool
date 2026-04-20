import api from "./axios";

export const createEmployee = async (data) => {
  try {
    const response = await api.post("/api/employee/create", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create employee" };
  }
};

export const EmployeeList = async (data) => {
  try {
    const response = await api.get("api/employee", data);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to get employee list" };
  }
};

export const bulkImportApi = async (data) => {
  try {
    const response = await api.post("/api/employee/bulk-import/confirm", data);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to import employees" };
  }
};
