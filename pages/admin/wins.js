"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { useRouter } from "next/router";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        // Verify token and check if user is admin/staff
        const authResponse = await axios.get(`${API_URL}/api/auth/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = authResponse.data;

        if (!userData.staff) {
          router.push("/login");
          return;
        }

        // Fetch wins/users data
        const usersResponse = await axios.get(`${API_URL}/api/admin/all_wins`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch users. Please try again later.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [router]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6">
      <h5 className="text-xl font-semibold mb-4">Recent Wins</h5>

      <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Balance</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.phone}</td>
                <td className="px-4 py-2">{user.action}</td>
                <td className="px-4 py-2 font-medium text-green-600">
                  {user.amount}
                </td>
                <td className="px-4 py-2">{user.balance}</td>
                <td className="px-4 py-2 text-xs text-gray-500">{user.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
