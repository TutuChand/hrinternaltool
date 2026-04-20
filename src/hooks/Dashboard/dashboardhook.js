// useDashboardStats.js
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../../Api/dashboard";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "../../atoms/authAtoms";

export const useDashboardStats = () => {
  const [isLoggedIn] = useAtom(isLoggedInAtom);

  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
    enabled: isLoggedIn,
    onError: (error) => {
      console.error("Dashboard fetch error:", error);
    },
  });
};
