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

        // Fetch turbo data
        const usersResponse = await axios.get(
          `${API_URL}/api/admin/all_turbos`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(usersResponse.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch turbo data. Please try again later.");
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
    <div className="p-6">
      <h5 className="text-lg font-semibold text-gray-800 mb-4">Turbo Data</h5>

      <div className="overflow-x-auto shadow border border-gray-200 rounded">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="px-4 py-2 border-b">Day</th>
              <th className="px-4 py-2 border-b">Wager</th>
              <th className="px-4 py-2 border-b">Wins</th>
              <th className="px-4 py-2 border-b">Profit</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                >
                  <td className="px-4 py-2 border-b">{user.day}</td>
                  <td className="px-4 py-2 border-b">
                    {user.wager.toFixed(1)}
                  </td>
                  <td className="px-4 py-2 border-b">{user.wins.toFixed(1)}</td>
                  <td
                    className={`px-4 py-2 border-b font-medium ${
                      user.profit >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {user.profit.toFixed(1)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                  No turbo data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
