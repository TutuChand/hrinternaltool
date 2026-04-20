import React from "react";
import styles from "../../pages/dashboard/dashboard.module.css";
import lastlogo from "../../assets/Background (1).png";
import { Link } from "react-router-dom";
import { useAttendance } from "../../hooks/Attendance/AttendanceHook";
import ReusableTable from "../../components/Table";

const AttendanceMonitor = () => {
  const { data, isLoading, isError } = useAttendance();

  const attendance = data?.data || [];

  const getFullName = (user) =>
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  const formatTime = (iso) => {
    if (!iso) return "--:--";
    return new Date(iso).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const total = attendance.length || 1;

  const lateCount = attendance.filter(
    (e) => e.punchInStatus === "Late" || e.status?.includes("Late"),
  ).length;

  const noPunchCount = attendance.filter((e) => !e.punchInTime).length;

  const presentCount = attendance.filter((e) => e.status === "Present").length;

  const presentPercent = Math.round((presentCount / total) * 100);

  const columns = [
    { label: "Employee" },
    { label: "Role" },
    { label: "Status" },
    { label: "Check-in Time" },
  ];

  const renderRow = (emp) => {
    const user = emp.userId || {};
    const fullName = getFullName(user);

    return (
      <tr key={emp._id}>
        <td className={styles.userCell}>
          <div className={styles.avatarPlaceholder}>
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={fullName}
                className={styles.avatarImage}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <div className={styles.initialAvatar}>
                {getInitials(fullName)}
              </div>
            )}
          </div>
          <span>{fullName || "--"}</span>
        </td>

        <td className={styles.roleText}>{user.role || "--"}</td>

        <td>
          <span
            className={[
              styles.badge,
              emp.status === "Present"
                ? styles.presentBadge
                : emp.status === "On Leave"
                  ? styles.noPunchBadge
                  : emp.status === "Absent"
                    ? styles.absentBadge
                    : styles.lateBadge,
            ].join(" ")}
          >
            {emp.status || "--"}
          </span>
        </td>

        <td className={styles.timeText}>
          {emp.punchInTime ? formatTime(emp.punchInTime) : "--:--"}
        </td>
      </tr>
    );
  };

  const latestFive = [...attendance]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className={styles.lastlogo}>
      <div className={styles.attendanceMonitor}>
        <div className={styles.attendanceHeader}>
          <h2>Attendance Monitor</h2>
          <Link to="/attendance" className={styles.viewReport}>
            View Report
          </Link>
        </div>

        <div className={styles.content}>
          <div className={styles.progressContainer}>
            <progress
              className={styles.progressBar}
              value={presentPercent}
              max="100"
            />
            <span className={styles.percentageText}>
              <strong>{presentPercent}% Present</strong>
            </span>
          </div>

          <div className={styles.statsSummary}>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>{lateCount}</span>
              <span className={styles.statLabel}>Late Arrivals</span>
            </div>

            <div className={styles.statBox}>
              <span className={[styles.statNumber, styles.redText].join(" ")}>
                {noPunchCount}
              </span>
              <span className={styles.statLabel}>No Punch-in</span>
            </div>
          </div>

          <ReusableTable
            columns={columns}
            data={latestFive}
            renderRow={renderRow}
            isLoading={isLoading}
            isError={isError}
            loadingText="Loading attendance..."
            emptyText="No attendance data found"
            errorText="Failed to load attendance data"
          />

          <div className={styles.floatingLogo}>
            <img src={lastlogo} alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceMonitor;
