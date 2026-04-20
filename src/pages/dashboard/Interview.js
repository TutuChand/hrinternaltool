import React from "react";
import styles from "../../pages/dashboard/dashboard.module.css";
import icon21 from "../../assets/jd.png";
import { useHiringList } from "../../hooks/Hiring/HiringListHook";
import { Link } from "react-router-dom";

const Interview = () => {
  const { data, isLoading, isError } = useHiringList();
  const list = data || [];

  return (
    <div className={styles.cardInterview}>
      <div className={styles.cardInterviewHeader}>
        <h3>Recent Hiring Candidates</h3>
        <Link to="/hiring" className={styles.viewReport}>
          View Report
        </Link>
      </div>

      <div className={styles.interviewList}>
        {/* LOADING STATE */}
        {isLoading && (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              padding: "40px 0",
              fontWeight: 500,
              color: "#666",
            }}
          >
            Loading candidates...
          </div>
        )}

        {/* ERROR STATE */}
        {!isLoading && isError && (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              padding: "40px 0",
              fontWeight: 500,
              color: "red",
            }}
          >
            Failed to load candidates
          </div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && !isError && list.length === 0 && (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              padding: "40px 0",
              fontWeight: 500,
              color: "#666",
            }}
          >
            No candidates found.
          </div>
        )}

        {/* DATA RENDER */}
        {!isLoading &&
          !isError &&
          list.map((item) => (
            <div key={item?._id} className={styles.interviewItem}>
              <div className={styles.interviewLeft}>
                <img src={item?.avatar || icon21} alt="Interviewee" />
                <div>
                  <h4>{item?.name || "Unknown"}</h4>
                  <span className={styles.interviewrole}>
                    {item?.jobRole || "Role"} • {item?.round || "Round"}
                  </span>
                </div>
              </div>

              <div className={styles.interviewRight}>
                <div className={styles.interviewactions}>
                  <button
                    className={
                      item?.status === "Scheduled"
                        ? styles.interviewdetails1
                        : item?.status === "Pending"
                          ? styles.interviewdetails2
                          : styles.interviewdetails3
                    }
                  >
                    {item?.status || "Pending"}
                  </button>

                  {item?.scheduleTime && <p>{item.scheduleTime}</p>}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Interview;
