import { useQuery } from "@tanstack/react-query";
import { getAttendance } from "../../Api/Attendance";
import toast from "react-hot-toast";

export const useAttendance = () => {
  return useQuery({
    queryKey: ["attendance"],
    queryFn: getAttendance,

    onError: (error) => {
      toast.error(error?.message || "Failed to load attendance", {
        id: "attendance-error",
      });
    },

    staleTime: 1000 * 60 * 5, 
    retry: 1, 
  });
};