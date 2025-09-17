import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_URL } from "../utils/config";
import { FaPhoneAlt } from "react-icons/fa";

const ResetPasswordModal = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = async () => {
    if (!phoneNumber) {
      setResponseMessage("Please enter a valid phone number.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/auth/password_reset`, {
        phoneNumber,
      });
      setResponseMessage(
        response.data.message ||
          "Password reset instructions have been sent to your phone."
      );
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message ||
          "An error occurred while sending the reset instructions."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOutsideClick = useCallback(
    (event) => {
      if (event.target.id === "reset-overlay") {
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

  return (
    <div
      id="reset-overlay"
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
    >
      <div className="w-11/12 max-w-md bg-[#303d4a]  rounded-2xl shadow-xl p-6 text-white relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl font-bold transition"
        >
          ×
        </button>

        {/* Header */}
        <h4 className="text-2xl font-bold mb-2 text-center text-[#a21cf0]">
          Reset Password
        </h4>
        <p className="text-sm mb-6 text-gray-200 text-center">
          Enter your registered phone number and we’ll send reset instructions.
        </p>

        {/* Input with icon */}
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-200 mb-2"
        >
          Phone Number
        </label>
        <div className="relative">
          <FaPhoneAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="tel"
            value={phoneNumber}
            onChange={handleInputChange}
            placeholder="0722123123"
            disabled={loading}
            className="w-full mb-4 pl-10 pr-3 py-3 rounded-lg text-sm bg-[#1d2933] border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#a21cf0] outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full h-12 rounded-lg font-semibold transition-all ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#a21cf0] hover:bg-purple-700"
          }`}
        >
          {loading ? "Sending..." : "Submit"}
        </button>

        {/* Response Message */}
        {responseMessage && (
          <div className="mt-4 text-sm font-medium text-center text-gray-200">
            {responseMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordModal;
