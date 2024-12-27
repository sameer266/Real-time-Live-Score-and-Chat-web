import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Assuming you are using Redux
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi'; // Close icon from react-icons
import '../style/slidebar.css'; // Make sure to add relevant CSS

const Slidebar = ({ toggleSidebar, hideSidebar }) => {
  const { username } = useSelector((state) => state.auth); // Assuming you're using Redux to get the username
  const [isSidebarVisible, setIsSidebarVisible] = useState(toggleSidebar); // Initialize state with prop

  useEffect(() => {
    setIsSidebarVisible(toggleSidebar); // Update sidebar visibility when prop changes
  }, [toggleSidebar]);

  return (
    <>
      {/* Sidebar Overlay */}
      {isSidebarVisible && <div className="sidebar-overlay" onClick={hideSidebar}></div>}

      <div className={`sidebar ${isSidebarVisible ? 'show' : 'hide'}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="close-btn" onClick={hideSidebar}>
            <FiX />
          </button>
        </div>
        <ul className="sidebar-links">
          <li>
            <Link to="/" onClick={hideSidebar}>Home</Link>
          </li>
          {username && (
            <>
              <li>
                <Link to="/dashboard/" onClick={hideSidebar}>Profile</Link>
              </li>
              <li>
                <Link to="/latest" onClick={hideSidebar}>Latest</Link>
              </li>
              <li>
                <Link to="/settings" onClick={hideSidebar}>Settings</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Slidebar;
