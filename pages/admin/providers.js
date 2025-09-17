import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

import { API_URL } from "../../utils/config";
import CustomNotification from "../../components/notification";
import OnlineUsers from "../../components/onlineUsers";
import Modal from "./actionsModal";

import { useSocket } from "../../contexts/socketContext";

export default function AdminHome() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { onlineCount } = useSocket();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const response = await axios.get(`${API_URL}/api/auth/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = response.data;

        if (!userData.staff) {
          router.push("/login");
          return;
        }

        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.message]);

  const searchUser = async () => {
    if (!search) {
      setNotification({
        message: "Please enter a user phone number.",
        type: "error",
      });
      return;
    }

    setSearching(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API_URL}/api/admin/user?phone=${search}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      router.push(`/admin/${response.data.phone}`);
      setNotification({ message: "User found successfully!", type: "success" });
    } catch (error) {
      console.error("Error fetching user:", error);
      setNotification({
        message: error.response?.data?.message || "An error occurred",
        type: "error",
      });
    } finally {
      setSearching(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-600">Loading...</div>;
  }

  const navLinks = [
    { href: "/admin/all_aviator", label: "Aviator" },
    { href: "/admin/all_sports", label: "Sports" },
    { href: "/admin/all_smartsoft", label: "SmartSoft" },
    { href: "/admin/all_imoons", label: "Imoon" },
    { href: "/admin/all_turbos", label: "Turbo" },
    { href: "/admin/all_aviatrix", label: "Aviatrix" },
    { href: "/admin/all_pragmatic", label: "Pragmatic" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Search bar */}
      <div className="mb-6 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search by phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded-md flex-1"
        />
        <button
          onClick={searchUser}
          disabled={searching}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          {searching ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Online Users */}
      <div className="mb-6">
        <OnlineUsers count={onlineCount} />
      </div>

      {/* Navigation links */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        {navLinks.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className="flex justify-between items-center px-4 py-3 border rounded-md shadow-sm hover:bg-gray-50 text-green-700 font-medium"
          >
            <span>{link.label}</span>
            <span className="text-lg">→</span>
          </Link>
        ))}
      </div>

      {/* Back button */}
      <div className="mt-8">
        <Link
          href="/admin"
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Back
        </Link>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} />

      {/* Notifications */}
      {notification.message && (
        <CustomNotification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "" })}
        />
      )}
    </div>
  );
}
