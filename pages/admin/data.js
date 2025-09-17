// pages/admin/all_users.js
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
        // Verify token and check if user is an admin/staff
        const authResponse = await axios.get(`${API_URL}/api/auth/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = authResponse.data;

        if (!userData.staff) {
          router.push("/login");
          return;
        }

        // Fetch Daily Data
        const usersResponse = await axios.get(`${API_URL}/api/admin/all_data`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch daily data. Please try again later.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [router]);

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold mb-6">Daily Data</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left border-b">Day</th>
              <th className="px-4 py-2 text-left border-b">Balance</th>
              <th className="px-4 py-2 text-left border-b">Credits</th>
              <th className="px-4 py-2 text-left border-b">Debits</th>
              <th className="px-4 py-2 text-left border-b">Profit</th>
              <th className="px-4 py-2 text-left border-b">Status</th>
              <th className="px-4 py-2 text-left border-b">Cashbacks</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="px-4 py-2 border-b text-gray-800">
                    {user.day}
                  </td>
                  <td className="px-4 py-2 border-b text-gray-800">
                    {user.balance}
                  </td>
                  <td className="px-4 py-2 border-b text-gray-800">
                    {user.deposits}
                  </td>
                  <td className="px-4 py-2 border-b text-gray-800">
                    {user.withdrawals}
                  </td>
                  <td
                    className={`px-4 py-2 border-b font-medium ${
                      user.profit >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {user.profit}
                  </td>
                  <td className="px-4 py-2 border-b text-gray-800">
                    {user.status ? "Closed" : "Open"}
                  </td>
                  <td className="px-4 py-2 border-b text-gray-800">
                    {user.refund}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                  No daily data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
