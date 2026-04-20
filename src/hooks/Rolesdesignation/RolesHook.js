import { useQuery } from "@tanstack/react-query";
import { fetchRoles } from "../../Api/Role";
import toast from "react-hot-toast";

export const useRoles = () => {
  return useQuery({
    queryKey: ["Roles"],
    queryFn: fetchRoles,
    

    onError: (error) => {
      toast.error(error?.message || "Failed to load Roles & Designations", {
        id: "Roles-error",
      });
    },

    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
