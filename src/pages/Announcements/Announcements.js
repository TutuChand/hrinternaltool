import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import styles from "../../pages/Birthdays/Birthday.module.css";
import ReusableTable from "../../components/Table";
import Pagination from "../../components/Pagination";
import { ReactComponent as View } from "../../assets/view employee.svg";
import { ReactComponent as Export } from "../../assets/export.svg";
import { ReactComponent as Calender } from "../../assets/calender.svg";
import { ReactComponent as Edit } from "../../assets/edit.svg";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { ReactComponent as Plus } from "../../assets/plus svg.svg";
import usePagination from "../../hooks/Pagination/PaginationHook";
import searchicon from "../../assets/search.svg.png";

const Announcement = () => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [tempDate, setTempDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("upcoming");

  const employeesPerPage = 6;

  // ✅ NO API, NO DATA (PURE UI MODE)
  const birthdayList = [];

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "-";

  const filteredData = birthdayList.filter((emp) => {
    const fullName =
      `${emp.firstName || ""} ${emp.lastName || ""}`.toLowerCase();
    const designation = (emp.designation || "").toLowerCase();
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      fullName.includes(search) || designation.includes(search);

    if (!matchesSearch) return false;

    const dob = emp.dateOfBirth;
    if (!dob) return true;

    const today = new Date();
    const birthDate = new Date(dob);

    if (filterType === "month") {
      return birthDate.getMonth() === today.getMonth();
    }

    return true;
  });

  const {
    currentPage,
    totalPages,
    indexOfFirst,
    indexOfLast,
    currentData,
    goToPage,
    nextPage,
    prevPage,
    setCurrentPage,
  } = usePagination(filteredData, employeesPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType, setCurrentPage]);

  const columns = [
    { label: "EMPLOYEE NAME" },
    { label: "ROLE" },
    { label: "DATE OF BIRTH" },
    { label: "UPCOMING BIRTHDAY" },
    { label: "AGE" },
    { label: "ACTIONS" },
  ];

  return (
    <>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.heading}>
          <h2>Important Announcements</h2>
          <p>Create and broadcast announcements to all employees.</p>
        </div>

        <div className={styles.btncontainer}>
          <div className={styles.dateContainer}>
            <div
              className={styles.dateButton}
              onClick={() => {
                setTempDate(selectedDate);
                setIsOpen((prev) => !prev);
              }}
            >
              <span className={styles.icon}>
                <Calender />
              </span>

              <span className={styles.text}>
                {selectedDate ? formatDate(selectedDate) : "Select Date"}
              </span>

              <span className={styles.arrow}>▾</span>
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
                    onClick={() => setTempDate(null)}
                  >
                    Clear
                  </button>

                  <button
                    className={styles.cancel}
                    onClick={() => setIsOpen(false)}
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

          <button className={styles.announcementbtn}>
            <Plus className={styles.plus} />
            New Announcement
          </button>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className={styles.search}>
        <div className={styles.btns}>
          <button className={styles.valid}>All</button>
          <button className={styles.valid}>Important</button>
          <button className={styles.valid}>General</button>
          <button className={styles.valid}>Drafts</button>
          <button className={styles.valid}>Archived</button>
        </div>

        <div className={styles.filterexport}>
          <div className={styles.searchbar}>
            <img src={searchicon} alt="search" />
            <input
              placeholder="Search by name, role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
        isLoading={false}
        isError={false}
        renderRow={() => null}
      />

      {/* PAGINATION (KEPT) */}
      {filteredData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          indexOfFirst={indexOfFirst}
          indexOfLast={indexOfLast}
          totalItems={filteredData.length}
          onPageChange={goToPage}
          onNext={nextPage}
          onPrev={prevPage}
        />
      )}
    </>
  );
};

export default Announcement;
