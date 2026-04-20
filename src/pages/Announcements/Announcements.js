import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import styles from "../../pages/Birthdays/Birthday.module.css";
import ReusableTable from "../../components/Table";
import Pagination from "../../components/Pagination";
import { ReactComponent as Export } from "../../assets/export.svg";
import { ReactComponent as Calender } from "../../assets/calender.svg";
import { ReactComponent as Plus } from "../../assets/plus svg.svg";
import usePagination from "../../hooks/Pagination/PaginationHook";
import searchicon from "../../assets/search.svg.png";

const Announcement = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [tempDate, setTempDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 6;

  const announcementList = [];

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "-";

  const filteredData = announcementList.filter((item) => {
    const title = (item.title || "").toLowerCase();
    const type = (item.type || "").toLowerCase();
    const search = searchTerm.toLowerCase();

    return title.includes(search) || type.includes(search);
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
} = usePagination(filteredData, itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, setCurrentPage]);

  const columns = [
    { label: "TITLE" },
    { label: "TYPE" },
    { label: "DATE" },
    { label: "STATUS" },
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
        renderRow={(item) => (
          <tr key={item.id}>
            <td>{item.title || "-"}</td>
            <td>{item.type || "-"}</td>
            <td>{formatDate(item.date)}</td>
            <td>{item.status || "-"}</td>
            <td>-</td>
          </tr>
        )}
      />
      {filteredData.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          No announcements found
        </div>
      )}

      {/* PAGINATION*/}
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
