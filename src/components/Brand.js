import React from "react";
import styles from "../pages/login/Login.module.css";

function BrandLogo({ logo, alt = "Brand logo" }) {
  return (
    <div className={styles.logo}>
      <img src={logo} alt={alt} />
    </div>
  );
}

export default BrandLogo;