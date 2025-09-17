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
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);

  const withdrawalsPerPage = 100;
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        // Verify token and check staff
        const authResponse = await axios.get(`${API_URL}/api/auth/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = authResponse.data;

        if (!userData.staff) {
          router.push("/login");
          return;
        }

        // Fetch withdrawals with pagination
        const usersResponse = await axios.get(
          `${API_URL}/api/admin/all_withdrawals`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { page: currentPage, limit: withdrawalsPerPage },
          }
        );

        setUsers(usersResponse.data.users || []);
        setTotalPages(usersResponse.data.totalPages || 1);
        setTotalWithdrawals(usersResponse.data.totalWithdrawals || 0);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch withdrawals. Please try again later.");
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
    <div className="p-6">
      <h5 className="text-lg font-semibold text-gray-800 mb-2">
        Recent Withdrawals
      </h5>
      <p className="text-sm text-gray-600 mb-4">
        Total Withdrawals: {totalWithdrawals}
      </p>

      {/* Table */}
      <div className="overflow-x-auto shadow border border-gray-200 rounded">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Phone</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Amount</th>
              <th className="px-4 py-2 border-b">Balance</th>
              <th className="px-4 py-2 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                >
                  <td className="px-4 py-2 border-b">{user.name}</td>
                  <td className="px-4 py-2 border-b">{user.phone}</td>
                  <td className="px-4 py-2 border-b">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        user.paid
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {user.paid ? "Complete" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b">{user.amount}</td>
                  <td className="px-4 py-2 border-b">{user.balance}</td>
                  <td className="px-4 py-2 border-b">{user.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                  No withdrawals found.
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
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
