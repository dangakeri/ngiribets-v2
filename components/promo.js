// components/Modal.js
import { useEffect, useRef, useState } from "react";

const Modal = ({ onClose }) => {
  const modalRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("hasSeenModal");
    const timestamp = localStorage.getItem("modalTimestamp");

    const currentTime = Date.now();
    const threeHours = 3 * 60 * 60 * 1000; // 3 hours in ms (fix comment)

    // Show modal if never seen OR if last seen was > 3 hours ago
    if (!hasSeenModal || (timestamp && currentTime - timestamp > threeHours)) {
      setIsVisible(true);
    }
  }, []);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      localStorage.setItem("hasSeenModal", "true");
      localStorage.setItem("modalTimestamp", Date.now());
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleImageClick = () => {
    localStorage.setItem("hasSeenModal", "true");
    localStorage.setItem("modalTimestamp", Date.now());
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="relative bg-background dark:bg-gray-900 rounded-lg shadow-lg max-w-lg w-11/12 p-3"
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-bold"
          onClick={handleImageClick}
        >
          ✕
        </button>

        {/* Promo Image */}
        <img
          src="/images/sofacashback.avif"
          alt="Popup"
          onClick={handleImageClick}
          className="cursor-pointer w-full rounded-md"
        />
      </div>
    </div>
  );
};

export default Modal;
