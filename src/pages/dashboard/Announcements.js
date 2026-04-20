import React from "react";
import styles from "../../pages/dashboard/dashboard.module.css";
import icon31 from "../../assets/announcementsvg.svg";
import { Link } from "react-router-dom";
import { useAnnoucement } from "../../hooks/Annoucements/AnnoucementHook";

const Announcements = () => {
  const { data, isLoading, isError } = useAnnoucement();

  const announcements = data?.data || [];

  const renderCenteredState = (text) => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "140px",
        width: "100%",
        fontSize: "14px",
        fontWeight: 500,
        color: "#666",
        textAlign: "center",
      }}
    >
      {text}
    </div>
  );

  return (
    <div className={styles.announcements}>
      <div className={styles.announcementheader}>
        <div className={styles.announcementheaderLeft}>
          <img src={icon31} alt="mic" />
          <h3>Announcements</h3>
        </div>
        <Link to="/announcement" className={styles.viewReport}>
          View all
        </Link>
      </div>

      {isLoading && renderCenteredState("Loading announcements...")}

      {isError && renderCenteredState("Failed to load announcements.")}

      {!isLoading &&
        !isError &&
        announcements.length === 0 &&
        renderCenteredState("No announcements found.")}

      {!isLoading && !isError && announcements.length > 0 && (
        <>
          {announcements[0] && (
            <div className={styles.announcementPrimary}>
              <button className={styles.update}>
                {announcements[0].type || "Update"}
              </button>
              <h3>{announcements[0].title}</h3>
              <p className={styles.last}>
                {announcements[0].description || announcements[0].message || ""}
              </p>
            </div>
          )}

          {announcements[1] && (
            <div className={styles.announcementSecondary}>
              <button className={styles.update}>
                {announcements[1].type || "Update"}
              </button>
              <h3>{announcements[1].title}</h3>
              <p className={styles.last}>
                {announcements[1].description || announcements[1].message || ""}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Announcements;
