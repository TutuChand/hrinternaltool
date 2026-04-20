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
import { useBirthday } from "../../hooks/Birthday/BirthdayHook";
import usePagination from "../../hooks/Pagination/PaginationHook";
import searchicon from "../../assets/search.svg.png";

const Birthday = () => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [tempDate, setTempDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("upcoming");

  const employeesPerPage = 6;

  const { data, isLoading, isError } = useBirthday();
  const birthdayList = data?.data || [];

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "-";

  const getUpcomingBirthday = (dob) => {
    if (!dob) return "-";

    const today = new Date();
    const birthDate = new Date(dob);

    let upcoming = new Date(
      today.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate(),
    );

    if (upcoming < today) {
      upcoming.setFullYear(today.getFullYear() + 1);
    }

    return formatDate(upcoming);
  };

  const getAge = (dob) => {
    if (!dob) return "-";

    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();

    const hasBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    if (!hasBirthdayPassed) age--;

    return age;
  };

  const getInitials = (first, last) =>
    `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();

  const avatarColors = [
    "#FDE68A",
    "#BFDBFE",
    "#C7D2FE",
    "#FBCFE8",
    "#BBF7D0",
    "#FED7AA",
    "#DDD6FE",
    "#FEF9C3",
  ];

  const getAvatarColor = (name = "") => {
    const index =
      name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      avatarColors.length;
    return avatarColors[index];
  };

  const getDaysLeftLabel = (dob) => {
    if (!dob) return "-";

    const today = new Date();
    const birthDate = new Date(dob);

    let upcoming = new Date(
      today.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate(),
    );

    if (upcoming < today) {
      upcoming.setFullYear(today.getFullYear() + 1);
    }

    const diffDays = Math.ceil((upcoming - today) / (1000 * 60 * 60 * 24));

    if (diffDays <= 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} left`;
    if (diffDays <= 30) return "This month";
    if (diffDays <= 90)
      return `${Math.floor(diffDays / 30)} month${
        diffDays > 60 ? "s" : ""
      } left`;

    return "Later this year";
  };

  // FILTER
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
          <h2>Birthday Management</h2>
          <p>Track employee birthdays and send automated wishes.</p>
        </div>

        {/* DATE PICKER */}
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
      </div>

      {/* SEARCH + FILTER */}
      <div className={styles.search}>
        <div className={styles.btns}>
          <button
            className={filterType === "upcoming" ? styles.record : styles.valid}
            onClick={() => setFilterType("upcoming")}
          >
            Upcoming
          </button>

          <button
            className={filterType === "month" ? styles.record : styles.valid}
            onClick={() => setFilterType("month")}
          >
            This month
          </button>

          <button
            className={filterType === "all" ? styles.record : styles.valid}
            onClick={() => setFilterType("all")}
          >
            All Staff
          </button>
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
        isLoading={isLoading}
        isError={isError}
        renderRow={(emp) => {
          const fullName = `${emp.firstName || ""} ${emp.lastName || ""}`;
          const dob = emp.dateOfBirth;

          return (
            <tr key={emp._id}>
              <td>
                <div className={styles.employeename}>
                  {emp.profileImage ? (
                    <img
                      src={emp.profileImage}
                      alt="avatar"
                      className={styles.avatarImage}
                    />
                  ) : (
                    <div
                      className={styles.avatarPlaceholder}
                      style={{
                        backgroundColor: getAvatarColor(fullName),
                        color: "#1e293b",
                      }}
                    >
                      {getInitials(emp.firstName, emp.lastName)}
                    </div>
                  )}

                  <div>
                    <div className={styles.name}>{fullName || "-"}</div>
                  </div>
                </div>
              </td>

              <td className={styles.role}>{emp.designation || "-"}</td>
              <td className={styles.dob}>{formatDate(dob)}</td>

              <td>
                <div>
                  <div className={styles.upcoming}>{getDaysLeftLabel(dob)}</div>
                  <div
                    style={{
                      textAlign: "left",
                      fontSize: "13px",
                      color: "#8e8670",
                    }}
                  >
                    {getUpcomingBirthday(dob)}
                  </div>
                </div>
              </td>

              <td className={styles.age}>{emp.age || getAge(dob)}</td>

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
        }}
      />

      {/* PAGINATION */}
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

export default Birthday;
