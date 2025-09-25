import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { useRouter } from "next/router";
import CustomNotification from "../../components/notification";

export default function PendingBets() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const router = useRouter();
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const authResponse = await axios.get(`${API_URL}/api/auth/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = authResponse.data;

        if (!userData.staff) {
          router.push("/login");
          return;
        }

        const usersResponse = await axios.get(`${API_URL}/api/admin/pending`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch pending bets. Please try again later.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [router]);

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.message]);

  const handleAction = async (userId, action) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/admin/approve`,
        { userId, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotification({ message: response.data.message, type: "success" });

      setTimeout(() => {
        router.reload();
      }, 4000);
    } catch (err) {
      setResponseMessage("Error performing action. Please try again later.");
    }
  };

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold mb-6">Pending Bets</h1>

      {responseMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-600 rounded">
          {responseMessage}
        </div>
      )}

      <div className="overflow-x-auto bg-background shadow-md rounded-lg">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left border-b">Name</th>
              <th className="px-4 py-2 text-left border-b">Amount</th>
              <th className="px-4 py-2 text-left border-b">Action</th>
              <th className="px-4 py-2 text-left border-b">Phone</th>
              <th className="px-4 py-2 text-left border-b">Status</th>
              <th className="px-4 py-2 text-left border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 border-b last:border-none"
                >
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.pos_win}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleAction(user._id, "approve")}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(user._id, "reject")}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </td>
                  <td className="px-4 py-2">{user.phone}</td>
                  <td
                    className={`px-4 py-2 font-medium ${
                      user.status ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    {user.status ? "Paid" : "Pending"}
                  </td>
                  <td className="px-4 py-2">{user.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                  No pending bets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {notification.message && (
        <CustomNotification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "" })}
        />
      )}
    </div>
  );
}
