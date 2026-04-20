import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../pages/createemployee/PersonalInfo.module.css";

const Stepper = ({ steps }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentStepIndex = steps.findIndex((step) =>
    location.pathname.includes(step.path),
  );
  const currentStep = currentStepIndex !== -1 ? currentStepIndex + 1 : 1;

  const handleStepClick = (stepNumber, path) => {
    if (currentStep >= stepNumber) {
      navigate(`/employee/${path}`);
    }
  };

  return (
    <div className={styles.stepperContainer}>
      <div className={styles.stepper}> 
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;

          return (
            <div
              key={stepNumber}
              className={`${styles.stepWrapper} ${
                isActive || isCompleted ? styles.activeStep : ""
              }`}
              onClick={() => handleStepClick(stepNumber, step.path)}
            >
              <div className={styles.lineIndicator}></div>

              <div className={styles.stepContent}>
                <div
                  className={`${styles.circle} ${
                    isCompleted ? styles.completed : ""
                  } ${isActive ? styles.activeCircle : ""}`}
                >
                  {isCompleted ? (
                    <span className={styles.checkMark}>✓</span>
                  ) : (
                    <span className={styles.stepNum}>{stepNumber}</span>
                  )}
                </div>
                <span
                  className={`${styles.label} ${isActive ? styles.boldLabel : ""}`}
                >
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
