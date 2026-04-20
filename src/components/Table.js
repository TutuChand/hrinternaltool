import React from "react";
import styles from "../styles/Table.module.css";

const ReusableTable = ({
  columns = [],
  data = [],
  renderRow,
  isLoading,
  isError,
}) => {
  return (
    <div className={styles.tableScroll}>
      <div className={styles.tablewrapper}>
        <table>
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i} className={col.className || ""}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={columns.length}>
                  <div className={styles.tableLoader}>
                    <div className={styles.loader}></div>
                    <p>Loading employees...</p>
                  </div>
                </td>
              </tr>
            )}

            {isError && !isLoading && (
              <tr>
                <td colSpan={columns.length} className={styles.errorText}>
                  Failed to load employees
                </td>
              </tr>
            )}

            {!isLoading && !isError && data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className={styles.empty}>
                  No employees found
                </td>
              </tr>
            )}

            {!isLoading &&
              !isError &&
              data.map((item, index) =>
                renderRow ? renderRow(item, index) : null,
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReusableTable;
