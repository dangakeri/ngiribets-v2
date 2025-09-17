import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/footer";
import { API_URL } from "../../utils/config";
import Router, { useRouter } from "next/router";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { phone } = router.query;

  useEffect(() => {
    if (!phone) return;

    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          Router.push("/login");
          return;
        }

        // Check if the user is staff
        const authResponse = await axios.get(`${API_URL}/api/auth/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!authResponse.data.staff) {
          Router.push("/login");
          return;
        }

        // Fetch transactions for the specified phone
        const response = await axios.get(`${API_URL}/api/admin/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { phone },
        });

        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("An error occurred while fetching transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [phone]);

  if (loading) return <div className="p-6 text-gray-700">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Transactions for {phone}
      </h1>

      <div className="space-y-4">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="flex justify-between items-center bg-white shadow-sm rounded-lg p-4 border border-gray-200 hover:shadow-md transition"
            >
              <div>
                <div className="font-semibold text-gray-700">
                  {transaction.action}
                </div>
                <div className="text-sm text-gray-500">{transaction.date}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-800">
                  {transaction.amount.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  Bal: {transaction.balance}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No transactions found.</p>
        )}
      </div>

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default Transactions;
