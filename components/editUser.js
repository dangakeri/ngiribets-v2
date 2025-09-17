import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../utils/config";
import Router from "next/router";

const EditModal = ({
  isOpen,
  onClose,
  phone,
  initialBalance,
  initialLimit,
  onSubmit,
}) => {
  const [balance, setBalance] = useState(initialBalance);
  const [withdrawalLimit, setWithdrawalLimit] = useState(initialLimit);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleChangeBalance = (e) => setBalance(e.target.value);
  const handleChangeLimit = (e) => setWithdrawalLimit(e.target.value);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      Router.push("/login");
      return;
    }

    const url = `${API_URL}/api/admin/edituserdata`;
    const body = { phone, balance, withdrawalLimit };

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
      setResponse(result.message || "Update successful");
      onSubmit(result);
    } catch (error) {
      setResponse("Error updating data");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setResponse("");
        onClose();
      }, 5000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <h4 className="text-lg font-semibold mb-4 text-gray-800">
          Edit User Data
        </h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Balance Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Balance
            </label>
            <input
              type="number"
              name="balance"
              value={balance}
              onChange={handleChangeBalance}
              placeholder="Enter balance"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-yellow-400 focus:ring focus:ring-yellow-200"
            />
          </div>

          {/* Withdrawal Limit Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Withdrawal Limit
            </label>
            <input
              type="number"
              name="withdrawalLimit"
              value={withdrawalLimit}
              onChange={handleChangeLimit}
              placeholder="Enter withdrawal limit"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-yellow-400 focus:ring focus:ring-yellow-200"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-md bg-yellow-400 hover:bg-yellow-500 text-white font-semibold transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Submit"}
          </button>

          {/* Response Message */}
          {response && (
            <div className="mt-2 text-sm text-center text-gray-700">
              {response}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditModal;
