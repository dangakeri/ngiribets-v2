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
        // Verify token and check if user is staff
        const authResponse = await axios.get(`${API_URL}/api/auth/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = authResponse.data;

        if (!userData.staff) {
          router.push("/login");
          return;
        }

        // Fetch Turbo data
        const usersResponse = await axios.get(
          `${API_URL}/api/admin/all_turbos`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(usersResponse.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch Turbo data. Please try again later.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [router]);

  if (loading)
    return <div className="p-6 text-center text-gray-400">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#092335] min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6 text-[#a21cf0]">⚡ Turbo Data</h1>

      <div className="overflow-x-auto shadow-md rounded-lg border border-[#333b44] bg-[#0f2d46]">
        <table className="min-w-full text-sm text-left text-gray-300">
          <thead className="bg-[#303d4a] text-white uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border-b border-[#333b44]">Day</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Wager</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Wins</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Profit</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-[#092335]" : "bg-[#0f2d46]"
                  } hover:bg-[#2a2f36] transition`}
                >
                  <td className="px-4 py-2 border-b border-[#333b44]">
                    {user.day}
                  </td>
                  <td className="px-4 py-2 border-b border-[#333b44]">
                    {user.wager.toFixed(1)}
                  </td>
                  <td className="px-4 py-2 border-b border-[#333b44]">
                    {user.wins.toFixed(1)}
                  </td>
                  <td
                    className={`px-4 py-2 border-b border-[#333b44] font-medium ${
                      user.profit >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {user.profit.toFixed(1)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-gray-400">
                  No Turbo data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
