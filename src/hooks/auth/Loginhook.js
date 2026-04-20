import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../Api/auth";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { userAtom, isLoggedInAtom } from "../../atoms/authAtoms";
import {
  showSuccessToast,
  showWarningToast,
  showErrorToast,
} from "../../components/ToastHelpers";

export const useLogin = (setError) => {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetAtom(isLoggedInAtom);
  const setUser = useSetAtom(userAtom);

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      setError("");
      setIsLoggedIn(true);
      setUser(data?.user);

      if (data?.token) {
        document.cookie = `accessToken=${data.token}; max-age=900; path=/; Secure; SameSite=Strict`;
        setTimeout(() => {
          document.cookie =
            "accessToken=; Max-Age=0; path=/; Secure; SameSite=Strict";
          setIsLoggedIn(false);
          navigate("/login");
          showWarningToast("Session expired. Please log in again.");
        }, 900 * 1000);
      }

      showSuccessToast("Login Successful");
      navigate("/dashboard");
    },

    onError: (err) => {
      console.log("Login Error:", err);
      const errorMessage =
        err?.response?.data?.message || err?.message || "Login failed";
      setError(errorMessage);
      showErrorToast(errorMessage);
    },
  });
};
