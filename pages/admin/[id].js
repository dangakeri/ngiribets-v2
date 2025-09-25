import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { API_URL } from "../../utils/config";
import Modal from "../../components/adminDeposit";
import EditModal from "../../components/editUser";
import CustomNotification from "../../components/notification";

export async function getServerSideProps(context) {
  const { id } = context.params;
  return { props: { id } };
}

export default function UserDetails({ id }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/auth/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = response.data;

        if (!userData.staff) {
          router.push("/login");
          return;
        }

        const userResponse = await axios.get(
          `${API_URL}/api/admin/user?phone=${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(userResponse.data);
      } catch (error) {
        console.error("Error verifying token or fetching user:", error);
        setError("An error occurred. Please try again.");
        if (error.response?.status === 401) router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchData();
  }, [id, router]);

  const handleDeposit = () => setModalOpen(true);
  const handleEdit = () => setEditModalOpen(true);

  const handleSuspend = async () => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    try {
      await axios.post(
        `${API_URL}/api/admin/suspend`,
        { phone: user.phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotification({
        message: "User Suspended Successfully",
        type: "success",
      });
    } catch {
      setNotification({ message: "User unsuspended", type: "error" });
    }
  };

  const handleBan = async () => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    try {
      await axios.post(
        `${API_URL}/api/admin/ban`,
        { phone: user.phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotification({ message: "User Banned Successfully", type: "success" });
    } catch {
      setNotification({ message: "User unbanned", type: "error" });
    }
  };

  const handleViewTransactions = () =>
    router.push(`/admin/transactions?phone=${user.phone}`);
  const handleViewPlays = () => router.push(`/admin/plays?phone=${user.phone}`);

  if (loading)
    return <div className="p-6 text-center text-gray-400">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#092335] min-h-screen text-white">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={handleDeposit}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
        >
          Deposit
        </button>
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Edit
        </button>
        <button
          onClick={handleSuspend}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md"
        >
          Suspend
        </button>
        <button
          onClick={handleBan}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
        >
          Ban
        </button>
      </div>

      {/* User Info Card */}
      <div className="bg-[#0f2d46] shadow-md rounded-lg p-6 mb-8 border border-[#333b44]">
        <h4 className="text-2xl font-bold mb-4 text-[#38bdf8]">User Details</h4>
        {user && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
            <p>
              <strong>Balance:</strong> {user.balance}
            </p>
            <p>
              <strong>Status:</strong> {user.suspended ? "Suspended" : "Active"}
            </p>
            <p>
              <strong>Banned:</strong> {user.ban ? "Yes" : "No"}
            </p>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Password:</strong> {user.password}
            </p>
            <p>
              <strong>Deposits:</strong> {user.total_deposits}
            </p>
            <p>
              <strong>Withdrawals:</strong> {user.total_withdrawals}
            </p>
            <p>
              <strong>Limit:</strong> {user.withdrawal_limit}
            </p>
            <p>
              <strong>Inviter:</strong> {user.inviter_name}
            </p>
            <p>
              <strong>Referrals:</strong> {user.total_referrals}
            </p>
            <p>
              <strong>Ref Income:</strong> {user.referral_income}
            </p>
            <p>
              <strong>Daily Wager:</strong> {user.daily_plays}
            </p>
            <p>
              <strong>Daily Wins:</strong> {user.daily_wins}
            </p>
            <p>
              <strong>Daily Profit:</strong>{" "}
              <span
                className={
                  user.daily_profit >= 0 ? "text-green-400" : "text-red-400"
                }
              >
                {user.daily_profit.toFixed(1)}
              </span>
            </p>
            <p>
              <strong>Played Today:</strong> {user.played_today}
            </p>
            <p className="sm:col-span-2">
              <strong>Date Joined:</strong>
              <br />
              {user.date}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="flex gap-4">
        <button
          onClick={handleViewTransactions}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
        >
          View Transactions
        </button>
        <button
          onClick={handleViewPlays}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
        >
          View Plays
        </button>
      </div>

      {/* Notifications */}
      {notification.message && (
        <CustomNotification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "" })}
        />
      )}

      {/* Modals */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        phone={user?.phone}
      />
      <EditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        phone={user?.phone}
        initialBalance={user?.balance}
        initialLimit={user?.withdrawal_limit}
        onSubmit={(result) =>
          setUser({
            ...user,
            balance: result.balance,
            withdrawal_limit: result.withdrawal_limit,
          })
        }
      />
    </div>
  );
}
