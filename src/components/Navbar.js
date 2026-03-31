import React from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "../pages/dashboard/dashboard.module.css";
import searchicon from "../assets/search.svg.png";
import icon12 from "../assets/bell2.png";
import icon13 from "../assets/dummypic.png";

const Navbar = () => {
  const location = useLocation();

  const isDashboard =
    location.pathname === "/dashboard" || location.pathname === "/dashboard/";

  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <div className={styles.header}>
      <div>
        {isDashboard ? (
          <>
            <h2 className={styles.title}>Dashboard</h2>
            <p className={styles.subtitle}>
              Welcome back, Sarah. Here's what's happening today.
            </p>
          </>
        ) : (
          <div className={styles.breadcrumb}>
            <Link to="/dashboard">Dashboard</Link>

            {pathnames.slice(1).map((name, index) => (
              <span key={index}>
                {" > "}
                {name.replace("-", " ")}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className={styles.headerRight}>
        <div className={styles.searchbar}>
          <img src={searchicon} alt="" />
          <input placeholder="Search employees..." />
        </div>

        <button className={styles.bell}>
          <img src={icon12} alt="" />
        </button>

        <img className={styles.profile} src={icon13} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
