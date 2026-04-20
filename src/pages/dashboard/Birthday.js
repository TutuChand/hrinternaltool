import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../pages/dashboard/dashboard.module.css";
import icon27 from "../../assets/birthday.png";
import { ReactComponent as Message } from "../../assets/Arrow.svg";
import { useBirthday } from "../../hooks/Birthday/BirthdayHook";

const Birthday = () => {
  const { data, isLoading } = useBirthday();
  const navigate = useNavigate();

  const today = new Date();


  const getNextBirthday = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const next = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());

    if (next < today) next.setFullYear(today.getFullYear() + 1);
    return next;
  };

  const formatDate = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    return dob.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  };

  const allBirthdays = data?.data || [];


  const sortedAll = [...allBirthdays].sort(
    (a, b) => getNextBirthday(a.dateOfBirth) - getNextBirthday(b.dateOfBirth),
  );

 
  const birthdays = sortedAll.slice(0, 5);


  const getInitials = (firstName = "", lastName = "") => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };


  const colors = ["#efede4"];

  const getColor = (name = "") => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className={styles.birthdays}>
      {/* Header */}
      <div className={styles.birthdayHeader}>
        <div className={styles.birthdayTitle}>
          <span>
            <img src={icon27} alt="" />
          </span>
          <h3>Birthdays</h3>
        </div>

        <button
          className={styles.seeAllBtn}
          onClick={() => navigate("/birthday")}
        >
          See All
        </button>
      </div>

      {/* List */}
      <div className={styles.birthdayList}>
        {isLoading ? (
          <>
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className={styles.birthdayCard}>
                <div className={styles.skeletonProfile}></div>
                <div className={styles.birthdayInfo}>
                  <div className={styles.skeletonText}></div>
                  <div className={styles.skeletonSubText}></div>
                </div>
              </div>
            ))}
          </>
        ) : birthdays.length === 0 ? (
          <p className={styles.noData}>No birthdays found</p>
        ) : (
          birthdays.map((emp) => (
            <div key={emp._id} className={styles.birthdayCard}>
              {emp.profileImage ? (
                <img
                  src={emp.profileImage}
                  alt="Profile"
                  className={styles.profileIcon}
                />
              ) : (
                <div
                  className={styles.avatar}
                  style={{
                    backgroundColor: getColor(emp.firstName),
                  }}
                >
                  {getInitials(emp.firstName, emp.lastName)}
                </div>
              )}

              <div className={styles.birthdayInfo}>
                <p>
                  {emp.firstName} {emp.lastName}
                </p>

        
                <span>{formatDate(emp.dateOfBirth)}</span>
              </div>

              <button className={styles.birthdayActionBtn}>
               <Message className={styles.message}/>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Birthday;
