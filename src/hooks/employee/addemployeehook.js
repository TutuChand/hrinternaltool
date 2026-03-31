import { useMutation } from "@tanstack/react-query"
import { createEmployee } from "../../Api/addemployee";


export const useCreateEmployee = () => {
  return useMutation({
    mutationFn: createEmployee,

    onSuccess: (data) => {
      console.log("Employee created successfully:", data);
      alert("Employee created successfully");
    },

    onError: (error) => {
      console.error("Error creating employee:", error);
      alert(error?.message || "Failed to create employee");
    },
  });
};