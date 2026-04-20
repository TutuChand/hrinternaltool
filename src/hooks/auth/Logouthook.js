import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../Api/auth";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { isLoggedInAtom } from "../../atoms/authAtoms";
import toast from "react-hot-toast";

export const useLogout = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetAtom(isLoggedInAtom);

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      setIsLoggedIn(false);
      document.cookie =
        "accessToken=; Max-Age=0; path=/; Secure; SameSite=Strict";

      localStorage.removeItem("authToken");
      toast.success("Logged Out Successfully");
      navigate("/login");
    },

    onError: (err) => {
      console.error("Logout failed:", err);
      toast.error(err.message || "Logout failed. Please try again.");
    },
  });
};
