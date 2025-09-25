"use client";

import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../utils/config";
import Router from "next/router";

const Modal = ({ isOpen, onClose, phone }) => {
  const [depositAmount, setDepositAmount] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseTimer, setResponseTimer] = useState(null);

  // Close modal if user clicks outside
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
    setDepositAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      Router.push("/login");
      return;
    }

    const url = `${API_URL}/api/admin/deposit`;
    const body = { amount: depositAmount, phone };

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
      setResponse(result.message || "✅ Deposit successful");
    } catch (error) {
      setResponse("❌ Error submitting deposit");
    } finally {
      setLoading(false);
      if (responseTimer) clearTimeout(responseTimer);
      const timer = setTimeout(() => {
        setResponse("");
        onClose();
      }, 4000);
      setResponseTimer(timer);
    }
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#092335] rounded-lg shadow-xl w-full max-w-md p-6 border border-[#1f3547] relative">
        {/* Title */}
        <h4 className="text-lg font-bold mb-4 text-[#a21cf0]">💰 Deposit</h4>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            name="depositAmount"
            value={depositAmount}
            onChange={handleChange}
            placeholder="Enter deposit amount"
            className="w-full border border-[#1f3547] bg-[#0f2d46] text-white rounded-md px-3 py-2 text-sm focus:ring focus:ring-[#a21cf0]/30 focus:border-[#a21cf0] outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#a21cf0] hover:bg-[#2aa8d4] text-white py-2 px-4 rounded-md text-sm font-semibold transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Processing..." : "Deposit"}
          </button>
          {response && (
            <div
              className={`text-sm text-center mt-2 font-medium ${
                response.startsWith("✅") ? "text-green-400" : "text-red-400"
              }`}
            >
              {response}
            </div>
          )}
        </form>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Modal;
