import React, { useState } from "react";
import { Link,useLocation,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



// Icons
import { CgData } from "react-icons/cg";

const Navbar = () => {


  const {isAuthenticated,username}=useSelector((state)=>state.auth)

  const navigate=useNavigate()

// ======Current locatio======
const location=useLocation();
const path=location.pathname;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMatchesDropdownOpen, setIsMatchesDropdownOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMatchesDropdown = () => {
    setIsMatchesDropdownOpen(!isMatchesDropdownOpen);
  };

  const handleLogout=()=>{
    localStorage.clear();
    window.location.href="/";


  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex shadow-md py-4 px-4 sm:px-6 bg-white font-[sans-serif] min-h-[75px] tracking-wide">
        <div className="flex flex-wrap items-center gap-5 w-full max-w-screen-xl mx-auto">
          {/* Logo */}
          <Link to="/" className="font-bold">
            <span className="center">
              <CgData color="red" size={20} />
            </span>
            WE SCORE
          </Link>

          {/* Navbar menu */}
          <div
            id="collapseMenu"
            className={`${isMenuOpen ? "block" : "hidden"} lg:!flex lg:ml-auto fixed inset-0 lg:static lg:bg-transparent bg-white max-lg:w-3/4 max-lg:top-0 max-lg:right-0 max-lg:shadow-md max-lg:h-full max-lg:overflow-y-auto`}
          >
            <ul className="lg:flex gap-4 max-lg:space-y-3 max-lg:px-6 max-lg:py-10">
              
              
              {/*======  Logo====== */}
              <li className="mb-6 hidden max-lg:block">
                <Link to="/">
                  <CgData size={50} color="red" />
                </Link>
              </li>


              {/* =====Home===== */}
              <li className="max-lg:border-b max-lg:py-3">
                <Link
                  to="/"
                  className={`hover:text-[#ff0000] ${ path === "/" ?  "text-[#a63e09]": "text-[#333]" } font-semibold block text-[15px] `}
                >
                  Home
                </Link>
              </li>


              {/*======= Polls========= */}
              <li className="max-lg:border-b max-lg:py-3">
                <Link
                  to="/polls/"
                  className={`hover:text-[#ff0000] ${ path === "/polls/" ?  "text-[#a63e09]": "text-[#333]" } font-semibold block text-[15px] `}
                >
                  Polls
                </Link>
              </li>
              {/* Matches Dropdown */}
              <li
                className="max-lg:border-b max-lg:py-3 relative"
                onMouseEnter={() => setIsMatchesDropdownOpen(true)}
                onMouseLeave={() => setIsMatchesDropdownOpen(false)}
              >
                <Link to="/matches/"
                  onClick={handleMatchesDropdown}
                  className="hover:text-[#fa5818] text-[#333] font-semibold block text-[15px] focus:outline-none"
                >
                  Matches
                  <span className="ml-2">
                    {isMatchesDropdownOpen ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4 inline"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 15l6-6 6 6"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4 inline"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 9l6 6 6-6"
                        />
                      </svg>
                    )}
                  </span>
                </Link>

                {/* Dropdown content */}
                {isMatchesDropdownOpen && (
                  <ul className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-lg">
                    <li className="py-2 px-4 hover:bg-gray-100">
                      <Link
                        to="/matches/live/"
                        className={`block text-sm font-semibold ${path === "/matches/live/" ? "text-[#a63e09]": "text-[#333]" }`}
                      >
                        Live
                      </Link>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-100">
                      <Link
                        to="/matches/upcoming/"
                        className={`block text-sm font-semibold ${path === "/matches/upcoming/" ? "text-[#a63e09]": "text-[#333]" }`}
                      >
                        Upcoming
                      </Link>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-100">
                      <Link
                        to="/matches/finished/"
                        className={`block text-sm font-semibold ${path === "/matches/finished/" ? "text-[#a63e09]": "text-[#333]" }`}>
                        Finished
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              {/* Chat */}
              <li className="max-lg:border-b max-lg:py-3">
                <Link
                  to="/chat/"
                  className={`hover:text-[#ff0000] ${ path === "/chat/" ?  "text-[#a63e09]": "text-[#333]" } font-semibold block text-[15px] `}
                >
                  Chat
                </Link>
              </li>
            </ul>
          </div>

          {/* Toggle buttons */}
          <div className="flex items-center max-lg:ml-auto space-x-4">

            {
              !isAuthenticated?
              ( <>
            <Link to="/signup/" className="px-3.5 py-[7px] text-[15px] rounded font-semibold text-[#007bff] border border-[#007bff] hover:bg-[#007bff] transition-all ease-in-out duration-300 bg-transparent hover:text-white">
              Sign up
            </Link>
            <Link to="/login/" className="px-3.5 py-[7px] text-[15px] rounded font-semibold text-[#007bff] border border-[#007bff] hover:bg-[#007bff] transition-all ease-in-out duration-300 bg-transparent hover:text-white">
              Login
            </Link>
            </>) :
            (
              <a style={{cursor:"pointer"}} onClick={handleLogout} className="px-3.5 py-[7px] text-[15px] rounded font-semibold text-[#007bff] border border-[#007bff] hover:bg-[#007bff] transition-all ease-in-out duration-300 bg-transparent hover:text-white">
              Log Out
            </a>
            )
            }
            <button
              id="toggleOpen"
              className="lg:hidden"
              onClick={handleToggleMenu}
            >
              {isMenuOpen ? (
                <svg
                  className="w-7 h-7"
                  fill="#333"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-7 h-7"
                  fill="#333"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>
      <div className="mt-[80px]"></div> {/* Margin for fixed navbar */}
    </>
  );
};

export default Navbar;
