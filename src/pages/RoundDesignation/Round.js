import React from "react";
import styles from "../RoundDesignation/round.module.css";
import { ReactComponent as Plus } from "../../assets/plus svg.svg";
import { ReactComponent as Edit } from "../../assets/edit.svg";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { useRoles } from "../../hooks/Rolesdesignation/RolesHook";

const Round = () => {
  const { data, isLoading, isFetching, isError } = useRoles();

  const designations = data?.data || [];

  const sections = [
    {
      title: "Department",
      description: "List of all available departments",
      items: [...new Set(designations.map((d) => d.departmentId?.name))],
      buttonText: "Add Department",
    },
    {
      title: "Job Designations",
      description: "Manage job titles and their interview stages.",
      items: [...new Set(designations.map((d) => d.title))],
      buttonText: "Add Designation",
    },
    {
      title: "Interview Rounds",
      description: "List of all available interview rounds.",
      items: [
        ...new Set(
          designations.flatMap((d) => d.rounds?.map((r) => r.roundId?.name)),
        ),
      ],
      buttonText: "Add Round",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <h2>Round & Designation</h2>
          <p>
            Manage interview rounds and job designations for your hiring
            pipeline.
          </p>

          {isFetching && !isLoading && (
            <span className={styles.updating}>Updating...</span>
          )}
        </div>

        <div className={styles.grid}>
          {sections.map((section, index) => (
            <div
              key={index}
              className={`${styles.department} ${
                index === sections.length - 1 ? styles.scrollable : ""
              }`}
            >
              <h3>{section.title}</h3>
              <p>{section.description}</p>

              <div className={styles.roles}>
                {isLoading ? (
                  <div className={styles.cardLoaderWrapper}>
                    <div className={styles.loader}></div>
                  </div>
                ) : isError ? (
                  <p className={styles.errorText}>Failed to load data</p>
                ) : section.items.length === 0 ? (
                  <p className={styles.empty}>No data available</p>
                ) : (
                  section.items.map((item, i) => (
                    <div key={i} className={styles.itemRow}>
                      <p className={styles.itemText}>{item}</p>

                      <div className={styles.hoverActions}>
                        <button className={styles.editBtn}>
                          <Edit />
                        </button>
                        <button className={styles.deleteBtn}>
                          <Delete />
                        </button>
                      </div>

                      {i !== section.items.length - 1 && (
                        <hr className={styles.borderLine} />
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className={styles.buttonwrapper}>
                <button className={styles.button}>
                  <Plus className={styles.icon} /> {section.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Round;
