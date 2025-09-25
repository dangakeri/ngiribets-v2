"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { useRouter } from "next/router";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const usersPerPage = 100;
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        // Verify staff
        const authResponse = await axios.get(`${API_URL}/api/auth/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = authResponse.data;
        if (!userData.staff) {
          router.push("/login");
          return;
        }

        // Fetch users with pagination
        const usersResponse = await axios.get(`${API_URL}/api/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { page: currentPage, limit: usersPerPage },
        });

        setUsers(usersResponse.data.users || []);
        setTotalPages(usersResponse.data.totalPages || 1);
        setTotalUsers(usersResponse.data.totalUsers || 0);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch users. Please try again later.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, router]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <div className="p-6 text-white">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 min-h-screen bg-[#092335] text-white">
      <p className="mb-6 text-lg font-semibold text-[#a21cf0]">
        👥 All Users: {totalUsers}
      </p>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg border border-[#333b44] rounded-lg bg-[#0f2d46]">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#303d4a] text-left text-white text-xs uppercase tracking-wider">
              <th className="px-4 py-3 border-b border-[#333b44]">Status</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Name</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Balance</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Phone</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Password</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Deposits</th>
              <th className="px-4 py-3 border-b border-[#333b44]">
                Withdrawals
              </th>
              <th className="px-4 py-3 border-b border-[#333b44]">Inviter</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={index}
                  className="odd:bg-[#092335] even:bg-[#0f2d46] hover:bg-[#2a2f36] transition"
                >
                  <td className="px-4 py-3 border-b border-[#333b44]">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.suspended
                          ? "bg-red-500/20 text-red-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {user.suspended ? "Suspended" : "Active"}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44]">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44] font-medium text-green-400">
                    {user.balance}
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44]">
                    {user.phone}
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44] text-gray-400">
                    {user.password}
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44] text-blue-400">
                    {user.total_deposits}
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44] text-yellow-400">
                    {user.total_withdrawals}
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44] text-gray-300">
                    {user.inviter_phone}
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44] text-gray-400">
                    {user.date}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-4 py-6 text-center text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-[#303d4a] text-white rounded-lg disabled:opacity-50 hover:bg-[#2a2f36] transition"
        >
          ← Previous
        </button>
        <span className="text-sm text-gray-300">
          Page <span className="font-semibold text-white">{currentPage}</span>{" "}
          of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-[#303d4a] text-white rounded-lg disabled:opacity-50 hover:bg-[#2a2f36] transition"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
