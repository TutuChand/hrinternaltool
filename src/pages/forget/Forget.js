import React from "react";
import styles from "../../pages/forget/forget.module.css";
import svg from "../../assets/Emailicon.svg";
import { Link } from "react-router-dom";
import acmeLogo from "../../assets/Group 2226.png";
import BrandLogo from "../../components/Brand";
import { useForgotPassword } from "../../hooks/auth/forgethook";
import { useAtom } from "jotai";
import { emailAtom, errorAtom } from "../../atoms/authAtoms";

const Forget = () => {
  const [email, setEmail] = useAtom(emailAtom);
  const [error, setError] = useAtom(errorAtom);

  const { mutate, isPending, isSuccess } = useForgotPassword();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    setError("");

    mutate(
      { email },
      {
        onError: (err) => {
          setError(err?.message || "Something went wrong");
        },
      },
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <BrandLogo name="Acme" logo={acmeLogo} />

        <h2 className={styles.welcome}> Forgot your password?</h2>
        <pre className={styles.continue}>
          Dont worry,happens to all of us. Enter your email
        </pre>
        <pre className={styles.continue}>below to recover your password. </pre>
        <p className={styles.errorMessage}> {error}</p>

        <form onSubmit={handleSubmit}>
          <p className={styles.email}>Email</p>

          <div className={styles.inputBox}>
            <img src={svg} className={styles.labelStyle} alt="email" />
            <input
              type="email"
              className={styles.emailInput}
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className={styles.btn}type="submit" disabled={isPending}>
            {isPending ? "Sending..." : "Submit"}
          </button>
          <Link className={styles.back} to="/">
            Back to login
          </Link>

          {isSuccess && (
            <p style={{ color: "green", marginTop: "10px" }}>
              OTP sent successfully. Please check your email.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Forget;
