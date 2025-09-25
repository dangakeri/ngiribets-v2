"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { API_URL } from "../../utils/config";
import CustomNotification from "../../components/notification";
import Modal from "./actionsModal";
import { useSocket } from "../../contexts/socketContext";

export default function AdminHome() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { onlineCount } = useSocket();
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleNav = () => setIsNavOpen((prev) => !prev);

  // 🔒 Auth check
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      try {
        const response = await axios.get(`${API_URL}/api/auth/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = response.data;
        if (!userData.staff) return router.push("/login");
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

  // ⏱ Auto-hide notifications
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.message]);

  // 🔍 Search User
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
        { headers: { Authorization: `Bearer ${token}` } }
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

  if (loading) return <div className="p-6 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#092335] text-white">
      {/* HEADER */}
      <header className="flex items-center justify-between bg-[#303d4a] shadow-md px-5 py-4">
        <button
          className="text-2xl text-[#a21cf0] hover:opacity-80 transition"
          onClick={openModal}
          aria-label="Open Menu"
        >
          &#9776;
        </button>
        {isNavOpen && (
          <div
            className="fixed inset-0 bg-[#303d4a]/60 backdrop-blur-sm z-40"
            onClick={toggleNav}
          ></div>
        )}
      </header>

      {/* MAIN */}
      <main className="p-6 max-w-5xl mx-auto">
        {/* Search bar */}
        <div className="flex space-x-2 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="0700554326"
            className="flex-1 border border-[#333b44] rounded-lg px-4 py-2 text-sm bg-[#092335] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a21cf0] transition"
          />
          <button
            onClick={searchUser}
            disabled={searching}
            className="bg-[#a21cf0] text-white px-5 py-2 rounded-lg font-medium shadow hover:shadow-lg hover:bg-opacity-90 transition disabled:opacity-50"
          >
            {searching ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Notifications */}
        {notification.message && (
          <CustomNotification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification({ message: "", type: "" })}
          />
        )}

        {/* Admin Links */}
        <div className="grid gap-4 mt-6">
          {[
            { href: "/admin/all_users", label: "Users", arrow: onlineCount },
            { href: "/admin/all_transactions", label: "Transactions" },
            { href: "/admin/all_plays", label: "Plays" },
            { href: "/admin/all_withdrawals", label: "Withdrawals" },
            { href: "/admin/all_deposits", label: "Deposits" },
            { href: "/admin/all_debits", label: "Debits" },
            { href: "/admin/data", label: "Data" },
            { href: "/admin/bets", label: "Bets" },
            { href: "/admin/wins", label: "Wins" },
            { href: "/admin/providers", label: "Providers" },
          ].map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="flex justify-between items-center bg-[#092335] border border-[#333b44] rounded-lg px-5 py-3 shadow hover:bg-[#2a2f36] transition group cursor-pointer"
            >
              <span className="text-[#a21cf0] text-sm font-semibold">
                {link.label}
              </span>
              <span className="text-[#b3b3b3] font-medium">
                {link.arrow || "→"}
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom Action */}
        <div className="mt-10">
          <Link
            href="/admin/pending"
            className="block w-full text-center bg-green-600 text-white px-5 py-3 rounded-lg font-semibold shadow hover:bg-green-700 hover:shadow-lg transition"
          >
            Approve Bets
          </Link>
        </div>

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={closeModal} />
      </main>
    </div>
  );
}
