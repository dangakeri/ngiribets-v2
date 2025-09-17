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
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Deposit
        </h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            name="depositAmount"
            value={depositAmount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Loading..." : "Deposit"}
          </button>
          {response && (
            <div className="text-sm text-center mt-2 text-gray-700 dark:text-gray-300">
              {response}
            </div>
          )}
        </form>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Modal;
