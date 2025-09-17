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

        // Fetch all users from the API
        const usersResponse = await axios.get(
          `${API_URL}/api/admin/all_aviator`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
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

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold mb-6">Aviator Data</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-2 text-left border-b">Day</th>
              <th className="px-4 py-2 text-left border-b">Wager</th>
              <th className="px-4 py-2 text-left border-b">Wins</th>
              <th className="px-4 py-2 text-left border-b">Profit</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-2 border-b text-gray-800">{user.day}</td>
                <td className="px-4 py-2 border-b text-gray-800">
                  {user.wager.toFixed(1)}
                </td>
                <td className="px-4 py-2 border-b text-gray-800">
                  {user.wins.toFixed(1)}
                </td>
                <td
                  className={`px-4 py-2 border-b font-medium ${
                    user.profit >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {user.profit.toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
