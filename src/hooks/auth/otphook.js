import { useMutation } from "@tanstack/react-query";
import { verifyOtp } from "../../Api/auth";

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: verifyOtp,

    onSuccess: (data) => {
      console.log("OTP verified:", data);
      alert("OTP Verified ✅");
    },

    onError: (error) => {
      console.log(error);
      alert(error.message || "Invalid OTP :x:");
    },
  });
};

export default useVerifyOtp;