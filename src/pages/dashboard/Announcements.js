import React from "react";
import styles from "../../pages/dashboard/dashboard.module.css";
import icon31 from "../../assets/announcementsvg.svg";

const Announcements = () => {
  return (
    <div className={styles.announcements}>
      <div className={styles.announcementheader}>
        <div className={styles.announcementheaderLeft}>
          <img src={icon31} alt="mic" />
          <h3>Announcements</h3>
        </div>
        <span> + </span>
      </div>

      <div className={styles.announcementPrimary}>
        <button className={styles.update}>Policy Update</button>
        <h3>New Leave Policy 2024</h3>
        <p className={styles.last}>Effective from Nov 1st,all sick leaves...</p>
      </div>
      <div className={styles.announcementSecondary}>
        <button className={styles.update}>Event</button>
        <h3>Diwali Celebration</h3>
        <p className={styles.last}>Join us this friday at 4pm in the cafe.</p>
      </div>
    </div>
  );
};

export default Announcements;
