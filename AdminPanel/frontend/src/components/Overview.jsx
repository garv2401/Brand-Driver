import React from "react";
import { FaUsers, FaFileAlt, FaDollarSign, FaChartLine } from "react-icons/fa";

const stats = [
  {
    title: "Total Users",
    value: "1,234",
    icon: <FaUsers className="text-blue-500 text-3xl" />,
    bg: "bg-blue-100",
  },
  {
    title: "Total Posts",
    value: "542",
    icon: <FaFileAlt className="text-purple-500 text-3xl" />,
    bg: "bg-purple-100",
  },
  {
    title: "Revenue",
    value: "$12,345",
    icon: <FaDollarSign className="text-green-500 text-3xl" />,
    bg: "bg-green-100",
  },
  {
    title: "Visitors",
    value: "8,910",
    icon: <FaChartLine className="text-orange-500 text-3xl" />,
    bg: "bg-orange-100",
  },
];

const OverviewCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-5 flex items-center gap-4 hover:shadow-lg transition-shadow duration-300"
        >
          <div className={`p-3 rounded-full ${stat.bg}`}>{stat.icon}</div>
          <div>
            <h4 className="text-sm text-gray-500">{stat.title}</h4>
            <p className="text-xl font-semibold text-gray-800">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
