import React, { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useLogout } from "../hooks/auth/Logouthook";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/authAtoms";
import styles from "../pages/dashboard/dashboard.module.css";
import icon13 from "../assets/dummypic.png";
import { FiLogOut } from "react-icons/fi";

const Navbar = ({ onMenuClick }) => {
  const location = useLocation();
  const logoutMutation = useLogout();
  const [user] = useAtom(userAtom);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const isDashboard =
    location.pathname === "/dashboard" || location.pathname === "/dashboard/";

  const pathnames = location.pathname.split("/").filter(Boolean);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logoutMutation.mutate();
    setDropdownOpen(false);
  };

  const getInitials = (firstName, lastName) => {
    if (!firstName && !lastName) return "U";
    return (firstName?.[0] || "") + (lastName?.[0] || "");
  };

  return (
    <div className={styles.header}>
      {/* LEFT SIDE */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
        {/* Hamburger */}
        <div
          className={styles.hamburger}
          onClick={onMenuClick}
          style={{ marginTop: "4px" }}
        >
          ☰
        </div>

        {/* Title + Subtitle */}
        <div>
          {isDashboard ? (
            <>
              <h2 className={styles.title}>Dashboard</h2>
              <p className={styles.subtitle}>
                Welcome back, {user?.firstName || "User"} here's what happening
                today 👋
              </p>
            </>
          ) : (
            <div className={styles.breadcrumb}>
              <Link to="/dashboard">Dashboard</Link>
              {pathnames.slice(1).map((name, index) => (
                <span key={index}>
                  {" > "}
                  {name.replace("-", " ")}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE (ONLY PROFILE) */}
      <div className={styles.headerRight}>
        <div className={styles.profileDropdown} ref={dropdownRef}>
          <button
            className={styles.profile}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            title="Profile Menu"
          >
            {user?.avatar ? (
              <img
                src={`https://niyamra.ducktaleit.com${user.avatar}`}
                alt="Profile"
                className={styles.profileImg}
                onError={(e) => (e.target.src = icon13)}
              />
            ) : (
              <div className={styles.avatarFallback}>
                {getInitials(user?.firstName, user?.lastName).toUpperCase()}
              </div>
            )}
          </button>

          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                <FiLogOut size={18} style={{ marginRight: "6px" }} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
