"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../utils/config";
import Router, { useRouter } from "next/router";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { phone } = router.query; // Get phone number from query parameters

  useEffect(() => {
    if (!phone) return; // Skip if phone isn’t provided

    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          Router.push("/login");
          return;
        }

        // Verify admin access
        const authResponse = await axios.get(`${API_URL}/api/auth/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!authResponse.data.staff) {
          Router.push("/login");
          return;
        }

        // Fetch transactions for this phone
        const response = await axios.get(`${API_URL}/api/admin/user_plays`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { phone },
        });

        setTransactions(response.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("An error occurred while fetching transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [phone]);

  if (loading) return <div className="text-center py-6">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-6">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        🎮 Plays for {phone}
      </h1>

      {transactions.length > 0 ? (
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="p-4 border border-gray-200 rounded-lg shadow-sm flex justify-between items-center bg-white hover:shadow-md transition"
            >
              {/* Left side: action + date */}
              <div>
                <div className="font-semibold text-gray-700">
                  {transaction.action}
                </div>
                <div className="text-sm text-gray-500">{transaction.date}</div>
              </div>

              {/* Right side: amount + balance */}
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">
                  {transaction.amount.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  Bal: {transaction.balance}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No transactions found.</p>
      )}
    </div>
  );
};

export default Transactions;
