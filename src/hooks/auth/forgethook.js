import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../Api/auth";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,

    onSuccess: (data) => {
      console.log("OTP sent successfully:", data);
    },

    onError: (error) => {
      console.log("Error:", error.message);
    },
  });
};

export default useForgotPassword;