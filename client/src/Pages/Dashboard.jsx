import React, { useEffect, useState } from "react";
import { FaUser, FaUsers, FaEdit } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Dashboard = ({ users = [] }) => {
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, pendingUpdates: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (users.length > 0) {
        setStats({
          totalUsers: users.length,
          activeUsers: users.filter(user => user.name.trim() && user.email.trim() && user.phone.trim()).length,
          pendingUpdates: users.filter(user => !user.name.trim() || !user.email.trim() || !user.phone.trim()).length
        });
      }
      setLoading(false);
    }, 1000); 
  }, [users]);

  const chartData = {
    labels: ["Total Users", "Active Users", "Pending Updates"],
    datasets: [
      {
        label: "Users Statistics",
        data: [stats.totalUsers, stats.activeUsers, stats.pendingUpdates],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
        borderColor: ["#2563eb", "#059669", "#d97706"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-10 min-h-screen bg-gray-100">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <FaUsers size={24} className="text-blue-500 mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Total Users</h3>
                <p className="text-xl font-bold">{stats.totalUsers}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <FaUser size={24} className="text-green-500 mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Active Users</h3>
                <p className="text-xl font-bold">{stats.activeUsers}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <FaEdit size={24} className="text-yellow-500 mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Pending Updates</h3>
                <p className="text-xl font-bold">{stats.pendingUpdates}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-lg font-semibold mb-4">User Statistics</h2>
            <Bar data={chartData} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Users List</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Phone</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-100 transition duration-300">
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.phone}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-3 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
