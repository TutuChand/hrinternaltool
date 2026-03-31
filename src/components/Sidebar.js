import React from "react";
import styles from "../pages/dashboard/dashboard.module.css";
import icon from "../assets/approved 1.png";
import { ReactComponent as DashboardIcon } from "../assets/dashboardsvg.svg";
import { ReactComponent as ProfileIcon } from "../assets/profilesvg.svg";
import { ReactComponent as HiringIcon } from "../assets/hiringsvg.svg";
import { ReactComponent as AttendanceIcon } from "../assets/attendancesvg.svg";
import { ReactComponent as LeaveIcon } from "../assets/leavemanagementsvg.svg";
import { ReactComponent as PerformanceIcon } from "../assets/perfomancesvg.svg";
import { ReactComponent as HolidayIcon } from "../assets/holidaycalendersvg.svg";
import { ReactComponent as AnnouncementIcon } from "../assets/announcementsvg.svg";
import { ReactComponent as SettingsIcon } from "../assets/settingssvg.svg";
import icon11 from "../assets/HR Profile.png";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={icon} alt="HR Portal logo" />
      </div>

      <div className={styles.menu}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          <DashboardIcon className={styles.icon} />
          Dashboard
        </NavLink>

        <NavLink
          to="/createemployee"
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          <ProfileIcon className={styles.icon} />
          Employees
        </NavLink>

        <NavLink to="/" className={styles.navItem}>
          <HiringIcon className={styles.icon} />
          Hiring
        </NavLink>

        <NavLink to="/" className={styles.navItem}>
          <AttendanceIcon className={styles.icon} />
          Attendance
        </NavLink>

        <NavLink to="/" className={styles.navItem}>
          <LeaveIcon className={styles.icon} />
          Leave Management
        </NavLink>

        <NavLink to="/" className={styles.navItem}>
          <PerformanceIcon className={styles.icon} />
          Performance
        </NavLink>

        <NavLink to="/" className={styles.navItem}>
          <HolidayIcon className={styles.icon} />
          Holiday Calendar
        </NavLink>

        <NavLink to="/" className={styles.navItem}>
          <AnnouncementIcon className={styles.icon} />
          Announcements
        </NavLink>

        <NavLink to="/" className={styles.navItem}>
          <SettingsIcon className={styles.icon} />
          Settings
        </NavLink>
      </div>

      <div className={styles.hrmanager}>
        <img src={icon11} alt="HR Manager" />
        <div>
          <h4>Sarah Jenkins</h4>
          <p>HR Manager</p>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
