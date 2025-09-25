"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { useRouter } from "next/router";

export default function AllDebits() {
  const [debits, setDebits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const debitsPerPage = 100;
  const router = useRouter();

  useEffect(() => {
    const fetchDebits = async () => {
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

        // Fetch debits with pagination
        const response = await axios.get(`${API_URL}/api/admin/all_debits`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { page: currentPage, limit: debitsPerPage },
        });

        setDebits(response.data.debits || []);
        setTotalPages(response.data.totalPages || 1);
        setTotalCount(response.data.totalCount || 0);
      } catch (err) {
        console.error("Error fetching debits:", err);
        setError("Failed to fetch debits. Please try again later.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchDebits();
  }, [currentPage, router]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <div className="p-6 text-white">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 min-h-screen bg-[#092335] text-white">
      <h1 className="text-xl font-bold text-[#a21cf0] mb-2">
        💳 Recent Debits
      </h1>
      <p className="mb-6 text-gray-300">
        Total Debits:{" "}
        <span className="font-semibold text-white">{totalCount}</span>
      </p>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg border border-[#333b44] rounded-lg bg-[#0f2d46]">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#303d4a] text-left text-white text-xs uppercase tracking-wider">
              <th className="px-4 py-3 border-b border-[#333b44]">Receiver</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Code</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Amount</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Balance</th>
              <th className="px-4 py-3 border-b border-[#333b44]">Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(debits) && debits.length > 0 ? (
              debits.map((debit, index) => (
                <tr
                  key={index}
                  className="odd:bg-[#092335] even:bg-[#0f2d46] hover:bg-[#2a2f36] transition"
                >
                  <td className="px-4 py-3 border-b border-[#333b44]">
                    {debit.receiver}
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44] text-blue-400 font-medium">
                    {debit.txn}
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44] text-yellow-300 font-medium">
                    {debit.amount}
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44] text-green-400">
                    {debit.balance}
                  </td>
                  <td className="px-4 py-3 border-b border-[#333b44] text-gray-400">
                    {debit.date}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                  No debits found.
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
