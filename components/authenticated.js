"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Modal from "./Modal";
import NotificationListener from "../components/listener";
import { useUser } from "../contexts/UserContext";

const Header = () => {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <NotificationListener />

      {/* Fixed header */}
      <header className="fixed top-0 left-0 z-50 w-full bg-[#303d4a] flex justify-between items-center px-4 py-3 shadow-md">
        {/* Left (Logo) */}
        <div>
          <Link href="/">
            <Image
              src="/ngiri.png"
              alt="Logo"
              width={150}
              height={40}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Right (Balance + Deposit) */}
        <div className="flex items-center justify-center gap-4">
          {/* Balance */}
          <div className="text-xs font-semibold text-white">
            {user ? `KSH ${user.balance.toFixed(1)}` : "Loading..."}
          </div>

          {/* Deposit button */}
          <button
            onClick={openModal}
            className="px-4 py-2 bg-[#a21cf0] text-white text-xs font-semibold rounded-md shadow transition"
          >
            Deposit
          </button>

          {/* Modal */}
          <Modal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </header>

      {/* Add padding so page content isn’t hidden under header */}
      <div className="pt-16" />
    </>
  );
};

export default Header;
