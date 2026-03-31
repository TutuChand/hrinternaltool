import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../Api/auth";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,

    onSuccess: (data) => {
      console.log("Password reset:", data);
      alert("Password reset successful :closed_lock_with_key:");
    },

    onError: (error) => {
      console.log(error);
      alert(error.message || "Reset failed :x:");
    },
  });
};

export default useResetPassword;