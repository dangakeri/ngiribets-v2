import { useState, useEffect, useCallback } from "react";
import { FaCopy, FaWhatsapp, FaTimes } from "react-icons/fa";

const UserLinkModal = ({ isOpen, onClose, userLink }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(userLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Join me on NgiriBets 🎰",
          url: userLink,
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(userLink)}`,
        "_blank"
      );
    }
  };

  const handleOutsideClick = useCallback(
    (event) => {
      if (event.target.classList.contains("modal-overlay")) {
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

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, handleOutsideClick]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div
        className="relative w-full max-w-md p-6 rounded-2xl shadow-2xl border border-[#a21cf0]/40"
        style={{ backgroundColor: "#1d2933" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
        >
          <FaTimes size={18} />
        </button>

        {/* Header */}
        <h4 className="text-xl font-bold text-white mb-2">Invite & Earn</h4>
        <p className="text-sm text-gray-400 mb-4">
          Share your referral link and earn{" "}
          <span className="font-semibold text-[#a21cf0]">5% bonus</span> every
          time your friend makes a deposit.
        </p>

        {/* Input */}
        <div className="flex items-center border border-[#a21cf0]/50 rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={userLink}
            readOnly
            className="flex-1 px-3 py-2 bg-transparent text-gray-200 text-sm focus:outline-none"
          />
          <button
            onClick={handleCopyClick}
            className="px-4 py-2 bg-[#a21cf0] text-white text-sm font-semibold hover:bg-[#9116d8] transition flex items-center gap-2"
          >
            <FaCopy size={14} />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleShareClick}
            className="w-full flex items-center justify-center gap-2 h-11 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
          >
            <FaWhatsapp size={16} /> Share on WhatsApp
          </button>
          <button
            onClick={handleCopyClick}
            className="w-full flex items-center justify-center gap-2 h-11 rounded-lg bg-[#a21cf0] text-white font-semibold hover:bg-[#9116d8] transition"
          >
            <FaCopy size={16} /> Copy Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLinkModal;
