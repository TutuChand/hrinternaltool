import React, { useState } from "react";
import styles from "./Employeelist.module.css";
import { useNavigate } from "react-router-dom";
import ReusableTable from "../../components/Table";
import Pagination from "../../components/Pagination";

import { ReactComponent as Bulk } from "../../assets/bulk.svg";
import { ReactComponent as Plus } from "../../assets/plus svg.svg";
import { ReactComponent as Filter } from "../../assets/filter.svg";
import { ReactComponent as Export } from "../../assets/export.svg";
import { ReactComponent as Copy } from "../../assets/copy.svg";
import { ReactComponent as View } from "../../assets/view employee.svg";
import { ReactComponent as Calender } from "../../assets/calender.svg";
import { ReactComponent as Edit } from "../../assets/edit.svg";
import { ReactComponent as Delete } from "../../assets/delete.svg";

import { useEmployeeList } from "../../hooks/employee/EmployeeListhook";
import usePagination from "../../hooks/Pagination/PaginationHook";

import searchicon from "../../assets/search.svg.png";

const AddEmployee = () => {
  const [openMenuId, setOpenMenuId] = useState(null);

  const navigate = useNavigate();
  const { data: employees = [], isLoading, isError } = useEmployeeList();

  const employeesPerPage = 6;

  const {
    currentPage,
    totalPages,
    indexOfFirst,
    indexOfLast,
    currentData: currentEmployees,
    nextPage,
    prevPage,
    setCurrentPage,
  } = usePagination(employees, employeesPerPage);

  const statusClass = {
    Active: styles.active,
    Inactive: styles.inactive,
    Pending: styles.pending,
    "On Leave": styles.onleave,
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

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
    { label: "EMPLOYEE NAME", className: styles.empNameColumn },
    { label: "EMPLOYEE ID", className: styles.empIdColumn },
    { label: "ROLE & DESIGNATION", className: styles.roleColumn },
    { label: "DEPARTMENT", className: styles.departmentColumn },
    { label: "STATUS", className: styles.statusColumn },
    { label: "JOINING DATE" },
    { label: "ACTIONS" },
  ];

  const renderRow = (emp) => (
    <tr key={emp._id}>
      <td>
        <div className={styles.employeename}>
          {emp.profileImage ? (
            <img
              src={emp.profileImage}
              alt={emp.name}
              className={styles.avatarImage}
            />
          ) : (
            <div
              className={styles.avatarPlaceholder}
              style={{ backgroundColor: getColor(emp.name) }}
            >
              {getInitials(emp.name)}
            </div>
          )}

          <div className={styles.nameBlock}>
            <span className={styles.name}>{emp.name}</span>
            <span className={styles.email}>{emp.email || "-"}</span>
          </div>
        </div>
      </td>

      <td className={styles.empIdColumn}>
        <div className={styles.empId}>
          <Copy />
          <span className={styles.empText}>{emp.employeeId}</span>
        </div>
      </td>

      <td className={styles.roleColumn}>
        <div>
          <div className={styles.role}>{emp.role || "-"}</div>
          <div>{emp.designation || "-"}</div>
        </div>
      </td>

      <td className={styles.departmentColumn}>
        {emp.department
          ? emp.department.length > 9
            ? emp.department.slice(0, 9) + "…"
            : emp.department
          : "-"}
      </td>

      <td>
        <span
          className={`${styles.status} ${
            statusClass[emp.status] || styles.active
          }`}
        >
          {emp.status || "Active"}
        </span>
      </td>

      <td className={styles.joiningDate}>
        {emp.joiningDate
          ? new Date(emp.joiningDate).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "-"}
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
              <button onClick={() => setOpenMenuId(null)}>
                <View /> View
              </button>
              <button onClick={() => setOpenMenuId(null)}>
                <Calender /> Calendar
              </button>
              <button onClick={() => setOpenMenuId(null)}>
                <Edit /> Edit
              </button>
              <button
                className={styles.danger}
                onClick={() => setOpenMenuId(null)}
              >
                <Delete /> Deactivate
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <>
      <div className={styles.header}>
        <div className={styles.heading}>
          <h2>Employees</h2>
          <p>Manage your team members and their account permissions.</p>
        </div>

        <div className={styles.buttons}>
          <button className={styles.bulk}>
            <Bulk /> Bulk Import
          </button>

          <button
            className={styles.add}
            onClick={() => navigate("/employee/Personal")}
          >
            <Plus /> Add Employee
          </button>
        </div>
      </div>

      <div className={styles.search}>
        <div className={styles.searchbar}>
          <img src={searchicon} alt="search" />
          <input placeholder="Search by name, role, or department..." />
        </div>

        <div className={styles.filterexport}>
          <button className={styles.Filter}>
            <Filter /> Filter
          </button>
          <button className={styles.Export}>
            <Export /> Export
          </button>
        </div>
      </div>

      <ReusableTable
        columns={columns}
        data={currentEmployees}
        renderRow={renderRow}
        isLoading={isLoading}
        isError={isError}
      />

      {!isLoading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          indexOfFirst={indexOfFirst}
          indexOfLast={indexOfLast}
          totalItems={employees.length}
          onPageChange={setCurrentPage}
          onNext={nextPage}
          onPrev={prevPage}
        />
      )}
    </>
  );
};

export default AddEmployee;
