import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import styles from "../pages/dashboard/dashboard.module.css";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />

      {/* Main */}
      <main className={styles.main}>
        <Navbar onMenuClick={handleMenuClick} />
        <Outlet />
      </main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className={styles.overlay} onClick={closeSidebar}></div>
      )}
    </div>
  );
};

export default Layout;
