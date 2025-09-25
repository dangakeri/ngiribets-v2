import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../../utils/config";
import Router from "next/router";

const Modal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("deposit");
  const [depositAmount, setDepositAmount] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseTimer, setResponseTimer] = useState(null);

  const handleOutsideClick = useCallback(
    (event) => {
      if (event.target.classList.contains("modal-overlay")) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, handleOutsideClick]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (activeTab === "deposit") {
      if (name === "phone") setPhone(value);
      if (name === "depositAmount") setDepositAmount(value);
    }
    if (activeTab === "verify" && name === "verifyCode") setVerifyCode(value);
    if (activeTab === "withdraw" && name === "withdrawAmount")
      setWithdrawAmount(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      Router.push("/login");
      return;
    }

    let url = `${API_URL}`;
    let body = {};
    switch (activeTab) {
      case "deposit":
        url = `${url}/api/admin/send`;
        body = { amount: depositAmount, phone };
        break;
      case "verify":
        url = `${url}/api/admin/load`;
        body = { amount: verifyCode };
        break;
      case "withdraw":
        url = `${url}/api/admin/close`;
        break;
    }

    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      setResponse(result.message || "✅ Action successful");
    } catch (err) {
      setResponse("❌ Error submitting data");
    } finally {
      setLoading(false);
      if (responseTimer) clearTimeout(responseTimer);
      const timer = setTimeout(() => setResponse(""), 5000);
      setResponseTimer(timer);
    }
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#092335] w-full max-w-md rounded-lg shadow-xl p-6 border border-[#1f3547]">
        {/* Tabs */}
        <div className="flex mb-6 border-b border-[#1f3547]">
          {[
            { id: "deposit", label: "Send Money", color: "green" },
            { id: "verify", label: "Load B2C", color: "blue" },
            { id: "withdraw", label: "Close Debits", color: "red" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 text-sm font-medium border-b-2 transition ${
                activeTab === tab.id
                  ? `border-${tab.color}-500 text-${tab.color}-400`
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "deposit" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full bg-[#0f2d46] border border-[#1f3547] text-white rounded px-3 py-2 text-sm focus:ring focus:ring-green-500/40 outline-none"
              required
            />
            <input
              type="number"
              name="depositAmount"
              value={depositAmount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full bg-[#0f2d46] border border-[#1f3547] text-white rounded px-3 py-2 text-sm focus:ring focus:ring-green-500/40 outline-none"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-medium transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Money"}
            </button>
          </form>
        )}

        {activeTab === "verify" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="number"
              name="verifyCode"
              value={verifyCode}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full bg-[#0f2d46] border border-[#1f3547] text-white rounded px-3 py-2 text-sm focus:ring focus:ring-blue-500/40 outline-none"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition disabled:opacity-50"
            >
              {loading ? "Loading..." : "Load Now"}
            </button>
            <p className="text-xs text-gray-400">
              Ensure your C2B working account has sufficient funds.
            </p>
          </form>
        )}

        {activeTab === "withdraw" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-medium transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Close / Open"}
            </button>
            <p className="text-xs text-gray-400">
              This suspends all withdrawals.
              <br />
              They auto reopen at midnight.
            </p>
          </form>
        )}

        {/* Response */}
        {response && (
          <div
            className={`mt-4 text-sm text-center p-2 rounded font-medium ${
              response.startsWith("✅")
                ? "bg-green-500/20 text-green-400 border border-green-600/40"
                : "bg-red-500/20 text-red-400 border border-red-600/40"
            }`}
          >
            {response}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
