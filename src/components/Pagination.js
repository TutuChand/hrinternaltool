import React from "react";
import styles from "../styles/Pagination.module.css";

const Pagination = ({
  currentPage,
  totalPages,
  indexOfFirst,
  indexOfLast,
  totalItems,
  onPageChange,
  onNext,
  onPrev,
}) => {
    
  return (
    <div className={styles.page}>
      <p>
        {`Showing ${indexOfFirst + 1}–${Math.min(
          indexOfLast,
          totalItems,
        )} of ${totalItems}`}
      </p>

      <div className={styles.pagebutton}>
        <button
          className={`${styles.pageButton} ${styles.previous}`}
          disabled={currentPage === 1}
          onClick={onPrev}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`${styles.pageButton} ${
              currentPage === i + 1 ? styles.activePage : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          className={`${styles.pageButton} ${styles.next}`}
          disabled={currentPage === totalPages}
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
