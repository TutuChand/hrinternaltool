import React from "react";
import styles from "../../pages/otp/otp.module.css";
import acmeLogo from "../../assets/Group 2226.png";
import BrandLogo from "../../components/Brand";
import { useVerifyOtp } from "../../hooks/auth/otphook";
import { useAtom } from "jotai";
import {
  emailAtom,
  errorAtom,
  otp1Atom,
  otp2Atom,
  otp3Atom,
  otp4Atom,
} from "../../atoms/authAtoms";

const OTP = () => {
  const [email] = useAtom(emailAtom);
  const [error, setError] = useAtom(errorAtom);

  const [d1, setD1] = useAtom(otp1Atom);
  const [d2, setD2] = useAtom(otp2Atom);
  const [d3, setD3] = useAtom(otp3Atom);
  const [d4, setD4] = useAtom(otp4Atom);

  const { mutate, isPending } = useVerifyOtp();

  const handleSubmit = () => {
    const otp = d1 + d2 + d3 + d4;

    if (otp.length !== 4) {
      setError("Please enter complete OTP");
      return;
    }

    setError("");

    mutate(
      { email, otp },
      {
        onError: (err) => setError(err?.message || "Invalid OTP"),
      },
    );
  };

  const handleChange = (value, setFunc) => {
    if (value && isNaN(Number(value))) return;
    setFunc(value);
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <BrandLogo name="Acme" logo={acmeLogo} />
        <h2 className={styles.welcome}>OTP</h2>

        <pre className={styles.continue}>
          Enter the OTP sent to your email (
          <span className={styles.gmail}>{email}</span>)
        </pre>

        <pre className={styles.continue}> to complete the sign-up process.</pre>

        <p className={styles.errorMessage}>{error}</p>

        <div className={styles.otpBox}>
          <input
            maxLength={1}
            type="text"
            value={d1}
            onChange={(e) => handleChange(e.target.value, setD1)}
          />
          <input
            maxLength={1}
            type="text"
            value={d2}
            onChange={(e) => handleChange(e.target.value, setD2)}
          />
          <input
            maxLength={1}
            type="text"
            value={d3}
            onChange={(e) => handleChange(e.target.value, setD3)}
          />
          <input
            maxLength={1}
            type="text"
            value={d4}
            onChange={(e) => handleChange(e.target.value, setD4)}
          />
        </div>

        <button className={styles.btn} type="button" onClick={handleSubmit} disabled={isPending}>
          {isPending ? "Verifying..." : "Continue"}
        </button>

        <p className={styles.code}>
          Didn't get the code?
          <span className={styles.resend}> Resend code</span>
        </p>
      </div>
    </div>
  );
};

export default OTP;
