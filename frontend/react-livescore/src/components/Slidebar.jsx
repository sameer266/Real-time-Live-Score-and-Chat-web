import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import "../style/slidebar.css"; // Add your CSS file

const Slidebar = ({ toggleSidebar, hideSidebar }) => {
  const { username, role } = useSelector((state) => state.auth); // Assuming Redux provides username and role
  const [isSidebarVisible, setIsSidebarVisible] = useState(toggleSidebar);

  useEffect(() => {
    setIsSidebarVisible(toggleSidebar);
  }, [toggleSidebar]);

  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link) => {
    setActiveLink(link);
    hideSidebar();
  };

  return (
    <>
      {isSidebarVisible && <div className="sidebar-overlay" onClick={hideSidebar}></div>}

      <div className={`sidebar ${isSidebarVisible ? "show" : "hide"}`}>
        {/* Header */}
        <div className="sidebar-header">
          <h2>CODEPEN</h2>
          <button className="close-btn" onClick={hideSidebar}>
            <FiX />
          </button>
        </div>

        {/* Links */}
        <ul className="sidebar-links">
          <li>
            <Link
              to="/following"
              className={activeLink === "following" ? "active" : ""}
              onClick={() => handleLinkClick("following")}
            >
              Following
            </Link>
          </li>
          <li>
            <Link
              to="/trending"
              className={activeLink === "trending" ? "active" : ""}
              onClick={() => handleLinkClick("trending")}
            >
              Trending
            </Link>
          </li>
          <li>
            <Link
              to="/challenges"
              className={activeLink === "challenges" ? "active" : ""}
              onClick={() => handleLinkClick("challenges")}
            >
              Challenges
            </Link>
          </li>
          <li>
            <Link
              to="/spark"
              className={activeLink === "spark" ? "active" : ""}
              onClick={() => handleLinkClick("spark")}
            >
              Spark
            </Link>
          </li>
          <li>
            <Link
              to="/pro"
              className={activeLink === "pro" ? "active" : ""}
              onClick={() => handleLinkClick("pro")}
            >
              CodePen Pro
            </Link>
          </li>
        </ul>

        {/* Footer */}
        <div className="sidebar-footer">
          {username && (
            <div className="user-info">
              <p>{username}</p>
              <span>{role}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Slidebar;
