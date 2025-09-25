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
      setResponse(result.message || "✅ Update successful");
      onSubmit(result);
    } catch (error) {
      setResponse("❌ Error updating data");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setResponse("");
        onClose();
      }, 4000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#092335] rounded-lg shadow-xl p-6 w-full max-w-md border border-[#1f3547]">
        <h4 className="text-lg font-bold mb-4 text-[#a21cf0]">
          ✏️ Edit User Data
        </h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Balance Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Balance
            </label>
            <input
              type="number"
              name="balance"
              value={balance}
              onChange={handleChangeBalance}
              placeholder="Enter balance"
              required
              className="mt-1 block w-full rounded-md border border-[#1f3547] bg-[#0f2d46] text-white px-3 py-2 text-sm shadow-sm focus:border-[#a21cf0] focus:ring focus:ring-[#a21cf0]/30"
            />
          </div>

          {/* Withdrawal Limit Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Withdrawal Limit
            </label>
            <input
              type="number"
              name="withdrawalLimit"
              value={withdrawalLimit}
              onChange={handleChangeLimit}
              placeholder="Enter withdrawal limit"
              required
              className="mt-1 block w-full rounded-md border border-[#1f3547] bg-[#0f2d46] text-white px-3 py-2 text-sm shadow-sm focus:border-[#a21cf0] focus:ring focus:ring-[#a21cf0]/30"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-md bg-[#a21cf0] hover:bg-[#2aa8d4] text-white font-semibold transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

          {/* Response Message */}
          {response && (
            <div
              className={`mt-3 text-sm text-center font-medium ${
                response.startsWith("✅") ? "text-green-400" : "text-red-400"
              }`}
            >
              {response}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditModal;
