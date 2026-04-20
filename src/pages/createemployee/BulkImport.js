import React, { useState, useMemo } from "react";
import styles from "./BulkImport.module.css";
import { ReactComponent as Filter } from "../../assets/filter.svg";
import { ReactComponent as View } from "../../assets/view employee.svg";
import { ReactComponent as Calender } from "../../assets/calender.svg";
import { ReactComponent as Edit } from "../../assets/edit.svg";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { ReactComponent as Import } from "../../assets/import.svg";
import { useEmployeeList } from "../../hooks/employee/EmployeeListhook";
import { useBulkImport } from "../../hooks/employee/BulkImporthook";
import searchicon from "../../assets/search.svg.png";

const BulkImport = () => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const employeesPerPage = 6;

  const { data: employees = [], isLoading, isError } = useEmployeeList();

  const {
    mutate: bulkImport,
    isLoading: isImporting,
    isError: importError,
    error,
  } = useBulkImport();

  const validEmployees = useMemo(() => {
    return employees.filter((emp) => emp.isValid !== false);
  }, [employees]);

  const statusClass = {
    Active: styles.active,
    Inactive: styles.inactive,
    Pending: styles.pending,
    "On Leave": styles.onleave,
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

  if (isLoading) return <p>Loading employees...</p>;
  if (isError) return <p>Error loading employees.</p>;

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee,
  );

  const totalPages = Math.ceil(employees.length / employeesPerPage);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.heading}>
          <h2>Employees_batch_apr_2025.csv</h2>
          <p>Manage your team members and their account permissions.</p>
        </div>

        <div className={styles.buttons}>
          <button className={styles.discard}>
            <Delete /> Discard Batch
          </button>

          <button
            className={styles.import}
            onClick={() => bulkImport({ employees: validEmployees })}
            disabled={isImporting || validEmployees.length === 0}
          >
            <Import />
            {isImporting
              ? "Importing..."
              : `Import ${validEmployees.length} Valid Employees`}
          </button>
        </div>

        {importError && (
          <p className={styles.error}>{error?.message || "Import failed"}</p>
        )}
      </div>

      <div className={styles.search}>
        <div className={styles.btns}>
          <button className={styles.record}>All Records</button>
          <button className={styles.valid}>
            Valid ({validEmployees.length})
          </button>
          <button className={styles.valid}>
            Issues ({employees.length - validEmployees.length})
          </button>
        </div>

        <div className={styles.filterexport}>
          <div className={styles.searchbar}>
            <img src={searchicon} alt="search" />
            <input placeholder="Search by name, email, or ID..." />
          </div>

          <button className={styles.Filter}>
            <Filter />
          </button>
        </div>
      </div>

      <div className={styles.tablewrapper}>
        <table>
          <thead className={styles.employeetable}>
            <tr>
              <th>EMPLOYEE NAME</th>
              <th className={styles.emailColumn}>EMAIL ADDRESS</th>
              <th className={styles.roleColumn}>ROLE</th>
              <th className={styles.departmentColumn}>DEPARTMENT</th>
              <th className={styles.statusColumn}>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {currentEmployees.map((emp) => (
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

                    <span className={styles.name}>{emp.name}</span>
                  </div>
                </td>

                <td className={styles.emailColumn}>{emp.email || "-"}</td>

                <td className={styles.roleColumn}>{emp.role || "-"}</td>

                <td className={styles.departmentColumn}>
                  {emp.department || "-"}
                </td>

                <td className={styles.statusColumn}>
                  <span
                    className={`${styles.status} ${
                      statusClass[emp.status] || styles.active
                    }`}
                  >
                    {emp.status || "Active"}
                  </span>
                </td>

                <td className={styles.actionsCell}>
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
                          <View /> View Employee
                        </button>
                        <button>
                          <Calender /> Calendar
                        </button>
                        <button>
                          <Edit /> Edit Details
                        </button>
                        <button className={styles.danger}>
                          <Delete /> Deactivate User
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.page}>
          <p>
            Showing {indexOfFirstEmployee + 1}–
            {Math.min(indexOfLastEmployee, employees.length)} of{" "}
            {employees.length} employees
          </p>

          <div className={styles.pagebutton}>
            <button
              className={styles.previous}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
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
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkImport;
