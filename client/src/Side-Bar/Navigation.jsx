import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiUsers, FiCalendar, FiSettings, FiGrid, FiLogOut } from "react-icons/fi";
import { GiDarkSquad } from "react-icons/gi";

const Navigation = ({ handleLogout }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const location = useLocation();

  const handleIndex = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const sideMenuData = [
    { title: "Dashboard", path: "/Dashboard", icon: <FiHome className="text-xl" /> },
    { title: "User", path: "/User_Page", icon: <FiUsers className="text-xl" /> },
    { title: "Events", path: "/Events_Page", icon: <FiCalendar className="text-xl" /> },
    {
      title: "Organizer",
      icon: <FiSettings className="text-xl" />,
      options: [
        { title: "Organizer", path: "/Organizer_Page" },
        { title: "Organizer +", path: "/Organizer_New" },
      ],
    },
    {
      title: "Categories",
      icon: <FiGrid className="text-xl" />,
      options: [
        { title: "Categories +", path: "/Categories_New" },
        { title: "Categories", path: "/Categories_Page" },
      ],
    },
    {
      title: "Squad",
      icon: <GiDarkSquad className="text-xl" />,
      options: [
        { title: "Squad +", path: "/Squad_New" },
        { title: "Squad", path: "/Squad_Page" },
      ],
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="flex flex-col gap-2 p-6 text-white bg-gradient-to-b from-indigo-800 to-indigo-900 w-64 min-h-screen shadow-lg">
      <div className="flex flex-col gap-2 overflow-auto">
        {sideMenuData.map((item, index) => (
          <div key={index}>
            {item.path ? (
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-3 text-lg font-medium rounded-md transition duration-200 ${
                  isActive(item.path)
                    ? "bg-white text-indigo-700 shadow-inner"
                    : "hover:bg-indigo-700"
                }`}
              >
                {item.icon}
                {item.title}
              </Link>
            ) : (
              <div>
                <div
                  onClick={() => handleIndex(index)}
                  className="flex items-center justify-between cursor-pointer p-3 text-lg font-medium rounded-md hover:bg-indigo-700 transition"
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    {item.title}
                  </span>
                  <span>{selectedIndex === index ? "▲" : "▼"}</span>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    selectedIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-8 mt-1 border-l border-indigo-400 pl-4">
                    {item.options?.map((option, subIndex) => (
                      <Link
                        key={subIndex}
                        to={option.path}
                        className={`block py-2 px-3 rounded-md text-base font-medium transition duration-200 ${
                          isActive(option.path)
                            ? "bg-white text-indigo-700 shadow-inner"
                            : "hover:bg-indigo-600"
                        }`}
                      >
                        {option.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Logout button placed right after the Squad menu */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 text-lg font-medium rounded-md bg-red-600 hover:bg-red-700 transition duration-200"
        >
          <FiLogOut className="text-xl" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
