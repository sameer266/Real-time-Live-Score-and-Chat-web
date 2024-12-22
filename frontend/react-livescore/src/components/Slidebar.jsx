import React from 'react';
import { Link } from 'react-router-dom';  // Assuming you're using react-router for navigation
import '../style/slidebar.css';  // Create a new CSS file for sidebar styles

const Slidebar = () => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/latest">Latest</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Slidebar;
