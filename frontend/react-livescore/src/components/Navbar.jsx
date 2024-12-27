import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Icons
import { CgHome, CgPoll, CgData } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { MdChat, MdMoreHoriz } from "react-icons/md"; // Chat icon from MdChat

import "../style/navbar.css"

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const location = useLocation();
  const path = location.pathname;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMatchesDropdownOpen, setIsMatchesDropdownOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMatchesDropdown = () => {
    setIsMatchesDropdownOpen(!isMatchesDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex shadow-md py-2 px-4 sm:px-6 bg-white font-[sans-serif] min-h-[75px] tracking-wide">
        <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
          {/* Left Section: Logo */}
          <Link to="/" className="flex items-center font-bold text-lg">
            <CgData color="red" size={24} />
            <span className="ml-2">WE SCORE</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={handleToggleMenu}
            className="block sm:hidden text-2xl text-[#333] hover:text-[#ff0000]"
          >
            {isMenuOpen ? "X" : "☰"}
          </button>

          {/* Center Section: Menu Items */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } sm:flex items-center justify-center space-x-8`}
          >
            {/* Home */}
            <Link
              to="/"
              className={`text-xl text-[#333] hover:text-[#ff0000] ${
                path === "/" ? "text-[#a63e09]" : ""
              }`}
            >
              <CgHome size={24} />
            </Link>

            {/* Polls */}
            <Link
              to="/polls/"
              className={`text-xl text-[#333] hover:text-[#ff0000] ${
                path === "/polls/" ? "text-[#a63e09]" : ""
              }`}
            >
              <CgPoll size={24} />
            </Link>

            {/* Matches */}
            <div
              className="relative"
              onMouseEnter={() => setIsMatchesDropdownOpen(true)}
              onMouseLeave={() => setIsMatchesDropdownOpen(false)}
            >
              <Link
                to="/matches/"
                onClick={handleMatchesDropdown}
                className="text-xl text-[#333] hover:text-[#ff0000]"
              >
                <MdMoreHoriz size={24} />
              </Link>

              {/* Dropdown */}
              {isMatchesDropdownOpen && (
                <ul className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-lg">
                  <li className="py-2 px-4 hover:bg-gray-100">
                    <Link to="/matches/live/" className="block text-sm font-semibold">
                      Live
                    </Link>
                  </li>
                  <li className="py-2 px-4 hover:bg-gray-100">
                    <Link to="/matches/upcoming/" className="block text-sm font-semibold">
                      Upcoming
                    </Link>
                  </li>
                  <li className="py-2 px-4 hover:bg-gray-100">
                    <Link to="/matches/finished/" className="block text-sm font-semibold">
                      Finished
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Chat */}
            <Link
              to="/chat/"
              className={`text-xl text-[#333] hover:text-[#ff0000] ${
                path === "/chat/" ? "text-[#a63e09]" : ""
              }`}
            >
              <MdChat size={24} />
            </Link>
          </div>

          {/* Right Section: Authentication / Logout */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <a
                style={{ cursor: "pointer" }}
                onClick={handleLogout}
                className="text-xl text-[#333] hover:text-[#ff0000]"
              >
                <FiLogOut size={24} />
              </a>
            ) : (
              <>
                <Link
                  to="/signup/"
                  className="px-3.5 py-[7px] text-[15px] rounded font-semibold text-[#007bff] border border-[#007bff] hover:bg-[#007bff] transition-all ease-in-out duration-300 bg-transparent hover:text-white"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login/"
                  className="px-3.5 py-[7px] text-[15px] rounded font-semibold text-[#007bff] border border-[#007bff] hover:bg-[#007bff] transition-all ease-in-out duration-300 bg-transparent hover:text-white"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="mt-[80px]"></div> {/* Margin for fixed navbar */}
    </>
  );
};

export default Navbar;
