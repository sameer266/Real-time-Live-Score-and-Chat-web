import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import "../style/slidebar.css"; // Add your CSS file

import {  CgData } from "react-icons/cg"; //Icon logo

const Slidebar = ({ toggleSidebar, hideSidebar }) => {
  const { username  } = useSelector((state) => state.auth); // Assuming Redux provides username and role
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

        {/*======== Header ===========*/}
        <div className="sidebar-header">
          <CgData color="#20ffae" size={24} />
          <h2 style={{color:"#20ffae"}}>WE SCORE</h2>
          <button className="close-btn" onClick={hideSidebar}>
            <FiX />
          </button>
        </div>

        {/*======= Links ========= */}
        <ul className="sidebar-links">
          <li>
            <Link
              to="/dashboard"
              className={activeLink === "dashboard" ? "active" : ""}
              onClick={() => handleLinkClick("dashboard")}
            >
              Dashboard
            </Link>
          </li>

          {/* =========== Trending ============== */}
          <li>
            <Link
              to="/"
              className={activeLink === "home" ? "active" : ""}
              onClick={() => handleLinkClick("home")}
            >
              Home
            </Link>
          </li>


          {/* =========Challenging =============== */}
          <li>
            <Link
              to="/story"
              className={activeLink === "story" ? "active" : ""}
              onClick={() => handleLinkClick("story")}
            >
              Story
            </Link>
          </li>

          {/* ========Spark =============== */}
          <li>
            <Link
              to="/spark"
              className={activeLink === "spark" ? "active" : ""}
              onClick={() => handleLinkClick("spark")}
            >
              Spark
            </Link>
          </li>

        </ul>

        {/*=========== Footer ============*/}
        <div className="sidebar-footer">
          {username && (
            <div className="user-info">
              <p style={{color:"red"}}>{username.toUpperCase()}</p>
             
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Slidebar;
