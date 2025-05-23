import React from "react";
import { FaSort } from "react-icons/fa";

const data = [
  {
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "Pending",
  },
  {
    name: "Mark Wilson",
    email: "mark@example.com",
    role: "Author",
    status: "Inactive",
  },
  {
    name: "Emily Davis",
    email: "emily@example.com",
    role: "Subscriber",
    status: "Active",
  },
];

const statusColor = {
  Active: "text-green-600 bg-green-100",
  Pending: "text-yellow-600 bg-yellow-100",
  Inactive: "text-red-600 bg-red-100",
};

const DataTable = () => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-left text-gray-600 uppercase font-semibold">
            <tr>
              <th className="px-6 py-3 flex items-center gap-2">
                Name <FaSort className="inline-block" />
              </th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">{user.name}</td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-gray-600">{user.role}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[user.status]}`}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
