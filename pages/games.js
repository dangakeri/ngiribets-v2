import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";
import Loader from "../components/loader";
import Modal from "../components/Modal";

export default function IframePage() {
  const router = useRouter();
  const { iframeSrc } = router.query;

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [screenHeight, setScreenHeight] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("deposit");

  const topBarRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthenticated(!!token);

    const updateHeight = () => {
      const topBarHeight = topBarRef.current?.offsetHeight || 0;
      setScreenHeight(window.innerHeight - topBarHeight);
    };

    if (typeof window !== "undefined") {
      updateHeight();
      window.addEventListener("resize", updateHeight);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", updateHeight);
      }
    };
  }, []);

  const handleLoad = () => setLoading(false);
  const handleBack = () => router.back();

  const openModal = (tab = "deposit") => {
    setActiveTab(tab);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-full h-full">
      {/* Top Bar */}
      <div
        ref={topBarRef}
        className="flex justify-between items-center bg-black px-3 py-2 sticky top-0 z-50"
      >
        <button onClick={handleBack} className="p-1">
          <FaArrowLeft size={20} className="text-white" />
        </button>
        <button
          onClick={() => openModal("deposit")}
          className="bg-purple-800 text-white px-4 py-2 rounded-md font-semibold hover:bg-purple-900 transition"
        >
          Deposit
        </button>
      </div>

      {/* Loader */}
      {loading && <Loader />}

      {/* Iframe Section */}
      {iframeSrc ? (
        <iframe
          src={iframeSrc}
          allowFullScreen
          title="Embedded Content"
          onLoad={handleLoad}
          style={{
            height: `${screenHeight}px`,
            width: "100%",
            border: "none",
          }}
        />
      ) : (
        <p className="text-center mt-10 text-gray-600 dark:text-gray-300">
          No iframe source provided
        </p>
      )}

      {/* Deposit Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} defaultTab={activeTab} />
    </div>
  );
}
