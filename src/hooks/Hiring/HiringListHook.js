import { useQuery } from "@tanstack/react-query";
import { HiringList } from "../../Api/Hiring";

export const useHiringList = (params) => {
  return useQuery({
    queryKey: ["employeeList", params],
    queryFn: () => HiringList(params), 

    onSuccess: (data) => {
      console.log("Employee list fetched:", data);
    },

    onError: (error) => {
      console.error("Error fetching employees:", error);
      alert(error?.message || "Failed to fetch employees");
    },
  });
};