import React, { useEffect } from "react";
import { useAtom } from "jotai";
import {
  emailAtom,
  passwordAtom,
  rememberAtom,
  errorAtom,
  isLoggedInAtom,
} from "../../atoms/authAtoms";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/auth/Loginhook";
import svg from "../../assets/Emailicon.svg";
import svg2 from "../../assets/Passwordicon.svg";
import styles from "./Login.module.css";
import BrandLogo from "../../components/Brand";
import acmeLogo from "../../assets/Group 2226.png";

const Login = () => {
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [remember, setRemember] = useAtom(rememberAtom);
  const [error, setError] = useAtom(errorAtom);
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);

  const { mutate, isPending } = useLogin(setError);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRemember(true);
    }
  }, [setEmail, setRemember]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    mutate(
      { email, password },
      {
        onSuccess: () => {
          if (remember) {
            localStorage.setItem("rememberedEmail", email);
          } else {
            localStorage.removeItem("rememberedEmail");
          }

          setPassword("");
          setIsLoggedIn(true);
        },
      },
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <BrandLogo logo={acmeLogo} alt="Acme logo" />

        <h2 className={styles.welcome}>Welcome Back 👋</h2>
        <p className={styles.continue}>Login to continue to your workspace</p>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <p className={styles.emailLabel}>Email</p>
          <div className={styles.inputBox}>
            <img src={svg} className={styles.labelStyle} alt="email" />
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <span className={styles.passwordLabelStyle}>
            <p className={styles.password}>Password</p>
            <Link className={styles.forgot} to="/Forget">
              Forgot Password?
            </Link>
          </span>

          <div className={styles.inputBox}>
            <img src={svg2} className={styles.labelStyle} alt="password" />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.toggleContainer}>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span className={styles.sliderRound}></span>
            </label>
            <span className={styles.remember}>Remember me</span>
          </div>

          <button className={styles.btn} type="submit" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
