import { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/authAtoms";
import styles from "../pages/dashboard/dashboard.module.css";
import icon from "../assets/approved 1.png";
import { ReactComponent as DashboardIcon } from "../assets/dashboardsvg.svg";
import { ReactComponent as ProfileIcon } from "../assets/profilesvg.svg";
import { ReactComponent as HiringIcon } from "../assets/hiringsvg.svg";
import { ReactComponent as AttendanceIcon } from "../assets/attendancesvg.svg";
import { ReactComponent as LeaveIcon } from "../assets/leavemanagementsvg.svg";
import { ReactComponent as BirthdayIcon } from "../assets/Birthday Svg.svg";
import { ReactComponent as PerformanceIcon } from "../assets/perfomancesvg.svg";
import { ReactComponent as HolidayIcon } from "../assets/holidaycalendersvg.svg";
import { ReactComponent as AnnouncementIcon } from "../assets/announcementsvg.svg";
import { ReactComponent as SettingsIcon } from "../assets/settingssvg.svg";
import { ReactComponent as RoundIcon } from "../assets/Round&designation.svg";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const [user] = useAtom(userAtom);

  const [imgError, setImgError] = useState(false);

  const getInitials = (firstName, lastName) => {
    if (!firstName && !lastName) return "U";
    return (firstName?.[0] || "") + (lastName?.[0] || "");
  };

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
      <div className={styles.logo}>
        <img src={icon} alt="HR Portal logo" />
      </div>

      <div className={styles.menu}>
        <NavLink
          to="/dashboard"
          onClick={closeSidebar}
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          <DashboardIcon className={styles.icon} />
          Dashboard
        </NavLink>

        <NavLink
          to="/employee"
          onClick={closeSidebar}
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          <ProfileIcon className={styles.icon} />
          Employees
        </NavLink>

        <NavLink
          to="/hiring"
          onClick={closeSidebar}
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          <HiringIcon className={styles.icon} />
          Hiring
        </NavLink>

        <NavLink
          to="/attendance"
          onClick={closeSidebar}
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          <AttendanceIcon className={styles.icon} />
          Attendance
        </NavLink>

        <NavLink
          to="/leave"
          onClick={closeSidebar}
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          <LeaveIcon className={styles.icon} />
          Leave Management
        </NavLink>

        <NavLink
          to="/birthday"
          onClick={closeSidebar}
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          <BirthdayIcon className={styles.icon} />
          Birthday
        </NavLink>

        <NavLink
          to="/announcement"
          onClick={closeSidebar}
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          <AnnouncementIcon className={styles.icon} />
          Announcements
        </NavLink>

        <NavLink to="/performance" className={styles.navItem}>
          <PerformanceIcon className={styles.icon} />
          Performance
        </NavLink>

        <NavLink to="/holiday" className={styles.navItem}>
          <HolidayIcon className={styles.icon} />
          Holiday Calendar
        </NavLink>

        <NavLink
          to="/round"
          onClick={closeSidebar}
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          <RoundIcon className={styles.icon} />
          Round & Designation
        </NavLink>

        <NavLink to="/settings" className={styles.navItem}>
          <SettingsIcon className={styles.icon} />
          Settings
        </NavLink>
      </div>

      <div className={styles.hrmanager}>
        {user?.avatar && !imgError ? (
          <img
            src={`https://niyamra.ducktaleit.com${user.avatar}`}
            alt="User"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={styles.avatarFallback}>
            {getInitials(user?.firstName, user?.lastName).toUpperCase()}
          </div>
        )}

        <div>
          <h4>
            {user?.firstName || "User"} {user?.lastName || ""}
          </h4>
          <p>{user?.role || "Employee"}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
