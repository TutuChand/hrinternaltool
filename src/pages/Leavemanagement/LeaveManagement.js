import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import styles from "../../pages/Leavemanagement/Leavemanagement.module.css";
import ReusableTable from "../../components/Table";
import { ReactComponent as View } from "../../assets/view employee.svg";
import { ReactComponent as Export } from "../../assets/export.svg";
import { ReactComponent as Calender } from "../../assets/calender.svg";
import { ReactComponent as Edit } from "../../assets/edit.svg";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { ReactComponent as Leaves } from "../../assets/leavemanagementsvg.svg";

import searchicon from "../../assets/search.svg.png";

import usePagination from "../../hooks/Pagination/PaginationHook";
import Pagination from "../../components/Pagination";

const Leave = () => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [tempDate, setTempDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("upcoming");

  const employeesPerPage = 6;

  const leaveData = [
    {
      _id: "1",
      name: "John Doe",
      designation: "Developer",
      date: "2026-04-10",
      leaveType: "Sick Leave",
      reason: "Fever",
      status: "pending",
    },
    {
      _id: "2",
      name: "Jane Smith",
      designation: "Designer",
      date: "2026-04-12",
      leaveType: "Casual Leave",
      reason: "Personal",
      status: "approved",
    },
  ];

  // ================= FILTERING =================
  const filteredData = leaveData.filter((emp) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      emp.name.toLowerCase().includes(search) ||
      emp.designation.toLowerCase().includes(search);

    if (!matchesSearch) return false;

    if (filterType === "pending") return emp.status === "pending";
    if (filterType === "rejected") return emp.status === "rejected";
    if (filterType === "ongoing") return emp.status === "ongoing";
    if (filterType === "history") return true;

    return true;
  });

  // ================= PAGINATION =================
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    indexOfFirst,
    indexOfLast,
    currentData,
    nextPage,
    prevPage,
  } = usePagination(filteredData, employeesPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType, setCurrentPage]);

  const columns = [
    { label: "EMPLOYEE NAME" },
    { label: "DESIGNATION" },
    { label: "DATE" },
    { label: "LEAVE TYPE" },
    { label: "REASON" },
    { label: "ACTION" },
  ];

  return (
    <>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.heading}>
          <h2>Leave Management</h2>
          <p>Track hours, manage punches, and generate AI insights</p>
        </div>

        <div className={styles.buttons}>
          <div className={styles.dateContainer}>
            <div
              className={`${styles.dateButton} ${
                selectedDate ? styles.activeDateButton : ""
              }`}
              onClick={() => {
                setTempDate(selectedDate);
                setIsOpen((prev) => !prev);
              }}
            >
              <span className={styles.icon}>
                <Calender />
              </span>
            </div>

            {isOpen && (
              <div className={styles.calendarWrapper}>
                <DatePicker
                  inline
                  selected={tempDate}
                  onChange={(date) => setTempDate(date)}
                />

                <div className={styles.calendarFooter}>
                  <button
                    className={styles.clear}
                    onClick={() => {
                      setTempDate(null);
                      setSelectedDate(null);
                    }}
                  >
                    Clear
                  </button>

                  <button
                    className={styles.cancel}
                    onClick={() => {
                      setTempDate(selectedDate);
                      setIsOpen(false);
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    className={styles.ok}
                    onClick={() => {
                      setSelectedDate(tempDate);
                      setIsOpen(false);
                    }}
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </div>

          <button className={styles.discard}>
            <Leaves /> View Leave Policy
          </button>
          <button className={styles.importBtn}>
            <Leaves /> Upload Leave Policy
          </button>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className={styles.search}>
        <div>
          <div className={styles.btns}>
            <button
              className={
                filterType === "pending" ? styles.record : styles.valid
              }
              onClick={() => {
                setFilterType("pending");
                setCurrentPage(1);
              }}
            >
              Pending Requests
            </button>

            <button
              className={
                filterType === "ongoing" ? styles.record : styles.valid
              }
              onClick={() => {
                setFilterType("ongoing");
                setCurrentPage(1);
              }}
            >
              Ongoing
            </button>

            <button
              className={
                filterType === "rejected" ? styles.record : styles.valid
              }
              onClick={() => {
                setFilterType("rejected");
                setCurrentPage(1);
              }}
            >
              Rejected
            </button>
          </div>

          <div className={styles.btns}>
            <button
              className={
                filterType === "history" ? styles.record : styles.valid
              }
              onClick={() => {
                setFilterType("history");
                setCurrentPage(1);
              }}
            >
              Leave History
            </button>
          </div>
        </div>

        <div className={styles.filterexport}>
          <div className={styles.searchbar}>
            <img src={searchicon} alt="search" />
            <input
              placeholder="Search by name, role..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <button className={styles.Export}>
            <Export /> Export
          </button>
        </div>
      </div>

      {/* TABLE */}
      <ReusableTable
        columns={columns}
        data={currentData}
        renderRow={(emp) => (
          <tr key={emp._id}>
            <td>
              <div className={styles.employeename}>
                <div className={styles.name}>{emp.name}</div>
              </div>
            </td>

            <td className={styles.role}>{emp.designation}</td>
            <td className={styles.dob}>{emp.date}</td>

            <td className={styles.upcoming}>{emp.leaveType}</td>

            <td className={styles.age}>{emp.reason}</td>

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
                      <Delete /> Delete
                    </button>
                  </div>
                )}
              </div>
            </td>
          </tr>
        )}
      />

      {/* PAGINATION */}
      {filteredData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          indexOfFirst={indexOfFirst}
          indexOfLast={indexOfLast}
          totalItems={filteredData.length}
          onPageChange={(page) => setCurrentPage(page)}
          onNext={nextPage}
          onPrev={prevPage}
        />
      )}
    </>
  );
};

export default Leave;
