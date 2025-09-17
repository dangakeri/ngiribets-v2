import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { useRouter } from "next/router";

export default function AllTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const transactionsPerPage = 100;
  const router = useRouter();

  useEffect(() => {
    const fetchTransactions = async () => {
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

        if (!authResponse.data.staff) {
          router.push("/login");
          return;
        }

        // Fetch transactions with pagination
        const response = await axios.get(
          `${API_URL}/api/admin/all_transactions`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { page: currentPage, limit: transactionsPerPage },
          }
        );

        setTransactions(response.data.users || []);
        setTotalPages(response.data.totalPages || 1);
        setTotalTransactions(response.data.totalTransactions || 0);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to fetch transactions. Please try again later.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [currentPage, router]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h5 className="text-lg font-semibold text-gray-800 mb-2">Transactions</h5>
      <p className="text-sm text-gray-600 mb-4">
        Total Transactions: {totalTransactions}
      </p>

      <div className="overflow-x-auto shadow border border-gray-200 rounded">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Phone</th>
              <th className="px-4 py-2 border-b">Action</th>
              <th className="px-4 py-2 border-b">Amount</th>
              <th className="px-4 py-2 border-b">Balance</th>
              <th className="px-4 py-2 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(transactions) && transactions.length > 0 ? (
              transactions.map((tx, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                >
                  <td className="px-4 py-2 border-b">{tx.name}</td>
                  <td className="px-4 py-2 border-b">{tx.phone}</td>
                  <td className="px-4 py-2 border-b">{tx.action}</td>
                  <td className="px-4 py-2 border-b">{tx.amount}</td>
                  <td className="px-4 py-2 border-b">{tx.balance}</td>
                  <td className="px-4 py-2 border-b">{tx.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
