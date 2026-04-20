import { useQuery } from "@tanstack/react-query";
import { fetchAnnouncements } from "../../Api/Announcements";
import toast from "react-hot-toast";

export const useAnnoucement = () => {
  return useQuery({
    queryKey: ["Announcements"],
    queryFn: fetchAnnouncements,

    onError: (error) => {
      toast.error(error?.message || "Failed to load Announcements", {
        id: "Announcement-error",
      });
    },

    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
