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

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="flex items-center justify-between bg-white shadow px-4 py-3">
        <button
          className="text-2xl text-gray-700"
          onClick={openModal}
          aria-label="Open Menu"
        >
          &#9776;
        </button>
        {isNavOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleNav}
          ></div>
        )}
      </header>

      {/* MAIN */}
      <main className="p-6">
        {/* Search bar */}
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="0700554326"
            className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={searchUser}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            disabled={searching}
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
        <div className="grid gap-3 mt-6">
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
            <div
              key={idx}
              className="flex justify-between items-center bg-white shadow px-4 py-3 rounded border"
            >
              <Link
                href={link.href}
                className="text-green-600 text-sm font-medium hover:underline"
              >
                {link.label}
              </Link>
              <div className="text-gray-500">{link.arrow || "→"}</div>
            </div>
          ))}
        </div>

        {/* Bottom Action */}
        <div className="mt-6">
          <Link
            href="/admin/pending"
            className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
