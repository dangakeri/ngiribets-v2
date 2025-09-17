import { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";

import Header from "../components/authenticated";
import CustomNotification from "../components/notification";
import { API_URL } from "../utils/config";
import Footer from "../components/footer";
import { FaLock } from "react-icons/fa";

export default function ChangePassword() {
  const [current_password, setCurrentPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!current_password || !new_password) {
      setNotification({
        message: "Please fill in both fields.",
        type: "error",
      });
      return;
    }

    setNotification({ message: "", type: "" });
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/api/auth/change_password`,
        { current_password, new_password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotification({ message: response?.data?.message, type: "success" });
      Router.push("/change_password");
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || "An error occurred",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          Router.push("/login");
        }
      } catch {
        Router.push("/login");
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.message]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#1d2933" }}
    >
      <Header />

      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-gray-800/80 border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col gap-6 backdrop-blur">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#a21cf0]/20 text-[#a21cf0]">
              <FaLock size={20} />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">Change Password</h4>
              <p className="text-xs text-gray-400">
                Keep your account secure by updating your password
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleChangePassword();
            }}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="current_password"
                className="block text-sm font-medium mb-1 text-gray-300"
              >
                Current Password
              </label>
              <input
                className="w-full h-12 border border-gray-600 rounded-lg px-3 py-2 text-sm bg-gray-900/60 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 outline-none"
                type="password"
                id="current_password"
                placeholder="••••••••"
                value={current_password}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="new_password"
                className="block text-sm font-medium mb-1 text-gray-300"
              >
                New Password
              </label>
              <input
                className="w-full h-12 border border-gray-600 rounded-lg px-3 py-2 text-sm bg-gray-900/60 text-white placeholder-gray-500 focus:ring-2 focus:ring-[#a21cf0] outline-none"
                type="password"
                id="new_password"
                placeholder="••••••••"
                value={new_password}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <button
              className="w-full h-12 bg-[#a21cf0] text-white rounded-lg font-semibold transition-all shadow-lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Updating..." : "Change Password"}
            </button>
          </form>

          {/* Notifications */}
          {notification.message && (
            <div className="mt-2">
              <CustomNotification
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification({ message: "", type: "" })}
              />
            </div>
          )}

          {/* Helper Note */}
          <p className="text-xs text-gray-500 text-center mt-3">
            Use at least 8 characters with a mix of letters, numbers, and
            symbols for a stronger password.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
