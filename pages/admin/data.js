// pages/admin/all_users.js
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { useRouter } from "next/router";

export default function AllUsers() {
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDailyData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        // Verify admin/staff
        const authResponse = await axios.get(`${API_URL}/api/auth/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = authResponse.data;

        if (!userData.staff) {
          router.push("/login");
          return;
        }

        // Fetch daily data
        const response = await axios.get(`${API_URL}/api/admin/all_data`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDailyData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch daily data. Please try again later.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchDailyData();
  }, [router]);

  if (loading) return <div className="p-6 text-white">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 min-h-screen bg-[#092335] text-white">
      <h1 className="text-2xl font-bold text-[#a21cf0] mb-6">📊 Daily Data</h1>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg border border-[#333b44] rounded-lg bg-[#0f2d46]">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#303d4a] text-left text-white text-xs uppercase tracking-wider">
              <th className="px-4 py-3 border-b border-[#333b44]">Day</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Balance</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Credits</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Debits</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Profit</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Status</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Cashbacks</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(dailyData) && dailyData.length > 0 ? (
              dailyData.map((row, index) => (
                <tr
                  key={index}
                  className="odd:bg-[#092335] even:bg-[#0f2d46] hover:bg-[#2a2f36] transition"
                >
                  <td className="px-4 py-3 border-b border-[#333b44] text-gray-300">
                    {row.day}
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44] text-green-400 font-medium">
                    {row.balance}
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44] text-blue-400">
                    {row.deposits}
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44] text-yellow-300">
                    {row.withdrawals}
                  </td>
                  <td
                    className={`px-4 py-3 border-b border-[#333b44] font-semibold ${
                      row.profit >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {row.profit}
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44]">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        row.status
                          ? "bg-gray-500/30 text-gray-300"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {row.status ? "Closed" : "Open"}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44] text-purple-300">
                    {row.refund}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-400">
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
