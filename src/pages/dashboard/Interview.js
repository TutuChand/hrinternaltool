import React from "react";
import styles from "../../pages/dashboard/dashboard.module.css";
import icon21 from "../../assets/jd.png";
import icon22 from "../../assets/lm.png";
import icon23 from "../../assets/as.png";

const Interview = () => {
  return (
    <div className={styles.cardInterview}>
      <div className={styles.cardInterviewHeader}>
        <h3>Today's Interview</h3>
        <p>See All Hiring</p>
      </div>

      <div className={styles.interviewList}>
        <div className={styles.interviewItem}>
          <div className={styles.interviewLeft}>
            <img src={icon21} alt="Interviewee" />
            <div>
              <h4>John Doe</h4>
              <span className={styles.interviewrole}>
                Frontend Developer • Technical Round
              </span>
            </div>
          </div>
          <div className={styles.interviewRight}>
            <div className={styles.interviewactions}>
              <button className={styles.interviewdetails1}>Scheduled</button>
              <p>Today, 2:00 PM</p>
            </div>
          </div>
        </div>

        <div className={styles.interviewItem}>
          <div className={styles.interviewLeft}>
            <img src={icon22} alt="Interviewee" />
            <div>
              <h4>Lisa Marie</h4>
              <span className={styles.interviewrole}>
                UX Designer • HR Round
              </span>
            </div>
          </div>
          <div className={styles.interviewRight}>
            <div className={styles.interviewactions}>
              <button className={styles.interviewdetails2}>Pending</button>
            </div>
          </div>
        </div>

        <div className={styles.interviewItem}>
          <div className={styles.interviewLeft}>
            <img src={icon23} alt="Interviewee" />
            <div>
              <h4>Alex Smith</h4>
              <span className={styles.interviewrole}>
                Product Manager • HR Round
              </span>
            </div>
          </div>
          <div className={styles.interviewRight}>
            <div className={styles.interviewactions}>
              <button className={styles.interviewdetails3}>Rejected</button>
              <p>After HR Round</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
