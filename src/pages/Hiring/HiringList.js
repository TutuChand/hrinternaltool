import React, { useState, useEffect, useRef } from "react";
import styles from "../Hiring/hiring.module.css";
import { useNavigate } from "react-router-dom";
import ReusableTable from "../../components/Table";

import { ReactComponent as Grid } from "../../assets/grid.svg";
import { ReactComponent as List } from "../../assets/list.svg";
import { ReactComponent as Attendance } from "../../assets/attendancesvg.svg";
import { ReactComponent as Plus } from "../../assets/plus svg.svg";
import { ReactComponent as Filter } from "../../assets/filter.svg";
import { ReactComponent as View } from "../../assets/view employee.svg";
import { ReactComponent as Calendar } from "../../assets/calender.svg";
import { ReactComponent as Edit } from "../../assets/edit.svg";
import { ReactComponent as Delete } from "../../assets/delete.svg";

import { useHiringList } from "../../hooks/Hiring/HiringListHook";
import searchicon from "../../assets/search.svg.png";

const Hiring = () => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const dropdownRef = useRef();

  const employeesPerPage = 6;
  const navigate = useNavigate();

  const { data = [], isLoading, isError } = useHiringList();

  const employees = Array.isArray(data) ? data : [];

  const statusClass = {
    hired: styles.active,
    rejected: styles.inactive,
    draft: styles.pending,
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const isToday = (date) => {
    if (!date) return false;
    const d = new Date(date);
    const today = new Date();
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (first, last) =>
    `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();

  const indexOfLast = currentPage * employeesPerPage;
  const indexOfFirst = indexOfLast - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.max(
    1,
    Math.ceil(employees.length / employeesPerPage),
  );

  const columns = [
    { label: "CANDIDATE" },
    { label: "DESIGNATION" },
    { label: "CURRENT ROUND" },
    { label: "STATUS" },
    { label: "LAST UPDATED" },
    { label: "ACTION" },
  ];

  const renderRow = (emp) => {
    const fullName = `${emp.firstName || ""} ${emp.lastName || ""}`;

    const lastRound =
      emp.interviewRounds
        ?.filter((r) => r?.title && r.title.trim() !== "")
        ?.slice(-1)[0] || null;

    return (
      <tr key={emp._id}>
        <td>
          <div className={styles.employeename}>
            {emp.profileImage ? (
              <img
                src={emp.profileImage}
                alt=""
                className={styles.avatarImage}
              />
            ) : (
              <div className={styles.avatarPlaceholder}>
                {getInitials(emp.firstName, emp.lastName)}
              </div>
            )}

            <div>
              <div className={styles.name}>{fullName}</div>
              <div className={styles.email}>{emp.email}</div>
            </div>
          </div>
        </td>

        <td>
          <div className={styles.roleText}>{emp.designation?.title || "-"}</div>
        </td>

        <td>
          <div className={styles.round}>
            <div className={styles.roundTitle}>
              {lastRound ? lastRound.title : "Not Started"}
            </div>
            <div className={styles.roundDate}>
              {lastRound?.updatedAt ? formatDate(lastRound.updatedAt) : "-"}
            </div>
          </div>
        </td>

        <td className={styles.statushead}>
          <span
            className={`${styles.status} ${
              statusClass[emp.status] || styles.pending
            }`}
          >
            {emp.status}
          </span>
        </td>

        <td>
          <div className={styles.updated}>
            <div className={styles.today}>
              {isToday(emp.updatedAt) ? "Today" : formatDate(emp.updatedAt)}
            </div>

            <div className={styles.time}>
              {emp.updatedAt
                ? new Date(emp.updatedAt).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "-"}
            </div>
          </div>
        </td>

        <td>
          <div className={styles.dropdownWrapper} ref={dropdownRef}>
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
                  <Calendar /> Calendar
                </button>
                <button>
                  <Edit /> Edit
                </button>
                <button className={styles.danger}>
                  <Delete /> Delete
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
          <h2>Hiring Management</h2>
          <p>Manage candidates and interview processes.</p>
        </div>

        <div className={styles.buttons}>
          <button className={styles.grid}>
            <Grid className={styles.icon} />
          </button>
          <button className={styles.list}>
            <List className={styles.icon} />
          </button>
          <button className={styles.attendance}>
            <Attendance className={styles.icon} />
          </button>

          <button
            className={styles.add}
            onClick={() => navigate("/employee/Personal")}
          >
            <Plus /> Add Candidate
          </button>
        </div>
      </div>

      <div className={styles.search}>
        <div className={styles.searchbar}>
          <img src={searchicon} alt="search" />
          <input placeholder="Search by name, role..." />
        </div>

        <label className={styles.dropdown}>
          <Filter />
          <select>
            <option value="">All</option>
            <option value="draft">Draft</option>
            <option value="hired">Hired</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>
      </div>

      {isLoading ? (
        <ReusableTable
          columns={columns}
          data={[]}
          renderRow={renderRow}
          isLoading={true}
          isError={false}
        />
      ) : isError ? (
        <p style={{ textAlign: "center", color: "red" }}>
          Failed to load candidates
        </p>
      ) : employees.length === 0 ? (
        <p style={{ textAlign: "center" }}>No candidates found</p>
      ) : (
        <ReusableTable
          columns={columns}
          data={currentEmployees}
          renderRow={renderRow}
          isLoading={false}
          isError={false}
        />
      )}

      {/* Pagination */}
      {!isLoading && employees.length > 0 && (
        <div className={styles.page}>
          <p>
            Showing {indexOfFirst + 1}–{Math.min(indexOfLast, employees.length)}{" "}
            of {employees.length}
          </p>

          <div className={styles.pagebutton}>
            <button
              className={styles.previous}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={
                  currentPage === i + 1 ? styles.primary : styles.secondary
                }
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className={styles.next}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Hiring;
