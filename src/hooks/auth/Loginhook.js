// useLogin.js
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../Api/auth";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { isLoggedInAtom } from "../../atoms/authAtoms";

export const useLogin = (setError) => {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetAtom(isLoggedInAtom);

  return useMutation({
    mutationFn: loginUser,

    onSuccess: () => {
      setError("");
      setIsLoggedIn(true); // Update login state for protected routes
      navigate("/dashboard");
    },

    onError: (err) => {
      console.log("Login Error:", err);
      const errorMessage =
        err?.response?.data?.message || err?.message || "Login failed :x:";
      setError(errorMessage);
    },
  });
};