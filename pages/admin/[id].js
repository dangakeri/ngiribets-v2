import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { API_URL } from "../../utils/config";
import Modal from "../../components/adminDeposit"; // Import Modal component
import EditModal from "../../components/editUser"; // Import EditModal
import CustomNotification from "../../components/notification";

export async function getServerSideProps(context) {
  const { id } = context.params;

  return {
    props: {
      id,
    },
  };
}

export default function UserDetails({ id }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const router = useRouter();
  const [notification, setNotification] = useState({ message: "", type: "" });

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
        if (error.response?.status === 401) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchData();
  }, [id, router]);

  const handleDeposit = () => {
    setModalOpen(true);
  };

  const handleSuspend = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/admin/suspend`,
        { phone: user.phone },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNotification({
        message: "User Suspended Successfully",
        type: "success",
      });
    } catch (error) {
      setNotification({ message: "User unsuspended", type: "error" });
    }
  };

  const handleBan = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/admin/ban`,
        { phone: user.phone },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNotification({ message: "User Banned Successfully", type: "success" });
    } catch (error) {
      setNotification({ message: "User unbanned", type: "error" });
    }
  };

  const handleViewTransactions = () => {
    router.push(`/admin/transactions?phone=${user.phone}`);
  };

  const handleViewPlays = () => {
    router.push(`/admin/plays?phone=${user.phone}`);
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={handleDeposit}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Deposit
        </button>
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={handleSuspend}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Suspend
        </button>
        <button
          onClick={handleBan}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Ban
        </button>
      </div>

      {/* User Info Card */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h4 className="text-2xl font-bold mb-4">User Details</h4>
        {user && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
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
              <strong>Daily Profit:</strong> {user.daily_profit.toFixed(1)}
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
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          View Transactions
        </button>
        <button
          onClick={handleViewPlays}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
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
        onSubmit={(result) => {
          setUser({
            ...user,
            balance: result.balance,
            withdrawal_limit: result.withdrawal_limit,
          });
        }}
      />
    </div>
  );
}
