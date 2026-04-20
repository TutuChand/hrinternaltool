import { useQuery } from "@tanstack/react-query";
import { fetchBirthdays } from "../../Api/Birthday";
import toast from "react-hot-toast";

export const useBirthday = () => {
  return useQuery({
    queryKey: ["birthdays"],
    queryFn: fetchBirthdays, 

    onError: (error) => {
      toast.error(error?.message || "Failed to load birthdays", {
        id: "birthday-error",
      });
    },

    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};