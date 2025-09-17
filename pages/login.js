import { useState } from "react";
import axios from "axios";
import Router from "next/router";
import Link from "next/link";
import Image from "next/image";
import ResetPasswordModal from "../components/passwordReset";
import CustomNotification from "../components/notification";
import { useUser } from "../contexts/UserContext";
import { API_URL } from "../utils/config";

export default function Login() {
  const { setUser } = useUser();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogin = async () => {
    if (!phone || !password) {
      setNotification({ message: "Please fill in all fields.", type: "error" });
      return;
    }

    setNotification({ message: "", type: "" });
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        phone,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      const userResponse = await axios.get(`${API_URL}/api/auth/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (userResponse.data) {
        setUser(userResponse.data);
        localStorage.setItem("user", JSON.stringify(userResponse.data));

        setNotification({
          message: "Successfully logged in!",
          type: "success",
        });

        Router.push("/dashboard");
      }
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || "An error occurred.",
        type: "error",
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4"
      style={{ backgroundColor: "#1d2933" }}
    >
      <div className="w-full max-w-md bg-[#303d4a]/40  backdrop-blur-xl shadow-2xl rounded-2xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/">
            <Image
              src="/ngiri.png"
              alt="Logo"
              width={160}
              height={45}
              className="cursor-pointer"
            />
          </Link>
        </div>

        <h4 className="text-center text-2xl font-bold text-white mb-6">
          Welcome Back
        </h4>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-300"
            >
              Phone
            </label>
            <input
              type="number"
              id="phone"
              placeholder="0722123123"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full mt-1 px-3 py-3 rounded-lg text-sm bg-[#1d2933] border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#a21cf0] outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-3 py-3 rounded-lg text-sm bg-[#1d2933] border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#a21cf0] outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-[#a21cf0] to-purple-700 text-white rounded-lg font-semibold hover:scale-[1.02] transition-all shadow-md disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Forgot Password */}
        <p
          onClick={openModal}
          className="text-center text-sm mt-4 cursor-pointer text-gray-400 hover:text-[#a21cf0] transition"
        >
          Forgot Password?{" "}
          <span className="text-[#a21cf0] font-medium">Reset</span>
        </p>

        {/* Reset Password Modal */}
        <ResetPasswordModal isOpen={isModalOpen} onClose={closeModal} />

        {/* Create Account */}
        <p className="text-center text-sm mt-4 text-gray-300">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-[#a21cf0] font-semibold hover:underline"
          >
            Create One
          </Link>
        </p>

        {/* Notifications */}
        {notification.message && (
          <div className="mt-4">
            <CustomNotification
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification({ message: "", type: "" })}
            />
          </div>
        )}
      </div>
    </div>
  );
}
