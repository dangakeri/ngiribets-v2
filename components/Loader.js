// components/Loader.js
import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex flex-col items-center space-y-4">
        <img
          src="/splash-icon.png"
          alt="Logo"
          className="w-[150px] h-auto animate-glow"
        />
      </div>

      <style jsx>{`
        @keyframes glow {
          0% {
            transform: scale(1);
            filter: drop-shadow(0 0 0px rgba(162, 28, 240, 0.6));
          }
          50% {
            transform: scale(1.1);
            filter: drop-shadow(0 0 25px rgba(162, 28, 240, 1));
          }
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 0px rgba(162, 28, 240, 0.6));
          }
        }
        .animate-glow {
          animation: glow 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
