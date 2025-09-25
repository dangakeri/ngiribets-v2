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

  if (loading)
    return <div className="p-6 text-center text-white">Loading...</div>;
  if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6 min-h-screen bg-[#092335] text-white">
      <h5 className="text-xl font-semibold mb-4 text-[#a21cf0]">
        🏆 Recent Wins
      </h5>

      <div className="overflow-x-auto shadow-md rounded-lg border border-[#333b44] bg-[#0f2d46]">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="bg-[#303d4a] text-white uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border-b border-[#333b44]">Name</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Phone</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Action</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Amount</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Balance</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="odd:bg-[#092335] even:bg-[#0f2d46] hover:bg-[#2a2f36] transition"
              >
                <td className="px-4 py-2 border-b border-[#333b44]">
                  {user.name}
                </td>
                <td className="px-4 py-2 border-b border-[#333b44]">
                  {user.phone}
                </td>
                <td className="px-4 py-2 border-b border-[#333b44] text-blue-400">
                  {user.action}
                </td>
                <td className="px-4 py-2 border-b border-[#333b44] font-medium text-green-400">
                  {user.amount}
                </td>
                <td className="px-4 py-2 border-b border-[#333b44] text-yellow-300">
                  {user.balance}
                </td>
                <td className="px-4 py-2 border-b border-[#333b44] text-xs text-gray-400">
                  {user.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
