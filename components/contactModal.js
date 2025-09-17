import { useState, useEffect, useCallback } from "react";

const UserLinkModal = ({ isOpen, onClose, userLink }) => {
  const [copied, setCopied] = useState(false);
  const phoneNumber = "0715979797"; // Replace with your target phone number

  const handleCopyClick = () => {
    navigator.clipboard.writeText(userLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleShareClick = () => {
    const whatsappURL = `https://wa.me/254715979797`;
    window.open(whatsappURL, "_blank");
  };

  const handleCallClick = () => {
    const callURL = `tel:${phoneNumber}`;
    window.open(callURL);
  };

  const handleEmailClick = () => {
    const email = "care@betfalme.contact";
    const emailURL = `mailto:${email}?subject=Inquiry&body=${encodeURIComponent(
      ``
    )}`;
    window.open(emailURL);
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
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <h4 className="text-lg font-bold mb-4 text-center text-gray-800">
          CONTACT US
        </h4>

        <div className="flex flex-col space-y-3">
          <button
            onClick={handleShareClick}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            WhatsApp
          </button>
          <button
            onClick={handleCallClick}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Call
          </button>
          <button
            onClick={handleEmailClick}
            className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
          >
            Email
          </button>
          <button
            onClick={handleCopyClick}
            className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            Copy Link
          </button>
        </div>

        {copied && (
          <div className="mt-3 text-sm text-green-600 text-center">
            ✅ Link Copied!
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default UserLinkModal;
