import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUsers, FiCalendar, FiSettings, FiGrid } from "react-icons/fi"; 
import { GiDarkSquad } from "react-icons/gi";

const Navigation = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleIndex = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  const sideMenuData = [
    { title: "Dashboard", path: "/Dashboard", icon: <FiHome className="text-xl" /> },
    { title: "User Page", path: "/User_Page", icon: <FiUsers className="text-xl" /> },
    { title: "Events Page", path: "/Events_Page", icon: <FiCalendar className="text-xl" /> },
    {
      title: "Organizer",
      icon: <FiSettings className="text-xl" />, 
      options: [
        { title: "Organizer Page", path: "/Organizer_Page" },
        { title: "Organizer New", path: "/Organizer_New" },
      ],
    },
    {
      title: "Categories",
      icon: <FiGrid className="text-xl" />,
      options: [
        { title: "Categories New", path: "/Categories_New" },
        { title: "Categories Page", path: "/Categories_Page" },
      ],
    },
    {
      title: "Squad",
      icon: <GiDarkSquad className="text-xl" />,
      options: [
        { title: "Squad New", path: "/Squad_New" },
        { title: "Squad Page", path: "/Squad_Page" },
      ],
    },
  ];

  return (
    <nav className="flex flex-col gap-2 p-6 text-white bg-gradient-to-b from-blue-700 to-indigo-800 w-64 min-h-screen shadow-lg">
      {sideMenuData.map((item, index) => (
        <div key={index} className="w-full">
          {item.path ? (
            <Link
              to={item.path}
              className="flex items-center gap-3 p-3 text-lg font-semibold hover:bg-blue-600 rounded-md transition"
            >
              {item.icon} {item.title}
            </Link>
          ) : (
            <div>
              <p
                onClick={() => handleIndex(index)}
                className="flex items-center justify-between p-3 text-lg font-semibold cursor-pointer hover:bg-blue-600 rounded-md transition"
              >
                <span className="flex items-center gap-3">
                  {item.icon} {item.title}
                </span>
                <span>{selectedIndex === index ? "▲" : "▼"}</span>
              </p>
              {selectedIndex === index && (
                <div className="ml-8 border-l-2 border-gray-400 pl-4">
                  {item.options?.map((option, subIndex) => (
                    <Link
                      key={subIndex}
                      to={option.path}
                      className="block p-2 text-base font-medium hover:bg-blue-500 rounded-md transition"
                    >
                      {option.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Navigation;
