// components/Loader.js
import React from "react";
import Image from "next/image";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex flex-col items-center space-y-4">
        <Image
          src="/ngiri.png" // Replace with your actual logo path
          alt="Logo"
          width={150}
          height={40}
          priority
        />
        <div className="w-12 h-12 border-4 border-[#a21cf0] border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
