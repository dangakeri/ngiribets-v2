import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { useRouter } from "next/router";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const transactionsPerPage = 100;
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

        // Fetch all plays with pagination
        const usersResponse = await axios.get(
          `${API_URL}/api/admin/all_plays`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { page: currentPage, limit: transactionsPerPage },
          }
        );

        setUsers(usersResponse.data.users || []);
        setTotalPages(usersResponse.data.totalPages || 1);
        setTotalTransactions(usersResponse.data.totalTransactions || 0);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch transactions. Please try again later.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, router]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold mb-4">All Plays</h1>
      <p className="mb-4 text-gray-700">
        <strong>Total Plays: {totalTransactions}</strong>
      </p>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left border-b">Name</th>
              <th className="px-4 py-2 text-left border-b">Phone</th>
              <th className="px-4 py-2 text-left border-b">Action</th>
              <th className="px-4 py-2 text-left border-b">Amount</th>
              <th className="px-4 py-2 text-left border-b">Balance</th>
              <th className="px-4 py-2 text-left border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="px-4 py-2 border-b text-gray-800">
                    {user.name}
                  </td>
                  <td className="px-4 py-2 border-b text-gray-800">
                    {user.phone}
                  </td>
                  <td className="px-4 py-2 border-b text-gray-800">
                    {user.action}
                  </td>
                  <td className="px-4 py-2 border-b text-gray-800">
                    {user.amount}
                  </td>
                  <td className="px-4 py-2 border-b text-gray-800">
                    {user.balance}
                  </td>
                  <td className="px-4 py-2 border-b text-gray-600">
                    {user.date}
                  </td>
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
      <div className="flex items-center justify-between mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          Previous
        </button>

        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
