// pages/transactions.js
import { useState, useEffect, memo } from "react";
import axios from "axios";
import { FiArrowUpRight, FiArrowDownLeft } from "react-icons/fi";
import { FaUserGroup, FaCoins } from "react-icons/fa6";
import Footer from "../components/footer";
import { API_URL } from "../utils/config";

// ---- TransactionCard ----
function formatAmount(amount) {
  if (typeof amount !== "number") return "0.00";
  return amount.toFixed(2);
}

const TransactionCard = memo(function TransactionCard({
  kind,
  label,
  dateText,
  amount,
}) {
  const isWithdraw = kind === "withdraw";
  const isDeposit = kind === "deposit";
  const isCashback = kind === "cashback";
  const isReferral = kind === "referral";

  const icon = isDeposit ? (
    <FiArrowUpRight className="text-green-500" size={28} />
  ) : isWithdraw ? (
    <FiArrowDownLeft className="text-red-500" size={28} />
  ) : isReferral ? (
    <FaUserGroup className="text-blue-500" size={28} />
  ) : (
    <FaCoins className="text-yellow-400" size={28} />
  );

  const bgColor = isWithdraw
    ? "from-red-900/40 to-red-800/30"
    : isDeposit
    ? "from-green-900/40 to-green-800/30"
    : isReferral
    ? "from-blue-900/40 to-blue-800/30"
    : "from-yellow-900/40 to-yellow-800/30";

  const amountColor = isWithdraw
    ? "text-red-400"
    : isDeposit
    ? "text-green-400"
    : isReferral
    ? "text-blue-400"
    : "text-yellow-400";

  return (
    <div
      className={`
        relative grid grid-cols-[70px_1fr_auto] items-center gap-4 p-4 
        rounded-xl border border-white/10 shadow-lg
        bg-[#1d2933] backdrop-blur-md
        transition transform hover:-translate-y-1 hover:rotate-1
      `}
      style={{
        maskImage:
          "radial-gradient(circle at left center, transparent 6px, black 6px) left center / 15px 100% repeat-y, radial-gradient(circle at right center, transparent 6px, black 6px) right center / 15px 100% repeat-y",
        WebkitMaskComposite: "destination-in",
        maskComposite: "intersect",
      }}
    >
      {/* Icon Area */}
      <div className="flex items-center justify-center bg-black/20 rounded-lg p-2">
        {icon}
      </div>

      {/* Info */}
      <div className="flex flex-col">
        <span className="text-sm font-bold text-white/90">{label}</span>
        <span className="text-xs text-white/60">{dateText}</span>
      </div>

      {/* Amount */}
      <div>
        <span
          className={`px-3 py-1.5 rounded-md font-extrabold text-lg ${amountColor}`}
        >
          {isWithdraw ? "-" : "+"} KSH {formatAmount(amount)}
        </span>
      </div>
    </div>
  );
});

// ---- Transactions Page ----
const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "/login";
          return;
        }

        const response = await axios.get(`${API_URL}/api/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-[#1d2933] px-4 sm:px-6 lg:px-8 py-10 text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Transactions</h1>

      <div className="space-y-4">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              kind={transaction.action?.toLowerCase()}
              label={transaction.action}
              dateText={transaction.date}
              amount={transaction.amount}
            />
          ))
        ) : (
          <p className="text-center text-gray-400">No transactions found.</p>
        )}
      </div>

      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default Transactions;
