import React from "react";
import { Outlet } from "react-router-dom";
import Stepper from "../../components/Stepper";
import styles from "../createemployee/PersonalInfo.module.css";

const EmployeeForm = () => {
  const steps = [
    { path: "personal", label: "Personal Info" },
    { path: "details", label: "Employee Details" },
    { path: "documents", label: "Documents" },
  ];

  return (
    <div className={styles.container}>
      <Stepper steps={steps} />

      <div className={styles.formContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeForm;