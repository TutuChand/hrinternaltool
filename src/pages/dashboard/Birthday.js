import React from "react";
import styles from "../../pages/dashboard/dashboard.module.css";
import icon27 from "../../assets/birthday.png";
import icon28 from "../../assets/dummymen.png";
import icon29 from "../../assets/message.png";
import icon30 from "../../assets/dummywomen.png";

const Birthday = () => {
  return (
    <div className={styles.birthdays}>
      <div className={styles.birthdayHeader}>
        <span role="img" aria-label="cake">
          <img src={icon27} alt="" />
        </span>
        <h3>Birthdays</h3>
      </div>

      <div className={styles.birthdayCard}>
        <img src={icon30} alt="Profile" className={styles.profileIcon} />
        <div className={styles.birthdayInfo}>
          <p>Yuna Kim</p>
          <span>Today</span>
        </div>
        <button className={styles.birthdayActionBtn}>
          <img src={icon29} alt="Send wishes" />
        </button>
      </div>

      <div className={styles.birthdayCard}>
        <img src={icon28} alt="Profile" className={styles.profileIcon} />
        <div className={styles.birthdayInfo}>
          <p>Tom Wilson</p>
          <span>Tomorrow</span>
        </div>
        <button className={styles.birthdayActionBtn}>
          <img src={icon29} alt="Send wishes" />
        </button>
      </div>
    </div>
  );
};

export default Birthday;
