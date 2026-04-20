import React from "react";
import { useDashboardStats } from "../../hooks/Dashboard/dashboardhook";
import styles from "../../pages/dashboard/dashboard.module.css";
import icon14 from "../../assets/people.png";
import icon15 from "../../assets/increase.png";
import icon16 from "../../assets/pulse.png";
import icon17 from "../../assets/cup.png";
import icon18 from "../../assets/calender.png";

const StatCards = () => {
  const { data } = useDashboardStats();

  return (
    <div className={styles.cards}>
      {/* Total Employees (Dynamic) */}
      <div className={styles.card}>
        <div className={styles.cardtop}>
          <p>Total Employees</p>
          <img src={icon14} alt="icon" />
        </div>
        <div className={styles.cardbody}>
          <div className={styles.text}>
            <h2>{data?.data?.totalEmployees ?? 0}</h2>
            <img src={icon15} alt="" />
            <span>+4 this month</span>
          </div>
        </div>
      </div>

      {/* Productivity (Hardcoded) */}
      <div className={styles.card}>
        <div className={styles.cardtop}>
          <p>Productivity Score</p>
          <img src={icon16} alt="" />
        </div>
        <div className={styles.cardbody}>
          <div className={styles.text}>
            <h2>87%</h2>
            <img src={icon15} alt="" />
            <span>+2.4% vs last month</span>
          </div>
        </div>
      </div>

      {/* On Leave (Hardcoded) */}
      <div className={styles.card}>
        <div className={styles.cardtop}>
          <p>On Leave Today</p>
          <img src={icon17} alt="" />
        </div>
        <div className={styles.cardbody}>
          <div className={styles.text}>
            <h2>8</h2>
            <span>2 Sick , 6 Planned</span>
          </div>
        </div>
      </div>

      {/* Interviews (Hardcoded) */}
      <div className={styles.card}>
        <div className={styles.cardtop}>
          <p>Interviews Today</p>
          <img src={icon18} alt="" />
        </div>
        <div className={styles.cardbody}>
          <div className={styles.text}>
            <h2>5</h2>
            <span>2 pending feedback</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCards;
