import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { useRouter } from "next/router";

export default function AllBets() {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBets = async () => {
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

        // Fetch recent bets
        const response = await axios.get(`${API_URL}/api/admin/all_bets`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBets(response.data || []);
      } catch (err) {
        console.error("Error fetching bets:", err);
        setError("Failed to fetch bets. Please try again later.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchBets();
  }, [router]);

  if (loading) return <div className="p-6 text-white">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 min-h-screen bg-[#092335] text-white">
      <h1 className="text-xl font-bold text-[#a21cf0] mb-6">🎲 Recent Bets</h1>

      <div className="overflow-x-auto shadow-lg border border-[#333b44] rounded-lg bg-[#0f2d46]">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#303d4a] text-left text-white text-xs uppercase tracking-wider">
              <th className="px-4 py-3 border-b border-[#333b44]">Name</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Phone</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Action</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Amount</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Balance</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(bets) && bets.length > 0 ? (
              bets.map((bet, index) => (
                <tr
                  key={index}
                  className="odd:bg-[#092335] even:bg-[#0f2d46] hover:bg-[#2a2f36] transition"
                >
                  <td className="px-4 py-3 border-b border-[#333b44]">
                    {bet.name}
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44]">
                    {bet.phone}
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44] text-blue-400">
                    {bet.action}
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44] text-yellow-300 font-medium">
                    {bet.amount}
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44] text-green-400">
                    {bet.balance}
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44] text-gray-400">
                    {bet.date}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-400">
                  No bets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
