import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"
import Navbar from "./Navbar";
import styles from "../pages/dashboard/dashboard.module.css";

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles.main}>
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
