import { useQuery } from "@tanstack/react-query";
import { EmployeeList } from "../../Api/addemployee";

export const useEmployeeList = () => {
  return useQuery({
    queryKey: ["employeeList"],
    queryFn: EmployeeList,
    keepPreviousData: true,
    onError: (error) => {
      console.error("Error fetching employee list:", error);
    },
  });
};
