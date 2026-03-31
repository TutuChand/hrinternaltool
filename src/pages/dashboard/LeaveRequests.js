import React from "react";
import styles from "../../pages/dashboard/dashboard.module.css";
import icon19 from "../../assets/Avatar.png";
import icon20 from "../../assets/Avatar (1).png";

const LeaveRequests = () => {
  return (
    
      <div className={styles.bigcard}>
        <div className={styles.bigcardHeader}>
          <h3>Pending Leave Requests</h3>
          <p>View All</p>
        </div>

        <div className={styles.leaveList}>
          <div className={styles.leaveItem}>
            <div className={styles.left}>
              <img src={icon19} alt="" />
              <div>
                <h4>Raj Patel</h4>
                <span>Sick Leave • Apr 12 - Apr 14</span>
              </div>
            </div>

            <div className={styles.right}>
              <div className={styles.actions}>
                <button className={styles.details}>Details</button>
                <button className={styles.approve}>Approve</button>
              </div>
            </div>
          </div>

          <div className={styles.leaveItem}>
            <div className={styles.left}>
              <img src={icon20} alt="" />
              <div>
                <h4>Amina Okan</h4>
                <span>Casual Leave • Apr 20</span>
              </div>
            </div>

            <div className={styles.right}>
              <div className={styles.actions}>
                <button className={styles.details}>Details</button>
                <button className={styles.approve}>Approve</button>
              </div>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default LeaveRequests;
