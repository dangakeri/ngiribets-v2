import { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import { useRouter } from "next/router";
import CustomNotification from "../components/notification";
import { API_URL } from "../utils/config";
import Link from "next/link";
import Image from "next/image";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useUser } from "../contexts/UserContext";

export default function Register() {
  const { setUser } = useUser();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [fingerprint, setFingerprint] = useState("");

  const router = useRouter();
  const { ref } = router.query;
  const defaultRef = "DEFAULT_REF_CODE";
  const referralCode = ref || defaultRef;

  useEffect(() => {
    const getFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setFingerprint(result.visitorId);
    };
    getFingerprint();
  }, []);

  useEffect(() => {
    if (ref) {
      localStorage.setItem("referralCode", referralCode);
    }
  }, [ref]);

  const handleRegister = async () => {
    const storedRef = localStorage.getItem("referralCode");

    if (!phone || !password || !confirm_password) {
      setNotification({ message: "Please fill in all fields.", type: "error" });
      return;
    }

    if (password !== confirm_password) {
      setNotification({ message: "Passwords do not match.", type: "error" });
      return;
    }

    setNotification({ message: "", type: "" });
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        phone,
        password,
        ref: storedRef,
        fingerprint,
      });

      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);

        const userResponse = await axios.get(`${API_URL}/api/auth/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (userResponse.data) {
          setUser(userResponse.data);
          localStorage.setItem("user", JSON.stringify(userResponse.data));
          setNotification({
            message: "Registration successful!",
            type: "success",
          });
          Router.push("/dashboard");
        }
      } else {
        setNotification({
          message: "Registration successful! Please log in.",
          type: "success",
        });
        Router.push("/login");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      setNotification({ message: errorMessage, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Clear notifications
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.message]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1d2933] px-4">
      <div className="w-full max-w-md bg-[#303d4a] rounded-2xl shadow-xl p-6 text-white">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/">
            <Image src="/ngiri.png" alt="Logo" width={150} height={40} />
          </Link>
        </div>

        {/* Title */}
        <h4 className="text-2xl font-bold text-center mb-6 text-[#a21cf0]">
          Register
        </h4>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
          className="space-y-4"
        >
          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-200 mb-1"
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
              className="w-full border border-gray-600 rounded-md px-3 py-2 bg-[#1d2933] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#a21cf0] focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-600 rounded-md px-3 py-2 bg-[#1d2933] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#a21cf0] focus:outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirm_password"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password"
              placeholder="Confirm Password"
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full border border-gray-600 rounded-md px-3 py-2 bg-[#1d2933] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#a21cf0] focus:outline-none"
            />
          </div>

          {/* Terms */}
          <div className="flex items-start space-x-2 text-sm text-gray-300">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              className="mt-1 accent-[#a21cf0]"
            />
            <label htmlFor="terms" className="leading-5">
              By clicking Register you confirm to have read in detail,
              understood and agreed to the
              <Link href="/terms" className="text-[#a21cf0] underline ml-1">
                Terms and Conditions
              </Link>
              , the
              <Link href="/privacy" className="text-[#a21cf0] underline ml-1">
                Privacy Policy
              </Link>
              , and that you are over 18 years of age.
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#a21cf0] to-purple-700 text-white py-3 rounded-lg font-semibold hover:scale-[1.02] transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Already have an account */}
        <p className="text-sm text-center mt-4 text-gray-300">
          Already have an account?{" "}
          <Link href="/login" className="text-[#a21cf0] font-medium">
            Login
          </Link>
        </p>

        {/* Notifications */}
        {notification.message && (
          <CustomNotification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification({ message: "", type: "" })}
          />
        )}
      </div>
    </div>
  );
}
