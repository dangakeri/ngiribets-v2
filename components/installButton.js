import { useEffect, useState } from "react";
import Image from "next/image";

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("✅ User accepted the A2HS prompt");
        } else {
          console.log("❌ User dismissed the A2HS prompt");
        }
        setDeferredPrompt(null);
        setIsVisible(false);
      });
    }
  };

  const handleCloseClick = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-background shadow-lg rounded-lg p-3 border flex flex-col items-center gap-3 z-50">
      {/* Install Button */}
      <button
        onClick={handleInstallClick}
        className="w-full py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
      >
        Install App
      </button>

      {/* Text + Icon + Close */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Image
            src="/favicon.avif"
            alt="App Icon"
            width={30}
            height={30}
            className="rounded"
          />
          <div>
            <span className="block font-semibold text-gray-900">
              Sofabets App
            </span>
            <p className="text-sm text-gray-500">Install and Get a Bonus</p>
          </div>
        </div>

        {/* "X" button */}
        <button
          onClick={handleCloseClick}
          className="ml-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default InstallButton;
