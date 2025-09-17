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

  // Handle outside click
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

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, handleOutsideClick]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (activeTab) {
      case "deposit":
        if (name === "phone") setPhone(value);
        if (name === "depositAmount") setDepositAmount(value);
        break;
      case "verify":
        if (name === "verifyCode") setVerifyCode(value);
        break;
      case "withdraw":
        if (name === "withdrawAmount") setWithdrawAmount(value);
        break;
      default:
        break;
    }
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
        // body = { amount: withdrawAmount };
        break;
      default:
        return;
    }

    setLoading(true);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      setResponse(result.message || "Submission successful");
    } catch (error) {
      setResponse("Error submitting data");
    } finally {
      setLoading(false);
      if (responseTimer) clearTimeout(responseTimer);
      const timer = setTimeout(() => {
        setResponse("");
      }, 5000);
      setResponseTimer(timer);
    }
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        {/* Tabs */}
        <div className="flex space-x-2 mb-4 border-b">
          <button
            className={`flex-1 py-2 px-3 text-sm font-medium border-b-2 ${
              activeTab === "deposit"
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab("deposit")}
          >
            Send Money
          </button>
          <button
            className={`flex-1 py-2 px-3 text-sm font-medium border-b-2 ${
              activeTab === "verify"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab("verify")}
          >
            Load B2C
          </button>
          <button
            className={`flex-1 py-2 px-3 text-sm font-medium border-b-2 ${
              activeTab === "withdraw"
                ? "border-red-600 text-red-600"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab("withdraw")}
          >
            Close Debits
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "deposit" && (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
              <input
                type="number"
                name="depositAmount"
                value={depositAmount}
                onChange={handleChange}
                placeholder="Enter amount"
                className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Money"}
              </button>
            </form>
          )}

          {activeTab === "verify" && (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="number"
                name="verifyCode"
                value={verifyCode}
                onChange={handleChange}
                placeholder="Amount"
                className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Loading..." : "Load Now"}
              </button>
              <div className="text-xs text-gray-600 mt-2">
                Ensure you have money in your C2B working account
              </div>
            </form>
          )}

          {activeTab === "withdraw" && (
            <form onSubmit={handleSubmit} className="space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-60"
              >
                {loading ? "Loading..." : "Close/Open"}
              </button>
              <div className="text-xs text-gray-600 mt-2">
                This suspends all withdrawals.
                <br />
                Note: They auto reopen at midnight.
              </div>
            </form>
          )}

          {response && (
            <div className="mt-4 text-sm text-center text-gray-700 bg-gray-100 border rounded p-2">
              {response}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
