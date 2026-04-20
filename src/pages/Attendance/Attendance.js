import React, { useState } from "react";
import styles from "../../pages/Attendance/Attendance.module.css";
import { ReactComponent as View } from "../../assets/view employee.svg";
import { ReactComponent as Timing } from "../../assets/Timing.svg";
import { ReactComponent as Plus } from "../../assets/plus svg.svg";
import { ReactComponent as Filter } from "../../assets/filter.svg";
import { ReactComponent as Calender } from "../../assets/calender.svg";
import { ReactComponent as Edit } from "../../assets/edit.svg";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { useAttendance } from "../../hooks/Attendance/AttendanceHook";
import usePagination from "../../hooks/Pagination/PaginationHook";
import Pagination from "../../components/Pagination";
import searchicon from "../../assets/search.svg.png";
import ReusableTable from "../../components/Table";

const Attendance = () => {
  const [openMenuId, setOpenMenuId] = useState(null);

  const employeesPerPage = 6;

  const { data, isLoading, error } = useAttendance();
  const attendanceList = data?.data || [];

  const {
    currentPage,
    totalPages,
    indexOfFirst,
    indexOfLast,
    currentData,
    nextPage,
    prevPage,
    setCurrentPage,
  } = usePagination(attendanceList, employeesPerPage);

  const formatTime = (time) => {
    if (!time) return "-";
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatHours = (minutes) => {
    if (!minutes) return "0h";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  const statusClass = {
    Active: styles.active,
    Inactive: styles.inactive,
    Pending: styles.pending,
    "On Leave": styles.onleave,
    Present: styles.active,
    Absent: styles.inactive,
  };

  const getInitials = (name) =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "";

  const colors = [
    "#8a85ff",
    "#ff9aa3",
    "#ffc87c",
    "#55c3a3",
    "#6ea8ff",
    "#e07272",
    "#fc9fc4",
    "#6fd1d0",
    "#f0a78b",
  ];

  const getColor = (name) => {
    if (!name) return colors[0];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const columns = [
    { label: "EMPLOYEE" },
    { label: "ROLE" },
    { label: "PUNCH IN" },
    { label: "PUNCH OUT" },
    { label: "TOTAL HOURS" },
    { label: "STATUS" },
    { label: "ACTIONS" },
  ];

  const renderRow = (emp) => {
    const fullName = `${emp?.userId?.firstName || ""} ${
      emp?.userId?.lastName || ""
    }`;

    return (
      <tr key={emp._id}>
        <td>
          <div className={styles.employeename}>
            {emp?.userId?.profileImage ? (
              <img
                src={emp.userId.profileImage}
                alt="profile"
                className={styles.avatarImage}
              />
            ) : (
              <div
                className={styles.avatarPlaceholder}
                style={{ backgroundColor: getColor(fullName) }}
              >
                {getInitials(fullName)}
              </div>
            )}
            <span className={styles.name}>{fullName || "-"}</span>
          </div>
        </td>

        <td>{emp?.userId?.role || "-"}</td>
        <td>{formatTime(emp?.punchInTime)}</td>
        <td>{formatTime(emp?.lastPunchOut)}</td>
        <td>{formatHours(emp?.totalWorkingMinutes)}</td>

        <td>
          <span
            className={`${styles.status} ${
              statusClass[emp?.status] || styles.active
            }`}
          >
            {emp?.status || "-"}
          </span>
        </td>

        <td>
          <div className={styles.dropdownWrapper}>
            <button
              className={styles.actionsBtn}
              onClick={() =>
                setOpenMenuId(openMenuId === emp._id ? null : emp._id)
              }
            >
              ...
            </button>

            {openMenuId === emp._id && (
              <div className={styles.dropdownMenu}>
                <button>
                  <View /> View
                </button>
                <button>
                  <Calender /> Calendar
                </button>
                <button>
                  <Edit /> Edit
                </button>
                <button className={styles.danger}>
                  <Delete /> Deactivate
                </button>
              </div>
            )}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.heading}>
          <h2>Attendance Management</h2>
          <p>Track hours, manage punches, and generate AI insights</p>
        </div>

        <div className={styles.buttons}>
          <button className={styles.discard}>
            <Timing /> Global Timings
          </button>

          <button className={styles.importBtn}>
            <Plus /> Manual Punch
          </button>
        </div>
      </div>

      <div className={styles.search}>
        <div className={styles.btns}>
          <button className={styles.record}>Overview</button>
          <button className={styles.valid}>Late Arrivals</button>
          <button className={styles.valid}>Overwork</button>
        </div>

        <div className={styles.filterexport}>
          <div className={styles.searchbar}>
            <img src={searchicon} alt="search" />
            <input placeholder="Search by name, email, or ID..." />
          </div>

          <button className={styles.Filter}>
            <Filter /> Filter
          </button>

          <button className={styles.Export}>
            <Filter /> Export
          </button>
        </div>
      </div>

      <ReusableTable
        columns={columns}
        data={currentData}
        renderRow={renderRow}
        isLoading={isLoading}
        isError={error}
      />

      {attendanceList.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          indexOfFirst={indexOfFirst}
          indexOfLast={indexOfLast}
          totalItems={attendanceList.length}
          onPageChange={setCurrentPage}
          onNext={nextPage}
          onPrev={prevPage}
        />
      )}
    </>
  );
};

export default Attendance;
