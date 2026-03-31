import React from "react";
import styles from "../../pages/dashboard/dashboard.module.css";
import icon24 from "../../assets/avatar1.png";
import icon25 from "../../assets/avatar2.png";
import icon26 from "../../assets/avatar3.png";
import lastlogo from "../../assets/Background (1).png";

const AttendanceMonitor = () => {
  return (
    <div className={styles.lastlogo}>
    <div className={styles.attendanceMonitor}>
      <div className={styles.attendanceHeader}>
        <h2>Attendance Monitor</h2>
        <span className={styles.viewReport}>View Report</span>
      </div>

      <div className={styles.content}>
        <div className={styles.progressContainer}>
          <progress
            className={styles.progressBar}
            value="92"
            max="100"
          ></progress>
          <span className={styles.percentageText}>
            <strong>92% Present</strong>
          </span>
        </div>

        <div className={styles.statsSummary}>
          <div className={styles.statBox}>
            <span className={styles.statNumber}>6</span>
            <span className={styles.statLabel}>Late Arrivals</span>
          </div>
          <div className={styles.statBox}>
            <span className={[styles.statNumber, styles.redText].join(" ")}>
              2
            </span>
            <span className={styles.statLabel}>No Punch-in</span>
          </div>
        </div>

        <table className={styles.attendanceTable}>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Role</th>
              <th>Status</th>
              <th>Check-in Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.userCell}>
                <div className={styles.avatarPlaceholder}>
                  <img src={icon24} alt="" />
                </div>
                <span>Raj Patel</span>
              </td>
              <td className={styles.roleText}>Frontend Dev</td>
              <td>
                <span className={[styles.badge, styles.lateBadge].join(" ")}>
                  Late (15m)
                </span>
              </td>
              <td className={styles.timeText}>10:15 AM</td>
            </tr>

            <tr>
              <td className={styles.userCell}>
                <div className={styles.avatarPlaceholder}>
                  <img src={icon25} alt="" />
                </div>
                <span>Li Wei</span>
              </td>
              <td className={styles.roleText}>Designer</td>
              <td>
                <span className={[styles.badge, styles.noPunchBadge].join(" ")}>
                  No Punch-in
                </span>
              </td>
              <td className={styles.timeText}>--:--</td>
            </tr>

            <tr>
              <td className={styles.userCell}>
                <div className={styles.avatarPlaceholder}>
                  <img src={icon26} alt="" />
                </div>
                <span>Marcus Johnson</span>
              </td>
              <td className={styles.roleText}>Sales Lead</td>
              <td>
                <span className={[styles.badge, styles.lateBadge].join(" ")}>
                  Late (45m)
                </span>
              </td>
              <td className={styles.timeText}>10:45 AM</td>
            </tr>
          </tbody>
        </table>
                  
        <div className={styles.floatingLogo}>
        <img src={lastlogo} alt="logo" />
      </div>
      </div>
    </div>
    </div>
  );
};

export default AttendanceMonitor;
