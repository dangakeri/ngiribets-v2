"use client";

import { useState, useEffect } from "react";
import {
  FaHome,
  FaMoneyBillWave,
  FaUser,
  FaWallet,
  FaWhatsapp,
} from "react-icons/fa";
import { useRouter } from "next/router";
import Link from "next/link";
import Modal from "./Modal";

const BottomNav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("deposit");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    }
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleActionClick = (action) => {
    if (isAuthenticated) {
      setModalTab(action);
      openModal();
    } else {
      router.push("/login");
    }
  };

  const isActive = (path) => router.pathname === path;

  const baseClasses =
    "flex flex-col items-center justify-center text-xs font-medium transition-colors";

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-[#303d4a] h-16 shadow-inner z-50 md:hidden">
        <div className="flex justify-around items-center h-full text-white">
          {/* Home */}
          <Link
            href="/"
            className={`${baseClasses} ${
              isActive("/") ? "text-[#a21cf0]" : "text-white"
            }`}
          >
            <FaHome size={20} />
            <span className="mt-1">Home</span>
          </Link>

          {/* Withdraw */}
          <button
            onClick={() => handleActionClick("withdraw")}
            className={`${baseClasses} ${
              modalTab === "withdraw" && isModalOpen
                ? "text-[#a21cf0]"
                : "text-white"
            }`}
          >
            <FaMoneyBillWave size={20} />
            <span className="mt-1">Withdraw</span>
          </button>

          {/* Deposit */}
          <button
            onClick={() => handleActionClick("deposit")}
            className={`${baseClasses} ${
              modalTab === "deposit" && isModalOpen
                ? "text-[#a21cf0]"
                : "text-white"
            }`}
          >
            <FaWallet size={20} />
            <span className="mt-1">Deposit</span>
          </button>

          {/* Profile */}
          <Link
            href="/profile"
            className={`${baseClasses} ${
              isActive("/profile") ? "text-[#a21cf0]" : "text-white"
            }`}
          >
            <FaUser size={20} />
            <span className="mt-1">Profile</span>
          </Link>

          {/* WhatsApp */}
          <a
            href="https://wa.me/254740470470?text=Hello%20there!%20I%20need%20help."
            target="_blank"
            rel="noopener noreferrer"
            className={`${baseClasses} ${
              isActive("/support") ? "text-[#a21cf0]" : "text-white"
            }`}
          >
            <FaWhatsapp size={20} />
            <span className="mt-1">Support</span>
          </a>
        </div>
      </nav>

      {/* Deposit/Withdraw Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} defaultTab={modalTab} />
    </>
  );
};

export default BottomNav;
