import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { useRouter } from "next/router";

export default function AllPlays() {
  const [plays, setPlays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPlays, setTotalPlays] = useState(0);

  const playsPerPage = 100;
  const router = useRouter();

  useEffect(() => {
    const fetchPlays = async () => {
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

        // Fetch all plays with pagination
        const playsResponse = await axios.get(
          `${API_URL}/api/admin/all_plays`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { page: currentPage, limit: playsPerPage },
          }
        );

        setPlays(playsResponse.data.users || []);
        setTotalPages(playsResponse.data.totalPages || 1);
        setTotalPlays(playsResponse.data.totalTransactions || 0);
      } catch (err) {
        console.error("Error fetching plays:", err);
        setError("Failed to fetch plays. Please try again later.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchPlays();
  }, [currentPage, router]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <div className="p-6 text-white">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 min-h-screen bg-[#092335] text-white">
      <h1 className="text-xl font-bold text-[#a21cf0] mb-2">🎮 All Plays</h1>
      <p className="mb-6 text-gray-300">
        Total Plays:{" "}
        <span className="font-semibold text-white">{totalPlays}</span>
      </p>

      {/* Table */}
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
            {Array.isArray(plays) && plays.length > 0 ? (
              plays.map((play, index) => (
                <tr
                  key={index}
                  className="odd:bg-[#092335] even:bg-[#0f2d46] hover:bg-[#2a2f36] transition"
                >
                  <td className="px-4 py-3 border-b border-[#333b44]">
                    {play.name}
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44]">
                    {play.phone}
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44]">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        play.action?.toLowerCase() === "win"
                          ? "bg-green-500/20 text-green-400"
                          : play.action?.toLowerCase() === "loss"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {play.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44] text-yellow-300 font-medium">
                    {play.amount}
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44] text-green-400">
                    {play.balance}
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44] text-gray-400">
                    {play.date}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-400">
                  No plays found.
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
