import React from "react";
import styles from "../../pages/dashboard/dashboard.module.css";
import StatCards from "./StatsCards";
import LeaveRequests from "./LeaveRequests";
import Birthday from "./Birthday";
import Interview from "./Interview";
import Announcements from "./Announcements";
import AttendanceMonitor from "./AttendanceMonitor";

const Dashboard = () => {
  return (
    <>
      <StatCards />
      <div className={styles.dashboardgrid}>
        <LeaveRequests />
        <Birthday />
      </div>
      <div className={styles.dashboardgrid2}>
        <Interview />
        <Announcements />
      </div>
      <AttendanceMonitor />
    </>
  );
};

export default Dashboard;
