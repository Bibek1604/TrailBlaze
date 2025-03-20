import { useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import profileImage from "../../assets/profile.jpeg"; // Use your actual profile image path

const TopBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  return (
    <header className="flex justify-between items-center w-full h-16 px-6 bg-white shadow-md">
      {/* Left Section - Admin Panel Title */}
      <div className="flex items-center gap-2">
      </div>

      {/* Right Section - Profile Dropdown */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="w-10 h-10 rounded-full focus:outline-none"
          aria-haspopup="true"
          aria-expanded={isDropdownOpen ? "true" : "false"}
        >
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </button>

        {/* Profile Dropdown */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
            <ul className="space-y-2 p-2 text-gray-700">
              <li>
                <NavLink
                  to="/edit-profile"
                  className="block px-4 py-2 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Edit Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/logout"
                  className="block px-4 py-2 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopBar;
