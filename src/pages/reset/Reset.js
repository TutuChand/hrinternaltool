import React from "react";
import styles from "../../pages/reset/Reset.module.css";
import svg from "../../assets/Emailicon.svg";
import svg2 from "../../assets/Passwordicon.svg";
import { Link } from "react-router-dom";
import acmeLogo from "../../assets/Group 2226.png";
import BrandLogo from "../../components/Brand";
import { useResetPassword } from "../../hooks/auth/resethook";
import { useAtom } from "jotai";
import { emailAtom, passwordAtom, errorAtom } from "../../atoms/authAtoms";

const Reset = () => {
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [error, setError] = useAtom(errorAtom);

  const { mutate, isPending } = useResetPassword();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    setError("");

    mutate(
      { email, password },
      {
        onError: (err) => setError(err?.message || "Reset failed"),
      },
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <BrandLogo name="Acme" logo={acmeLogo} />
        <h2 className={styles.welcome}>Reset your password?</h2>
        <pre className={styles.continue}>
          Don't worry,happens to all of us. Enter your email
        </pre>
        <pre className={styles.continue}> below to recover your password.</pre>

        <p className={styles.errorMessage}>{error}</p>

        <form onSubmit={handleSubmit}>
          <p className={styles.emailLabel}>Email</p>
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

          <span className={styles.passwordLabel}>
            <p className={styles.password}>Password</p>
          </span>
          <div className={styles.inputBox}>
            <img src={svg2} className={styles.labelStyle} alt="password" />
            <input
              type="password"
              className={styles.passwordInput}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className={styles.btn}type="submit" disabled={isPending}>
            {isPending ? "Resetting..." : "Reset password"}
          </button>

          <Link className={styles.back} to="/">
            Back to login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Reset;
